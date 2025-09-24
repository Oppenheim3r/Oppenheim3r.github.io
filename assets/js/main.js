// Site functionality and dynamic content loader

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

// Function to load markdown files and convert them to HTML
async function loadMarkdownContent(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const markdownText = await response.text();
        
        // Using a placeholder for markdown processing
        // In a real implementation, you would use a markdown library like marked.js
        return convertMarkdownToHtml(markdownText);
    } catch (error) {
        console.error('Error loading markdown content:', error);
        return '<div class="error">Failed to load content</div>';
    }
}

// Placeholder markdown to HTML conversion function
function convertMarkdownToHtml(markdown) {
    // This is a simplified placeholder - in a real implementation you'd use a library
    // For now, we'll just return the raw text with basic HTML formatting
    return `<div class="markdown-content">${markdown}</div>`;
}

// Function to display a blog post or project
function displayContent(content, title, date, tags) {
    // This would be implemented when actual content is provided
    console.log('Displaying content:', title);
}

// Initialize the site
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    
    // Additional initialization code can go here
    console.log('Site initialized successfully');
});

// Utility function to create dynamic blog cards/posts
function createPostCard(title, description, date, tags, url) {
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
    
    card.addEventListener('click', function() {
        window.location.href = url;
    });
    
    return card;
}

// Function to populate post listings
function populatePosts(posts, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    posts.forEach(post => {
        const card = createPostCard(
            post.title, 
            post.description, 
            post.date, 
            post.tags, 
            post.url
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
        populatePosts
    };
}