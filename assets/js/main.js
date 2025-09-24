// Site functionality and dynamic content loader for single-page application

// Mobile menu toggle functionality
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const nav = document.getElementById('nav');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('mobile-open');
        });
    }
}

// Function to show different sections
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show the requested section
    const requestedSection = document.getElementById(sectionId);
    if (requestedSection) {
        requestedSection.classList.add('active');
        
        // Update active nav button
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Find the button that triggered this and make it active
        const buttons = document.querySelectorAll('.nav-btn');
        for (let btn of buttons) {
            if (btn.onclick.toString().includes(`showSection('${sectionId}')`)) {
                btn.classList.add('active');
                break;
            }
        }
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Function to load markdown files and convert them to HTML
async function loadMarkdownContent(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const markdownText = await response.text();
        
        // If marked.js is available, use it for conversion
        if (typeof marked !== 'undefined') {
            return marked.parse(markdownText);
        } else {
            // Fallback: simple conversion for basic markdown elements
            return convertMarkdownToHtml(markdownText);
        }
    } catch (error) {
        console.error('Error loading markdown content:', error);
        return '<div class="error">Failed to load content</div>';
    }
}

// Simple markdown to HTML conversion function (fallback)
function convertMarkdownToHtml(md) {
    let html = md;
    
    // Convert headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // Convert bold and italic
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Convert links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    
    // Convert images
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');
    
    // Convert paragraphs
    html = html.split(/\n\s*\n/).map(p => `<p>${p.trim()}</p>`).join('');
    
    // Convert line breaks
    html = html.replace(/\n/g, '<br>');
    
    return html;
}

// Function to display content in a modal or dedicated area
function displayContent(content, title) {
    // Create or update a content display area
    let contentArea = document.getElementById('content-display');
    if (!contentArea) {
        contentArea = document.createElement('div');
        contentArea.id = 'content-display';
        contentArea.className = 'post-content';
        document.querySelector('.main').appendChild(contentArea);
    }
    
    contentArea.innerHTML = `
        <div class="post-header">
            <button class="back-btn" onclick="showSection('home'); this.parentElement.parentElement.style.display='none';">
                <i class="fas fa-arrow-left"></i>
                Back to Home
            </button>
        </div>
        <h1>${title}</h1>
        <div class="post-body">${content}</div>
    `;
    
    contentArea.style.display = 'block';
}

// Initialize the site
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    
    // Set up initial section display
    showSection('home');
    
    // Additional initialization code can go here
    console.log('Site initialized successfully');
});

// Utility function to create dynamic blog cards/posts
function createPostCard(title, description, date, tags, onClickFunction) {
    const card = document.createElement('div');
    card.className = 'post-card';
    
    let tagsHtml = '';
    if (tags && tags.length > 0) {
        tagsHtml = '<div class="post-tags">';
        tags.forEach(tag => {
            tagsHtml += `<span class="post-tag">${tag}</span>`;
        });
        tagsHtml += '</div>';
    }
    
    card.innerHTML = `
        <div class="post-meta">
            <span class="post-date">${date}</span>
            ${tags ? `<span class="post-category">${tags[0]}</span>` : ''}
        </div>
        <h3>${title}</h3>
        <p>${description}</p>
        ${tagsHtml}
    `;
    
    card.addEventListener('click', onClickFunction);
    
    return card;
}

// Function to populate post listings
function populatePosts(posts, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Clear existing content
    container.innerHTML = '';
    
    if (posts.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-folder-open"></i>
                <h3>No Content Yet</h3>
                <p>This section will display content when added.</p>
            </div>
        `;
        return;
    }
    
    posts.forEach(post => {
        const card = createPostCard(
            post.title, 
            post.description, 
            post.date, 
            post.tags, 
            () => displayContent(post.content, post.title) // Click handler
        );
        container.appendChild(card);
    });
}

// Function to handle Markdown rendering if marked.js is available
function renderMarkdown() {
    // Only run if marked.js is loaded
    if (typeof marked !== 'undefined' && document.querySelector('.markdown-content')) {
        const markdownElements = document.querySelectorAll('.markdown-content');
        markdownElements.forEach(element => {
            const markdownText = element.textContent;
            element.innerHTML = marked.parse(markdownText);
        });
    }
}

// Export functions if using modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadMarkdownContent,
        convertMarkdownToHtml,
        createPostCard,
        populatePosts,
        showSection
    };
}