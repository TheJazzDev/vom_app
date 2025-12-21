#!/usr/bin/env node

/**
 * This script adds padding to the adaptive icon to make it appear smaller
 * Android adaptive icons should have the logo in the center 66% (safe zone)
 * The outer 33% may be cropped on different devices
 */

const fs = require('fs');
const path = require('path');

const instructions = `
==============================================================
RESIZE ADAPTIVE ICON FOR ANDROID
==============================================================

Your adaptive icon appears too large because it fills the entire canvas.
Android adaptive icons need transparent padding for the "safe zone".

OPTION 1: Use Online Tool (Easiest)
------------------------------------
1. Go to: https://icon.kitchen/
2. Upload your logo: src/assets/images/adaptive-icon-2.png
3. Set "Foreground" scaling to about 70-80%
4. Add padding if needed
5. Download the adaptive icon
6. Replace: src/assets/images/adaptive-icon-2.png

OPTION 2: Use Figma/Photoshop/GIMP
-----------------------------------
1. Open: src/assets/images/adaptive-icon-2.png
2. Canvas size: 1024x1024px (recommended for adaptive icons)
3. Your logo should fit within center 684x684px (66% safe zone)
4. Add transparent padding around the logo
5. Export as PNG
6. Replace: src/assets/images/adaptive-icon-2.png

OPTION 3: Quick Fix in app.json
--------------------------------
Add this to your android.adaptiveIcon config:

"adaptiveIcon": {
  "foregroundImage": "./src/assets/images/adaptive-icon-2.png",
  "monoIconImage": "./src/assets/images/adaptive-icon-2.png",
  "backgroundColor": "#0D0D2B"
}

Then rebuild your app with: eas build -p android --profile production-apk

SAFE ZONE GUIDE:
- Full canvas: 1024x1024px (100%)
- Safe zone (always visible): 684x684px (66%)
- May be cropped: outer 170px on each side

Current icon size: 500x500px
Recommended: Resize to 1024x1024px with logo centered in 684x684px area

==============================================================
`;

console.log(instructions);

// Check if sharp is available for automatic resizing
try {
  const sharp = require('sharp');
  console.log('\n✅ Sharp library detected! Running automatic resize...\n');

  const inputPath = path.join(__dirname, '../src/assets/images/adaptive-icon-2.png');
  const outputPath = path.join(__dirname, '../src/assets/images/adaptive-icon-2-resized.png');
  const backupPath = path.join(__dirname, '../src/assets/images/adaptive-icon-2-backup.png');

  // Backup original
  fs.copyFileSync(inputPath, backupPath);
  console.log('✓ Backed up original to: adaptive-icon-2-backup.png');

  // Resize with padding
  sharp(inputPath)
    .resize(684, 684, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .extend({
      top: 170,
      bottom: 170,
      left: 170,
      right: 170,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png()
    .toFile(outputPath)
    .then(() => {
      console.log('✓ Created resized icon: adaptive-icon-2-resized.png');
      console.log('\nTo use the new icon:');
      console.log('1. Review: src/assets/images/adaptive-icon-2-resized.png');
      console.log('2. If satisfied, replace the original:');
      console.log('   mv src/assets/images/adaptive-icon-2-resized.png src/assets/images/adaptive-icon-2.png');
      console.log('3. Rebuild your app');
    })
    .catch(err => {
      console.error('Error resizing:', err.message);
    });

} catch (err) {
  console.log('\n💡 TIP: Install sharp for automatic resizing:');
  console.log('   npm install --save-dev sharp');
  console.log('   node scripts/resize-adaptive-icon.js');
}
