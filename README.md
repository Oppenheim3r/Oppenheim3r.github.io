# Cybersecurity Blog - Oppenheim3r

A professional cybersecurity blog website built for GitHub Pages with a dark theme featuring blue and purple gradients. Created for Husam Gameel (Oppenheim3r) to showcase expertise in offensive security, defensive security, and adversary emulation.

## Features

- **Dark Theme**: Modern dark theme with blue and purple gradient accents
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Category Organization**: Three main categories for different security domains
- **Markdown Support**: Easy blog post creation using markdown files
- **Interactive Navigation**: Smooth transitions between categories and posts
- **Professional Layout**: Clean, modern design with animated elements

## Categories

### 🗡️ Offensive Security
Penetration testing, exploit development, and red team operations

### 🛡️ Defensive Security  
Blue team strategies, incident response, and security monitoring

### 🎯 Adversary Emulation
Threat hunting, adversary simulation, and purple team exercises

## Quick Start

### 1. Deploy to GitHub Pages

1. **Create a new repository** on GitHub (e.g., `username.github.io` or `cybersec-blog`)

2. **Upload all files** from this directory to your repository:
   ```
   cybersec-blog/
   ├── index.html
   ├── styles.css
   ├── script.js
   ├── posts/
   │   ├── offensive/
   │   ├── defensive/
   │   └── adversary/
   └── README.md
   ```

3. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

4. **Access your blog** at `https://username.github.io/repository-name`

### 2. Adding New Blog Posts

#### Method 1: Direct File Creation

1. Create a new markdown file in the appropriate category folder:
   ```
   posts/offensive/your-new-post.md
   posts/defensive/your-new-post.md
   posts/adversary/your-new-post.md
   ```

2. Use this markdown template:
   ```markdown
   # Your Post Title
   
   *Published on [Date] by Husam Gameel (Oppenheim3r)*
   
   Your post content here...
   
   ## Section Headers
   
   Regular paragraphs with **bold** and *italic* text.
   
   ### Code Examples
   
   \`\`\`python
   # Your code here
   def example():
       return "Hello World"
   \`\`\`
   
   ### Lists
   
   - Item 1
   - Item 2
   - Item 3
   
   ---
   
   *Tags: tag1, tag2, tag3*
   ```

3. Update the blog post configuration in `script.js` (optional for advanced users):
   ```javascript
   // Add your post to the samplePosts array
   {
       id: 'your-post-id',
       title: 'Your Post Title',
       category: 'offensive', // or 'defensive', 'adversary'
       date: '2025-01-20',
       excerpt: 'Brief description of your post...',
       tags: ['tag1', 'tag2', 'tag3'],
       filename: 'posts/offensive/your-new-post.md'
   }
   ```

#### Method 2: Automated Post Management (Advanced)

For users comfortable with JavaScript, you can extend the blog system:

1. **Create a posts configuration file** (`posts/posts.json`):
   ```json
   {
     "posts": [
       {
         "id": "post-1",
         "title": "Your Post Title",
         "category": "offensive",
         "date": "2025-01-20",
         "excerpt": "Brief description...",
         "tags": ["tag1", "tag2"],
         "filename": "posts/offensive/post-1.md"
       }
     ]
   }
   ```

2. **Modify the `fetchBlogPosts()` function** in `script.js` to load from this JSON file.

## Customization

### Colors and Theme

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-bg: #0a0a0f;           /* Main background */
    --secondary-bg: #1a1a2e;         /* Header/footer background */
    --primary-purple: #8b5cf6;       /* Purple accent */
    --primary-blue: #3b82f6;         /* Blue accent */
    --text-primary: #ffffff;         /* Main text color */
    --text-secondary: #a1a1aa;       /* Secondary text color */
}
```

### Personal Information

Update your information in `index.html`:

```html
<!-- Logo section -->
<div class="logo">
    <h1>Your Alias</h1>
    <p>Your Real Name</p>
</div>

<!-- Footer -->
<p>&copy; 2025 Your Name (Your Alias). All rights reserved.</p>
```

### Social Links

Add your social media links in the footer section of `index.html`:

```html
<div class="social-links">
    <a href="https://github.com/yourusername" class="social-link">
        <i class="fab fa-github"></i>
    </a>
    <a href="https://linkedin.com/in/yourusername" class="social-link">
        <i class="fab fa-linkedin"></i>
    </a>
    <a href="https://twitter.com/yourusername" class="social-link">
        <i class="fab fa-twitter"></i>
    </a>
</div>
```

## File Structure

```
cybersec-blog/
├── index.html              # Main HTML file
├── styles.css              # CSS styles and theme
├── script.js               # JavaScript functionality
├── README.md               # This file
└── posts/                  # Blog posts directory
    ├── offensive/          # Offensive security posts
    │   └── advanced-buffer-overflow.md
    ├── defensive/          # Defensive security posts
    │   └── effective-siem-rules.md
    └── adversary/          # Adversary emulation posts
        └── mitre-attack-implementation.md
```

## Technical Details

### Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with flexbox and grid
- **JavaScript (ES6+)**: Dynamic functionality and markdown rendering
- **Marked.js**: Markdown to HTML conversion
- **Font Awesome**: Icons for navigation and UI elements
- **Google Fonts**: Inter font family for typography

### Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Performance Features

- Optimized CSS with minimal reflows
- Lazy loading of blog post content
- Responsive images and layouts
- Minimal JavaScript bundle size

## SEO and Analytics

### Adding Google Analytics

Add this code before the closing `</head>` tag in `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### SEO Optimization

The blog includes:
- Semantic HTML structure
- Meta descriptions and titles
- Open Graph tags for social sharing
- Structured data for blog posts

## Troubleshooting

### Common Issues

1. **Blog posts not loading**:
   - Check that markdown files exist in the correct directory
   - Verify file paths in the JavaScript configuration
   - Ensure proper markdown formatting

2. **Styling issues**:
   - Clear browser cache
   - Check CSS file is loading correctly
   - Verify CSS variable names

3. **JavaScript errors**:
   - Check browser console for error messages
   - Ensure all external libraries are loading
   - Verify JavaScript syntax

### GitHub Pages Specific

1. **Site not updating**:
   - GitHub Pages can take a few minutes to update
   - Check the Actions tab for build status
   - Ensure all files are committed and pushed

2. **404 errors**:
   - Verify repository name matches GitHub Pages URL
   - Check that index.html is in the root directory
   - Ensure GitHub Pages is enabled in settings

## Contributing

This is a personal blog template, but feel free to:
- Fork the repository for your own use
- Submit issues for bugs or improvements
- Create pull requests for enhancements

## License

This project is open source and available under the [MIT License](LICENSE).

## Credits

Created by Husam Gameel (Oppenheim3r) - A cybersecurity professional passionate about sharing knowledge in offensive security, defensive strategies, and adversary emulation techniques.

---

**Happy Blogging! 🚀**

For questions or support, feel free to reach out through the social links in the blog footer.

