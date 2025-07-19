// Blog Configuration
const BLOG_CONFIG = {
    categories: {
        offensive: {
            name: 'Offensive Security',
            icon: 'fas fa-sword',
            description: 'Penetration testing, exploit development, and red team operations'
        },
        defensive: {
            name: 'Defensive Security',
            icon: 'fas fa-shield-alt',
            description: 'Blue team strategies, incident response, and security monitoring'
        },
        adversary: {
            name: 'Adversary Emulation',
            icon: 'fas fa-crosshairs',
            description: 'Threat hunting, adversary simulation, and purple team exercises'
        }
    }
};

// Global state
let blogPosts = [];
let currentCategory = 'home';
let currentPost = null;

// DOM Elements
const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.section');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const backBtn = document.getElementById('back-btn');

// Initialize the blog
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    loadBlogPosts();
    setupMobileMenu();
    setupBackButton();
    initializeGUIElements();
    initializeCyberEffects();
    switchToCategory('home'); // Ensure home is active on load
});

// Enhanced GUI Elements Initialization
function initializeGUIElements() {
    createFloatingBinaries();
    createSpiderWebEffect();
    createMatrixRain();
    createCyberGrid();
    addGlitchEffects();
}

// Initialize Cyber Effects
function initializeCyberEffects() {
    addHolographicText();
    addScanlineEffects();
    addCyberPulse();
    addDataStream();
    addTerminalCursor();
}

// Enhanced Floating Binary Animation
function createFloatingBinaries() {
    const container = document.getElementById('floating-binaries');
    const binaryStrings = [
        '01001000', '01100001', '01100011', '01101011', '01100101', '01110010',
        '11000001', '10101010', '11110000', '00001111', '01010101', '10011001',
        '11001100', '00110011', '10101010', '01010101', '11111111', '00000000',
        '01000011', '01111001', '01100010', '01100101', '01110010', '00110010',
        '00110000', '00110101', '00110000', '01001000', '01100001', '01100011',
        '01101011', '01100101', '01110010', '01010011', '01110000', '01100001',
        '01100011', '01100101', '00110010', '00110000', '00110101', '00110000'
    ];
    
    function createBinary() {
        const binary = document.createElement('div');
        binary.className = 'binary';
        binary.textContent = binaryStrings[Math.floor(Math.random() * binaryStrings.length)];
        binary.style.left = Math.random() * 100 + '%';
        binary.style.animationDelay = Math.random() * 5 + 's';
        binary.style.fontSize = (Math.random() * 0.5 + 0.5) + 'rem';
        
        // Add random cyber colors
        const colors = ['var(--cyber-green)', 'var(--cyber-cyan)', 'var(--cyber-pink)', 'var(--neon-blue)'];
        binary.style.color = colors[Math.floor(Math.random() * colors.length)];
        
        container.appendChild(binary);
        
        // Remove binary after animation
        setTimeout(() => {
            if (binary.parentNode) {
                binary.parentNode.removeChild(binary);
            }
        }, 25000);
    }
    
    // Create initial binaries
    for (let i = 0; i < 20; i++) {
        setTimeout(() => createBinary(), i * 800);
    }
    
    // Continue creating binaries
    setInterval(createBinary, 1500);
}

// Matrix Rain Effect
function createMatrixRain() {
    const matrixContainer = document.createElement('div');
    matrixContainer.className = 'matrix-rain';
    document.body.appendChild(matrixContainer);
    
    const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    function createMatrixColumn() {
        const column = document.createElement('div');
        column.style.position = 'absolute';
        column.style.top = '-100px';
        column.style.left = Math.random() * 100 + '%';
        column.style.color = 'var(--cyber-green)';
        column.style.fontSize = '14px';
        column.style.fontFamily = 'monospace';
        column.style.opacity = '0.3';
        column.style.animation = 'float 8s linear infinite';
        column.style.textShadow = '0 0 5px currentColor';
        
        let text = '';
        for (let i = 0; i < 20; i++) {
            text += matrixChars[Math.floor(Math.random() * matrixChars.length)] + '<br>';
        }
        column.innerHTML = text;
        
        matrixContainer.appendChild(column);
        
        setTimeout(() => {
            if (column.parentNode) {
                column.parentNode.removeChild(column);
            }
        }, 8000);
    }
    
    // Create matrix columns periodically
    setInterval(createMatrixColumn, 3000);
}

// Cyber Grid Effect
function createCyberGrid() {
    const gridContainer = document.createElement('div');
    gridContainer.className = 'cyber-grid';
    document.body.appendChild(gridContainer);
}

// Enhanced Spider Web Effect
function createSpiderWebEffect() {
    const webContainer = document.getElementById('spider-web');
    
    // Add intersection points with enhanced glow
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
        dot.style.width = '3px';
        dot.style.height = '3px';
        dot.style.background = 'var(--cyber-cyan)';
        dot.style.borderRadius = '50%';
        dot.style.opacity = '0.2';
        dot.style.animation = `web-shimmer ${8 + index * 0.2}s ease-in-out infinite`;
        dot.style.animationDelay = (index * 0.1) + 's';
        dot.style.boxShadow = '0 0 10px var(--cyber-cyan)';
        
        webContainer.appendChild(dot);
    });
    
    // Add enhanced diagonal web lines
    const diagonals = [
        { top: '10%', left: '10%', width: '30%', height: '1px', transform: 'rotate(45deg)' },
        { top: '30%', right: '10%', width: '25%', height: '1px', transform: 'rotate(-45deg)' },
        { bottom: '30%', left: '20%', width: '35%', height: '1px', transform: 'rotate(30deg)' },
        { bottom: '10%', right: '15%', width: '28%', height: '1px', transform: 'rotate(-30deg)' },
        { top: '50%', left: '5%', width: '40%', height: '1px', transform: 'rotate(60deg)' },
        { top: '70%', right: '5%', width: '35%', height: '1px', transform: 'rotate(-60deg)' }
    ];
    
    diagonals.forEach((line, index) => {
        const diagonalLine = document.createElement('div');
        diagonalLine.className = 'web-line';
        Object.assign(diagonalLine.style, line);
        diagonalLine.style.background = 'linear-gradient(90deg, transparent, var(--cyber-cyan), transparent)';
        diagonalLine.style.animationDelay = (index * 0.5) + 's';
        diagonalLine.style.boxShadow = '0 0 5px var(--cyber-cyan)';
        
        webContainer.appendChild(diagonalLine);
    });
}

// Add Glitch Effects to Text Elements
function addGlitchEffects() {
    const glitchElements = document.querySelectorAll('.logo h1, .hero-content h2');
    
    glitchElements.forEach(element => {
        element.classList.add('glitch');
        element.setAttribute('data-text', element.textContent);
        
        // Random glitch trigger
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance every interval
                element.style.animation = 'none';
                setTimeout(() => {
                    element.style.animation = '';
                }, 100);
            }
        }, 3000);
    });
}

// Add Holographic Text Effect
function addHolographicText() {
    const holoElements = document.querySelectorAll('.stat-number, .expertise-card i');
    
    holoElements.forEach(element => {
        element.classList.add('holographic');
    });
}

// Add Scanline Effects
function addScanlineEffects() {
    const scanlineElements = document.querySelectorAll('.code-animation, .post-content');
    
    scanlineElements.forEach(element => {
        element.classList.add('scanlines');
    });
}

// Add Cyber Pulse Effect
function addCyberPulse() {
    const pulseElements = document.querySelectorAll('.nav-btn.active, .skill-tag');
    
    pulseElements.forEach(element => {
        setInterval(() => {
            element.style.boxShadow = '0 0 30px var(--cyber-cyan)';
            setTimeout(() => {
                element.style.boxShadow = '';
            }, 200);
        }, 2000 + Math.random() * 3000);
    });
}

// Add Data Stream Effect
function addDataStream() {
    const streamContainer = document.createElement('div');
    streamContainer.style.position = 'fixed';
    streamContainer.style.top = '0';
    streamContainer.style.right = '0';
    streamContainer.style.width = '2px';
    streamContainer.style.height = '100%';
    streamContainer.style.background = 'linear-gradient(to bottom, transparent, var(--cyber-cyan), transparent)';
    streamContainer.style.opacity = '0.3';
    streamContainer.style.animation = 'dataStream 3s ease-in-out infinite';
    streamContainer.style.pointerEvents = 'none';
    streamContainer.style.zIndex = '1';
    
    document.body.appendChild(streamContainer);
    
    // Add CSS animation for data stream
    const style = document.createElement('style');
    style.textContent = `
        @keyframes dataStream {
            0%, 100% { transform: translateY(-100%); opacity: 0; }
            50% { transform: translateY(0); opacity: 0.3; }
        }
    `;
    document.head.appendChild(style);
}

// Add Terminal Cursor Effect
function addTerminalCursor() {
    const cursorElements = document.querySelectorAll('.intro-subtitle, .category-header p');
    
    cursorElements.forEach(element => {
        const cursor = document.createElement('span');
        cursor.textContent = '█';
        cursor.style.color = 'var(--cyber-cyan)';
        cursor.style.animation = 'cursor 1s ease-in-out infinite';
        cursor.style.marginLeft = '2px';
        
        element.appendChild(cursor);
    });
}

// Navigation functionality
function initializeNavigation() {
    navButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            switchToCategory(category);
            
            // Add cyber click effect
            this.style.transform = 'scale(0.95)';
            this.style.boxShadow = '0 0 20px var(--cyber-cyan)';
            setTimeout(() => {
                this.style.transform = '';
                this.style.boxShadow = '';
            }, 150);
        });
        
        // Add hover sound effect simulation
        btn.addEventListener('mouseenter', function() {
            this.style.textShadow = '0 0 15px var(--cyber-cyan)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.textShadow = '';
        });
    });
}

function switchToCategory(category) {
    // Update active nav button with enhanced effects
    navButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === category);
        if (btn.dataset.category === category) {
            btn.style.boxShadow = '0 0 25px var(--cyber-cyan)';
        } else {
            btn.style.boxShadow = '';
        }
    });
    
    // Update active section with fade effect
    sections.forEach(section => {
        section.classList.remove('active');
        section.style.opacity = '0';
    });

    const targetSection = document.getElementById(category);
    if (targetSection) {
        setTimeout(() => {
            targetSection.classList.add('active');
            targetSection.style.opacity = '1';
        }, 100);
    }
    
    currentCategory = category;
    
    // Load category-specific content
    if (category !== 'home' && category !== 'about' && category !== 'blog-post') {
        loadCategoryPosts(category);
    } else if (category === 'home') {
        loadRecentPosts();
    }
    
    // Add category switch effect
    createCategorySwitchEffect();
}

// Create Category Switch Effect
function createCategorySwitchEffect() {
    const effect = document.createElement('div');
    effect.style.position = 'fixed';
    effect.style.top = '0';
    effect.style.left = '0';
    effect.style.width = '100%';
    effect.style.height = '100%';
    effect.style.background = 'linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.1), transparent)';
    effect.style.pointerEvents = 'none';
    effect.style.zIndex = '9999';
    effect.style.animation = 'categorySwitch 0.5s ease-out';
    
    document.body.appendChild(effect);
    
    setTimeout(() => {
        document.body.removeChild(effect);
    }, 500);
    
    // Add CSS animation
    if (!document.querySelector('#category-switch-style')) {
        const style = document.createElement('style');
        style.id = 'category-switch-style';
        style.textContent = `
            @keyframes categorySwitch {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Enhanced Mobile menu functionality
function setupMobileMenu() {
    const nav = document.getElementById('nav');
    const toggle = document.getElementById('mobile-menu-toggle');
    
    toggle.addEventListener('click', function() {
        nav.classList.toggle('mobile-open');
        const icon = toggle.querySelector('i');
        
        // Add cyber transformation effect
        this.style.transform = 'scale(0.9)';
        this.style.boxShadow = '0 0 20px var(--cyber-cyan)';
        
        setTimeout(() => {
            this.style.transform = '';
            this.style.boxShadow = '';
        }, 150);
        
        if (nav.classList.contains('mobile-open')) {
            icon.className = 'fas fa-times';
            nav.style.animation = 'mobileMenuSlide 0.3s ease-out';
        } else {
            icon.className = 'fas fa-bars';
        }
    });
    
    // Close mobile menu when clicking nav items
    navButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            nav.classList.remove('mobile-open');
            const icon = toggle.querySelector('i');
            icon.className = 'fas fa-bars';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!nav.contains(event.target) && !toggle.contains(event.target)) {
            nav.classList.remove('mobile-open');
            const icon = toggle.querySelector('i');
            icon.className = 'fas fa-bars';
        }
    });
    
    // Add mobile menu animation
    if (!document.querySelector('#mobile-menu-style')) {
        const style = document.createElement('style');
        style.id = 'mobile-menu-style';
        style.textContent = `
            @keyframes mobileMenuSlide {
                0% { transform: translateY(-20px); opacity: 0; }
                100% { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Enhanced Back button functionality
function setupBackButton() {
    backBtn.addEventListener('click', function() {
        // Add cyber click effect
        this.style.transform = 'translateX(-10px) scale(0.95)';
        this.style.boxShadow = '0 0 25px var(--cyber-cyan)';
        
        setTimeout(() => {
            this.style.transform = '';
            this.style.boxShadow = '';
            
            if (currentPost && currentPost.category) {
                switchToCategory(currentPost.category);
            } else {
                switchToCategory('home');
            }
        }, 150);
    });
}

// Enhanced blog post loading
async function loadBlogPosts() {
    try {
        // Add loading effect
        showCyberLoading();
        
        blogPosts = await discoverPosts();
        updatePostCounts();
        loadRecentPosts();
        
        hideCyberLoading();
    } catch (error) {
        console.error('Error loading blog posts:', error);
        hideCyberLoading();
        showEmptyState();
    }
}

// Cyber Loading Effect
function showCyberLoading() {
    const loader = document.createElement('div');
    loader.id = 'cyber-loader';
    loader.style.position = 'fixed';
    loader.style.top = '50%';
    loader.style.left = '50%';
    loader.style.transform = 'translate(-50%, -50%)';
    loader.style.zIndex = '10000';
    loader.style.color = 'var(--cyber-cyan)';
    loader.style.fontSize = '2rem';
    loader.style.textAlign = 'center';
    loader.innerHTML = `
        <div style="margin-bottom: 1rem;">INITIALIZING...</div>
        <div style="font-family: monospace; font-size: 1rem;">
            <span style="animation: blink 1s infinite;">█</span>
            <span style="animation: blink 1s infinite 0.2s;">█</span>
            <span style="animation: blink 1s infinite 0.4s;">█</span>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    // Add blink animation
    if (!document.querySelector('#blink-style')) {
        const style = document.createElement('style');
        style.id = 'blink-style';
        style.textContent = `
            @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

function hideCyberLoading() {
    const loader = document.getElementById('cyber-loader');
    if (loader) {
        loader.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => {
            document.body.removeChild(loader);
        }, 500);
    }
    
    // Add fade out animation
    if (!document.querySelector('#fadeout-style')) {
        const style = document.createElement('style');
        style.id = 'fadeout-style';
        style.textContent = `
            @keyframes fadeOut {
                0% { opacity: 1; }
                100% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

async function discoverPosts() {
    const categories = ['offensive', 'defensive', 'adversary'];
    const discoveredPosts = [];
    
    for (const category of categories) {
        try {
            const posts = await discoverCategoryPosts(category);
            discoveredPosts.push(...posts);
        } catch (error) {
            console.warn(`Could not discover posts for category: ${category}`, error);
        }
    }
    
    return discoveredPosts;
}

async function discoverCategoryPosts(category) {
    const posts = [];
    
    // Known files in the repository
    const knownFiles = {
        'offensive': ['advanced-buffer-overflow.md'],
        'defensive': ['effective-siem-rules.md'],
        'adversary': ['lateralmovemtn.md']
    };
    
    const files = knownFiles[category] || [];
    
    for (const filename of files) {
        try {
            const filepath = `posts/${category}/${filename}`;
            const response = await fetch(filepath);
            
            if (response.ok) {
                const content = await response.text();
                
                // Simple post object - just use filename as title
                const post = {
                    id: filename.replace(/\.md$/, '').toLowerCase().replace(/[^a-z0-9]/g, '-'),
                    title: filename.replace(/\.md$/, '').replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                    category: category,
                    date: new Date().toISOString().split('T')[0],
                    excerpt: 'Click to read the full content.',
                    filename: filepath,
                    content: content
                };
                
                posts.push(post);
            }
        } catch (error) {
            console.warn(`Could not load file: posts/${category}/${filename}`, error);
        }
    }
    
    return posts;
}

// Enhanced post count update with animation
function updatePostCounts() {
    const counts = {
        offensive: blogPosts.filter(post => post.category === 'offensive').length,
        defensive: blogPosts.filter(post => post.category === 'defensive').length,
        adversary: blogPosts.filter(post => post.category === 'adversary').length
    };
    
    // Animate count updates
    Object.keys(counts).forEach(category => {
        const element = document.getElementById(`${category}-count`);
        if (element) {
            animateCounter(element, counts[category]);
        }
    });
}

// Counter Animation
function animateCounter(element, targetValue) {
    const startValue = 0;
    const duration = 2000;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = Math.floor(startValue + (targetValue - startValue) * progress);
        element.textContent = currentValue;
        
        // Add glow effect during animation
        element.style.textShadow = `0 0 ${20 * progress}px var(--cyber-cyan)`;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.style.textShadow = '0 0 20px var(--cyber-cyan)';
        }
    }
    
    requestAnimationFrame(updateCounter);
}

function loadRecentPosts() {
    const recentPosts = blogPosts
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 6);
    
    const container = document.getElementById('recent-posts');
    container.innerHTML = '';
    
    if (recentPosts.length === 0) {
        showEmptyState(container, 'No posts yet', 'Add .md files to the posts/ directory to see them here!');
        return;
    }
    
    recentPosts.forEach((post, index) => {
        const postCard = createPostCard(post);
        postCard.style.animationDelay = (index * 0.1) + 's';
        container.appendChild(postCard);
    });
}

function loadCategoryPosts(category) {
    const categoryPosts = blogPosts.filter(post => post.category === category);
    const container = document.getElementById(`${category}-posts`);
    container.innerHTML = '';
    
    if (categoryPosts.length === 0) {
        showEmptyState(container, `No ${BLOG_CONFIG.categories[category].name} posts yet`, 'Add .md files to this category folder to see them here!');
        return;
    }
    
    categoryPosts
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .forEach((post, index) => {
            const postCard = createPostCard(post);
            postCard.style.animationDelay = (index * 0.1) + 's';
            container.appendChild(postCard);
        });
}

// Enhanced post card creation
function createPostCard(post) {
    const card = document.createElement('div');
    card.className = 'post-card';
    card.onclick = () => loadBlogPost(post);
    
    const categoryName = BLOG_CONFIG.categories[post.category]?.name || post.category;
    const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    card.innerHTML = `
        <div class="post-meta">
            <span class="post-category">${categoryName}</span>
            <span>${formattedDate}</span>
        </div>
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
    `;
    
    // Add hover effects
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
        this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 30px rgba(0, 255, 255, 0.3)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
    });
    
    return card;
}

// Enhanced blog post loading
async function loadBlogPost(post) {
    currentPost = post;
    
    // Switch to blog post view with effect
    switchToCategory('blog-post');
    
    const container = document.getElementById('post-content');
    container.innerHTML = '<div class="loading">LOADING POST...</div>';
    
    try {
        let content;
        
        if (post.content) {
            // Use cached content if available
            content = post.content;
        } else {
            // Load from file
            const response = await fetch(post.filename);
            if (response.ok) {
                content = await response.text();
            } else {
                throw new Error(`Could not load post: ${post.filename}`);
            }
        }
        
        // Parse markdown and display with enhanced styling
        const htmlContent = marked.parse(content);
        container.innerHTML = htmlContent;
        
        // Add cyber effects to post content
        addPostCyberEffects(container);
        
        // Scroll to top with smooth animation
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
    } catch (error) {
        console.error('Error loading blog post:', error);
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>ERROR LOADING POST</h3>
                <p>Sorry, there was an error loading this blog post. Please try again later.</p>
                <p><small>Error: ${error.message}</small></p>
            </div>
        `;
    }
}

// Add Cyber Effects to Post Content
function addPostCyberEffects(container) {
    // Add glow to code blocks
    const codeBlocks = container.querySelectorAll('code, pre');
    codeBlocks.forEach(block => {
        block.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.2)';
    });
    
    // Add cyber styling to headings
    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(heading => {
        heading.style.textShadow = '0 0 10px rgba(0, 255, 255, 0.3)';
    });
    
    // Add hover effects to links
    const links = container.querySelectorAll('a');
    links.forEach(link => {
        link.style.color = 'var(--cyber-cyan)';
        link.style.textDecoration = 'none';
        link.style.borderBottom = '1px solid var(--cyber-cyan)';
        link.style.transition = 'all 0.3s ease';
        
        link.addEventListener('mouseenter', function() {
            this.style.textShadow = '0 0 10px var(--cyber-cyan)';
            this.style.borderBottomWidth = '2px';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.textShadow = '';
            this.style.borderBottomWidth = '1px';
        });
    });
}

function showEmptyState(container = null, title = 'No posts available', message = 'Check back later for new content!') {
    const emptyState = `
        <div class="empty-state">
            <i class="fas fa-file-alt"></i>
            <h3>${title}</h3>
            <p>${message}</p>
            <div style="margin-top: 20px; padding: 15px; background: rgba(139, 92, 246, 0.1); border-radius: 8px; font-size: 14px; color: var(--text-secondary); border: 1px solid var(--border-color); box-shadow: 0 0 15px rgba(0, 255, 255, 0.1);">
                <strong>Simple Loading:</strong> This blog loads .md files directly from the posts/ directory. 
                Just add your markdown files and they will be displayed exactly as written - no special formatting or metadata required!
            </div>
        </div>
    `;
    
    if (container) {
        container.innerHTML = emptyState;
    } else {
        document.getElementById('recent-posts').innerHTML = emptyState;
    }
}

// Enhanced development helper
console.log('%c🚀 CYBER BLOG SYSTEM INITIALIZED 🚀', 'color: #00ffff; font-size: 16px; font-weight: bold; text-shadow: 0 0 10px #00ffff;');
console.log('%cAdd .md files to posts/category/ folders to see them appear automatically', 'color: #00ff41; font-size: 12px;');

// Handle browser back/forward buttons
window.addEventListener('popstate', function(event) {
    if (event.state && event.state.category) {
        switchToCategory(event.state.category);
    }
});

// Enhanced smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add Particle System
function createParticleSystem() {
    const particleContainer = document.createElement('div');
    particleContainer.style.position = 'fixed';
    particleContainer.style.top = '0';
    particleContainer.style.left = '0';
    particleContainer.style.width = '100%';
    particleContainer.style.height = '100%';
    particleContainer.style.pointerEvents = 'none';
    particleContainer.style.zIndex = '0';
    document.body.appendChild(particleContainer);
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = 'var(--cyber-cyan)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.opacity = '0.5';
        particle.style.animation = 'particleFloat 10s linear infinite';
        particle.style.boxShadow = '0 0 5px var(--cyber-cyan)';
        
        particleContainer.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 10000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 2000);
    
    // Add particle animation
    if (!document.querySelector('#particle-style')) {
        const style = document.createElement('style');
        style.id = 'particle-style';
        style.textContent = `
            @keyframes particleFloat {
                0% { transform: translate(0, 0) scale(1); opacity: 0; }
                10% { opacity: 0.5; }
                90% { opacity: 0.5; }
                100% { transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize particle system
setTimeout(createParticleSystem, 2000);

// Add Cyber Sound Effects (Visual)
function addCyberSoundEffects() {
    // Add visual feedback for interactions
    document.addEventListener('click', function(e) {
        if (e.target.matches('.nav-btn, .post-card, .back-btn, .skill-tag')) {
            createClickEffect(e.target);
        }
    });
}

function createClickEffect(element) {
    const effect = document.createElement('div');
    effect.style.position = 'absolute';
    effect.style.width = '20px';
    effect.style.height = '20px';
    effect.style.border = '2px solid var(--cyber-cyan)';
    effect.style.borderRadius = '50%';
    effect.style.pointerEvents = 'none';
    effect.style.zIndex = '9999';
    effect.style.animation = 'clickRipple 0.6s ease-out';
    
    const rect = element.getBoundingClientRect();
    effect.style.left = (rect.left + rect.width / 2 - 10) + 'px';
    effect.style.top = (rect.top + rect.height / 2 - 10) + 'px';
    
    document.body.appendChild(effect);
    
    setTimeout(() => {
        document.body.removeChild(effect);
    }, 600);
    
    // Add click ripple animation
    if (!document.querySelector('#click-ripple-style')) {
        const style = document.createElement('style');
        style.id = 'click-ripple-style';
        style.textContent = `
            @keyframes clickRipple {
                0% { transform: scale(1); opacity: 1; }
                100% { transform: scale(3); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize cyber sound effects
addCyberSoundEffects();

// Add Typing Effect for Dynamic Text
function addTypingEffect(element, text, speed = 50) {
    element.textContent = '';
    let i = 0;
    
    function typeChar() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeChar, speed);
        }
    }
    
    typeChar();
}

// Add Performance Monitoring
function addPerformanceMonitoring() {
    const monitor = document.createElement('div');
    monitor.style.position = 'fixed';
    monitor.style.bottom = '10px';
    monitor.style.right = '10px';
    monitor.style.background = 'rgba(0, 0, 0, 0.8)';
    monitor.style.color = 'var(--cyber-green)';
    monitor.style.padding = '5px 10px';
    monitor.style.borderRadius = '5px';
    monitor.style.fontFamily = 'monospace';
    monitor.style.fontSize = '12px';
    monitor.style.zIndex = '10000';
    monitor.style.border = '1px solid var(--cyber-green)';
    monitor.style.boxShadow = '0 0 10px var(--cyber-green)';
    monitor.style.opacity = '0.7';
    
    function updatePerformance() {
        const memory = performance.memory ? `${Math.round(performance.memory.usedJSHeapSize / 1048576)}MB` : 'N/A';
        const timing = performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        
        monitor.innerHTML = `
            MEM: ${memory}<br>
            LOAD: ${loadTime}ms<br>
            FPS: ${Math.round(1000 / (performance.now() - lastFrame))}
        `;
    }
    
    let lastFrame = performance.now();
    function frame() {
        const now = performance.now();
        lastFrame = now;
        requestAnimationFrame(frame);
    }
    
    document.body.appendChild(monitor);
    setInterval(updatePerformance, 1000);
    requestAnimationFrame(frame);
    
    // Hide monitor on mobile
    if (window.innerWidth < 768) {
        monitor.style.display = 'none';
    }
}

// Initialize performance monitoring in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    addPerformanceMonitoring();
}

