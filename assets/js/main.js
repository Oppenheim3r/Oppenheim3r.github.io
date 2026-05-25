// Main JavaScript for the website

// High-performance Matrix Rain canvas-based animation
class MatrixRain {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.columns = [];
        this.fontSize = 14;
        this.chars = "010010000110000101100011011010110110010101110010110000011010101011110000000011110101010110011001110011000011001110101010010101011111111100000000";
        this.animationFrameId = null;
        
        this.resize = this.resize.bind(this);
        this.animate = this.animate.bind(this);
        
        this.init();
    }
    
    init() {
        this.resize();
        window.addEventListener('resize', this.resize);
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        const columnCount = Math.floor(this.canvas.width / this.fontSize) + 1;
        this.columns = [];
        for (let i = 0; i < columnCount; i++) {
            this.columns.push({
                x: i * this.fontSize,
                y: Math.random() * -100 - 20,
                speed: Math.random() * 2 + 1
            });
        }
    }
    
    animate() {
        // Draw semi-transparent background to create trail effect
        this.ctx.fillStyle = 'rgba(10, 10, 15, 0.08)'; // matches var(--primary-bg)
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.font = `${this.fontSize}px monospace`;
        
        for (let i = 0; i < this.columns.length; i++) {
            const col = this.columns[i];
            const char = this.chars[Math.floor(Math.random() * this.chars.length)];
            
            // Highlight the leading character in white
            this.ctx.fillStyle = '#ffffff';
            this.ctx.fillText(char, col.x, col.y);
            
            // Draw standard character above
            this.ctx.fillStyle = '#00ff41'; // var(--matrix-green)
            this.ctx.fillText(char, col.x, col.y - this.fontSize);
            
            col.y += col.speed * this.fontSize * 0.45;
            
            // Reset when column goes off-screen
            if (col.y > this.canvas.height && Math.random() > 0.975) {
                col.y = -20;
                col.speed = Math.random() * 2 + 1;
            }
        }
        
        this.animationFrameId = requestAnimationFrame(this.animate);
    }
    
    destroy() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        window.removeEventListener('resize', this.resize);
    }
}

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
        this.initMatrixRain();
        this.createSpiderWebEffect();
    }

    // Initialize Canvas-based Matrix Rain
    initMatrixRain() {
        let canvas = document.querySelector('.matrix-canvas');
        if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.className = 'matrix-canvas';
            document.body.prepend(canvas);
        }
        this.matrixRain = new MatrixRain(canvas);
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
        }
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
