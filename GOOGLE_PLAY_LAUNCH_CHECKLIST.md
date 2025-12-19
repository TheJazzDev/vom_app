# Google Play Store Launch Checklist
## CSMC - Valley of Mercy Mobile App

> **Quick Reference:** Complete action plan for publishing your app to Google Play Store

---

## 📋 Overview

This checklist guides you through all requirements for submitting your app to Google Play Store. Files have been created with all necessary content and specifications.

**Created Files:**
1. `play-store-listing.md` - Complete listing details with specifications
2. `play-store-text-only.txt` - Copy-paste ready text content
3. `screenshot-capture-guide.md` - How to capture app screenshots
4. `graphic-assets-specs.md` - Design specs for icon and feature graphic
5. `GOOGLE_PLAY_LAUNCH_CHECKLIST.md` - This file

---

## ✅ Phase 1: Text Content (READY TO USE)

### App Name
```
CSMC - Valley of Mercy
```
**Status:** ✅ Ready (29/30 characters)

**Action:**
- [ ] Copy from `play-store-text-only.txt`
- [ ] Paste into Google Play Console → Store Listing → App Name

---

### Short Description
```
Your spiritual companion - sermons, events, prayer requests & church community
```
**Status:** ✅ Ready (79/80 characters)

**Action:**
- [ ] Copy from `play-store-text-only.txt`
- [ ] Paste into Google Play Console → Store Listing → Short Description

---

### Full Description
**Status:** ✅ Ready (1,850/4,000 characters)

**Action:**
- [ ] Copy from `play-store-text-only.txt`
- [ ] Paste into Google Play Console → Store Listing → Full Description
- [ ] Preview how it looks in the console
- [ ] Make minor edits if desired (optional)

---

## 🎨 Phase 2: Graphic Assets (TO CREATE)

### 1. App Icon (512px × 512px)

**Current Asset:** `./src/assets/images/adaptive-icon-2.png`

**Actions:**
- [ ] Verify dimensions are exactly 512×512px
- [ ] Verify file size is under 1 MB
- [ ] Ensure it's PNG with good quality
- [ ] Test how it looks at small sizes (48px)
- [ ] Upload to Google Play Console

**Need to create new icon?**
- See `graphic-assets-specs.md` for design guidelines
- Use Canva, Figma, or hire a designer

**Verification Commands:**
```bash
cd /Users/jazzdev/Documents/Programming/vom/vom_app
file src/assets/images/adaptive-icon-2.png
ls -lh src/assets/images/adaptive-icon-2.png
```

---

### 2. Feature Graphic (1024px × 500px) - REQUIRED

**Status:** ⚠️ NEEDS CREATION

**Actions:**
- [ ] Create 1024×500px graphic
- [ ] Include app icon, name, and tagline
- [ ] Use brand colors (#0D0D2B, #E5F2FF)
- [ ] Keep text large and readable
- [ ] Save as PNG, under 15 MB
- [ ] Upload to Google Play Console

**Tools to Use:**
- **Easy:** Canva.com (free templates)
- **Professional:** Figma, Photoshop
- **Outsource:** Hire designer on Fiverr/Upwork

**Design Guidelines:**
- See `graphic-assets-specs.md` for detailed specs
- Suggested tagline: "Your Spiritual Companion"
- Must be visually striking (first impression!)

---

## 📱 Phase 3: Screenshots (TO CAPTURE)

**Status:** ⚠️ NEEDS CREATION
**Requirement:** Minimum 2, recommend 6-8

### Recommended Screenshots:
1. ✓ **Welcome/Onboarding** - First screen users see
2. ✓ **Home Dashboard** - Main hub with announcements
3. ✓ **Ministry/Sermons** - Spiritual content access
4. ✓ **Prayer Requests** - Community support feature
5. ✓ **Church Programmes** - Events listing
6. ✓ **Member Directory** - Community connection
7. ✓ **Announcements** - Stay informed feature
8. ✓ **Profile** - User account management

### Actions:
- [ ] Review `screenshot-capture-guide.md` for detailed instructions
- [ ] Prepare device (clean state, good battery/signal display)
- [ ] Load app with realistic data (not empty states)
- [ ] Capture 6-8 screenshots at 1080×1920px or higher
- [ ] Save as PNG, under 8 MB each
- [ ] Optional: Add device frames for polish
- [ ] Upload to Google Play Console in order

### Quick Capture Method:
```bash
# Run your app
cd /Users/jazzdev/Documents/Programming/vom/vom_app
expo start

# Use emulator or device screenshot function:
# Android: Power + Volume Down
# Emulator: Camera icon in toolbar

# Organize files:
# 01_welcome.png
# 02_home.png
# 03_ministry.png
# ... etc
```

---

## 📝 Phase 4: Additional Required Information

### App Details

#### Category
- [ ] Select **Lifestyle** as primary category
- [ ] Consider **Social** as secondary if available

#### Contact Details
- [ ] **Email:** your-support-email@vom.church
- [ ] **Phone:** (Optional but recommended)
- [ ] **Website:** https://vom.church

#### Privacy Policy
- [ ] Create privacy policy (required for apps collecting user data)
- [ ] Host on vom.church/privacy or Google Docs
- [ ] Enter URL in Google Play Console

**Privacy Policy Must Cover:**
- What data you collect (names, email, phone, etc.)
- How you use the data
- How you protect the data
- User rights (access, deletion, etc.)
- Contact information

**Need help?** Use online privacy policy generators:
- https://www.freeprivacypolicy.com/
- https://www.termsfeed.com/privacy-policy-generator/

---

### Content Rating
- [ ] Complete content rating questionnaire
- [ ] Should result in "Everyone" rating
- [ ] Indicate it contains religious content

### Pricing & Distribution
- [ ] Set as **Free** (assuming no in-app purchases)
- [ ] Select countries for distribution
- [ ] Agree to content guidelines

---

## 🚀 Phase 5: App Bundle/APK

### Build Your App
```bash
cd /Users/jazzdev/Documents/Programming/vom/vom_app

# For production build
eas build --platform android --profile production

# Or create AAB locally
expo build:android -t app-bundle
```

### Upload to Google Play
- [ ] Create production release
- [ ] Upload AAB (Android App Bundle) file
- [ ] Set version code and version name
- [ ] Add release notes

### Testing
- [ ] Test on internal track first
- [ ] Fix any issues
- [ ] Promote to production when ready

---

## 📊 Launch Phases (Recommended Approach)

### Phase 1: Internal Testing (Week 1)
- [ ] Upload AAB to internal testing track
- [ ] Add test users (church leadership, tech team)
- [ ] Gather feedback
- [ ] Fix critical bugs

### Phase 2: Closed Beta (Week 2)
- [ ] Move to closed testing track
- [ ] Invite church members (50-100 users)
- [ ] Collect feedback
- [ ] Refine features

### Phase 3: Open Beta (Week 3) - Optional
- [ ] Open to wider audience
- [ ] Monitor crash reports
- [ ] Address issues

### Phase 4: Production Launch (Week 4)
- [ ] Complete all store listing requirements
- [ ] Submit for review
- [ ] Wait for approval (usually 1-7 days)
- [ ] Announce launch to church community

---

## ⚡ Quick Start - Do This First!

If you want to get started immediately:

### Step 1: Create Google Play Developer Account
- [ ] Go to https://play.google.com/console
- [ ] Pay one-time fee ($25 USD)
- [ ] Complete registration
- [ ] Verify your account

### Step 2: Create New App
- [ ] Click "Create app" in console
- [ ] Enter app name: "CSMC - Valley of Mercy"
- [ ] Select default language: English (United States)
- [ ] Set as "App" (not game)
- [ ] Select "Free"
- [ ] Accept declarations

### Step 3: Fill Required Content
- [ ] Copy text from `play-store-text-only.txt`
- [ ] Paste into appropriate fields
- [ ] Save progress

### Step 4: Create Graphics
- [ ] Create feature graphic (1024×500)
- [ ] Verify app icon (512×512)
- [ ] Upload both

### Step 5: Capture Screenshots
- [ ] Follow `screenshot-capture-guide.md`
- [ ] Capture minimum 2 screenshots
- [ ] Upload to console

### Step 6: Complete Required Fields
- [ ] Set app category
- [ ] Add contact information
- [ ] Create and link privacy policy
- [ ] Complete content rating

### Step 7: Build and Upload
- [ ] Create signed AAB
- [ ] Upload to internal testing
- [ ] Test thoroughly

### Step 8: Submit for Review
- [ ] Review all sections for completeness
- [ ] Click "Send for review"
- [ ] Wait for approval

---

## 📞 Support Resources

### Google Play Help
- **Console:** https://play.google.com/console
- **Guidelines:** https://developer.android.com/distribute/best-practices/launch/launch-checklist
- **Policy:** https://play.google.com/about/developer-content-policy/
- **Support:** https://support.google.com/googleplay/android-developer

### Your Documentation
- `play-store-listing.md` - Complete reference guide
- `play-store-text-only.txt` - Copy-paste ready content
- `screenshot-capture-guide.md` - Screenshot instructions
- `graphic-assets-specs.md` - Design specifications

### Community Resources
- Stack Overflow: For technical questions
- Reddit r/androiddev: Developer community
- Expo Forums: For Expo-specific questions

---

## ⏱️ Time Estimates

| Task | Estimated Time |
|------|----------------|
| Create feature graphic | 1-2 hours (DIY) or 1-3 days (designer) |
| Capture screenshots | 30-60 minutes |
| Write privacy policy | 1-2 hours |
| Set up Google Play account | 30 minutes |
| Fill store listing | 15 minutes (text ready!) |
| Build production AAB | 15-30 minutes |
| Complete content rating | 15 minutes |
| **Total (if DIY graphics)** | **4-6 hours** |
| **Total (hire designer)** | **2-3 hours + wait time** |

---

## 🎯 Success Criteria

Your app is ready to submit when:

- ✅ All text fields filled (name, short desc, full desc)
- ✅ App icon uploaded (512×512px)
- ✅ Feature graphic uploaded (1024×500px)
- ✅ Minimum 2 screenshots uploaded (recommend 6-8)
- ✅ Privacy policy created and linked
- ✅ Content rating completed
- ✅ Contact information provided
- ✅ App category selected
- ✅ Production AAB built and uploaded
- ✅ App tested on internal track
- ✅ All policy checkboxes agreed to

---

## 🚨 Common Pitfalls to Avoid

1. **Wrong Graphic Sizes**
   - Feature graphic MUST be 1024×500 (not 1024×512!)
   - App icon MUST be 512×512

2. **Missing Privacy Policy**
   - Required if you collect ANY user data
   - Must be hosted on accessible URL

3. **Poor Screenshot Quality**
   - Too low resolution
   - Empty screens or loading states
   - Debug information visible

4. **Incomplete Content Rating**
   - Must complete questionnaire honestly
   - Affects discoverability

5. **APK Instead of AAB**
   - Google now requires AAB (Android App Bundle)
   - Not APK for new apps

6. **Forgetting to Test**
   - Always use internal testing first
   - Catch bugs before public launch

---

## 📈 Post-Launch Tasks

After your app is live:

- [ ] Monitor reviews and ratings
- [ ] Respond to user feedback
- [ ] Track analytics (installs, crashes)
- [ ] Plan regular updates
- [ ] Promote in church services
- [ ] Add to church website
- [ ] Share on social media
- [ ] Create QR code for easy download
- [ ] Gather user testimonials
- [ ] Plan feature improvements

---

## 🎉 You've Got This!

Everything you need is in these documents:

1. **Text Content:** ✅ Already written - just copy/paste
2. **Design Specs:** ✅ Detailed guidelines provided
3. **Screenshot Guide:** ✅ Step-by-step instructions
4. **Checklist:** ✅ Clear action items

**Estimated Time to Launch:** 4-6 hours of focused work (excluding designer wait time)

**Questions?** Review the detailed documents or reach out to Google Play support.

---

**Good luck with your launch! 🚀**

*Last Updated: December 17, 2025*
*CSMC - Valley of Mercy Mobile App*
*Package: com.jazzdev.vom*
