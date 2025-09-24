# Oppenheim3r.github.io Static Site Management Guide

## Overview
This repository hosts the Oppenheim3r static website, built with HTML, CSS, and JavaScript. The site is a single-page application with three main sections: blogs/security, research, and projects, all using a consistent cybersecurity-themed design.

## Site Structure
```
Oppenheim3r.github.io/
├── index.html                 # Single page application
├── assets/
│   ├── css/
│   │   └── style.css        # Main stylesheet with theme
│   └── js/
│       └── main.js          # JavaScript functionality
└── content/
    ├── blogs/               # Security blog content
    ├── research/            # Research content
    └── projects/            # Project content
```

## Theme & Design
- Dark theme with purple/blue accents
- Responsive design (mobile & desktop)
- Minimalist navigation on desktop
- Spider web overlay effect
- Animated elements

## Adding New Content

### Adding a Blog Post
1. Create a new .md file in `/content/blogs/` with descriptive name
2. Add your content in markdown format
3. Content will be loaded dynamically in the Security section

### Adding a Research Paper
1. Create a new .md file in `/content/research/` with descriptive name
2. Add your content in markdown format
3. Content will be loaded dynamically in the Research section

### Adding a Project
1. Create a new .md file in `/content/projects/` with descriptive name
2. Add your content in markdown format
3. Content will be loaded dynamically in the Projects section

### Adding Images
1. Place images in appropriate directories
2. Use relative paths: `/assets/images/` or reference directly
3. Reference images in markdown with relative paths

## File Paths
- Blog posts: `/content/blogs/<name_of_file>.md`
- Research papers: `/content/research/<name_of_file>.md`
- Projects: `/content/projects/<name_of_file>.md`
- Images: `/assets/images/` or within content directories

## Content Labels
- Security content is not separated into offensive/defensive categories
- Instead, content can be labeled inside the .md files themselves
- Use appropriate tags in frontmatter or within content

## Workflow for Adding Content
1. When provided with new .md files or images:
   - Place .md files in appropriate content directory
   - Place images in appropriate location
   - Update paths in content as needed
   - Commit and push changes to main branch

## Technologies Used
- Pure HTML, CSS, JavaScript (no frameworks)
- Responsive design with CSS Grid and Flexbox
- CSS variables for consistent theming
- JavaScript for dynamic content loading
- GitHub Pages for hosting

## Deployment
- Site is hosted on GitHub Pages
- Automatically deploys from the main branch
- No build step required