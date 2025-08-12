# Oppenheim3r Cybersecurity Blog

A modern, responsive cybersecurity blog featuring dynamic content management and file upload capabilities.

## Features

- **Dynamic File Upload**: Upload markdown files directly through the web interface
- **Admin Panel**: Manage posts with view, edit, and delete functionality
- **Responsive Design**: Works on desktop and mobile devices
- **Category Management**: Organize posts into Offensive and Defensive Security categories
- **Local Storage**: Client-side post storage for GitHub Pages compatibility
- **Markdown Support**: Full markdown rendering with syntax highlighting

## How to Use the Upload Functionality

### Accessing the Admin Panel

1. Open your website in a browser
2. Click on the "Admin" button in the navigation menu
3. You'll see the admin panel with upload and management sections

### Uploading New Posts

1. **Select Category**: Choose between "Offensive Security" or "Defensive Security"
2. **Optional Title**: Enter a custom title, or leave blank to auto-extract from markdown
3. **Select File**: Click "Choose File" and select your `.md` file
4. **Upload**: Click the "Upload Post" button

### Markdown File Requirements

Your markdown files should follow this structure:

```markdown
# Your Post Title

*Published on [Date] by [Author]*

Your content here...

## Section Headers

Content with **bold**, *italic*, and other markdown formatting.
```

### Managing Existing Posts

- **View Posts**: Click the "View" button to read a post
- **Delete Posts**: Click the "Delete" button to remove a post (with confirmation)
- **Refresh**: Click "Refresh Posts" to update the posts list

## Technical Details

### File Storage
- Posts are stored in browser localStorage
- Compatible with GitHub Pages (no server required)
- Fallback to `posts-config.json` for initial posts

### Supported Features
- Automatic title extraction from `# Header` in markdown
- Excerpt generation from first paragraph
- Date assignment (current date for uploads)
- Unique ID generation for posts

### File Structure
```
/
├── index.html          # Main page
├── script-updated.js   # Updated JavaScript with upload functionality
├── styles.css          # Styles including admin panel
├── posts-config.json   # Initial posts configuration
├── posts_unified/      # Directory for markdown files
│   ├── *.md           # Your markdown posts
└── README.md          # This file
```

## Deployment

### GitHub Pages
1. Push your files to a GitHub repository
2. Enable GitHub Pages in repository settings
3. Your site will be available at `https://username.github.io/repository-name`

### Local Testing
```bash
# Start a local server
python3 -m http.server 8080

# Open in browser
http://localhost:8080
```

## Browser Compatibility

- Modern browsers with localStorage support
- File API support for file uploads
- ES6+ JavaScript features

## Troubleshooting

### Posts Not Loading
- Check browser console for errors
- Ensure markdown files are properly formatted
- Verify localStorage is enabled in browser

### Upload Issues
- Ensure file is a valid `.md` file
- Check file size (should be reasonable for browser storage)
- Verify JavaScript is enabled

### GitHub Pages Issues
- Ensure all files are committed and pushed
- Check GitHub Pages settings in repository
- Allow time for deployment (can take a few minutes)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is open source and available under the MIT License.

