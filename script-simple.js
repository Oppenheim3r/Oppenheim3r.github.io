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
        }
    }
};

// ===== ADD YOUR NEW FILES HERE =====
// When you upload a new .md file to posts_unified/, just add its filename to this list
const POST_FILES = [
    'effective-siem-rules.md',
    'advanced-buffer-overflow.md'
    // Add new files here like: 'your-new-post.md',
];
// ===================================

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
    switchToCategory('home');
});

// GUI Elements Initialization
function initializeGUIElements() {
    createSpiderWebEffect();
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

// Load blog posts from the file list
async function loadBlogPosts() {
    try {
        blogPosts = [];
        
        for (const filename of POST_FILES) {
            try {
                const filepath = `posts_unified/${filename}`;
                const response = await fetch(filepath);
                
                if (response.ok) {
                    const content = await response.text();
                    
                    // Determine category from filename or content
                    let category = 'defensive'; // default
                    if (filename.toLowerCase().includes('offensive') || 
                        filename.toLowerCase().includes('attack') ||
                        filename.toLowerCase().includes('exploit') ||
                        filename.toLowerCase().includes('penetration') ||
                        content.toLowerCase().includes('offensive security')) {
                        category = 'offensive';
                    }
                    
                    // Extract title from markdown
                    const lines = content.split('\n');
                    let title = filename.replace(/\.md$/, '').replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                    for (const line of lines) {
                        if (line.startsWith('# ')) {
                            title = line.substring(2).trim();
                            break;
                        }
                    }
                    
                    // Create excerpt
                    const contentLines = lines.filter(line => line.trim() && !line.startsWith('#') && !line.startsWith('*'));
                    let excerpt = 'Click to read the full content.';
                    if (contentLines.length > 0) {
                        excerpt = contentLines[0].substring(0, 150) + (contentLines[0].length > 150 ? '...' : '');
                    }
                    
                    // Extract date from content or use current date
                    let date = new Date().toISOString().split('T')[0];
                    const dateMatch = content.match(/\*Published on ([^*]+)\*/);
                    if (dateMatch) {
                        const extractedDate = new Date(dateMatch[1]);
                        if (!isNaN(extractedDate)) {
                            date = extractedDate.toISOString().split('T')[0];
                        }
                    }
                    
                    const post = {
                        id: filename.replace(/\.md$/, '').toLowerCase().replace(/[^a-z0-9]/g, '-'),
                        title: title,
                        category: category,
                        date: date,
                        excerpt: excerpt,
                        filename: filepath,
                        content: content
                    };
                    
                    blogPosts.push(post);
                }
            } catch (error) {
                console.warn(`Could not load file: ${filename}`, error);
            }
        }
        
        updatePostCounts();
        loadRecentPosts();
    } catch (error) {
        console.error('Error loading blog posts:', error);
        showEmptyState();
    }
}

function updatePostCounts() {
    const counts = {
        offensive: blogPosts.filter(post => post.category === 'offensive').length,
        defensive: blogPosts.filter(post => post.category === 'defensive').length
    };
    
    const offensiveCountEl = document.getElementById('offensive-count');
    const defensiveCountEl = document.getElementById('defensive-count');
    
    if (offensiveCountEl) offensiveCountEl.textContent = counts.offensive;
    if (defensiveCountEl) defensiveCountEl.textContent = counts.defensive;
}

function loadRecentPosts() {
    const recentPosts = blogPosts
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 6);
    
    const container = document.getElementById('recent-posts');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (recentPosts.length === 0) {
        showEmptyState(container, 'No posts yet', 'Add .md files to the posts_unified/ directory and update the POST_FILES list in script-simple.js!');
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
    if (!container) return;
    
    container.innerHTML = '';
    
    if (categoryPosts.length === 0) {
        showEmptyState(container, `No ${BLOG_CONFIG.categories[category].name} posts yet`, `Add .md files to the posts_unified/ directory and update the POST_FILES list in script-simple.js!`);
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
        let content = post.content;
        
        if (!content) {
            // Load from file if not cached
            const response = await fetch(post.filename);
            if (response.ok) {
                content = await response.text();
            } else {
                throw new Error(`Could not load post: ${post.filename}`);
            }
        }
        
        // Parse markdown and display
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
        </div>
    `;
    
    if (container) {
        container.innerHTML = emptyState;
    } else {
        // Fallback for general empty state
        const mainContent = document.querySelector('.main');
        if (mainContent) {
            mainContent.innerHTML = emptyState;
        }
    }
}

