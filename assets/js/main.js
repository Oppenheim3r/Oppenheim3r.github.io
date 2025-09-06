// Main JavaScript for the website
class WebsiteManager {
    constructor() {
        this.currentPath = window.location.pathname;
        this.posts = new Map();
        this.init();
    }

    init() {
        this.initializeGUIElements();
        this.setupNavigation();
        this.loadContent();
    }

    // GUI Elements Initialization
    initializeGUIElements() {
        this.createFloatingBinaries();
        this.createSpiderWebEffect();
    }

    // Floating Binary Animation
    createFloatingBinaries() {
        const container = document.getElementById('floating-binaries');
        if (!container) return;

        const binaryStrings = [
            '01001000', '01100001', '01100011', '01101011', '01100101', '01110010',
            '11000001', '10101010', '11110000', '00001111', '01010101', '10011001',
            '11001100', '00110011', '10101010', '01010101', '11111111', '00000000'
        ];
        
        const createBinary = () => {
            const binary = document.createElement('div');
            binary.className = 'binary';
            binary.textContent = binaryStrings[Math.floor(Math.random() * binaryStrings.length)];
            binary.style.left = Math.random() * 100 + '%';
            binary.style.animationDelay = Math.random() * 5 + 's';
            binary.style.fontSize = (Math.random() * 0.5 + 0.5) + 'rem';
            
            container.appendChild(binary);
            
            // Remove binary after animation
            setTimeout(() => {
                if (binary.parentNode) {
                    binary.parentNode.removeChild(binary);
                }
            }, 25000);
        };
        
        // Create initial binaries
        for (let i = 0; i < 15; i++) {
            setTimeout(() => createBinary(), i * 1000);
        }
        
        // Continue creating binaries
        setInterval(createBinary, 2000);
    }

    // Spider Web Effect
    createSpiderWebEffect() {
        const webContainer = document.getElementById('spider-web');
        if (!webContainer) return;
        
        // Add intersection points
        const intersections = [
            { top: '20%', left: '15%' },
            { top: '20%', left: '35%' },
            { top: '20%', left: '55%' },
            { top: '20%', left: '75%' },
            { top: '40%', left: '15%' },
            { top: '40%', left: '35%' },
            { top: '40%', left: '55%' },
            { top: '40%', left: '75%' },
            { top: '60%', left: '15%' },
            { top: '60%', left: '35%' },
            { top: '60%', left: '55%' },
            { top: '60%', left: '75%' },
            { top: '80%', left: '15%' },
            { top: '80%', left: '35%' },
            { top: '80%', left: '55%' },
            { top: '80%', left: '75%' }
        ];
        
        intersections.forEach((point, index) => {
            const dot = document.createElement('div');
            dot.style.position = 'absolute';
            dot.style.top = point.top;
            dot.style.left = point.left;
            dot.style.width = '2px';
            dot.style.height = '2px';
            dot.style.background = 'var(--text-muted)';
            dot.style.borderRadius = '50%';
            dot.style.opacity = '0.1';
            dot.style.animation = `web-shimmer ${8 + index * 0.2}s ease-in-out infinite`;
            dot.style.animationDelay = (index * 0.1) + 's';
            
            webContainer.appendChild(dot);
        });
        
        // Add diagonal web lines
        const diagonals = [
            { top: '10%', left: '10%', width: '30%', height: '1px', transform: 'rotate(45deg)' },
            { top: '30%', right: '10%', width: '25%', height: '1px', transform: 'rotate(-45deg)' },
            { bottom: '30%', left: '20%', width: '35%', height: '1px', transform: 'rotate(30deg)' },
            { bottom: '10%', right: '15%', width: '28%', height: '1px', transform: 'rotate(-30deg)' }
        ];
        
        diagonals.forEach((line, index) => {
            const diagonalLine = document.createElement('div');
            diagonalLine.className = 'web-line';
            Object.assign(diagonalLine.style, line);
            diagonalLine.style.background = 'linear-gradient(90deg, transparent, var(--text-muted), transparent)';
            diagonalLine.style.animationDelay = (index * 0.5) + 's';
            
            webContainer.appendChild(diagonalLine);
        });
    }

    // Navigation setup
    setupNavigation() {
        // Update active nav based on current path
        this.updateActiveNav();
        
        // Setup breadcrumb
        this.updateBreadcrumb();
    }

    updateActiveNav() {
        const navLinks = document.querySelectorAll('.nav-btn');
        const currentPath = window.location.pathname;
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && (currentPath === href || currentPath.startsWith(href + '/'))) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    updateBreadcrumb() {
        const breadcrumb = document.getElementById('breadcrumb');
        if (!breadcrumb) return;

        const path = window.location.pathname;
        const segments = path.split('/').filter(segment => segment);
        
        let breadcrumbHTML = '<a href="/">Home</a>';
        let currentPath = '';
        
        segments.forEach((segment, index) => {
            currentPath += '/' + segment;
            const isLast = index === segments.length - 1;
            const displayName = this.formatSegmentName(segment);
            
            if (isLast) {
                breadcrumbHTML += ` <span class="breadcrumb-separator">></span> <span>${displayName}</span>`;
            } else {
                breadcrumbHTML += ` <span class="breadcrumb-separator">></span> <a href="${currentPath}/">${displayName}</a>`;
            }
        });
        
        breadcrumb.innerHTML = breadcrumbHTML;
    }

    formatSegmentName(segment) {
        return segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
    }

    // Content loading
    async loadContent() {
        const path = window.location.pathname;
        
        if (path.includes('/blogs/') && path.endsWith('.html')) {
            await this.loadMarkdownPost();
        } else if (path.includes('/research/') && path.endsWith('.html')) {
            await this.loadMarkdownPost();
        } else if (path.includes('/projects/') && path.endsWith('.html')) {
            await this.loadMarkdownPost();
        }
    }

    async loadMarkdownPost() {
        const path = window.location.pathname;
        const mdPath = path.replace('.html', '.md');
        
        try {
            const response = await fetch(mdPath);
            if (response.ok) {
                const markdown = await response.text();
                const html = marked.parse(markdown);
                
                const contentContainer = document.getElementById('markdown-content');
                if (contentContainer) {
                    contentContainer.innerHTML = html;
                }
            }
        } catch (error) {
            console.error('Error loading markdown:', error);
        }
    }

    // Utility methods
    static formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WebsiteManager();
});

// Handle smooth scrolling for anchor links
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
});