# Dynamic Blog Post Standard

## Overview
This document defines the standard format for blog posts that will be dynamically loaded and parsed by the blog system.

## Post Structure

Each blog post should be a Markdown file with YAML frontmatter at the beginning. The frontmatter contains metadata that will be automatically extracted and used to populate the blog's navigation and post listings.

## Required Frontmatter Format

```yaml
---
id: unique-post-identifier
title: Your Post Title Here
category: offensive|defensive|adversary
date: YYYY-MM-DD
excerpt: A brief description of the post content (1-2 sentences)
tags: [tag1, tag2, tag3]
author: Your Name (optional)
---
```

## Field Descriptions

- **id**: A unique identifier for the post (lowercase, hyphens for spaces)
- **title**: The display title of the post
- **category**: Must be one of: `offensive`, `defensive`, or `adversary`
- **date**: Publication date in YYYY-MM-DD format
- **excerpt**: Brief summary for post cards and previews
- **tags**: Array of relevant tags for categorization and search
- **author**: Optional author name

## Example Post Template

```markdown
---
id: advanced-buffer-overflow
title: Advanced Buffer Overflow Techniques
category: offensive
date: 2025-01-15
excerpt: Exploring modern buffer overflow exploitation techniques and bypass methods for contemporary security mechanisms.
tags: [buffer-overflow, exploitation, binary-exploitation, rop]
author: Husam Gameel (Oppenheim3r)
---

# Advanced Buffer Overflow Techniques

Your post content goes here...

## Introduction

Content sections...

## Conclusion

Final thoughts...
```

## File Organization

Posts should be organized in the following directory structure:

```
posts/
├── offensive/
│   ├── post1.md
│   └── post2.md
├── defensive/
│   ├── post1.md
│   └── post2.md
└── adversary/
    ├── post1.md
    └── post2.md
```

## Dynamic Loading Benefits

1. **No JavaScript Configuration**: Posts are automatically discovered
2. **Metadata Extraction**: All post information is extracted from the file itself
3. **Easy Content Management**: Just add new .md files to the appropriate category folder
4. **Consistent Structure**: Enforced metadata format ensures consistency
5. **Scalable**: System grows automatically as you add more posts

## Implementation Notes

The blog system will:
1. Scan all category directories for .md files
2. Parse the YAML frontmatter from each file
3. Generate post listings and navigation automatically
4. Handle missing or malformed frontmatter gracefully

