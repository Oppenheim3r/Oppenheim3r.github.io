# Oppenheim3r.github.io Static Site Management Guide

## Overview
This repository hosts the Oppenheim3r static website, built with HTML, CSS, and JavaScript. The site features three main sections: blogs/security, research, and projects, all using a consistent cybersecurity-themed design.

## Site Structure
```
Oppenheim3r.github.io/
├── index.html                 # Main landing page
├── assets/
│   ├── css/
│   │   └── style.css        # Main stylesheet with theme
│   └── js/
│       └── main.js          # JavaScript functionality
├── blogs/
│   └── security/
│       └── index.html       # Security blog listing page
├── research/
│   └── index.html           # Research listing page
└── projects/
    └── index.html           # Projects listing page
```

## Theme & Design
- Dark theme with purple/blue accents
- Responsive design (mobile & desktop)
- Minimalist navigation on desktop
- Spider web overlay effect
- Animated elements

## Adding New Content

### Adding a Blog Post
1. Create a new .md file in `/blogs/security/` with descriptive name
2. Add appropriate frontmatter if needed (title, date, tags, etc.)
3. Update the blog listing page to include the new post if needed

### Adding a Research Paper
1. Create a new .md file in `/research/` with descriptive name
2. Add appropriate frontmatter
3. Update the research listing page to include the new paper if needed

### Adding a Project
1. Create a new .md file in `/projects/` with descriptive name
2. Add appropriate frontmatter
3. Update the projects listing page to include the new project if needed

### Adding Images
1. Place images in appropriate directories
2. Use relative paths: `/assets/images/` or within each section
3. Reference images in markdown with relative paths

## File Paths
- Blog posts: `/blogs/security/<name_of_file>.md`
- Research papers: `/research/<name_of_file>.md`
- Projects: `/projects/<name_of_file>.md`
- Images: `/assets/images/` or within each section directory

## Content Labels
- Security content is not separated into offensive/defensive categories
- Instead, content can be labeled inside the .md files themselves
- Use appropriate tags in frontmatter or within content

## Workflow for Adding Content
1. When provided with new .md files or images:
   - Place .md files in appropriate section directory
   - Place images in appropriate location
   - Update paths in content as needed
   - Commit and push changes to main branch

## Technologies Used
- Pure HTML, CSS, JavaScript (no frameworks)
- Responsive design with CSS Grid and Flexbox
- CSS variables for consistent theming
- JavaScript for dynamic content loading (when implemented)
- GitHub Pages for hosting

## Deployment
- Site is hosted on GitHub Pages
- Automatically deploys from the main branch
- No build step required