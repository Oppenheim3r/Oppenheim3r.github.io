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
    switchToCategory('home'); // Ensure home is active on load
});

// GUI Elements Initialization
function initializeGUIElements() {
    createFloatingBinaries();
    createSpiderWebEffect();
}

// Floating Binary Animation
function createFloatingBinaries() {
    const container = document.getElementById('floating-binaries');
    const binaryStrings = [
        '01001000', '01100001', '01100011', '01101011', '01100101', '01110010',
        '11000001', '10101010', '11110000', '00001111', '01010101', '10011001',
        '11001100', '00110011', '10101010', '01010101', '11111111', '00000000'
    ];
    
    function createBinary() {
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
    }
    
    // Create initial binaries
    for (let i = 0; i < 15; i++) {
        setTimeout(() => createBinary(), i * 1000);
    }
    
    // Continue creating binaries
    setInterval(createBinary, 2000);
}

// Spider Web Effect
function createSpiderWebEffect() {
    const webContainer = document.getElementById('spider-web');
    
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

// Navigation functionality
function initializeNavigation() {
    navButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            switchToCategory(category);
        });
    });
}

function switchToCategory(category) {
    // Update active nav button
    navButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === category);
    });
    
    // Update active section
    sections.forEach(section => {
        section.classList.remove('active');
    });

    const targetSection = document.getElementById(category);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    currentCategory = category;
    
    // Load category-specific content
    if (category !== 'home' && category !== 'about' && category !== 'blog-post') {
        loadCategoryPosts(category);
    } else if (category === 'home') {
        loadRecentPosts();
    }
}

// Mobile menu functionality
function setupMobileMenu() {
    const nav = document.getElementById('nav');
    const toggle = document.getElementById('mobile-menu-toggle');
    
    toggle.addEventListener('click', function() {
        nav.classList.toggle('mobile-open');
        const icon = toggle.querySelector('i');
        
        if (nav.classList.contains('mobile-open')) {
            icon.className = 'fas fa-times';
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
}

// Back button functionality
function setupBackButton() {
    backBtn.addEventListener('click', function() {
        if (currentPost && currentPost.category) {
            switchToCategory(currentPost.category);
        } else {
            switchToCategory('home');
        }
    });
}

// Simple markdown file loading without any parsing
async function loadBlogPosts() {
    try {
        blogPosts = await discoverPosts();
        updatePostCounts();
        loadRecentPosts();
    } catch (error) {
        console.error('Error loading blog posts:', error);
        showEmptyState();
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

function updatePostCounts() {
    const counts = {
        offensive: blogPosts.filter(post => post.category === 'offensive').length,
        defensive: blogPosts.filter(post => post.category === 'defensive').length,
        adversary: blogPosts.filter(post => post.category === 'adversary').length
    };
    
    document.getElementById('offensive-count').textContent = counts.offensive;
    document.getElementById('defensive-count').textContent = counts.defensive;
    document.getElementById('adversary-count').textContent = counts.adversary;
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
    
    recentPosts.forEach(post => {
        const postCard = createPostCard(post);
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
        .forEach(post => {
            const postCard = createPostCard(post);
            container.appendChild(postCard);
        });
}

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
    
    return card;
}

async function loadBlogPost(post) {
    currentPost = post;
    
    // Switch to blog post view
    switchToCategory('blog-post');
    
    const container = document.getElementById('post-content');
    container.innerHTML = '<div class="loading">Loading post...</div>';
    
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
        
        // Parse markdown and display as-is
        const htmlContent = marked.parse(content);
        container.innerHTML = htmlContent;
        
        // Scroll to top
        window.scrollTo(0, 0);
        
    } catch (error) {
        console.error('Error loading blog post:', error);
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Error Loading Post</h3>
                <p>Sorry, there was an error loading this blog post. Please try again later.</p>
                <p><small>Error: ${error.message}</small></p>
            </div>
        `;
    }
}

function showEmptyState(container = null, title = 'No posts available', message = 'Check back later for new content!') {
    const emptyState = `
        <div class="empty-state">
            <i class="fas fa-file-alt"></i>
            <h3>${title}</h3>
            <p>${message}</p>
            <div style="margin-top: 20px; padding: 15px; background: rgba(139, 92, 246, 0.1); border-radius: 8px; font-size: 14px; color: var(--text-secondary); border: 1px solid var(--border-color);">
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

// Development helper
console.log('Simple blog system initialized');
console.log('Add .md files to posts/category/ folders to see them appear automatically');

// Handle browser back/forward buttons
window.addEventListener('popstate', function(event) {
    if (event.state && event.state.category) {
        switchToCategory(event.state.category);
    }
});

// Add some smooth scrolling for better UX
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

