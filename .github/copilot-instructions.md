# SimpleProjectKC Website - GitHub Copilot Instructions

**ALWAYS follow these instructions first**. Only fallback to additional search and context gathering if the information in these instructions is incomplete or found to be in error.

## Project Overview
SimpleProjectKC is a **Cloudflare Pages static website** for an outdoor living and lawn care company serving Kansas City. The site uses vanilla HTML, CSS, and JavaScript with Cloudflare Pages serverless functions for form handling and API endpoints.

## Working Effectively

### Repository Structure
- **Static files**: All HTML, CSS, JS, and images in root and subdirectories
- **Serverless functions**: `/functions/api/*.js` - Cloudflare Pages functions using ES modules
- **Configuration**: `_routes.json`, `_headers`, `_redirects` for Cloudflare Pages routing
- **Content**: `/content/*.json` files contain blog posts, reviews, and jobs data
- **Assets**: `/assets/css/` and `/assets/js/` contain all stylesheets and client-side JavaScript

### Building and Running

#### Local Development - VALIDATED ✅
Run these exact commands to serve the website locally:

```bash
# Start local development server (INSTANT - takes <1 second)
cd /home/runner/work/Fixed/Fixed
python3 -m http.server 8080 --bind 127.0.0.1
```

**Expected result**: Website available at http://127.0.0.1:8080 in ~0.1 seconds

#### What Works Locally vs. Production
- ✅ **Works locally**: Static HTML/CSS/JS, navigation, form display, image galleries
- ❌ **Requires Cloudflare**: Form submissions, API endpoints (`/api/*`), Cloudflare image optimization
- ⚠️ **JavaScript errors expected**: Some console errors occur without Cloudflare environment variables

### Testing and Validation

#### Manual Testing - ALWAYS DO THIS
After making any changes, always test these core user scenarios:

1. **Homepage Navigation**: Load index.html, verify all navigation links work
2. **Form Display**: Check contact forms render properly (submission will fail locally)  
3. **Gallery Functionality**: Navigate to `/gallery/` and verify before/after sliders load
4. **Service Pages**: Test at least 2-3 service pages for proper rendering
5. **Mobile Responsiveness**: Test on mobile viewport sizes

#### Test Commands
```bash
# Quick structure validation (takes 0.006s)
find . -name "*.html" | wc -l  # Should return 64 HTML files

# Start test server for manual validation
python3 -m http.server 8080 --bind 127.0.0.1 &
curl -I http://127.0.0.1:8080/  # Should return 200 OK
# Always kill the server after testing: pkill -f "python3 -m http.server"
```

### No Build Process Required
This website has **no build step**. Files are served directly as static assets. Do NOT attempt to:
- Run `npm install` (no package.json)
- Build with webpack/vite/etc (not needed)
- Compile TypeScript (uses vanilla JS)
- Process SASS/LESS (uses vanilla CSS)

### Code Architecture

#### Client-Side JavaScript
- **ES Modules**: Uses modern `import`/`export` syntax in browser
- **Progressive Enhancement**: Most JavaScript is for enhanced functionality
- **Key files**:
  - `assets/js/main.js` - Core site functionality
  - `assets/js/site-init.js` - Initializes various components
  - `assets/js/ba-*.js` - Before/after image comparison sliders

#### Server-Side Functions (Cloudflare Pages)
- **Location**: `/functions/api/*.js`
- **Runtime**: Cloudflare Workers (V8 JavaScript engine)  
- **Key functions**:
  - `lead.js` - Contact form submissions
  - `reviews.js` - Review management
  - `estimate.js` - Quote requests
  - `blog.js` - Blog post management

### Common File Locations
Quick reference for frequently accessed files:

```
/home/runner/work/Fixed/Fixed/
├── index.html                    # Homepage
├── _routes.json                  # Cloudflare routing config
├── _headers                      # Security headers
├── _redirects                    # URL redirects
├── assets/
│   ├── css/styles.css           # Main stylesheet
│   ├── js/main.js               # Core JavaScript
│   └── img/                     # All images
├── functions/
│   ├── _middleware.js           # Security middleware
│   └── api/*.js                 # API endpoints
├── content/
│   ├── blog.json               # Blog posts
│   └── reviews.json            # Customer reviews
└── [service pages].html         # about.html, contact.html, etc.
```

### Validation Commands - ALWAYS RUN BEFORE COMMITTING

```bash
# Check for broken internal links (takes ~0.5 seconds)  
grep -r "href=\"/" . --include="*.html" | grep -v "assets\|api\|#" | head -10

# Validate JavaScript syntax (requires Node.js v20.19.5+)
node -c assets/js/main.js
node -c functions/api/lead.js

# Check image references (takes ~0.1 seconds)
grep -r "src=\"/assets/img" . --include="*.html" | wc -l  # Should show image usage

# Test API function syntax
cd functions/api && node -c *.js
```

### Timing Expectations - NEVER CANCEL OPERATIONS

- **Local server startup**: <1 second - INSTANT
- **Page load testing**: <0.1 seconds per page  
- **File search operations**: <0.01 seconds (repository has ~500 files)
- **JavaScript validation**: <0.5 seconds for all files
- **Full site manual testing**: 2-3 minutes for complete user scenarios

**IMPORTANT**: This is a static website - there are NO long-running builds or test suites.

### Deployment

#### Cloudflare Pages Deployment
This site is designed for Cloudflare Pages deployment:
- **Build command**: None required (static files)
- **Output directory**: Root directory
- **Functions**: Handled automatically by `/functions/` directory
- **Environment**: Cloudflare Workers runtime for serverless functions

### Error Handling and Known Issues

#### Expected JavaScript Errors
When running locally, expect these console errors (normal):
- `TypeError: Cannot read properties of null` - Related to Cloudflare-specific APIs
- `Failed to load resource: 501` - POST requests to local server (expected)

#### Common Troubleshooting
- **Form submissions fail locally**: Expected - requires Cloudflare Pages deployment
- **Images don't load**: Check paths in `/assets/img/` directory
- **JavaScript import errors**: Ensure serving over HTTP, not file:// protocol
- **Styling issues**: Verify CSS files in `/assets/css/` are accessible

### Content Management

#### Adding New Content
- **Blog posts**: Update `/content/blog.json` 
- **Reviews**: Update `/content/reviews.json`
- **Jobs**: Update `/content/jobs.json`
- **Service pages**: Create new HTML files following existing patterns

#### Image Management
- **Location**: `/assets/img/`  
- **Optimization**: Handled by Cloudflare's image optimization in production
- **Gallery images**: Use naming pattern `ba1-before.jpg` / `ba1-after.jpg` for before/after

### Performance Notes

This website is optimized for:
- **Fast loading**: Minimal dependencies, optimized images via Cloudflare CDN
- **SEO**: Proper HTML structure, meta tags, structured data
- **Mobile-first**: Responsive design with mobile optimization
- **Progressive enhancement**: Works without JavaScript, enhanced with JS

### Security Features

- **Content Security Policy**: Defined in `_headers` file
- **Security headers**: Handled by `_middleware.js`
- **Input validation**: Implemented in serverless functions
- **Rate limiting**: Available through Cloudflare features

Remember: This is a **static website with serverless functions**. There's no server to maintain, no databases to manage, and no complex build processes. Keep it simple!