# How to Add New Posts to Your GitHub Pages Blog

## Simple 2-Step Process

### Step 1: Upload your markdown file
1. Go to your GitHub repository
2. Navigate to the `posts_unified/` folder
3. Click "Add file" → "Upload files"
4. Upload your `.md` file

### Step 2: Add the filename to the list
1. Open `script-simple.js` in your repository
2. Find the `POST_FILES` array (around line 18)
3. Add your new filename to the list

**Example:**
```javascript
const POST_FILES = [
    'effective-siem-rules.md',
    'advanced-buffer-overflow.md',
    'your-new-post.md',        // ← Add your new file here
    'another-post.md'          // ← And here if you have more
];
```

### Step 3: Commit the changes
1. Scroll down and click "Commit changes"
2. Your new post will appear on the website automatically!

## File Naming Tips

- Use descriptive names: `malware-analysis-techniques.md`
- Use hyphens instead of spaces: `red-team-tactics.md`
- Keep it simple and readable

## Category Detection

The script automatically detects categories based on:
- **Offensive Security**: Files containing "offensive", "attack", "exploit", "penetration"
- **Defensive Security**: Everything else (default)

## Markdown Format

Your markdown files should start like this:

```markdown
# Your Post Title

*Published on January 12, 2025 by Your Name*

Your content here...

## Section Headers

More content with **bold** and *italic* text.
```

## That's It!

No complex setup, no server configuration. Just upload the file and add it to the list. The website will automatically:
- Extract the title from your markdown
- Create an excerpt from the first paragraph
- Detect the category
- Show it in the recent posts and category sections

Perfect for GitHub Pages hosting!

