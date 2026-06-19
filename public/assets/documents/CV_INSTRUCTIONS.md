# CV Setup Instructions

## ⚠️ Important: Add Your Resume PDF

Your portfolio is configured to serve your CV from this location. To complete the setup:

### Step 1: Place Your PDF File
Copy your resume PDF to this directory with the filename:
```
Nassim_Elbadri_CV.pdf
```

**Full Path:** `/public/assets/documents/Nassim_Elbadri_CV.pdf`

### Step 2: Verify Setup
- The Download CV button will automatically work once the PDF is in place
- No code changes needed - the path is already configured in the application

### Step 3: Test Locally
```bash
npm run dev
# Click the "Download CV" button to test
```

### Step 4: Deploy to Vercel
Push your changes to GitHub including the new PDF:
```bash
git add public/assets/documents/
git commit -m "Add CV PDF file"
git push
```

## Technical Details

- **File Format:** PDF only
- **Filename:** `Nassim_Elbadri_CV.pdf` (exactly as shown)
- **Location:** `/public/assets/documents/`
- **Served as:** Static asset via `/assets/documents/Nassim_Elbadri_CV.pdf`

## Features Implemented

✅ Download with automatic filename: `Nassim_Elbadri_CV.pdf`
✅ Works on desktop and mobile
✅ Fallback to open in new tab (all browsers)
✅ Download icon included
✅ Accessibility attributes added
✅ Works on Vercel deployment

## To Update CV Later

Simply replace the PDF file in `/public/assets/documents/Nassim_Elbadri_CV.pdf` with your new resume. No code changes needed!
