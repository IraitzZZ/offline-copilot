# Deployment Guide

**Created by IraitzZZ**

## Publishing to npm

1. **Build the project**:
\`\`\`bash
npm run build
\`\`\`

2. **Test locally**:
\`\`\`bash
npm link
offline-copilot --version
\`\`\`

3. **Login to npm**:
\`\`\`bash
npm login
\`\`\`

4. **Publish**:
\`\`\`bash
npm publish
\`\`\`

## Publishing to GitHub

1. **Initialize git** (if not already done):
\`\`\`bash
git init
git add .
git commit -m "Initial commit - Offline Copilot by IraitzZZ"
\`\`\`

2. **Create GitHub repository**:
- Go to https://github.com/new
- Name: `offline-copilot`
- Description: "A 100% offline AI coding assistant powered by local language models"
- Public/Private: Your choice
- Don't initialize with README (we already have one)

3. **Push to GitHub**:
\`\`\`bash
git remote add origin https://github.com/IraitzZZ/offline-copilot.git
git branch -M main
git push -u origin main
\`\`\`

4. **Create a release**:
- Go to your repository on GitHub
- Click "Releases" → "Create a new release"
- Tag: `v1.0.0`
- Title: `Offline Copilot v1.0.0`
- Description: Initial release with core features

## Version Management

Update version in `package.json`:
\`\`\`bash
npm version patch  # 1.0.0 → 1.0.1
npm version minor  # 1.0.0 → 1.1.0
npm version major  # 1.0.0 → 2.0.0
\`\`\`

Then publish:
\`\`\`bash
npm publish
git push --tags
\`\`\`

## Distribution

The package will be available at:
- npm: `https://www.npmjs.com/package/offline-copilot`
- GitHub: `https://github.com/IraitzZZ/offline-copilot`

Users can install with:
\`\`\`bash
npm install -g offline-copilot
\`\`\`

---

**Powered by IraitzZZ**
