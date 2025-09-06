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

### Blog Posts

1. Create a new `.md` file in the appropriate directory:
   - `blogs/offensive/` for offensive security posts
   - `blogs/defensive/` for defensive security posts
   - `blogs/` for general blog posts

2. Create a corresponding `.html` file that loads the markdown content

3. Update the category index page to include the new post

### Research Papers

1. Create a new `.md` file in `research/`
2. Create a corresponding `.html` file
3. Update `research/index.html` to include the new research

### Projects

1. Create a new `.md` file in `projects/`
2. Create a corresponding `.html` file
3. Update `projects/index.html` to include the new project

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