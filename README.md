# Oppenheim3r Cybersecurity Blog

A modern, mobile-responsive cybersecurity blog built for GitHub Pages hosting.

## Structure

```
/
├── index.html                 # Main homepage
├── about/
│   └── index.html            # About page
├── blogs/
│   ├── index.html            # All blogs index
│   ├── offensive/
│   │   ├── index.html        # Offensive security blog index
│   │   ├── advanced-buffer-overflow.html
│   │   └── advanced-buffer-overflow.md
│   └── defensive/
│       └── index.html        # Defensive security blog index
├── research/
│   ├── index.html            # Research index
│   ├── lazarus-group-analysis.html
│   └── lazarus-group-analysis.md
├── projects/
│   └── index.html            # Projects index
└── assets/
    ├── css/
    │   └── styles.css        # Main stylesheet
    ├── js/
    │   └── main.js           # JavaScript functionality
    └── images/               # Image assets
```

## Features

- **Mobile Responsive**: Optimized for all device sizes
- **GitHub Pages Compatible**: Works with free GitHub Pages hosting
- **Markdown Support**: Blog posts can be written in Markdown
- **Image Support**: Images can be embedded in Markdown files
- **Modern Design**: Dark theme with purple/blue gradient accents
- **Interactive Elements**: Floating binary animations and spider web effects

## Adding New Content

### How to Add New Posts/Research/Projects

1. **Create your markdown file:**
   - Create a `.md` file (e.g., `my-new-post.md`)
   - Place it in the appropriate directory:
     - `blogs/offensive/` for offensive security posts
     - `blogs/defensive/` for defensive security posts
     - `research/` for research papers
     - `projects/` for projects

2. **Update the data.json file:**
   - Open `data.json` in the root directory
   - Add your new content to the appropriate section:

**For Blog Posts:**
```json
{
  "blogs": {
    "offensive": [
      {
        "title": "Your Post Title",
        "file": "your-post.md",
        "category": "Your Category",
        "description": "Brief description of your post"
      }
    ],
    "defensive": []
  }
}
```

**For Research:**
```json
{
  "research": [
    {
      "title": "Your Research Title",
      "file": "your-research.md",
      "category": "Your Category",
      "description": "Brief description of your research"
    }
  ]
}
```

**For Projects:**
```json
{
  "projects": [
    {
      "title": "Your Project Title",
      "file": "your-project.md",
      "category": "Your Category",
      "description": "Brief description of your project"
    }
  ]
}
```

3. **That's it! The website will automatically:**
   - Display your new content
   - Generate the HTML page dynamically
   - Handle all the routing and styling

### File Structure Example

```
/blogs/offensive/
  ├── my-new-post.md
  └── index.html

/research/
  ├── my-new-research.md
  └── index.html

/projects/
  ├── my-new-project.md
  └── index.html

/data.json (update this file)
```

**Note:** You only need to create the `.md` file! The HTML is generated automatically.

## URL Structure

- Homepage: `https://oppenheim3r.github.io/`
- About: `https://oppenheim3r.github.io/about/`
- All Blogs: `https://oppenheim3r.github.io/blogs/`
- Offensive Security: `https://oppenheim3r.github.io/blogs/offensive/`
- Defensive Security: `https://oppenheim3r.github.io/blogs/defensive/`
- Research: `https://oppenheim3r.github.io/research/`
- Projects: `https://oppenheim3r.github.io/projects/`

## Technical Details

- **CSS**: Custom CSS with CSS variables for theming
- **JavaScript**: Vanilla JavaScript for interactivity
- **Markdown**: Rendered client-side using the `marked` library
- **Fonts**: Inter font family from Google Fonts
- **Icons**: Font Awesome icons
- **Responsive**: Mobile-first design with fluid typography

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design works on all screen sizes

## License

© 2025 Husam Gameel (Oppenheim3r). All rights reserved.