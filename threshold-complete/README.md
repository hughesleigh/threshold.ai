# Threshold AI - Setup Instructions

## 📁 Project Structure

Your project should have this structure:

```
threshold/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── README.md
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── components/
    │   ├── CustomCursor.tsx
    │   ├── MagneticElement.tsx
    │   ├── Figma/
    │   │   └── ImageWithFallback.tsx
    │   └── ui/
    │       ├── utils.ts
    │       ├── accordion.tsx
    │       ├── alert-dialog.tsx
    │       ├── alert.tsx
    │       ├── aspect-ratio.tsx
    │       ├── avatar.tsx
    │       ├── badge.tsx
    │       ├── breadcrumb.tsx
    │       ├── button.tsx
    │       ├── calendar.tsx
    │       ├── card.tsx
    │       ├── carousel.tsx
    │       ├── chart.tsx
    │       ├── checkbox.tsx
    │       ├── collapsible.tsx
    │       ├── command.tsx
    │       ├── context-menu.tsx
    │       ├── dialog.tsx
    │       ├── drawer.tsx
    │       ├── dropdown-menu.tsx
    │       ├── form.tsx
    │       ├── hover-card.tsx
    │       ├── input-otp.tsx
    │       ├── input.tsx
    │       ├── label.tsx
    │       ├── menubar.tsx
    │       ├── navigation-menu.tsx
    │       ├── pagination.tsx
    │       ├── popover.tsx
    │       ├── progress.tsx
    │       ├── radio-group.tsx
    │       ├── resizable.tsx
    │       ├── scroll-area.tsx
    │       ├── select.tsx
    │       ├── separator.tsx
    │       ├── sheet.tsx
    │       ├── skeleton.tsx
    │       ├── slider.tsx
    │       ├── sonner.tsx
    │       ├── switch.tsx
    │       ├── table.tsx
    │       ├── tabs.tsx
    │       ├── textarea.tsx
    │       ├── toggle-group.tsx
    │       ├── toggle.tsx
    │       ├── tooltip.tsx
    │       └── use-mobile.ts
    └── guidelines/
        └── Guidelines.md
```

## 🚀 Quick Setup

### Method 1: Using GitHub Web Interface (Easiest)

1. **Create the repository on GitHub:**
   - Go to github.com
   - Click "New Repository"
   - Name it: `threshold`
   - Make it public
   - Click "Create repository"

2. **Upload configuration files:**
   - Click "uploading an existing file"
   - Drag and drop all the files Claude created:
     - `package.json`
     - `vite.config.ts`
     - `tsconfig.json`
     - `tsconfig.node.json`
     - `index.html`
     - `tailwind.config.js`
     - `postcss.config.js`
     - `README.md` (this file)
   - Commit

3. **Create the src folder:**
   - Click "Create new file"
   - Name it: `src/main.tsx`
   - Paste the main.tsx content
   - Commit

4. **Create src/App.tsx:**
   - Click "Create new file"
   - Name it: `src/App.tsx`
   - Paste your full App.tsx code (the big one with ThresholdAI component)
   - Commit

5. **Create src/index.css:**
   - Click "Create new file"
   - Name it: `src/index.css`
   - Paste your global.css code
   - Commit

6. **Create components folder:**
   - For each component, click "Create new file"
   - Name it with the path: `src/components/ui/button.tsx`
   - Paste the component code
   - Commit

### Method 2: Using Git CLI (Faster)

```bash
# 1. Clone your empty repo
git clone https://github.com/YOUR-USERNAME/threshold.git
cd threshold

# 2. Copy all the files into this folder
# (Download the files from Claude, put them in the threshold folder)

# 3. Commit and push
git add .
git commit -m "Initial commit - Threshold AI prototype"
git push origin main
```

## 📦 File Mapping Guide

Here's where each file goes:

### Root Configuration Files
- `package.json` → root
- `vite.config.ts` → root
- `tsconfig.json` → root
- `tsconfig.node.json` → root
- `index.html` → root
- `tailwind.config.js` → root
- `postcss.config.js` → root

### Source Files
- `main.tsx` → `src/main.tsx`
- `App.tsx` (the big ThresholdAI component) → `src/App.tsx`
- `global.css` → `src/index.css`

### Component Files
All the component code you pasted goes in `src/components/ui/`:
- `accordion.tsx` → `src/components/ui/accordion.tsx`
- `alert.tsx` → `src/components/ui/alert.tsx`
- `button.tsx` → `src/components/ui/button.tsx`
- ... (and all the others)

### Utility Files
- `utils.ts` → `src/components/ui/utils.ts`
- `CustomCursor.tsx` → `src/components/CustomCursor.tsx`
- `MagneticElement.tsx` → `src/components/MagneticElement.tsx`
- `ImageWithFallback.tsx` → `src/components/Figma/ImageWithFallback.tsx`

## 🎯 After Upload: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your `threshold` repository
4. Vercel will auto-detect Vite
5. Click "Deploy"
6. Done! You'll get a live URL

## ⚙️ Local Development

Once files are on GitHub:

```bash
# Clone the repo
git clone https://github.com/YOUR-USERNAME/threshold.git
cd threshold

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📝 Notes

- All UI components are from shadcn/ui (used under MIT license)
- The app uses Vite + React + TypeScript + Tailwind CSS
- Main app logic is in `src/App.tsx`
- Custom styling is in `src/index.css`

## 🆘 Troubleshooting

**If you see errors after uploading:**

1. Make sure all files are in the correct folders (see structure above)
2. Check that `src/components/ui/utils.ts` exists (needed by all UI components)
3. Run `npm install` to install all dependencies
4. Run `npm run dev` to test locally

**Common issues:**
- Missing `@/` imports: Make sure `vite.config.ts` has the path alias set up
- Component not found: Check the file is in `src/components/ui/`
- CSS not working: Make sure `src/index.css` is imported in `main.tsx`

---

## 🎨 What's Next?

After setup:
1. Test the app locally with `npm run dev`
2. Make the fixes we discussed (doorway progress indicator, button colors, etc.)
3. Deploy to Vercel for a live URL
4. Use the live URL for your thesis presentation

Good luck! 🚀
