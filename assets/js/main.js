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
        for (let i = 0; i < 8; i++) {
            setTimeout(() => createBinary(), i * 500);
        }
        
        // Continue creating binaries
        setInterval(createBinary, 3000);
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
        
        // Load dynamic content and update counters
        await this.loadDynamicContent();
        await this.updateCounters();
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
            const response = await fetch('/blogs/offensive/');
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Find all .md files in the offensive directory
            const links = Array.from(doc.querySelectorAll('a[href$=".html"]'))
                .filter(link => link.href.includes('/blogs/offensive/'))
                .filter(link => !link.href.includes('index.html'));
            
            if (links.length === 0) {
                container.innerHTML = '<div class="empty-state"><i class="fas fa-sword"></i><h3>No Posts Yet</h3><p>Offensive security posts will appear here when published.</p></div>';
                return;
            }

            container.innerHTML = '';
            for (const link of links) {
                const postCard = await this.createPostCard(link);
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
            const response = await fetch('/blogs/defensive/');
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            const links = Array.from(doc.querySelectorAll('a[href$=".html"]'))
                .filter(link => link.href.includes('/blogs/defensive/'))
                .filter(link => !link.href.includes('index.html'));
            
            if (links.length === 0) {
                container.innerHTML = '<div class="empty-state"><i class="fas fa-shield-alt"></i><h3>No Posts Yet</h3><p>Defensive security posts will appear here when published.</p></div>';
                return;
            }

            container.innerHTML = '';
            for (const link of links) {
                const postCard = await this.createPostCard(link);
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
            const response = await fetch('/research/');
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            const links = Array.from(doc.querySelectorAll('a[href$=".html"]'))
                .filter(link => link.href.includes('/research/'))
                .filter(link => !link.href.includes('index.html'));
            
            if (links.length === 0) {
                container.innerHTML = '<div class="empty-state"><i class="fas fa-flask"></i><h3>No Research Yet</h3><p>Research papers will appear here when published.</p></div>';
                return;
            }

            container.innerHTML = '';
            for (const link of links) {
                const postCard = await this.createPostCard(link);
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
            const response = await fetch('/projects/');
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            const links = Array.from(doc.querySelectorAll('a[href$=".html"]'))
                .filter(link => link.href.includes('/projects/'))
                .filter(link => !link.href.includes('index.html'));
            
            if (links.length === 0) {
                container.innerHTML = '<div class="empty-state"><i class="fas fa-code"></i><h3>No Projects Yet</h3><p>Projects will appear here when published.</p></div>';
                return;
            }

            container.innerHTML = '';
            for (const link of links) {
                const postCard = await this.createPostCard(link);
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
            // Load both offensive and defensive posts
            const [offensiveResponse, defensiveResponse] = await Promise.all([
                fetch('/blogs/offensive/'),
                fetch('/blogs/defensive/')
            ]);

            const [offensiveHtml, defensiveHtml] = await Promise.all([
                offensiveResponse.text(),
                defensiveResponse.text()
            ]);

            const parser = new DOMParser();
            const offensiveDoc = parser.parseFromString(offensiveHtml, 'text/html');
            const defensiveDoc = parser.parseFromString(defensiveHtml, 'text/html');
            
            const allLinks = [
                ...Array.from(offensiveDoc.querySelectorAll('a[href$=".html"]'))
                    .filter(link => link.href.includes('/blogs/offensive/'))
                    .filter(link => !link.href.includes('index.html')),
                ...Array.from(defensiveDoc.querySelectorAll('a[href$=".html"]'))
                    .filter(link => link.href.includes('/blogs/defensive/'))
                    .filter(link => !link.href.includes('index.html'))
            ];
            
            if (allLinks.length === 0) {
                container.innerHTML = '<div class="empty-state"><i class="fas fa-blog"></i><h3>No Posts Yet</h3><p>Blog posts will appear here when published.</p></div>';
                return;
            }

            container.innerHTML = '';
            for (const link of allLinks) {
                const postCard = await this.createPostCard(link);
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

    async updateCounters() {
        try {
            // Count blog posts
            const [offensiveResponse, defensiveResponse] = await Promise.all([
                fetch('/blogs/offensive/'),
                fetch('/blogs/defensive/')
            ]);

            const [offensiveHtml, defensiveHtml] = await Promise.all([
                offensiveResponse.text(),
                defensiveResponse.text()
            ]);

            const parser = new DOMParser();
            const offensiveDoc = parser.parseFromString(offensiveHtml, 'text/html');
            const defensiveDoc = parser.parseFromString(defensiveHtml, 'text/html');
            
            const blogCount = [
                ...Array.from(offensiveDoc.querySelectorAll('a[href$=".html"]'))
                    .filter(link => link.href.includes('/blogs/offensive/'))
                    .filter(link => !link.href.includes('index.html')),
                ...Array.from(defensiveDoc.querySelectorAll('a[href$=".html"]'))
                    .filter(link => link.href.includes('/blogs/defensive/'))
                    .filter(link => !link.href.includes('index.html'))
            ].length;

            // Count research posts
            const researchResponse = await fetch('/research/');
            const researchHtml = await researchResponse.text();
            const researchDoc = parser.parseFromString(researchHtml, 'text/html');
            const researchCount = Array.from(researchDoc.querySelectorAll('a[href$=".html"]'))
                .filter(link => link.href.includes('/research/'))
                .filter(link => !link.href.includes('index.html')).length;

            // Count project posts
            const projectResponse = await fetch('/projects/');
            const projectHtml = await projectResponse.text();
            const projectDoc = parser.parseFromString(projectHtml, 'text/html');
            const projectCount = Array.from(projectDoc.querySelectorAll('a[href$=".html"]'))
                .filter(link => link.href.includes('/projects/'))
                .filter(link => !link.href.includes('index.html')).length;

            // Update counters on homepage
            const blogCountEl = document.getElementById('blog-count');
            const researchCountEl = document.getElementById('research-count');
            const projectCountEl = document.getElementById('project-count');

            if (blogCountEl) blogCountEl.textContent = blogCount;
            if (researchCountEl) researchCountEl.textContent = researchCount;
            if (projectCountEl) projectCountEl.textContent = projectCount;

        } catch (error) {
            console.error('Error updating counters:', error);
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