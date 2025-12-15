# ✅ Deployment Checklist - Club5 AI

השתמש ברשימה הזו כדי לעקוב אחרי ההתקדמות שלך לקראת פרסום!

---

## 📅 Phase 1: Preparation (2-4 hours)

### 🎨 Graphics & Assets

- [ ] **Option A: Use provided templates**
  - [ ] Install sharp: `npm install sharp`
  - [ ] Run conversion: `npm run convert-assets`
  - [ ] Verify all PNGs created in `/assets`
    - [ ] icon.png (1024×1024)
    - [ ] splash.png (2048×2732)
    - [ ] adaptive-icon.png (1024×1024)
    - [ ] notification-icon.png (96×96)
    - [ ] favicon.png (48×48)

- [ ] **Option B: Create custom graphics**
  - [ ] Design app icon (1024×1024)
  - [ ] Design splash screen (2048×2732)
  - [ ] Design adaptive icon (1024×1024)
  - [ ] Design notification icon (96×96)
  - [ ] Save all as PNG in `/assets`

- [ ] **Option C: Hire designer (Fiverr)**
  - [ ] Find designer ($15-50)
  - [ ] Provide brand guidelines
  - [ ] Receive all assets
  - [ ] Place in `/assets` folder

### 📸 Screenshots

- [ ] Run app on device/simulator
- [ ] Take 4-8 screenshots:
  - [ ] Home screen (I'm Awake button)
  - [ ] Home screen (with confetti)
  - [ ] Coach screen (Deep Mode)
  - [ ] Progress screen (calendar)
  - [ ] Settings screen
  - [ ] (Optional) Onboarding
  - [ ] (Optional) Achievements
  - [ ] (Optional) Coach selection

- [ ] Resize for stores:
  - [ ] **iOS:** 1290×2796 (iPhone 15 Pro Max)
  - [ ] **iOS:** 1242×2688 (iPhone 11 Pro Max)
  - [ ] **Android:** 1080×1920 or 1080×2340

- [ ] Add text overlays (optional but recommended)
- [ ] Save in organized folder

### 📄 Legal & Privacy

- [ ] Read `PRIVACY_POLICY.md`
- [ ] Customize contact info if needed
- [ ] Setup GitHub Pages:
  - [ ] Create GitHub repository
  - [ ] Upload `privacy-policy.html`
  - [ ] Enable GitHub Pages
  - [ ] Test URL works
  - [ ] Copy URL for later

### 💳 Accounts & Payments

- [ ] **Google Play Console**
  - [ ] Create account
  - [ ] Pay $25 (one-time)
  - [ ] Wait for approval (24-48h)

- [ ] **Apple Developer** (if iOS)
  - [ ] Enroll in program
  - [ ] Pay $99/year
  - [ ] Wait for approval (24-48h)

- [ ] **Expo Account**
  - [ ] Sign up (free)
  - [ ] Verify email

---

## 📅 Phase 2: Configuration (30-60 min)

### 🔧 Development Setup

- [ ] Prerequisites installed:
  - [ ] Node.js 18+ (`node --version`)
  - [ ] npm or yarn
  - [ ] Git (optional)

- [ ] Project setup:
  ```bash
  cd mobile
  npm install
  ```

### 🤖 EAS CLI

- [ ] Install globally:
  ```bash
  npm install -g eas-cli
  ```

- [ ] Login:
  ```bash
  eas login
  ```

- [ ] Initialize project:
  ```bash
  eas init
  ```
  - [ ] Choose project name
  - [ ] Note the `projectId`

### ⚙️ Update Configuration

- [ ] Open `app.json`
- [ ] Replace `YOUR_EAS_PROJECT_ID_HERE` with your projectId
- [ ] Verify bundle identifiers:
  - [ ] iOS: `com.club5ai.app` (or your choice)
  - [ ] Android: `com.club5ai.app` (or your choice)
- [ ] Update version if needed (default: 1.0.0)

### ✅ Pre-Deployment Check

- [ ] Run verification:
  ```bash
  npm run pre-deploy-check
  ```

- [ ] All checks passed (all ✅)
- [ ] If any ❌, fix issues before continuing

---

## 📅 Phase 3: Build (20-60 min)

### 🤖 Android Build

#### Preview Build (for testing)

- [ ] Build APK:
  ```bash
  npm run build:android:preview
  ```

- [ ] Wait for build (~15-20 min)
- [ ] Download APK
- [ ] Install on Android device
- [ ] Test all features:
  - [ ] Onboarding flow
  - [ ] Check-in button
  - [ ] Confetti animation
  - [ ] Coach screen
  - [ ] Progress calendar
  - [ ] Settings
  - [ ] Theme switching
  - [ ] All navigation
- [ ] Fix any bugs found

#### Production Build

- [ ] Build AAB:
  ```bash
  npm run build:android:production
  ```

- [ ] Wait for build (~20-30 min)
- [ ] Download AAB file
- [ ] Save in safe location

### 🍎 iOS Build (if publishing to App Store)

- [ ] Build IPA:
  ```bash
  npm run build:ios:production
  ```

- [ ] EAS will ask questions:
  - [ ] Generate certificate? → YES
  - [ ] Generate provisioning profile? → YES

- [ ] Wait for build (~20-40 min)
- [ ] Download IPA file
- [ ] (Optional) Test via TestFlight

---

## 📅 Phase 4: Google Play Submission (1-2 hours + 1-7 days wait)

### 📝 Store Listing

- [ ] Open `store-listings/google-play-listing.md`
- [ ] Login to [Google Play Console](https://play.google.com/console)
- [ ] Create new app
- [ ] Fill in details:
  - [ ] App name
  - [ ] Default language
  - [ ] App/Game: App
  - [ ] Free/Paid: Free

### 🎨 Graphics Upload

- [ ] **App icon** (512×512)
- [ ] **Feature graphic** (1024×500)
  - Create in Figma/Canva
  - Banner with logo + tagline
- [ ] **Screenshots** (minimum 2, recommend 4-8)
  - Phone screenshots
  - (Optional) Tablet screenshots

### 📄 Store Details

- [ ] **Short description** (80 chars)
  - Copy from listing.md
- [ ] **Full description** (4000 chars)
  - Copy from listing.md (English or Hebrew)
- [ ] **App category**
  - Primary: Productivity
  - Secondary: Health & Fitness
- [ ] **Contact details**
  - Email: support@club5ai.com
  - (Optional) Website
  - (Optional) Phone
- [ ] **Privacy Policy URL**
  - Paste your GitHub Pages URL

### 🔞 Content Rating

- [ ] Start questionnaire
- [ ] Answer all questions (all "No" for Club5 AI)
- [ ] Receive rating (should be "Everyone")

### 🔒 Data Safety

- [ ] Does your app collect data? → **NO**
- [ ] This gives you "No data collected" badge! 🎉

### 📦 Upload AAB

- [ ] **Production** → **Create new release**
- [ ] Upload your AAB file
- [ ] Release name: `1.0.0 - Initial Release`
- [ ] Release notes:
  ```
  🎉 First release of Club5 AI!
  
  ✨ Features:
  - Daily 5AM check-in
  - AI coaches (Natalie & Max)
  - 30-day progress tracking
  - Achievement milestones
  - Dark mode support
  
  Your 5AM journey starts now!
  ```

### 🚀 Submit

- [ ] Review everything
- [ ] **Start rollout to Production**
- [ ] 🎉 Submitted!

### ⏱️ Wait for Approval

- [ ] Check email for updates
- [ ] Typical: 1-3 days
- [ ] Maximum: 7 days
- [ ] If rejected: read feedback, fix, resubmit

---

## 📅 Phase 5: App Store Submission (2-3 hours + 1-2 days wait)

### 📱 App Store Connect

- [ ] Open `store-listings/app-store-listing.md`
- [ ] Login to [App Store Connect](https://appstoreconnect.apple.com)
- [ ] **My Apps** → **New App**
- [ ] Fill in:
  - [ ] Platform: iOS
  - [ ] Name: Club5 AI
  - [ ] Primary Language: English (or Hebrew)
  - [ ] Bundle ID: com.club5ai.app
  - [ ] SKU: club5-ai-001

### 📄 App Information

- [ ] **Subtitle** (30 chars)
- [ ] **Category**
  - Primary: Productivity
  - Secondary: Health & Fitness
- [ ] **Privacy Policy URL**
  - Your GitHub Pages URL
- [ ] **Support URL**

### 💰 Pricing

- [ ] Price: Free
- [ ] Availability: All countries

### 📸 Screenshots

- [ ] **6.7" Display** (1290×2796) - REQUIRED
  - Upload 3-10 screenshots
- [ ] **6.5" Display** (1242×2688) - REQUIRED
  - Upload 3-10 screenshots

### 📝 Description

- [ ] **Promotional Text** (170 chars)
- [ ] **Description** (4000 chars)
- [ ] **Keywords** (100 chars)
  - No spaces, comma-separated

### 🆕 Version Information

- [ ] **What's New**
  ```
  🎉 Welcome to Club5 AI!
  
  Join the 5AM club with AI coaching.
  
  ✨ Features:
  • Daily check-in
  • AI coaches
  • Progress tracking
  • Achievements
  • Dark mode
  
  Your 5AM journey starts now!
  ```

- [ ] Select build (your uploaded IPA)

### 🔞 Age Rating

- [ ] Answer questionnaire
- [ ] All "No" → Rating: 4+

### 🔒 App Privacy

- [ ] Does app collect data? → **NO**
- [ ] Get "No Data Collected" badge! 🎉

### 📤 Upload IPA

**Option A: EAS Submit (recommended)**
```bash
npm run submit:ios
```

**Option B: Transporter**
- [ ] Download Transporter app
- [ ] Drag & drop IPA
- [ ] Sign in with Apple ID
- [ ] Deliver

### 📋 Review Information

- [ ] **Notes for reviewer**
  ```
  This app helps users wake up at 5AM.
  
  Testing:
  1. Complete onboarding
  2. Tap "I'm Awake"
  3. Explore AI coach
  4. Check progress
  5. Customize settings
  
  All data stored locally.
  Contact: support@club5ai.com
  ```

- [ ] Contact information (yours)

### 🚀 Submit

- [ ] **Add for Review**
- [ ] **Submit to App Review**
- [ ] 🎉 Submitted!

### ⏱️ Wait for Approval

- [ ] Check email
- [ ] Typical: 24-48 hours
- [ ] If rejected: check Resolution Center, fix, resubmit

---

## 📅 Phase 6: Launch! 🎉

### ✅ App Approved

- [ ] **Google Play**
  - [ ] Receive approval email
  - [ ] App live in 2-3 hours
  - [ ] Find your app:
    ```
    https://play.google.com/store/apps/details?id=com.club5ai.app
    ```

- [ ] **App Store**
  - [ ] Receive approval email
  - [ ] App live in 24 hours
  - [ ] Find your app:
    ```
    https://apps.apple.com/app/club5-ai/[APP_ID]
    ```

### 🎊 Celebrate!

- [ ] Download your own app
- [ ] Take screenshots
- [ ] Share with friends/family
- [ ] Post on social media
- [ ] Share on LinkedIn

### 📣 Marketing (optional)

- [ ] Create landing page
- [ ] Social media posts
- [ ] Product Hunt launch
- [ ] Reddit communities (r/productivity, r/getdisciplined)
- [ ] Email list
- [ ] Blog post

### 📊 Monitor

- [ ] Check install numbers daily
- [ ] Read reviews
- [ ] Respond to reviews (thank good ones, address bad ones)
- [ ] Track crashes (if any)
- [ ] Collect feedback

---

## 📅 Phase 7: Maintenance & Updates

### 🔄 OTA Updates (for quick fixes)

For JavaScript/React changes only:

```bash
npm run update:production "Bug fixes and improvements"
```

Users get update on next app open!

**When to use:**
- ✅ Bug fixes
- ✅ UI tweaks
- ✅ Text changes
- ✅ Logic updates

**When NOT to use:**
- ❌ New permissions
- ❌ Native module changes
- ❌ SDK updates

### 🏗️ Full App Updates (for major changes)

- [ ] Update version in `app.json`:
  ```json
  {
    "version": "1.1.0",
    "ios": { "buildNumber": "2" },
    "android": { "versionCode": 2 }
  }
  ```

- [ ] Build new version:
  ```bash
  npm run build:all
  ```

- [ ] Submit to stores:
  ```bash
  npm run submit:all
  ```

- [ ] Update release notes
- [ ] Wait for approval

### 📧 User Support

- [ ] Setup support email: support@club5ai.com
- [ ] Respond to user emails within 24-48h
- [ ] Create FAQ page
- [ ] Address common issues

### 📈 Analytics (optional)

If you want to add analytics:

- [ ] Setup Firebase Analytics
- [ ] Setup Sentry for crash reporting
- [ ] **Update Privacy Policy** if collecting data!

---

## 🎯 Final Checklist

Before going live, verify:

### Technical:
- [x] All builds successful
- [x] APK/IPA tested on real devices
- [x] All features working
- [x] No console errors
- [x] No crashes
- [x] Notifications working
- [x] Dark mode working
- [x] All navigation smooth

### Content:
- [x] App name correct
- [x] Descriptions error-free
- [x] Screenshots high-quality
- [x] Privacy Policy accessible
- [x] Contact info correct
- [x] No typos in store listings

### Legal:
- [x] Privacy Policy published
- [x] Terms (if applicable)
- [x] Age rating correct
- [x] Content rating accurate
- [x] No copyrighted content

### Marketing:
- [ ] Social media accounts ready
- [ ] Landing page created (optional)
- [ ] Email list setup (optional)
- [ ] Launch plan (optional)

---

## 🆘 If Something Goes Wrong

### Build fails?
```bash
eas build:clear
eas build --platform android --profile production --clear-cache
```

### Pre-check fails?
```bash
npm run pre-deploy-check
```
Fix each ❌ item shown.

### Store rejects app?
1. Read rejection reason carefully
2. Check email for details
3. Fix the issue
4. Resubmit

### Can't find your app after publish?
- Wait 2-24 hours
- Search by exact package name
- Check in different country stores

---

## 📞 Need Help?

- **Guides:** Re-read START_HERE.md, STEP_BY_STEP.md
- **Expo:** https://chat.expo.dev
- **Google Play:** https://support.google.com/googleplay/android-developer
- **App Store:** https://developer.apple.com/support/
- **Email:** support@club5ai.com

---

## 🎉 Congratulations!

**You made it!** 🌅

Your app is live and people are waking up at 5AM thanks to you!

---

**Print this checklist and check off items as you go!** 📋✅

**Estimated total time:** 3-14 days from start to live app

**Good luck!** 🚀
