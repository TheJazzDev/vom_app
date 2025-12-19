# Graphic Assets Design Specifications
## CSMC - Valley of Mercy Mobile App - Google Play Store

---

## 1. App Icon (512px × 512px)

### Technical Requirements
- **Dimensions:** 512px × 512px (exactly)
- **Format:** PNG (32-bit) or JPEG
- **Color Space:** sRGB
- **File Size:** Maximum 1 MB
- **Background:** Should work on any background color

### Current Asset Location
Based on your `app.json`:
```
./src/assets/images/adaptive-icon-2.png
```

### Design Guidelines
1. **Simplicity:** Icon should be clear and recognizable at small sizes
2. **No Text:** Avoid small text (won't be legible at small sizes)
3. **Safe Area:** Keep important elements within center 66% of canvas
4. **Consistency:** Match your existing brand identity
5. **Transparency:** Can have transparent background for adaptive icon

### Adaptive Icon (Android Specific)
Your current setup:
```json
"adaptiveIcon": {
  "foregroundImage": "./src/assets/images/adaptive-icon-2.png",
  "backgroundColor": "#0D0D2B"
}
```

**Notes:**
- Foreground image should be 108px × 108px safe area out of 512px × 512px
- Background color: `#0D0D2B` (your dark theme color)
- Icon will be masked in various shapes (circle, rounded square, etc.)

### Quality Checklist
- [ ] Exactly 512px × 512px
- [ ] PNG with transparency or solid background
- [ ] Looks good when scaled to 48px (preview size)
- [ ] No fine details that disappear when small
- [ ] Matches your brand colors
- [ ] Works in both light and dark interfaces
- [ ] Under 1 MB file size

---

## 2. Feature Graphic (1024px × 500px) - REQUIRED

### Technical Requirements
- **Dimensions:** 1024px × 500px (exactly)
- **Format:** PNG (preferred) or JPEG
- **File Size:** Maximum 15 MB
- **Aspect Ratio:** ~2:1 landscape

### Purpose
- Appears at the top of your Play Store listing
- First visual impression after icon
- Key marketing asset
- Must grab attention and communicate value

### Design Recommendations

#### Layout Suggestion 1: App Showcase
```
┌─────────────────────────────────────────────────────────┐
│  [App Icon]                                             │
│                                                         │
│  CSMC - Valley of Mercy                                │
│  Your Spiritual Companion                               │
│                                                         │
│  [Phone mockup showing app interface]                  │
└─────────────────────────────────────────────────────────┘
```

#### Layout Suggestion 2: Feature Highlights
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  Connect • Worship • Grow                               │
│                                                         │
│  [Icon] Sermons  [Icon] Events  [Icon] Community       │
│                                                         │
│  Download the VOM Church App                            │
└─────────────────────────────────────────────────────────┘
```

#### Layout Suggestion 3: Background + Tagline
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│           CSMC - Valley of Mercy                        │
│                                                         │
│      Your Faith Community in Your Pocket                │
│                                                         │
│    [Gradient background with church/community imagery]  │
└─────────────────────────────────────────────────────────┘
```

### Design Elements to Include
1. **App Name:** "CSMC - Valley of Mercy" or "Valley of Mercy"
2. **Tagline:** Choose one:
   - "Your Spiritual Companion"
   - "Faith Community Connected"
   - "Stay Connected, Grow Together"
   - "Your Church, Anytime, Anywhere"
3. **App Icon:** Include your 512×512 icon
4. **Visual Elements:**
   - Church imagery (building, cross, community)
   - Phone mockup (optional)
   - Feature icons
   - Background gradient or image

### Brand Colors to Use
From your app configuration:
- **Primary Dark:** `#0D0D2B`
- **Primary Light:** `#E5F2FF`
- **Accent/Brand:** Use your brand color

### Typography Guidelines
- **App Name:** Large, bold, easy to read
- **Tagline:** Medium size, supporting text
- **Font:** Use clean, professional fonts
  - San-serif recommended (Roboto, Open Sans, Montserrat)
  - Ensure readability at thumbnail size

### What to Avoid
- ❌ Too much text (will be unreadable when small)
- ❌ Busy backgrounds that distract
- ❌ Low contrast text
- ❌ Stretched or distorted images
- ❌ Generic stock photos without customization
- ❌ Misleading imagery (show actual app features)

### Quality Checklist
- [ ] Exactly 1024px × 500px
- [ ] High resolution (crisp at full size)
- [ ] Text is readable even at small preview size
- [ ] Includes app branding (icon/name)
- [ ] Visually striking and professional
- [ ] Matches brand identity
- [ ] No offensive or policy-violating content
- [ ] Under 15 MB file size
- [ ] Works well in both light/dark store themes

---

## 3. Additional Visual Assets (Optional but Recommended)

### Promotional Graphics
While not required for initial launch, consider creating:

1. **Promo Graphic (180px × 120px)**
   - Used in various Google Play promotions
   - Thumbnail version of feature graphic

2. **TV Banner (1280px × 720px)**
   - If supporting Android TV
   - Landscape orientation

3. **Social Media Graphics**
   - Share on church social media
   - Drive downloads
   - Sizes: 1200×630 (Facebook), 1080×1080 (Instagram)

---

## Design Tools & Resources

### Free Design Tools
1. **Canva** (https://canva.com)
   - Easy drag-and-drop
   - Many templates
   - Free tier available
   - Specific dimensions support

2. **Figma** (https://figma.com)
   - Professional design tool
   - Free for personal use
   - Collaborative
   - Precise control

3. **GIMP** (https://gimp.org)
   - Free Photoshop alternative
   - Full-featured
   - Steeper learning curve

### Paid Tools (Professional)
1. **Adobe Photoshop**
   - Industry standard
   - Complete control
   - $10-55/month

2. **Sketch** (Mac only)
   - Popular for app design
   - $99/year

3. **Affinity Designer**
   - One-time purchase ($54.99)
   - Professional features

### Stock Photos & Icons
1. **Unsplash** (https://unsplash.com) - Free photos
2. **Pexels** (https://pexels.com) - Free photos & videos
3. **Flaticon** (https://flaticon.com) - Free icons
4. **Icons8** (https://icons8.com) - Icons & illustrations

### Mockup Generators
1. **Mockuuups** (https://mockuuups.studio) - Device mockups
2. **Smartmockups** (https://smartmockups.com) - Online generator
3. **PlaceIt** (https://placeit.net) - Templates

---

## Sample Feature Graphic Design Brief

If you're hiring a designer, provide this brief:

```
PROJECT: Google Play Feature Graphic
APP: CSMC - Valley of Mercy Mobile App

DIMENSIONS: 1024px × 500px (PNG)

BRAND COLORS:
- Dark: #0D0D2B
- Light: #E5F2FF
- [Your accent color]

MUST INCLUDE:
- App icon (provided separately)
- App name: "CSMC - Valley of Mercy"
- Tagline: "Your Spiritual Companion" (or alternative)

STYLE:
- Modern, clean, professional
- Inspirational/uplifting feel
- Suitable for Christian church audience
- Should appeal to all ages

REFERENCES:
- Church community app
- Faith-based mobile applications
- Clean, modern design aesthetic

DELIVERABLES:
- 1024×500px PNG (high quality)
- Source file (PSD, Figma, or AI)
- Variations if possible (light/dark versions)

INSPIRATION:
- [Include links to similar apps' feature graphics]
- [Your church website or branding materials]
```

---

## Quick Start Guide

### DIY Approach (Using Canva)
1. **Create Account:** Sign up at canva.com
2. **Custom Dimensions:** Click "Custom size" → 1024 × 500 px
3. **Choose Template:** Search "App Banner" or start blank
4. **Add Elements:**
   - Upload your app icon
   - Add text: App name + tagline
   - Choose background (gradient, image, or color)
   - Add decorative elements (icons, shapes)
5. **Brand Colors:** Use color picker for #0D0D2B and #E5F2FF
6. **Download:** PNG format, highest quality
7. **Review:** Check dimensions (must be exactly 1024×500)

### Time Estimate
- **DIY (Canva):** 30-60 minutes
- **Figma/Photoshop:** 1-2 hours
- **Hire Designer:** 1-3 days turnaround

---

## Pre-Upload Validation

Before uploading to Google Play Console:

### App Icon
```bash
# Check dimensions
file adaptive-icon-2.png
# Should show: 512 x 512

# Check file size
ls -lh adaptive-icon-2.png
# Should be < 1 MB
```

### Feature Graphic
```bash
# Check dimensions
file feature-graphic.png
# Should show: 1024 x 500

# Check file size
ls -lh feature-graphic.png
# Should be < 15 MB
```

### Visual Review
- Open files at 100% zoom
- Check for pixelation or blur
- Verify text readability
- Ensure colors are accurate
- Preview at small size (how it appears in store)

---

## Common Mistakes to Avoid

1. **Wrong Dimensions**
   - Not exactly 1024×500 (feature graphic)
   - Not exactly 512×512 (icon)
   - → Rejection or poor display

2. **Text Too Small**
   - Feature graphic text unreadable when thumbnail
   - → Low conversion rate

3. **Low Resolution**
   - Blurry or pixelated graphics
   - → Unprofessional appearance

4. **Brand Inconsistency**
   - Colors don't match app
   - Different style from app interface
   - → Confuses users

5. **File Format Issues**
   - Wrong color space (use sRGB)
   - Corrupted files
   - → Upload failures

6. **Policy Violations**
   - Misleading imagery
   - Copyrighted content without permission
   - → App rejection

---

## Final Checklist

### Before Submission
- [ ] App icon: 512×512px, under 1 MB ✓
- [ ] Feature graphic: 1024×500px, under 15 MB
- [ ] Both files: PNG format
- [ ] Brand colors used consistently
- [ ] Text is readable at small sizes
- [ ] No typos in text elements
- [ ] Files properly named
- [ ] Visual quality reviewed
- [ ] Tested on different screen sizes/backgrounds
- [ ] Backup/source files saved

### After Upload
- [ ] Preview in Google Play Console
- [ ] Check how it displays in store listing
- [ ] Test on actual device (view store page)
- [ ] Get feedback from team/church members
- [ ] Make revisions if needed

---

**Need Help?**
- Google Play Asset Guidelines: https://support.google.com/googleplay/android-developer/answer/9866151
- Material Design Icons: https://material.io/icons/
- Design Feedback: Share with your church leadership team

---

*Document created: December 17, 2025*
*For: CSMC - Valley of Mercy Mobile App*
