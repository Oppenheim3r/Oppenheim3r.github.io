// Debug script to test the website functionality
console.log('Debug script loaded');

// Test path detection
const path = window.location.pathname;
console.log('Current path:', path);

// Test data.json loading
function getDataJsonPath() {
    const path = window.location.pathname;
    const segments = path.split('/').filter(segment => segment);
    
    // Calculate the depth from root
    let depth = 0;
    if (segments.length > 0) {
        depth = segments.length;
    }
    
    // Build the relative path
    if (depth === 0) {
        return './data.json';
    } else {
        return '../'.repeat(depth) + 'data.json';
    }
}

const dataPath = getDataJsonPath();
console.log('Data JSON path:', dataPath);

// Test fetching data.json
fetch(dataPath)
    .then(response => {
        console.log('Response status:', response.status);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Data loaded successfully:', data);
        console.log('Offensive posts:', data.blogs.offensive.length);
        console.log('Research posts:', data.research.length);
        
        // Test if containers exist
        const offensiveContainer = document.getElementById('offensive-posts');
        const researchContainer = document.getElementById('research-posts');
        console.log('Offensive container found:', !!offensiveContainer);
        console.log('Research container found:', !!researchContainer);
    })
    .catch(error => {
        console.error('Error loading data:', error);
    });

// Test path matching
console.log('Path includes blogs/offensive:', path.includes('blogs/offensive'));
console.log('Path includes research:', path.includes('research'));
console.log('Path ends with research/:', path.endsWith('research/'));
console.log('Path ends with research/index.html:', path.endsWith('research/index.html'));