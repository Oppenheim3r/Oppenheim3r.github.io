#!/bin/bash

# Fix navigation for all HTML files
for file in $(find . -name "*.html" -not -path "./nav_template.txt"); do
    echo "Fixing navigation in $file"
    
    # Remove existing nav section
    sed -i '/<nav class="nav">/,/<\/nav>/d' "$file"
    
    # Add proper nav section before </header>
    sed -i 's|</header>|                <nav class="nav">\n                    <a href="/" class="nav-btn">\n                        <i class="fas fa-home"></i>\n                        <span>Home</span>\n                    </a>\n                    <a href="/about/" class="nav-btn">\n                        <i class="fas fa-user"></i>\n                        <span>About</span>\n                    </a>\n                    <a href="/blogs/" class="nav-btn">\n                        <i class="fas fa-shield-alt"></i>\n                        <span>Blogs</span>\n                    </a>\n                    <a href="/research/" class="nav-btn">\n                        <i class="fas fa-flask"></i>\n                        <span>Research</span>\n                    </a>\n                    <a href="/projects/" class="nav-btn">\n                        <i class="fas fa-code"></i>\n                        <span>Projects</span>\n                    </a>\n                </nav>\n            </div>\n        </header>|' "$file"
done

# Set active states based on file location
for file in ./about/index.html; do
    sed -i 's|href="/about/" class="nav-btn"|href="/about/" class="nav-btn active"|' "$file"
done

for file in ./blogs/*.html; do
    sed -i 's|href="/blogs/" class="nav-btn"|href="/blogs/" class="nav-btn active"|' "$file"
done

for file in ./research/*.html; do
    sed -i 's|href="/research/" class="nav-btn"|href="/research/" class="nav-btn active"|' "$file"
done

for file in ./projects/*.html; do
    sed -i 's|href="/projects/" class="nav-btn"|href="/projects/" class="nav-btn active"|' "$file"
done
