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
        this.createSpiderWebEffect();
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
        
        // Load dynamic content
        await this.loadDynamicContent();
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

    // Dynamic content loading
    async loadDynamicContent() {
        const path = window.location.pathname;
        
        if (path === '/blogs/offensive/' || path === '/blogs/offensive/index.html') {
            await this.loadOffensivePosts();
        } else if (path === '/blogs/defensive/' || path === '/blogs/defensive/index.html') {
            await this.loadDefensivePosts();
        } else if (path === '/research/' || path === '/research/index.html') {
            await this.loadResearchPosts();
        } else if (path === '/projects/' || path === '/projects/index.html') {
            await this.loadProjectPosts();
        } else if (path === '/blogs/' || path === '/blogs/index.html') {
            await this.loadAllBlogPosts();
        }
    }

    async loadOffensivePosts() {
        const container = document.getElementById('offensive-posts');
        if (!container) return;

        try {
            const response = await fetch('/data.json');
            const data = await response.json();
            const posts = data.blogs.offensive;
            
            if (posts.length === 0) {
                container.innerHTML = '<div class="empty-state"><i class="fas fa-sword"></i><h3>No Posts Yet</h3><p>Offensive security posts will appear here when published.</p></div>';
                return;
            }

            container.innerHTML = '';
            for (const post of posts) {
                const postCard = this.createPostCardFromData(post, 'offensive');
                container.appendChild(postCard);
            }
        } catch (error) {
            console.error('Error loading offensive posts:', error);
        }
    }

    async loadDefensivePosts() {
        const container = document.getElementById('defensive-posts');
        if (!container) return;

        try {
            const response = await fetch('/data.json');
            const data = await response.json();
            const posts = data.blogs.defensive;
            
            if (posts.length === 0) {
                container.innerHTML = '<div class="empty-state"><i class="fas fa-shield-alt"></i><h3>No Posts Yet</h3><p>Defensive security posts will appear here when published.</p></div>';
                return;
            }

            container.innerHTML = '';
            for (const post of posts) {
                const postCard = this.createPostCardFromData(post, 'defensive');
                container.appendChild(postCard);
            }
        } catch (error) {
            console.error('Error loading defensive posts:', error);
        }
    }

    async loadResearchPosts() {
        const container = document.getElementById('research-posts');
        if (!container) return;

        try {
            const response = await fetch('/data.json');
            const data = await response.json();
            const posts = data.research;
            
            if (posts.length === 0) {
                container.innerHTML = '<div class="empty-state"><i class="fas fa-flask"></i><h3>No Research Yet</h3><p>Research papers will appear here when published.</p></div>';
                return;
            }

            container.innerHTML = '';
            for (const post of posts) {
                const postCard = this.createPostCardFromData(post, 'research');
                container.appendChild(postCard);
            }
        } catch (error) {
            console.error('Error loading research posts:', error);
        }
    }

    async loadProjectPosts() {
        const container = document.getElementById('project-posts');
        if (!container) return;

        try {
            const response = await fetch('/data.json');
            const data = await response.json();
            const posts = data.projects;
            
            if (posts.length === 0) {
                container.innerHTML = '<div class="empty-state"><i class="fas fa-code"></i><h3>No Projects Yet</h3><p>Projects will appear here when published.</p></div>';
                return;
            }

            container.innerHTML = '';
            for (const post of posts) {
                const postCard = this.createPostCardFromData(post, 'project');
                container.appendChild(postCard);
            }
        } catch (error) {
            console.error('Error loading project posts:', error);
        }
    }

    async loadAllBlogPosts() {
        const container = document.getElementById('all-blog-posts');
        if (!container) return;

        try {
            const response = await fetch('/data.json');
            const data = await response.json();
            const allPosts = [...data.blogs.offensive, ...data.blogs.defensive];
            
            if (allPosts.length === 0) {
                container.innerHTML = '<div class="empty-state"><i class="fas fa-blog"></i><h3>No Posts Yet</h3><p>Blog posts will appear here when published.</p></div>';
                return;
            }

            container.innerHTML = '';
            for (const post of allPosts) {
                const category = data.blogs.offensive.includes(post) ? 'offensive' : 'defensive';
                const postCard = this.createPostCardFromData(post, category);
                container.appendChild(postCard);
            }
        } catch (error) {
            console.error('Error loading all blog posts:', error);
        }
    }

    async createPostCard(link) {
        const postCard = document.createElement('div');
        postCard.className = 'post-card';
        postCard.onclick = () => window.location.href = link.href;
        
        // Extract title from link text or href
        const title = link.textContent.trim() || link.href.split('/').pop().replace('.html', '').replace(/-/g, ' ');
        
        // Determine category based on URL
        let category = 'Blog Post';
        let icon = 'fas fa-blog';
        if (link.href.includes('/offensive/')) {
            category = 'Offensive Security';
            icon = 'fas fa-sword';
        } else if (link.href.includes('/defensive/')) {
            category = 'Defensive Security';
            icon = 'fas fa-shield-alt';
        } else if (link.href.includes('/research/')) {
            category = 'Research';
            icon = 'fas fa-flask';
        } else if (link.href.includes('/projects/')) {
            category = 'Project';
            icon = 'fas fa-code';
        }

        postCard.innerHTML = `
            <div class="post-meta">
                <span class="post-category">${category}</span>
                <i class="${icon}"></i>
            </div>
            <h3>${title}</h3>
            <p>Click to read more about this ${category.toLowerCase()} topic.</p>
            <a href="${link.href}" class="read-more">
                Read More <i class="fas fa-arrow-right"></i>
            </a>
        `;

        return postCard;
    }

    createPostCardFromData(post, category) {
        const postCard = document.createElement('div');
        postCard.className = 'post-card';
        
        // Generate URL based on category and filename
        let url = '';
        const filename = post.file.replace('.md', '');
        if (category === 'offensive') {
            url = `/blogs/offensive/${filename}.html`;
        } else if (category === 'defensive') {
            url = `/blogs/defensive/${filename}.html`;
        } else if (category === 'research') {
            url = `/research/${filename}.html`;
        } else if (category === 'project') {
            url = `/projects/${filename}.html`;
        }
        
        postCard.onclick = () => this.loadPost(post.file, category, post.title);
        
        // Determine icon based on category
        let icon = 'fas fa-blog';
        if (category === 'offensive') {
            icon = 'fas fa-sword';
        } else if (category === 'defensive') {
            icon = 'fas fa-shield-alt';
        } else if (category === 'research') {
            icon = 'fas fa-flask';
        } else if (category === 'project') {
            icon = 'fas fa-code';
        }

        postCard.innerHTML = `
            <div class="post-meta">
                <span class="post-category">${post.category}</span>
                <i class="${icon}"></i>
            </div>
            <h3>${post.title}</h3>
            <p>${post.description}</p>
            <a href="#" class="read-more" onclick="event.preventDefault(); window.websiteManager.loadPost('${post.file}', '${category}', '${post.title}')">
                Read More <i class="fas fa-arrow-right"></i>
            </a>
        `;

        return postCard;
    }

    // Load post dynamically
    async loadPost(filename, category, title) {
        try {
            // Determine the correct path based on category
            let mdPath = '';
            if (category === 'offensive') {
                mdPath = `/blogs/offensive/${filename}`;
            } else if (category === 'defensive') {
                mdPath = `/blogs/defensive/${filename}`;
            } else if (category === 'research') {
                mdPath = `/research/${filename}`;
            } else if (category === 'project') {
                mdPath = `/projects/${filename}`;
            }

            // Fetch the markdown content
            const response = await fetch(mdPath);
            if (!response.ok) {
                throw new Error('Failed to load post');
            }
            
            const markdown = await response.text();
            const html = marked.parse(markdown);
            
            // Create a new page with the post content
            this.showPostPage(title, html, category);
            
        } catch (error) {
            console.error('Error loading post:', error);
            alert('Error loading post. Please try again.');
        }
    }

    // Show post page
    showPostPage(title, content, category) {
        // Create the post page HTML
        const postPageHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | Oppenheim3r - Cybersecurity Blog</title>
    <meta name="description" content="${title}">
    
    <link rel="stylesheet" href="../assets/css/styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
</head>
<body>
    <!-- Spider Web Overlay -->
    <div class="spider-web" id="spider-web">
        <div class="web-line" style="top: 20%; left: 0; width: 100%;"></div>
        <div class="web-line" style="top: 40%; left: 0; width: 100%;"></div>
        <div class="web-line" style="top: 60%; left: 0; width: 100%;"></div>
        <div class="web-line" style="top: 80%; left: 0; width: 100%;"></div>
        <div class="web-line vertical" style="left: 15%; top: 0;"></div>
        <div class="web-line vertical" style="left: 35%; top: 0;"></div>
        <div class="web-line vertical" style="left: 55%; top: 0;"></div>
        <div class="web-line vertical" style="left: 75%; top: 0;"></div>
        <div class="web-line vertical" style="left: 85%; top: 0;"></div>
    </div>

    <div class="container">
        <!-- Header -->
        <header class="header">
            <div class="header-content">
                <div class="logo">
                    <h1>Oppenheim3r</h1>
                    <p>Husam Gameel</p>
                </div>
                <nav class="nav">
                    <a href="/" class="nav-btn">
                        <i class="fas fa-home"></i>
                        <span>Home</span>
                    </a>
                    <a href="/about/" class="nav-btn">
                        <i class="fas fa-user"></i>
                        <span>About</span>
                    </a>
                    <a href="/blogs/" class="nav-btn">
                        <i class="fas fa-blog"></i>
                        <span>Blogs</span>
                    </a>
                    <a href="/blogs/offensive/" class="nav-btn">
                        <i class="fas fa-sword"></i>
                        <span>Offensive</span>
                    </a>
                    <a href="/blogs/defensive/" class="nav-btn">
                        <i class="fas fa-shield-alt"></i>
                        <span>Defensive</span>
                    </a>
                    <a href="/research/" class="nav-btn">
                        <i class="fas fa-flask"></i>
                        <span>Research</span>
                    </a>
                    <a href="/projects/" class="nav-btn">
                        <i class="fas fa-code"></i>
                        <span>Projects</span>
                    </a>
                </nav>
            </div>
        </header>

        <!-- Breadcrumb -->
        <div class="breadcrumb" id="breadcrumb">
            <a href="/">Home</a>
        </div>

        <!-- Main Content -->
        <main class="main">
            <!-- Back Button -->
            <a href="javascript:history.back()" class="back-btn">
                <i class="fas fa-arrow-left"></i>
                Back
            </a>

            <!-- Article Content -->
            <article class="article-content">
                <div id="markdown-content">
                    ${content}
                </div>
            </article>
        </main>

        <!-- Footer -->
        <footer class="footer">
            <div class="footer-content">
                <p>&copy; 2025 Husam Gameel (Oppenheim3r). All rights reserved.</p>
                <div class="social-links">
                    <a href="https://github.com/oppenheim3r" class="social-link" title="GitHub"><i class="fab fa-github"></i></a>
                    <a href="#" class="social-link" title="LinkedIn"><i class="fab fa-linkedin"></i></a>
                    <a href="#" class="social-link" title="Twitter"><i class="fab fa-twitter"></i></a>
                    <a href="#" class="social-link" title="Email"><i class="fas fa-envelope"></i></a>
                </div>
            </div>
        </footer>
    </div>

    <script src="../assets/js/main.js"></script>
</body>
</html>`;

        // Open the post in a new window/tab
        const newWindow = window.open('', '_blank');
        newWindow.document.write(postPageHTML);
        newWindow.document.close();
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
    window.websiteManager = new WebsiteManager();
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