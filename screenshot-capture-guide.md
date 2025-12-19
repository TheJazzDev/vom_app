# Screenshot Capture Guide for Google Play Store
## CSMC - Valley of Mercy Mobile App

---

## Technical Requirements
- **Format:** PNG or JPEG (PNG recommended for better quality)
- **Aspect Ratio:** 9:16 (portrait) - standard phone format
- **Recommended Size:** 1080px × 2400px (or 1080px × 1920px)
- **Min/Max:** Between 320px and 3,840px per side
- **File Size:** Maximum 8 MB per screenshot
- **Quantity:** Minimum 2, maximum 8 (recommend 6-8 for best presentation)

---

## Recommended Screenshots (In Order)

### Screenshot 1: Onboarding/Welcome Screen
**Purpose:** First impression of the app

**What to capture:**
- The onboarding carousel or welcome screen
- Show the app's value proposition

**Setup:**
- Use a clean device with full battery
- Good time display (10:00 or 2:30)
- Full signal strength
- Light mode preferred

**File name:** `01_welcome_screen.png`

---

### Screenshot 2: Home Dashboard
**Purpose:** Show the main hub of activity

**What to capture:**
- Home screen with recent announcements
- Quick access buttons to main features
- Show notifications badge if available

**Notes:**
- Make sure there's actual content (not empty state)
- Profile should be filled out

**File name:** `02_home_dashboard.png`

---

### Screenshot 3: Ministry - Recent Sermons
**Purpose:** Highlight spiritual content access

**What to capture:**
- Ministry tab with "Recent Sermons" section
- List of sermon titles with dates
- Show attractive sermon thumbnails if available

**Navigation:**
1. Tap "Ministry" tab
2. Ensure "Recent Sermons" is visible or navigate to it
3. Scroll to show 3-4 sermon entries

**File name:** `03_ministry_sermons.png`

---

### Screenshot 4: Prayer Requests
**Purpose:** Showcase community support feature

**What to capture:**
- Prayer request submission form OR list of prayer requests
- Shows community engagement

**Navigation:**
1. Tap "Ministry" tab
2. Navigate to "Prayer Request"
3. Show either the form or list view (whichever looks better)

**File name:** `04_prayer_requests.png`

---

### Screenshot 5: Church Programmes
**Purpose:** Display event management capabilities

**What to capture:**
- Programme listing showing upcoming events
- Include event titles, dates, and times
- Show the organized, easy-to-browse layout

**Navigation:**
1. Tap "Programme" tab
2. Select "Upcoming" or "Current" programmes
3. Ensure multiple events are visible

**File name:** `05_church_programmes.png`

---

### Screenshot 6: Member Directory
**Purpose:** Demonstrate community connection

**What to capture:**
- Directory with member listings OR
- Departments/Bands organization view

**Navigation:**
1. Tap "Directory" tab
2. Show "Members", "Departments", or "Bands" section
3. Display a populated list (not empty)

**Important:**
- Blur or use placeholder names if using real member data
- Or use test data for privacy

**File name:** `06_member_directory.png`

---

### Screenshot 7: Announcements/Events
**Purpose:** Show information distribution

**What to capture:**
- Announcements feed OR
- Detailed announcement view

**Navigation:**
1. Tap "More" tab
2. Navigate to "Announcements" or "Events"
3. Show list with 3-5 announcements

**File name:** `07_announcements.png`

---

### Screenshot 8: Profile/Account
**Purpose:** Personalization and user management

**What to capture:**
- User profile screen with personal info
- Membership details visible
- Shows professional, organized data display

**Navigation:**
1. Tap profile/account section
2. Ensure profile is filled with sample data
3. Show clean, readable information layout

**Privacy Note:** Use test data or blur sensitive information

**File name:** `08_user_profile.png`

---

## Capture Best Practices

### Device Preparation
1. **Use a clean device state:**
   - Full battery (100% or use design mode)
   - Full signal strength
   - Good time display (10:00 AM, 2:30 PM, etc.)
   - Remove any distracting notification badges

2. **Screen Recording Method (Easiest):**
   - Use Android emulator or physical device
   - Navigate through each screen
   - Take screenshots using device buttons or emulator controls

3. **Development Build:**
   - Use a production build, not development
   - Disable any debug overlays
   - Hide developer tools

### Content Guidelines
1. **Use Real-Looking Data:**
   - Fill forms and lists with realistic content
   - Avoid Lorem Ipsum text
   - Use actual sermon titles, realistic event names
   - But don't use real member personal data

2. **Visual Appeal:**
   - Choose light mode for consistency (unless showcasing dark mode)
   - Ensure images and icons load properly
   - Show full content, not loading states
   - No error messages visible

3. **Language & Region:**
   - Use English content
   - Set device locale to appropriate region
   - Ensure dates/times are formatted correctly

### Post-Capture Editing (Optional but Recommended)

1. **Add Device Frame:**
   - Use tools like Figma, Sketch, or online frame generators
   - Adds professional polish
   - Makes screenshots stand out

2. **Add Captions/Annotations:**
   - Brief text highlighting key feature
   - Keep it minimal and professional
   - Use brand colors

3. **Optimize File Size:**
   - Compress PNG files if needed
   - Stay under 8 MB limit
   - Use tools like TinyPNG or ImageOptim
   - Don't over-compress (maintain quality)

---

## Screenshot Capture Commands

### Using Android Studio Emulator
```bash
# Take screenshot with adb
adb shell screencap -p /sdcard/screenshot.png
adb pull /sdcard/screenshot.png

# Or use Android Studio's built-in screenshot tool
# Click the camera icon in the emulator toolbar
```

### Using Physical Android Device
1. Press **Power + Volume Down** simultaneously
2. Screenshots saved to `/Pictures/Screenshots/`
3. Transfer via USB or cloud storage

### Using Expo Development Build
```bash
# Run the app
expo start

# Navigate to each screen in the app
# Use device screenshot functionality
```

---

## Quality Checklist

Before uploading screenshots, verify:

- [ ] All screenshots are 9:16 aspect ratio
- [ ] Resolution is at least 1080px × 1920px
- [ ] File size under 8 MB per screenshot
- [ ] No personal/sensitive data visible
- [ ] No debug information or developer tools showing
- [ ] Good lighting/contrast (readable text)
- [ ] Status bar shows good signal/battery
- [ ] Content is loaded (no loading spinners)
- [ ] Text is crisp and readable
- [ ] Images/icons render properly
- [ ] Screenshots show variety of features
- [ ] Ordered logically (onboarding → features → profile)
- [ ] Consistent theme (all light or all dark mode)
- [ ] File names are organized and sequential

---

## Helpful Tools

### Screenshot Enhancement
- **Figma** - Add device frames, annotations
- **Canva** - Quick editing and frames
- **Mockuphone** - Device mockup generator
- **Previewed** - Professional app screenshots

### Image Optimization
- **TinyPNG** - Compress PNG files
- **ImageOptim** (Mac) - Batch optimization
- **Squoosh** - Web-based image compression

### Frame Generators
- https://mockuphone.com/
- https://previewed.app/
- https://screenshots.pro/

---

## Tips for Success

1. **Tell a Story:** Order screenshots to show user journey
2. **Highlight USPs:** Make sure unique features are visible
3. **Show Value:** Each screenshot should demonstrate a benefit
4. **Stay Fresh:** Update screenshots when UI changes significantly
5. **Test Visibility:** View thumbnails to ensure text is readable
6. **A/B Test:** If possible, try different screenshot orders
7. **Localize Later:** Start with English, add languages as needed

---

## Next Steps After Capture

1. Review all screenshots for quality
2. Organize files numerically (01, 02, 03...)
3. Create feature graphic (1024×500px)
4. Prepare app icon if not already done (512×512px)
5. Upload to Google Play Console
6. Write captions for each screenshot (optional but helpful)
7. Preview how they look in the store listing

---

**Good luck with your app launch! 🚀**

*Last updated: December 17, 2025*
