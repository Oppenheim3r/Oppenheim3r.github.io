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
    switchToCategory('home'); // Ensure home is active on load
});

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
    mobileMenuToggle.addEventListener('click', function() {
        const nav = document.querySelector('.nav');
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
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

// YAML frontmatter parser
function parseFrontmatter(content) {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);
    
    if (!match) {
        return { frontmatter: {}, content: content };
    }
    
    const frontmatterText = match[1];
    const markdownContent = match[2];
    
    // Simple YAML parser for our specific use case
    const frontmatter = {};
    const lines = frontmatterText.split('\n');
    
    for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine || trimmedLine.startsWith('#')) continue;
        
        const colonIndex = trimmedLine.indexOf(':');
        if (colonIndex === -1) continue;
        
        const key = trimmedLine.substring(0, colonIndex).trim();
        let value = trimmedLine.substring(colonIndex + 1).trim();
        
        // Handle arrays (tags)
        if (value.startsWith('[') && value.endsWith(']')) {
            value = value.slice(1, -1).split(',').map(item => item.trim().replace(/['"]/g, ''));
        } else {
            // Remove quotes if present
            value = value.replace(/^['"]|['"]$/g, '');
        }
        
        frontmatter[key] = value;
    }
    
    return { frontmatter, content: markdownContent };
}

// Dynamic post discovery and loading
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
            // Try to get directory listing or use known files
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
    
    // Known files in the repository (we'll scan these)
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
                const { frontmatter, content: markdownContent } = parseFrontmatter(content);
                
                // Create post object from frontmatter
                if (frontmatter.id && frontmatter.title) {
                    const post = {
                        id: frontmatter.id,
                        title: frontmatter.title,
                        category: frontmatter.category || category,
                        date: frontmatter.date || new Date().toISOString().split('T')[0],
                        excerpt: frontmatter.excerpt || 'No excerpt available.',
                        tags: frontmatter.tags || [],
                        author: frontmatter.author || 'Husam Gameel (Oppenheim3r)',
                        filename: filepath,
                        content: markdownContent
                    };
                    
                    posts.push(post);
                }
            }
        } catch (error) {
            console.warn(`Could not load file: posts/${category}/${filename}`, error);
        }
    }
    
    return posts;
}

// Enhanced post discovery for future extensibility
async function scanDirectoryForPosts(category) {
    // This function would be used if we had a server-side directory listing
    // For now, we'll use the known files approach
    
    // In a real implementation, this might call an API endpoint that lists files:
    // const response = await fetch(`/api/posts/${category}`);
    // const files = await response.json();
    
    return [];
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
        showEmptyState(container, 'No posts yet', 'Start by adding your first blog post following the frontmatter standard!');
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
        showEmptyState(container, `No ${BLOG_CONFIG.categories[category].name} posts yet`, 'Add your first post to this category following the frontmatter standard!');
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
        <div class="post-tags">
            ${post.tags.map(tag => `<span class="post-tag">${tag}</span>`).join('')}
        </div>
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
                const fullContent = await response.text();
                const { content: markdownContent } = parseFrontmatter(fullContent);
                content = markdownContent;
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
            <div style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px; font-size: 14px; color: #666;">
                <strong>For developers:</strong> Add new posts by creating .md files in the posts/ directory with proper YAML frontmatter. 
                See POST_STANDARD.md for the required format.
            </div>
        </div>
    `;
    
    if (container) {
        container.innerHTML = emptyState;
    } else {
        document.getElementById('recent-posts').innerHTML = emptyState;
    }
}

// Utility functions for adding new posts programmatically
function addNewPost(postData) {
    // This function can be used to programmatically add new posts
    blogPosts.push(postData);
    updatePostCounts();
    
    if (currentCategory === 'home') {
        loadRecentPosts();
    } else if (currentCategory === postData.category) {
        loadCategoryPosts(currentCategory);
    }
}

// Enhanced post discovery for development
async function refreshPosts() {
    console.log('Refreshing posts...');
    await loadBlogPosts();
    console.log(`Loaded ${blogPosts.length} posts:`, blogPosts);
}

// Export functions for external use (if needed)
window.blogFunctions = {
    addNewPost,
    loadBlogPosts,
    switchToCategory,
    refreshPosts,
    parseFrontmatter
};

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

// Development helper: Log discovered posts
console.log('Blog system initialized with dynamic post discovery');
console.log('Use blogFunctions.refreshPosts() to reload posts');
console.log('Use blogFunctions.parseFrontmatter(content) to test frontmatter parsing');

