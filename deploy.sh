#!/bin/bash

# Lazy Spy Website Deployment Script
# This script helps with deploying the website to various platforms

echo "🚀 Lazy Spy Website Deployment Script"
echo "====================================="

# Check if files exist
if [ ! -f "index.html" ]; then
    echo "❌ Error: index.html not found!"
    exit 1
fi

if [ ! -f "styles.css" ]; then
    echo "❌ Error: styles.css not found!"
    exit 1
fi

if [ ! -f "script.js" ]; then
    echo "❌ Error: script.js not found!"
    exit 1
fi

echo "✅ All required files found!"

# Create a backup
echo "📦 Creating backup..."
timestamp=$(date +"%Y%m%d_%H%M%S")
backup_dir="backup_$timestamp"
mkdir -p "$backup_dir"
cp -r . "$backup_dir" 2>/dev/null
echo "✅ Backup created: $backup_dir"

# Check for common issues
echo "🔍 Running pre-deployment checks..."

# Check image files
missing_images=()
for img in "images/lazyspylogo.png" "images/big-logo.png" "images/icon48.png" "images/extention-screenshot-1.png"; do
    if [ ! -f "$img" ]; then
        missing_images+=("$img")
    fi
done

if [ ${#missing_images[@]} -gt 0 ]; then
    echo "⚠️  Warning: Missing image files:"
    for img in "${missing_images[@]}"; do
        echo "   - $img"
    done
else
    echo "✅ All image files present"
fi

# Check for broken links in HTML
echo "🔗 Checking for broken links..."
grep -o 'href="[^"]*"' index.html | grep -v '^#' | grep -v '^http' | while read -r link; do
    file=$(echo "$link" | sed 's/href="//' | sed 's/"//')
    if [ ! -f "$file" ] && [ ! -d "$file" ]; then
        echo "⚠️  Warning: Possible broken link: $file"
    fi
done

# Create deployment package
echo "📦 Creating deployment package..."
deploy_dir="deploy_$timestamp"
mkdir -p "$deploy_dir"

# Copy files to deployment directory
cp index.html "$deploy_dir/"
cp styles.css "$deploy_dir/"
cp script.js "$deploy_dir/"
cp -r images "$deploy_dir/"
cp README.md "$deploy_dir/"

echo "✅ Deployment package created: $deploy_dir"

# Show deployment options
echo ""
echo "🎯 Deployment Options:"
echo "1. GitHub Pages"
echo "2. Netlify (drag and drop)"
echo "3. Vercel"
echo "4. Traditional hosting"
echo "5. Local testing server"
echo ""

read -p "Choose deployment option (1-5): " choice

case $choice in
    1)
        echo "📚 GitHub Pages Instructions:"
        echo "1. Push code to GitHub repository"
        echo "2. Go to Settings > Pages"
        echo "3. Select source branch (main)"
        echo "4. Your site will be available at: https://username.github.io/repository-name"
        ;;
    2)
        echo "🌐 Netlify Instructions:"
        echo "1. Go to https://netlify.com"
        echo "2. Drag and drop the '$deploy_dir' folder"
        echo "3. Or connect your GitHub repository for automatic deployments"
        ;;
    3)
        echo "⚡ Vercel Instructions:"
        echo "1. Install Vercel CLI: npm i -g vercel"
        echo "2. Run: vercel"
        echo "3. Follow the prompts"
        ;;
    4)
        echo "🖥️  Traditional Hosting Instructions:"
        echo "1. Upload all files from '$deploy_dir' to your web server"
        echo "2. Ensure index.html is in the root directory"
        echo "3. Verify all image paths are correct"
        ;;
    5)
        echo "🔧 Starting local server..."
        echo "Server will be available at: http://localhost:8000"
        echo "Press Ctrl+C to stop the server"
        cd "$deploy_dir"
        python3 -m http.server 8000 2>/dev/null || python -m http.server 8000 2>/dev/null || echo "❌ Python not found. Please install Python or use another local server."
        ;;
    *)
        echo "❌ Invalid option selected"
        ;;
esac

echo ""
echo "🎉 Deployment script completed!"
echo "📁 Files are ready in: $deploy_dir"
echo ""
echo "💡 Tips:"
echo "- Test the website locally before deploying"
echo "- Check all links and images work correctly"
echo "- Verify responsive design on mobile devices"
echo "- Test in different browsers"
echo ""
echo "🔗 Quick local test: open $deploy_dir/index.html in your browser"
