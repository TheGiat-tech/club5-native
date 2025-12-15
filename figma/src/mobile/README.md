# 🌅 Club5 AI - Mobile App

> Your 5AM companion. Build discipline with personal AI coaching.

[![React Native](https://img.shields.io/badge/React%20Native-0.74-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-51.0-000020.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.1-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📱 About

Club5 AI is a motivational mobile app that helps users wake up at 5:00 AM daily and build lasting discipline through:

- 🔥 **Simple daily check-in** with "I'm Awake" button
- 🤖 **AI life coaches** (Natalie & Max) with Deep Mode sessions
- 📊 **30-day momentum calendar** with streak tracking
- ⚙️ **Full customization** (wake time, themes, notifications)
- 🔒 **100% offline** - all data stored locally (AsyncStorage)

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn
- Expo Go app (for testing on device)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/club5-ai.git

# Navigate to mobile directory
cd club5-ai/mobile

# Install dependencies
npm install

# Start development server
npm start
```

Scan the QR code with Expo Go app to run on your device.

---

## 📂 Project Structure

```
mobile/
├── assets/                 # Images, icons, splash screens
│   ├── icon.svg/.png
│   ├── splash.svg/.png
│   ├── adaptive-icon.svg/.png
│   └── notification-icon.svg/.png
├── src/
│   ├── components/         # Reusable components
│   ├── screens/           # Main screens
│   ├── navigation/        # Navigation setup
│   ├── context/           # React Context (AppContext)
│   ├── utils/             # Utilities (storage, AI, etc.)
│   ├── constants/         # Constants (theme, coaches)
│   └── types/             # TypeScript types
├── scripts/               # Deployment scripts
│   ├── convert-assets.js
│   └── pre-deployment-check.js
├── store-listings/        # App Store & Google Play texts
│   ├── google-play-listing.md
│   └── app-store-listing.md
├── app.json               # Expo configuration
├── eas.json               # EAS Build configuration
├── package.json
├── DEPLOYMENT_GUIDE.md    # Full deployment guide
├── QUICK_START.md         # 30-minute quick start
├── STEP_BY_STEP.md        # Detailed step-by-step
├── PRIVACY_POLICY.md      # Privacy policy
└── STORE_ASSETS.md        # Graphics creation guide
```

---

## 🏗️ Development

### Available Scripts

#### Development:
```bash
npm start              # Start Expo dev server
npm run android        # Run on Android emulator
npm run ios            # Run on iOS simulator (Mac only)
npm run web            # Run in web browser
```

#### Build & Deploy:
```bash
npm run convert-assets        # Convert SVG assets to PNG
npm run pre-deploy-check      # Check if ready for deployment
npm run prepare-deploy        # Convert assets + check

npm run build:android:preview    # Build APK for testing
npm run build:android:production # Build AAB for Play Store
npm run build:ios:production     # Build IPA for App Store
npm run build:all               # Build for both platforms

npm run submit:android        # Submit to Google Play
npm run submit:ios           # Submit to App Store
npm run submit:all           # Submit to both stores
```

#### Updates:
```bash
npm run update:production "Bug fixes"  # OTA update (production)
npm run update:preview "New feature"   # OTA update (preview)
```

---

## 📦 Deployment

### 🎯 Quick Deployment (30 minutes)

See [QUICK_START.md](QUICK_START.md) for a rapid deployment guide.

### 📋 Full Deployment Guide

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for comprehensive instructions.

### 🪜 Step-by-Step

See [STEP_BY_STEP.md](STEP_BY_STEP.md) for detailed walkthrough.

### TL;DR:

1. **Create assets:**
   ```bash
   npm run convert-assets
   ```

2. **Setup EAS:**
   ```bash
   npm install -g eas-cli
   eas login
   eas init
   ```

3. **Build:**
   ```bash
   npm run build:android:production
   npm run build:ios:production
   ```

4. **Submit to stores** (see guides above)

---

## 🎨 Assets & Graphics

All required assets are in `/assets` directory:

- `icon.png` - App icon (1024×1024)
- `splash.png` - Splash screen (2048×2732)
- `adaptive-icon.png` - Android adaptive icon (1024×1024)
- `notification-icon.png` - Notification icon (96×96)
- `favicon.png` - Web favicon (48×48)

SVG sources are also included. To regenerate PNGs:

```bash
npm run convert-assets
```

For detailed graphics guide, see [STORE_ASSETS.md](STORE_ASSETS.md).

---

## 🛠️ Tech Stack

- **Framework:** React Native + Expo (SDK 51)
- **Language:** TypeScript
- **Navigation:** React Navigation (Bottom Tabs + Stack)
- **Storage:** AsyncStorage (local only)
- **State:** React Context API
- **Styling:** React Native StyleSheet
- **Icons:** @expo/vector-icons
- **Animations:** Reanimated, Linear Gradient
- **Notifications:** expo-notifications

---

## 🌟 Features

### ✅ Implemented

- [x] Complete onboarding flow
- [x] Daily check-in with confetti animations
- [x] AI coaches (Natalie & Max)
- [x] Deep Mode coaching sessions
- [x] 30-day momentum calendar
- [x] 7-day and 30-day streak tracking
- [x] Achievement milestones system
- [x] Light/Dark/Auto themes
- [x] Wake time customization (±20min validation)
- [x] Local notifications
- [x] Settings management
- [x] 100% offline functionality
- [x] Trial/Free/Premium state management
- [x] Professional coach avatars (SVG)
- [x] Real-time chat with AI keyword detection

### 🔮 Future Enhancements (Optional)

- [ ] Widget support (iOS 14+)
- [ ] Apple Watch companion app
- [ ] Community features (opt-in)
- [ ] Spotify/Apple Music integration
- [ ] Morning routine templates
- [ ] Analytics dashboard
- [ ] Export/import data

---

## 📊 Analytics & Monitoring

Currently, the app does **not** collect any analytics to ensure maximum privacy.

If you want to add analytics (optional):

1. **Firebase Analytics:**
   ```bash
   npx expo install @react-native-firebase/app @react-native-firebase/analytics
   ```

2. **Sentry (Error tracking):**
   ```bash
   npx expo install @sentry/react-native
   ```

3. **Expo Analytics:**
   ```bash
   npx expo install expo-analytics
   ```

Remember to update `PRIVACY_POLICY.md` if you add analytics!

---

## 🔒 Privacy

Club5 AI is built with privacy-first principles:

- ✅ **No account required** - start immediately
- ✅ **100% offline** - all data on device
- ✅ **No tracking** - no analytics or third-party SDKs
- ✅ **No cloud sync** - data never leaves your device
- ✅ **No ads** - clean, focused experience

See [PRIVACY_POLICY.md](PRIVACY_POLICY.md) for full details.

---

## 🐛 Troubleshooting

### Build fails?

```bash
eas build:clear
eas build --platform android --profile production --clear-cache
```

### Assets not showing?

```bash
npm run convert-assets
```

### Pre-deployment check fails?

```bash
npm run pre-deploy-check
```

Fix any ❌ issues, then retry.

### EAS not installed?

```bash
npm install -g eas-cli
eas login
```

---

## 📞 Support

- **Email:** support@club5ai.com
- **Website:** www.club5ai.com
- **Expo Docs:** https://docs.expo.dev
- **Discord:** https://chat.expo.dev

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with [Expo](https://expo.dev)
- Icons from [Expo Vector Icons](https://icons.expo.fyi/)
- Inspired by "The 5 AM Club" by Robin Sharma

---

## 💰 Costs

| Item | Cost |
|------|------|
| Google Play Developer | $25 one-time |
| Apple Developer Program | $99/year |
| Expo (Free tier) | Free |
| Expo Pro (optional) | $29/month |
| **Total to start** | **$25-124** |

---

## ✅ Pre-Deployment Checklist

Run before deploying:

```bash
npm run pre-deploy-check
```

This verifies:
- [x] All assets present
- [x] Configuration correct
- [x] Dependencies installed
- [x] EAS setup complete

---

## 🚀 Deployment Timeline

| Step | Time |
|------|------|
| Create graphics | 2-3 hours |
| Build (EAS) | 30-60 min |
| Submit to stores | 1-2 hours |
| Google approval | 1-7 days |
| Apple approval | 1-2 days |
| **Total** | **3-14 days** |

---

## 🎉 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📈 Roadmap

### v1.0 (Current - MVP)
- [x] Core functionality
- [x] AI coaching
- [x] Progress tracking
- [x] Local storage

### v1.1 (Next)
- [ ] Widget support
- [ ] More achievements
- [ ] Export data feature
- [ ] Improved onboarding

### v2.0 (Future)
- [ ] Community features (opt-in)
- [ ] Apple Watch app
- [ ] Morning routines
- [ ] Habit stacking

---

**Made with ❤️ for the 5AM Club**

Wake up at 5:00 AM. Transform your life. 🌅
