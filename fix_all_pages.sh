#!/bin/bash

# Function to fix navigation for a specific page
fix_navigation() {
    local file="$1"
    local active_page="$2"
    
    echo "Fixing $file with active page: $active_page"
    
    # Remove existing nav section
    sed -i '/<nav class="nav">/,/<\/nav>/d' "$file"
    
    # Fix the header structure and add proper navigation
    sed -i 's|</div>.*</div>.*</header>|                <nav class="nav">\n                    <a href="/" class="nav-btn'$([ "$active_page" = "home" ] && echo ' active' || echo '')'">\n                        <i class="fas fa-home"></i>\n                        <span>Home</span>\n                    </a>\n                    <a href="/about/" class="nav-btn'$([ "$active_page" = "about" ] && echo ' active' || echo '')'">\n                        <i class="fas fa-user"></i>\n                        <span>About</span>\n                    </a>\n                    <a href="/blogs/" class="nav-btn'$([ "$active_page" = "blogs" ] && echo ' active' || echo '')'">\n                        <i class="fas fa-shield-alt"></i>\n                        <span>Blogs</span>\n                    </a>\n                    <a href="/research/" class="nav-btn'$([ "$active_page" = "research" ] && echo ' active' || echo '')'">\n                        <i class="fas fa-flask"></i>\n                        <span>Research</span>\n                    </a>\n                    <a href="/projects/" class="nav-btn'$([ "$active_page" = "projects" ] && echo ' active' || echo '')'">\n                        <i class="fas fa-code"></i>\n                        <span>Projects</span>\n                    </a>\n                </nav>\n            </div>\n        </header>|' "$file"
}

# Fix each page with correct active state
fix_navigation "./about/index.html" "about"
fix_navigation "./blogs/index.html" "blogs"
fix_navigation "./blogs/threadinjection.html" "blogs"
fix_navigation "./blogs/evidenceofexecution.html" "blogs"
fix_navigation "./research/index.html" "research"
fix_navigation "./research/lumma-research.html" "research"
fix_navigation "./research/opulous-campaign-analysis.html" "research"
fix_navigation "./projects/index.html" "projects"
fix_navigation "./projects/processbutcher.html" "projects"
fix_navigation "./projects/sof-elk-webui.html" "projects"

echo "All pages fixed!"
