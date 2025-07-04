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

// Blog post loading and management
async function loadBlogPosts() {
    try {
        // In a real implementation, this would fetch from a posts.json file
        // For now, we'll use sample data and check for actual markdown files
        blogPosts = await fetchBlogPosts();
        updatePostCounts();
        loadRecentPosts();
    } catch (error) {
        console.error('Error loading blog posts:', error);
        showEmptyState();
    }
}

async function fetchBlogPosts() {
    // This function would typically fetch from a posts.json file
    // For demonstration, we'll return sample posts and check for actual files
    const samplePosts = [
        {
            id: 'sample-offensive-1',
            title: 'Advanced Buffer Overflow Techniques',
            category: 'offensive',
            date: '2025-01-15',
            excerpt: 'Exploring modern buffer overflow exploitation techniques and bypass methods for contemporary security mechanisms.',
            tags: ['buffer-overflow', 'exploitation', 'binary-exploitation'],
            filename: 'posts/offensive/advanced-buffer-overflow.md'
        },
        {
            id: 'sample-defensive-1',
            title: 'Building Effective SIEM Rules',
            category: 'defensive',
            date: '2025-01-10',
            excerpt: 'A comprehensive guide to creating and tuning SIEM rules for effective threat detection and reduced false positives.',
            tags: ['siem', 'detection', 'blue-team'],
            filename: 'posts/defensive/effective-siem-rules.md'
        },
        {
            id: 'sample-adversary-1',
            title: 'MITRE ATT&CK Framework Implementation',
            category: 'adversary',
            date: '2025-01-05',
            excerpt: 'Implementing the MITRE ATT&CK framework for comprehensive adversary emulation and threat hunting exercises.',
            tags: ['mitre-attack', 'threat-hunting', 'purple-team'],
            filename: 'posts/adversary/mitre-attack-implementation.md'
        }
    ];
    
    // Check for actual posts directory and files
    const actualPosts = await checkForActualPosts();
    return [...actualPosts, ...samplePosts];
}

async function checkForActualPosts() {
    const posts = [];
    const categories = ['offensive', 'defensive', 'adversary'];
    
    for (const category of categories) {
        try {
            // This would check for actual markdown files in the posts directory
            // For now, we'll return empty array as files don't exist yet
            const response = await fetch(`posts/${category}/`);
            if (response.ok) {
                // Parse directory listing or posts.json for this category
            }
        } catch (error) {
            // Directory doesn't exist yet, which is expected for a new blog
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
        showEmptyState(container, 'No posts yet', 'Start by adding your first blog post!');
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
        showEmptyState(container, `No ${BLOG_CONFIG.categories[category].name} posts yet`, 'Add your first post to this category!');
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
    container.innerHTML = '<div class="loading"></div>';
    
    try {
        // Try to load the actual markdown file
        const response = await fetch(post.filename);
        let content;
        
        if (response.ok) {
            content = await response.text();
        } else {
            // If file doesn't exist, show sample content
            content = generateSampleContent(post);
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
            </div>
        `;
    }
}

function generateSampleContent(post) {
    return `# ${post.title}

*Published on ${new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}*

${post.excerpt}

## Introduction

This is a sample blog post to demonstrate the markdown rendering capabilities of your cybersecurity blog. Replace this content with your actual blog post by creating a markdown file at \`${post.filename}\`.

## Getting Started

To add your own content:

1. Create the directory structure: \`posts/${post.category}/\`
2. Add your markdown file: \`${post.filename}\`
3. Update the blog posts configuration if needed

## Code Examples

Here's how you can include code in your posts:

\`\`\`bash
# Example command
nmap -sS -O target.com
\`\`\`

\`\`\`python
# Python example
def exploit_function():
    payload = "A" * 100
    return payload
\`\`\`

## Conclusion

Your blog is ready to host amazing cybersecurity content! Start writing your first real post by replacing this sample content.

---

*Tags: ${post.tags.join(', ')}*`;
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
        document.getElementById('recent-posts').innerHTML = emptyState;
    }
}

// Utility functions for adding new posts
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

// Export functions for external use (if needed)
window.blogFunctions = {
    addNewPost,
    loadBlogPosts,
    switchToCategory
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


