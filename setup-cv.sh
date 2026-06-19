#!/bin/bash

# CV Setup Helper Script
# This script helps place your resume in the correct location

echo "🚀 CV Setup Helper"
echo "=================="
echo ""

# Check if public/assets/documents exists
if [ ! -d "public/assets/documents" ]; then
    echo "❌ Directory not found: public/assets/documents"
    echo "Please run this script from the portfolio root directory"
    exit 1
fi

# Check if PDF already exists
if [ -f "public/assets/documents/Nassim_Elbadri_CV.pdf" ]; then
    echo "✅ CV file already exists at: public/assets/documents/Nassim_Elbadri_CV.pdf"
    ls -lh "public/assets/documents/Nassim_Elbadri_CV.pdf"
    read -p "Do you want to replace it? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Prompt user for PDF file location
echo ""
echo "Please provide the path to your resume PDF file."
read -p "Enter PDF file path: " pdf_source

# Validate file exists
if [ ! -f "$pdf_source" ]; then
    echo "❌ File not found: $pdf_source"
    exit 1
fi

# Check if it's a PDF
if ! file "$pdf_source" | grep -q "PDF document"; then
    echo "⚠️  Warning: File may not be a valid PDF"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Copy the file
echo ""
echo "📋 Copying PDF..."
cp "$pdf_source" "public/assets/documents/Nassim_Elbadri_CV.pdf"

if [ $? -eq 0 ]; then
    echo "✅ Success! CV file placed at: public/assets/documents/Nassim_Elbadri_CV.pdf"
    echo ""
    ls -lh "public/assets/documents/Nassim_Elbadri_CV.pdf"
    echo ""
    echo "📝 Next steps:"
    echo "1. Test locally: npm run dev"
    echo "2. Click the Download CV button"
    echo "3. Commit and push: git add public/assets/documents/Nassim_Elbadri_CV.pdf && git commit -m 'Add CV'"
    echo "4. Verify on Vercel deployment"
else
    echo "❌ Failed to copy file"
    exit 1
fi
