# 🌅 Club5 AI - Your 5AM Companion

[![React Native](https://img.shields.io/badge/React%20Native-0.74-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-51.0-000020.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.1-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> Wake up at 5:00 AM. Build discipline with AI coaching. Transform your life.

---

## 📱 About Club5 AI

Club5 AI is a **full-featured mobile application** designed to help users wake up at 5:00 AM daily and build lasting discipline through AI-powered coaching.

**Key Features:**
- 🔥 Simple daily check-in with confetti animations
- 🤖 Personal AI life coaches (Natalie & Max) with Deep Mode
- 📊 30-day momentum calendar with streak tracking
- 🏆 Achievement milestones and gamification
- ⚙️ Full customization (themes, wake time, coaches)
- 🔒 100% offline - all data stored locally (no cloud, no tracking)

---

## 🎯 Two Versions

This repository contains **two implementations**:

### 1️⃣ Web Prototype (`/` root)
- React + TypeScript web app
- Perfect for demos and testing
- Full UI/UX implementation
- Runs in browser

### 2️⃣ **Mobile App (`/mobile`) ← READY FOR DEPLOYMENT!** 🚀
- React Native + Expo
- **Production-ready** for App Store & Google Play
- Complete with all configs, assets, and guides
- **Everything you need to publish!**

---

## 🚀 Quick Start

### For Mobile App (Production):

```bash
cd mobile
npm install
npm start
# Scan QR with Expo Go app
```

**Want to deploy?** → See [mobile/START_HERE.md](mobile/START_HERE.md)

### For Web Prototype:

```bash
npm install
npm run dev
# Open http://localhost:5173
```

---

## 📂 Repository Structure

```
club5-ai/
├── mobile/                    ← 🎯 START HERE FOR DEPLOYMENT
│   ├── src/                  # React Native app source
│   ├── assets/               # Icons, splash screens (SVG + conversion)
│   ├── scripts/              # Automation (convert-assets, pre-deploy-check)
│   ├── store-listings/       # Google Play & App Store texts
│   ├── app.json              # Expo config (ready!)
│   ├── eas.json              # Build config (ready!)
│   ├── START_HERE.md         # 🎯 Your deployment starting point
│   ├── STEP_BY_STEP.md       # Detailed deployment guide
│   ├── QUICK_START.md        # 30-min quick deploy
│   ├── DEPLOYMENT_GUIDE.md   # Comprehensive guide (40+ pages)
│   ├── STORE_ASSETS.md       # Graphics creation guide
│   ├── PRIVACY_POLICY.md     # Privacy policy (required)
│   ├── privacy-policy.html   # Privacy policy (web version)
│   ├── GITHUB_PAGES_SETUP.md # Privacy Policy hosting guide
│   └── WHATS_INCLUDED.md     # Complete inventory
│
├── components/               # Web prototype components
├── context/                  # State management
├── styles/                   # Global CSS
├── App.tsx                   # Web app entry
├── README.md                 # This file
└── package.json              # Web dependencies
```

---

## 🌟 Complete Feature List

### ✅ Core Features (Implemented)

#### 🔥 Daily Check-In
- Giant "I'm Awake" button with animations
- Confetti celebration on check-in
- ±20-minute flexible check-in window
- Real-time validation
- Streak tracking

#### 🤖 AI Life Coaches
- **Natalie** 👩 - Wise, nurturing, empathetic
- **Max** 👨 - Strong, grounded, supportive
- Deep Mode coaching sessions
- Keyword-based responses
- Personalized guidance

#### 📊 Progress Tracking
- 30-day momentum calendar
- 7-day and 30-day streak tracking
- Visual success metrics
- Achievement milestones
- Progress insights

#### 🏆 Gamification
- **First Light** (Day 1)
- **Week Warrior** (7 days)
- **Monthly Master** (30 days)
- Trial/Free/Premium states
- Milestone cards (locked/unlocked/achieved)

#### ⚙️ Full Customization
- Wake time selection
- Light/Dark/Auto themes
- Coach selection anytime
- Profile customization
- Settings persistence

#### 🎨 Beautiful Design
- Soft blue & gold palette
- Smooth animations
- Professional coach avatars (SVG)
- Minimalist aesthetic
- Mobile-optimized UI

#### 🔒 Privacy-First
- 100% offline functionality
- Local storage only (AsyncStorage)
- No cloud sync
- No analytics
- No tracking
- No ads

---

## 📱 Mobile App - Ready to Deploy!

The `/mobile` directory contains a **production-ready** React Native app with:

### ✅ Complete Configuration
- `app.json` - Full Expo config
- `eas.json` - Build profiles (preview + production)
- `package.json` - All dependencies + scripts
- Bundle IDs configured
- Permissions set
- Notifications ready

### ✅ Assets & Graphics
- App icon (SVG template)
- Splash screen (SVG template)
- Adaptive icon for Android
- Notification icon
- Favicon for web
- Conversion script: `npm run convert-assets`

### ✅ Store Listings
- **Google Play** - Complete listing in `store-listings/google-play-listing.md`
  - Title, descriptions (English + Hebrew)
  - Keywords, category
  - Screenshots guide
  - Content rating answers
- **App Store** - Complete listing in `store-listings/app-store-listing.md`
  - Name, subtitle, promo text
  - Description, keywords
  - Release notes
  - Privacy responses

### ✅ Legal Documents
- Privacy Policy (Markdown)
- Privacy Policy (HTML for web)
- Ready to publish on GitHub Pages
- Complies with store requirements

### ✅ Deployment Guides
- **START_HERE.md** - Choose your path
- **QUICK_START.md** - 30-minute deployment
- **STEP_BY_STEP.md** - Detailed walkthrough
- **DEPLOYMENT_GUIDE.md** - Comprehensive 40+ pages
- **STORE_ASSETS.md** - Graphics creation
- **GITHUB_PAGES_SETUP.md** - Privacy Policy hosting

### ✅ Automation Scripts
- `convert-assets.js` - SVG to PNG conversion
- `pre-deployment-check.js` - Readiness verification

### ✅ NPM Scripts Ready
```bash
npm run convert-assets           # Convert SVG to PNG
npm run pre-deploy-check         # Check if ready
npm run build:android:production # Build for Play Store
npm run build:ios:production     # Build for App Store
npm run submit:android           # Submit to Google Play
npm run submit:ios              # Submit to App Store
npm run update:production "msg" # OTA update
```

---

## 🚀 Deployment Overview

### Prerequisites
- Node.js 18+
- Google Play Console account ($25 one-time)
- Apple Developer account ($99/year) - optional
- 2-4 hours for graphics
- 1-2 hours for setup

### Quick Path
```bash
# 1. Setup
cd mobile
npm install
npm install -g eas-cli
eas login

# 2. Convert assets
npm run convert-assets

# 3. Initialize EAS
eas init

# 4. Check readiness
npm run pre-deploy-check

# 5. Build
npm run build:android:production

# 6. Follow store submission guides
```

**Full instructions:** [mobile/START_HERE.md](mobile/START_HERE.md)

---

## 💰 Costs

| Item | Cost |
|------|------|
| Google Play Developer | $25 (one-time) |
| Apple Developer Program | $99/year (optional) |
| Expo Free Tier | Free |
| Expo Pro (optional) | $29/month |
| **Total to Start** | **$25-124** |

---

## 📊 Tech Stack

### Mobile App:
- **Framework:** React Native + Expo SDK 51
- **Language:** TypeScript
- **Navigation:** React Navigation (Bottom Tabs + Stack)
- **Storage:** AsyncStorage (local only)
- **State:** React Context API
- **Styling:** React Native StyleSheet
- **Icons:** @expo/vector-icons
- **Animations:** Reanimated, Linear Gradient
- **Notifications:** expo-notifications

### Web Prototype:
- React + TypeScript
- Tailwind CSS
- Motion/Framer Motion
- Lucide React Icons
- localStorage

---

## 📁 Key Files

### Configuration:
- `mobile/app.json` - Expo configuration
- `mobile/eas.json` - Build configuration
- `mobile/package.json` - Dependencies + scripts

### Documentation:
- `mobile/START_HERE.md` - 🎯 **Start here for deployment!**
- `mobile/STEP_BY_STEP.md` - Detailed guide
- `mobile/DEPLOYMENT_GUIDE.md` - Complete reference
- `mobile/WHATS_INCLUDED.md` - Full inventory

### Legal:
- `mobile/PRIVACY_POLICY.md` - Privacy policy
- `mobile/privacy-policy.html` - Web version

### Store:
- `mobile/store-listings/google-play-listing.md` - Google Play texts
- `mobile/store-listings/app-store-listing.md` - App Store texts

---

## 🎯 What Makes This Special?

### 🚀 Production Ready
- Not a prototype - **fully functional app**
- All configs pre-filled
- Assets templated
- Scripts automated
- Documentation complete

### 📚 Comprehensive Guides
- 7 detailed guides
- Multiple learning paths
- Troubleshooting included
- Step-by-step checklists
- Copy-paste ready texts

### 🎨 Professional Assets
- SVG templates included
- Conversion script provided
- Brand colors defined
- Multiple formats ready

### 🔒 Privacy First
- No backend required
- No data collection
- No tracking
- No ads
- 100% offline

### 💯 Store Compliant
- Privacy Policy included
- Store listings written
- Content ratings answered
- Legal requirements met

---

## 📱 Screenshots

(Add your screenshots here after deployment)

---

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

## 📞 Support

### For the Mobile App:
- **Start Here:** [mobile/START_HERE.md](mobile/START_HERE.md)
- **Email:** support@club5ai.com
- **Expo Discord:** https://chat.expo.dev

### For the Web Prototype:
- Open an issue on GitHub
- Check existing documentation

---

## 🗺️ Roadmap

### ✅ Phase 1: MVP (Complete)
- [x] Daily check-in functionality
- [x] AI coaching with Deep Mode
- [x] Progress tracking (30 days)
- [x] Achievement system
- [x] Full customization
- [x] Offline functionality

### 🔄 Phase 2: Deployment (Current)
- [x] Production configuration
- [x] Store assets
- [x] Privacy policy
- [x] Deployment guides
- [ ] Publish to Google Play
- [ ] Publish to App Store

### 🔮 Phase 3: Enhancement (Future)
- [ ] Widget support (iOS 14+)
- [ ] Apple Watch companion
- [ ] Community features (opt-in)
- [ ] Morning routine templates
- [ ] Data export/import
- [ ] Analytics dashboard

---

## 🎉 Success Stories

*Add user testimonials here after launch*

---

## 🌟 Star This Repo

If Club5 AI helps you wake up at 5AM, give it a ⭐!

---

## 🏆 Acknowledgments

- Built with [Expo](https://expo.dev)
- Icons from [Expo Vector Icons](https://icons.expo.fyi/)
- Inspired by "The 5 AM Club" by Robin Sharma
- Designed for early risers everywhere 🌅

---

<div align="center">

### 🚀 Ready to Deploy?

**Start here:** [mobile/START_HERE.md](mobile/START_HERE.md)

**Transform your mornings. Transform your life. Join Club5 AI.** 🌅

---

Made with ❤️ for the 5AM Club

</div>
