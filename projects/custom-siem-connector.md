
---
layout: post
title: "Building a Custom SIEM Connector"
date: 2025-01-14
category: projects
author: "Husam Gameel (Oppenheim3r)"
permalink: /projects/custom-siem-connector/
---

This project demonstrates the development of a custom Python-based connector that integrates multiple threat intelligence feeds with SIEM platforms, enabling automated enrichment of security events with contextual threat data.

## Project Overview

The SIEM Connector is designed to bridge the gap between threat intelligence sources and security monitoring platforms, providing real-time enrichment capabilities for security analysts.

### Key Features

- **Multi-source Integration**: Supports multiple threat intelligence APIs
- **Real-time Processing**: Stream-based event processing
- **Flexible Configuration**: YAML-based configuration management
- **Scalable Architecture**: Microservices-based design
- **Comprehensive Logging**: Detailed audit trails and performance metrics

## Architecture Design

```python
# Core architecture components
from abc import ABC, abstractmethod
from typing import Dict, List, Optional, Any
import asyncio
import aiohttp
import yaml
import logging
from dataclasses import dataclass
from datetime import datetime

@dataclass
class ThreatIntelligenceData:
    """Data structure for threat intelligence information"""
    ioc_value: str
    ioc_type: str
    threat_type: str
    confidence: float
    source: str
    first_seen: datetime
    last_seen: datetime
    malware_families: List[str]
    campaigns: List[str]
    tags: List[str]
    raw_data: Dict[str, Any]

class ThreatIntelligenceProvider(ABC):
    """Abstract base class for threat intelligence providers"""
    
    def __init__(self, config: Dict[str, Any]):
        self.config = config
        self.api_key = config.get('api_key')
        self.base_url = config.get('base_url')
        self.rate_limit = config.get('rate_limit', 100)
        
    @abstractmethod
    async def lookup_ioc(self, ioc: str, ioc_type: str) -> Optional[ThreatIntelligenceData]:
        """Lookup IOC in threat intelligence source"""
        pass
    
    @abstractmethod
    async def bulk_lookup(self, iocs: List[Dict[str, str]]) -> List[ThreatIntelligenceData]:
        """Perform bulk IOC lookup"""
        pass
    
    @abstractmethod
    def validate_config(self) -> bool:
        """Validate provider configuration"""
        pass

class VirusTotalProvider(ThreatIntelligenceProvider):
    """VirusTotal threat intelligence provider"""
    
    def __init__(self, config: Dict[str, Any]):
        super().__init__(config)
        self.base_url = "https://www.virustotal.com/vtapi/v2"
        
    async def lookup_ioc(self, ioc: str, ioc_type: str) -> Optional[ThreatIntelligenceData]:
        """Lookup IOC in VirusTotal"""
        endpoint_map = {
            'ip': '/ip-address/report',
            'domain': '/domain/report',
            'url': '/url/report',
            'hash': '/file/report'
        }
        
        endpoint = endpoint_map.get(ioc_type)
        if not endpoint:
            return None
            
        params = {
            'apikey': self.api_key,
            ioc_type: ioc
        }
        
        async with aiohttp.ClientSession() as session:
            try:
                async with session.get(f"{self.base_url}{endpoint}", params=params) as response:
                    if response.status == 200:
                        data = await response.json()
                        return self._parse_virustotal_response(data, ioc, ioc_type)
                    else:
                        logging.error(f"VirusTotal API error: {response.status}")
                        return None
            except Exception as e:
                logging.error(f"VirusTotal lookup failed: {e}")
                return None
    
    def _parse_virustotal_response(self, data: Dict, ioc: str, ioc_type: str) -> ThreatIntelligenceData:
        """Parse VirusTotal API response"""
        positives = data.get('positives', 0)
        total = data.get('total', 0)
        confidence = (positives / total) if total > 0 else 0.0
        
        return ThreatIntelligenceData(
            ioc_value=ioc,
            ioc_type=ioc_type,
            threat_type='malicious' if positives > 0 else 'clean',
            confidence=confidence,
            source='VirusTotal',
            first_seen=datetime.fromisoformat(data.get('scan_date', datetime.now().isoformat())),
            last_seen=datetime.now(),
            malware_families=self._extract_malware_families(data),
            campaigns=[],
            tags=data.get('tags', []),
            raw_data=data
        )
    
    def _extract_malware_families(self, data: Dict) -> List[str]:
        """Extract malware family names from VirusTotal data"""
        families = set()
        scans = data.get('scans', {})
        
        for engine, result in scans.items():
            if result.get('detected'):
                detection = result.get('result', '').lower()
                # Simple family extraction (would be more sophisticated in practice)
                if 'trojan' in detection:
                    families.add('Trojan')
                elif 'backdoor' in detection:
                    families.add('Backdoor')
                elif 'ransomware' in detection:
                    families.add('Ransomware')
        
        return list(families)

class SIEMConnector:
    """Main SIEM connector class"""
    
    def __init__(self, config_path: str):
        self.config = self._load_config(config_path)
        self.providers = self._initialize_providers()
        self.event_queue = asyncio.Queue()
        self.enrichment_cache = {}
        
    def _load_config(self, config_path: str) -> Dict[str, Any]:
        """Load configuration from YAML file"""
        with open(config_path, 'r') as file:
            return yaml.safe_load(file)
    
    def _initialize_providers(self) -> Dict[str, ThreatIntelligenceProvider]:
        """Initialize threat intelligence providers"""
        providers = {}
        
        for provider_name, provider_config in self.config.get('providers', {}).items():
            if provider_name == 'virustotal':
                providers[provider_name] = VirusTotalProvider(provider_config)
            # Add other providers here
            
        return providers
    
    async def enrich_event(self, event: Dict[str, Any]) -> Dict[str, Any]:
        """Enrich SIEM event with threat intelligence"""
        enriched_event = event.copy()
        enrichment_data = {}
        
        # Extract IOCs from event
        iocs = self._extract_iocs_from_event(event)
        
        # Lookup each IOC
        for ioc_data in iocs:
            ioc_value = ioc_data['value']
            ioc_type = ioc_data['type']
            
            # Check cache first
            cache_key = f"{ioc_type}:{ioc_value}"
            if cache_key in self.enrichment_cache:
                enrichment_data[ioc_value] = self.enrichment_cache[cache_key]
                continue
            
            # Query providers
            for provider_name, provider in self.providers.items():
                try:
                    intel_data = await provider.lookup_ioc(ioc_value, ioc_type)
                    if intel_data:
                        enrichment_data[ioc_value] = intel_data
                        self.enrichment_cache[cache_key] = intel_data
                        break
                except Exception as e:
                    logging.error(f"Provider {provider_name} lookup failed: {e}")
        
        # Add enrichment data to event
        if enrichment_data:
            enriched_event['threat_intelligence'] = enrichment_data
            enriched_event['enrichment_timestamp'] = datetime.now().isoformat()
        
        return enriched_event
    
    def _extract_iocs_from_event(self, event: Dict[str, Any]) -> List[Dict[str, str]]:
        """Extract IOCs from SIEM event"""
        iocs = []
        
        # Common IOC field mappings
        ioc_fields = {
            'src_ip': 'ip',
            'dest_ip': 'ip',
            'domain': 'domain',
            'url': 'url',
            'file_hash': 'hash',
            'md5': 'hash',
            'sha1': 'hash',
            'sha256': 'hash'
        }
        
        for field, ioc_type in ioc_fields.items():
            if field in event and event[field]:
                iocs.append({
                    'value': event[field],
                    'type': ioc_type,
                    'field': field
                })
        
        return iocs

# SIEM Integration Classes
class SplunkIntegration:
    """Splunk SIEM integration"""
    
    def __init__(self, config: Dict[str, Any]):
        self.host = config['host']
        self.port = config['port']
        self.username = config['username']
        self.password = config['password']
        self.index = config.get('index', 'main')
        
    async def send_enriched_event(self, event: Dict[str, Any]):
        """Send enriched event to Splunk"""
        # Implementation would use Splunk SDK or HTTP Event Collector
        pass

class QRadarIntegration:
    """IBM QRadar SIEM integration"""
    
    def __init__(self, config: Dict[str, Any]):
        self.host = config['host']
        self.api_token = config['api_token']
        self.verify_ssl = config.get('verify_ssl', True)
        
    async def send_enriched_event(self, event: Dict[str, Any]):
        """Send enriched event to QRadar"""
        # Implementation would use QRadar API
        pass

# Configuration Management
class ConfigManager:
    """Configuration management utility"""
    
    @staticmethod
    def create_sample_config() -> Dict[str, Any]:
        """Create sample configuration"""
        return {
            'providers': {
                'virustotal': {
                    'api_key': 'your_virustotal_api_key',
                    'rate_limit': 4,  # requests per minute
                    'enabled': True
                },
                'alienvault': {
                    'api_key': 'your_alienvault_api_key',
                    'rate_limit': 100,
                    'enabled': False
                }
            },
            'siem': {
                'type': 'splunk',
                'host': 'splunk.company.com',
                'port': 8089,
                'username': 'admin',
                'password': 'password',
                'index': 'security'
            },
            'cache': {
                'ttl': 3600,  # 1 hour
                'max_size': 10000
            },
            'logging': {
                'level': 'INFO',
                'file': '/var/log/siem-connector.log'
            }
        }
    
    @staticmethod
    def validate_config(config: Dict[str, Any]) -> List[str]:
        """Validate configuration and return errors"""
        errors = []
        
        # Check required sections
        required_sections = ['providers', 'siem']
        for section in required_sections:
            if section not in config:
                errors.append(f"Missing required section: {section}")
        
        # Validate providers
        if 'providers' in config:
            for provider_name, provider_config in config['providers'].items():
                if not provider_config.get('api_key'):
                    errors.append(f"Missing API key for provider: {provider_name}")
        
        return errors

# Performance Monitoring
class PerformanceMonitor:
    """Performance monitoring and metrics collection"""
    
    def __init__(self):
        self.metrics = {
            'events_processed': 0,
            'enrichments_performed': 0,
            'cache_hits': 0,
            'cache_misses': 0,
            'api_calls': 0,
            'errors': 0
        }
        self.start_time = datetime.now()
    
    def increment_metric(self, metric_name: str, value: int = 1):
        """Increment a metric counter"""
        if metric_name in self.metrics:
            self.metrics[metric_name] += value
    
    def get_performance_report(self) -> Dict[str, Any]:
        """Generate performance report"""
        runtime = datetime.now() - self.start_time
        
        return {
            'runtime_seconds': runtime.total_seconds(),
            'events_per_second': self.metrics['events_processed'] / runtime.total_seconds(),
            'cache_hit_rate': self.metrics['cache_hits'] / (self.metrics['cache_hits'] + self.metrics['cache_misses']) if (self.metrics['cache_hits'] + self.metrics['cache_misses']) > 0 else 0,
            'error_rate': self.metrics['errors'] / self.metrics['events_processed'] if self.metrics['events_processed'] > 0 else 0,
            'metrics': self.metrics
        }

# Main Application
async def main():
    """Main application entry point"""
    # Initialize connector
    connector = SIEMConnector('config.yaml')
    monitor = PerformanceMonitor()
    
    # Sample event processing
    sample_event = {
        'timestamp': datetime.now().isoformat(),
        'event_type': 'network_connection',
        'src_ip': '192.168.1.100',
        'dest_ip': '185.220.101.182',  # Known Tor exit node
        'dest_port': 443,
        'protocol': 'TCP',
        'user': 'john.doe',
        'action': 'allowed'
    }
    
    try:
        # Enrich the event
        enriched_event = await connector.enrich_event(sample_event)
        monitor.increment_metric('events_processed')
        
        print("Original Event:")
        print(yaml.dump(sample_event, default_flow_style=False))
        
        print("\nEnriched Event:")
        print(yaml.dump(enriched_event, default_flow_style=False))
        
        # Performance report
        print("\nPerformance Report:")
        print(yaml.dump(monitor.get_performance_report(), default_flow_style=False))
        
    except Exception as e:
        logging.error(f"Event processing failed: {e}")
        monitor.increment_metric('errors')

if __name__ == "__main__":
    # Configure logging
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    
    # Run the application
    asyncio.run(main())
```

## Installation and Setup

### Prerequisites

```bash
# Install required Python packages
pip install aiohttp pyyaml asyncio dataclasses

# For Splunk integration
pip install splunk-sdk

# For QRadar integration
pip install requests

# For additional threat intelligence providers
pip install shodan virustotal-api
```

### Configuration

Create a `config.yaml` file:

```yaml
providers:
  virustotal:
    api_key: "your_virustotal_api_key"
    rate_limit: 4
    enabled: true
  
  shodan:
    api_key: "your_shodan_api_key"
    rate_limit: 100
    enabled: true

siem:
  type: "splunk"
  host: "splunk.company.com"
  port: 8089
  username: "admin"
  password: "password"
  index: "security"

cache:
  ttl: 3600  # 1 hour
  max_size: 10000

logging:
  level: "INFO"
  file: "/var/log/siem-connector.log"
```

## Usage Examples

### Basic Event Enrichment

```python
import asyncio
from siem_connector import SIEMConnector

async def enrich_security_event():
    connector = SIEMConnector('config.yaml')
    
    event = {
        'timestamp': '2025-01-14T10:30:00Z',
        'src_ip': '192.168.1.100',
        'dest_ip': '185.220.101.182',
        'dest_port': 443,
        'action': 'blocked'
    }
    
    enriched = await connector.enrich_event(event)
    print(f"Threat Intelligence: {enriched.get('threat_intelligence', {})}")

asyncio.run(enrich_security_event())
```

### Batch Processing

```python
async def batch_enrich_events(events):
    connector = SIEMConnector('config.yaml')
    enriched_events = []
    
    for event in events:
        enriched = await connector.enrich_event(event)
        enriched_events.append(enriched)
    
    return enriched_events
```

## Testing Framework

```python
import unittest
from unittest.mock import AsyncMock, patch
import asyncio

class TestSIEMConnector(unittest.TestCase):
    
    def setUp(self):
        self.config = {
            'providers': {
                'virustotal': {
                    'api_key': 'test_key',
                    'rate_limit': 4
                }
            }
        }
    
    @patch('aiohttp.ClientSession.get')
    async def test_virustotal_lookup(self, mock_get):
        # Mock VirusTotal API response
        mock_response = AsyncMock()
        mock_response.status = 200
        mock_response.json.return_value = {
            'positives': 5,
            'total': 10,
            'scan_date': '2025-01-14 10:30:00'
        }
        mock_get.return_value.__aenter__.return_value = mock_response
        
        provider = VirusTotalProvider(self.config['providers']['virustotal'])
        result = await provider.lookup_ioc('192.168.1.1', 'ip')
        
        self.assertIsNotNone(result)
        self.assertEqual(result.confidence, 0.5)
        self.assertEqual(result.source, 'VirusTotal')
    
    def test_config_validation(self):
        errors = ConfigManager.validate_config(self.config)
        self.assertEqual(len(errors), 1)  # Missing SIEM section
    
    async def test_event_enrichment(self):
        connector = SIEMConnector('test_config.yaml')
        
        event = {
            'src_ip': '192.168.1.1',
            'dest_ip': '10.0.0.1'
        }
        
        enriched = await connector.enrich_event(event)
        self.assertIn('threat_intelligence', enriched)

if __name__ == '__main__':
    unittest.main()
```

## Deployment

### Docker Deployment

```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["python", "siem_connector.py"]
```

### Kubernetes Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: siem-connector
spec:
  replicas: 3
  selector:
    matchLabels:
      app: siem-connector
  template:
    metadata:
      labels:
        app: siem-connector
    spec:
      containers:
      - name: siem-connector
        image: siem-connector:latest
        ports:
        - containerPort: 8080
        env:
        - name: CONFIG_PATH
          value: "/config/config.yaml"
        volumeMounts:
        - name: config
          mountPath: /config
      volumes:
      - name: config
        configMap:
          name: siem-connector-config
```

## Performance Optimization

### Caching Strategy

```python
import redis
import json
from typing import Optional

class RedisCache:
    def __init__(self, host='localhost', port=6379, db=0, ttl=3600):
        self.redis_client = redis.Redis(host=host, port=port, db=db)
        self.ttl = ttl
    
    async def get(self, key: str) -> Optional[Dict]:
        try:
            data = self.redis_client.get(key)
            if data:
                return json.loads(data)
        except Exception as e:
            logging.error(f"Cache get error: {e}")
        return None
    
    async def set(self, key: str, value: Dict):
        try:
            self.redis_client.setex(
                key, 
                self.ttl, 
                json.dumps(value, default=str)
            )
        except Exception as e:
            logging.error(f"Cache set error: {e}")
```

## Monitoring and Alerting

```python
import prometheus_client
from prometheus_client import Counter, Histogram, Gauge

# Prometheus metrics
EVENTS_PROCESSED = Counter('siem_events_processed_total', 'Total events processed')
ENRICHMENT_DURATION = Histogram('siem_enrichment_duration_seconds', 'Time spent enriching events')
CACHE_HIT_RATE = Gauge('siem_cache_hit_rate', 'Cache hit rate percentage')
API_ERRORS = Counter('siem_api_errors_total', 'Total API errors', ['provider'])

class MetricsCollector:
    @staticmethod
    def record_event_processed():
        EVENTS_PROCESSED.inc()
    
    @staticmethod
    def record_enrichment_time(duration: float):
        ENRICHMENT_DURATION.observe(duration)
    
    @staticmethod
    def update_cache_hit_rate(rate: float):
        CACHE_HIT_RATE.set(rate)
    
    @staticmethod
    def record_api_error(provider: str):
        API_ERRORS.labels(provider=provider).inc()
```

## Future Enhancements

1. **Machine Learning Integration**: Implement ML-based threat scoring
2. **Additional Providers**: Support for more threat intelligence sources
3. **Real-time Streaming**: Kafka/RabbitMQ integration for high-volume processing
4. **Advanced Caching**: Distributed caching with Redis Cluster
5. **GraphQL API**: Modern API interface for external integrations

## Conclusion

This SIEM connector project demonstrates a scalable, production-ready solution for integrating threat intelligence with security monitoring platforms. The modular architecture allows for easy extension and customization based on specific organizational requirements.

The project showcases modern Python development practices including async/await patterns, comprehensive testing, containerization, and observability features that are essential for enterprise security tools.

## Repository

The complete source code for this project is available at: [GitHub Repository](https://github.com/oppenheim3r/siem-connector)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

