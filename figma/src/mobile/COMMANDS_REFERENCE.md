# 💻 Commands Reference - כל הפקודות במקום אחד

מדריך מהיר לכל הפקודות שתצטרך להריץ.

---

## 🚀 Quick Start Commands

### Initial Setup (run once)

```bash
# 1. Install EAS CLI globally
npm install -g eas-cli

# 2. Login to Expo
eas login

# 3. Navigate to project
cd mobile

# 4. Install dependencies
npm install

# 5. Initialize EAS
eas init
# This creates projectId - copy it!

# 6. Install sharp for asset conversion
npm install sharp

# 7. Convert SVG assets to PNG
npm run convert-assets

# 8. Verify everything is ready
npm run pre-deploy-check
```

---

## 📱 Development Commands

### Start Development Server

```bash
# Start Expo dev server
npm start

# Or specific platform:
npm run android    # Android emulator/device
npm run ios        # iOS simulator (Mac only)
npm run web        # Browser
```

### Install New Package

```bash
# Add dependency
npm install package-name

# Or with Expo:
npx expo install package-name
```

---

## 🎨 Asset Commands

### Convert SVG to PNG

```bash
# Convert all assets (icon, splash, etc.)
npm run convert-assets
```

**This creates:**
- `assets/icon.png` (1024×1024)
- `assets/splash.png` (2048×2732)
- `assets/adaptive-icon.png` (1024×1024)
- `assets/notification-icon.png` (96×96)
- `assets/favicon.png` (48×48)

---

## ✅ Pre-Deployment Commands

### Check if Ready to Deploy

```bash
# Comprehensive check of all requirements
npm run pre-deploy-check
```

**Checks:**
- ✅ All config files exist
- ✅ All assets present
- ✅ Dependencies installed
- ✅ EAS configured
- ✅ Bundle IDs set

### Prepare for Deployment

```bash
# Convert assets + run checks
npm run prepare-deploy
```

---

## 🏗️ Build Commands

### Android Builds

```bash
# Preview build (APK for testing)
npm run build:android:preview
# Creates installable APK for testing on devices

# Production build (AAB for Play Store)
npm run build:android:production
# Creates AAB file for Google Play Console
```

### iOS Builds

```bash
# Preview build (IPA for testing)
npm run build:ios:preview
# Creates IPA for TestFlight testing

# Production build (IPA for App Store)
npm run build:ios:production
# Creates IPA for App Store Connect
```

### Both Platforms

```bash
# Build for both Android and iOS
npm run build:all
```

### Build with Options

```bash
# Clear cache and rebuild
eas build --platform android --profile production --clear-cache

# Build with specific profile
eas build --platform android --profile preview

# Non-interactive mode (CI/CD)
eas build --platform android --profile production --non-interactive
```

---

## 📦 Submission Commands

### Submit to Stores

```bash
# Submit to Google Play
npm run submit:android

# Submit to App Store
npm run submit:ios

# Submit to both
npm run submit:all
```

### Manual Submission (if needed)

```bash
# Android
eas submit --platform android

# iOS
eas submit --platform ios
```

---

## 🔄 Update Commands (OTA)

### Send Over-The-Air Update

```bash
# Production update
npm run update:production "Bug fixes and improvements"

# Preview update (for testing)
npm run update:preview "Testing new feature"
```

### Manual Update

```bash
# Update production branch
eas update --branch production --message "Your update message"

# Update preview branch
eas update --branch preview --message "Your update message"
```

**What can be updated via OTA:**
- ✅ JavaScript/TypeScript code
- ✅ React components
- ✅ Styling
- ✅ App logic

**What CANNOT be updated via OTA:**
- ❌ Native code changes
- ❌ New permissions
- ❌ SDK version changes
- ❌ app.json changes

---

## 📊 Project Management Commands

### View Builds

```bash
# List all builds
eas build:list

# View specific build
eas build:view [BUILD_ID]
```

### View Projects

```bash
# Show project info
eas project:info

# List your projects
eas project:list
```

### View Updates

```bash
# List all updates
eas update:list

# View specific update
eas update:view [UPDATE_ID]
```

---

## 🔐 Account Commands

### Login/Logout

```bash
# Login to Expo
eas login

# Logout
eas logout

# Check who is logged in
eas whoami
```

### Register New Account

```bash
eas register
```

---

## 🧹 Cleanup Commands

### Clear Caches

```bash
# Clear EAS build cache
eas build:clear

# Clear Expo cache
npx expo start --clear

# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules
npm install
```

### Delete Builds

```bash
# This must be done via Expo dashboard
# https://expo.dev/accounts/YOUR_USERNAME/projects/club5-ai/builds
```

---

## 🔍 Debugging Commands

### View Logs

```bash
# View build logs
eas build:view [BUILD_ID]

# View device logs while running
npx expo start --dev-client

# View Android logs
adb logcat

# View iOS logs
xcrun simctl spawn booted log stream
```

### Check Configuration

```bash
# Validate app.json
npx expo config --type public

# View EAS config
cat eas.json

# View package.json scripts
cat package.json | grep scripts -A 20
```

---

## 📱 Device Testing Commands

### Install on Device

```bash
# Android (via adb)
adb install app.apk

# iOS (via Xcode or Transporter)
# Use Xcode → Window → Devices and Simulators
# Or: Drag IPA to device in iTunes
```

### Run on Device

```bash
# Start dev server
npm start

# Scan QR code with Expo Go
# Or press 'a' for Android, 'i' for iOS
```

---

## 🌐 GitHub Pages Commands

### Setup Privacy Policy Hosting

```bash
# 1. Create git repo
git init
git remote add origin https://github.com/yourusername/club5-ai.git

# 2. Add privacy policy
cp privacy-policy.html ../docs/
git add .
git commit -m "Add privacy policy"

# 3. Push
git push -u origin main

# 4. Enable Pages in GitHub settings
# Settings → Pages → Source: main branch
```

**Your URL will be:**
```
https://yourusername.github.io/club5-ai/privacy-policy.html
```

---

## 🔧 Troubleshooting Commands

### Common Issues

```bash
# Build stuck? Cancel and retry
eas build:cancel [BUILD_ID]
eas build --platform android --profile production

# Dependencies conflict?
rm -rf node_modules package-lock.json
npm install

# Expo cache issues?
npx expo start --clear
npx expo start --reset-cache

# EAS CLI outdated?
npm install -g eas-cli@latest

# Check versions
node --version          # Should be 18+
npm --version
eas --version
npx expo --version
```

### Reset Everything

```bash
# Nuclear option - start fresh
rm -rf node_modules package-lock.json
rm -rf .expo .expo-shared
npm cache clean --force
npm install
npx expo start --clear
```

---

## 📋 Quick Command Chains

### First Time Setup

```bash
npm install -g eas-cli && \
eas login && \
cd mobile && \
npm install && \
eas init && \
npm install sharp && \
npm run convert-assets && \
npm run pre-deploy-check
```

### Build and Submit (Android)

```bash
npm run pre-deploy-check && \
npm run build:android:production && \
echo "Download AAB and submit to Play Console"
```

### Build and Submit (Both Platforms)

```bash
npm run pre-deploy-check && \
npm run build:all && \
echo "Download builds and submit to stores"
```

### Quick Update (OTA)

```bash
git add . && \
git commit -m "Bug fixes" && \
npm run update:production "Bug fixes and improvements"
```

---

## 📚 Help Commands

### Get Help

```bash
# EAS help
eas --help

# Specific command help
eas build --help
eas submit --help
eas update --help

# Expo help
npx expo --help

# npm scripts help
npm run
```

---

## 🎯 Most Used Commands

### Daily Development

```bash
npm start              # Start dev server
npm run android        # Test on Android
npm run ios           # Test on iOS (Mac only)
```

### When Ready to Deploy

```bash
npm run pre-deploy-check           # Verify ready
npm run build:android:production   # Build Android
npm run build:ios:production       # Build iOS
```

### After Deployment

```bash
npm run update:production "message"  # Quick updates
```

---

## 💡 Pro Tips

### Save Time with Aliases

Add to `~/.bashrc` or `~/.zshrc`:

```bash
alias eas-dev='npx expo start'
alias eas-check='npm run pre-deploy-check'
alias eas-build-android='npm run build:android:production'
alias eas-build-ios='npm run build:ios:production'
alias eas-update='npm run update:production'
```

Then use:
```bash
eas-check
eas-build-android
eas-update "Bug fixes"
```

### Watch Build in Terminal

```bash
# Start build and watch progress
eas build --platform android --profile production --wait

# Or watch existing build
eas build:view [BUILD_ID] --wait
```

---

## 📞 Emergency Commands

### Build Failed Mid-Process?

```bash
# Cancel build
eas build:cancel [BUILD_ID]

# Clear cache and retry
eas build:clear
eas build --platform android --profile production --clear-cache
```

### Accidentally Committed Secrets?

```bash
# Remove from git
git rm --cached sensitive-file.json
git commit -m "Remove sensitive file"
git push --force

# Rotate keys immediately!
```

### App Rejected by Store?

```bash
# Fix issue, increment version
# Edit app.json:
#   "version": "1.0.1",
#   "ios": { "buildNumber": "2" },
#   "android": { "versionCode": 2 }

# Rebuild and resubmit
npm run build:all
npm run submit:all
```

---

## 🎉 Success Commands

### After App is Live

```bash
# Celebrate! 🎊
echo "🌅 Club5 AI is LIVE! 🎉"

# Share the news
# Tweet it, LinkedIn it, celebrate it!
```

---

**Bookmark this page for quick reference!** 📖

All commands in one place. Copy, paste, deploy! 🚀
