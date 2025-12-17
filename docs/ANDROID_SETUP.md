# Android Setup Guide for Club5 Native

This document provides a comprehensive guide for setting up and deploying the Club5 Native app on Android.

> **✅ UPDATE**: All critical Android production issues have been fixed. See [ANDROID_PRODUCTION_CHECKLIST.md](./ANDROID_PRODUCTION_CHECKLIST.md) for details on the 6 mandatory validations.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Android Studio (for emulator testing)
- EAS CLI (`npm install -g eas-cli`) for building

## Android Configuration

### Package Information
- **Package Name**: `com.giatech.club5native`
- **Version Code**: 1
- **Version**: 1.0.0

### Required Permissions

The app requests the following Android permissions (configured in `app.json`):

- **NOTIFICATIONS**: Allow the app to show notifications
- **SCHEDULE_EXACT_ALARM**: Required for precise wake-up notifications
- **USE_EXACT_ALARM**: Backup permission for exact alarm scheduling
- **POST_NOTIFICATIONS**: Android 13+ permission for posting notifications
- **VIBRATE**: Allow vibration for notifications

### Environment Variables

Before running the app, copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Required environment variables:
- `EXPO_PUBLIC_OPENAI_API_KEY`: Your OpenAI API key for AI coach functionality
- `EXPO_PUBLIC_SUPABASE_URL`: Supabase project URL for backend
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous key
- `EXPO_PUBLIC_REVENUECAT_ANDROID_KEY`: RevenueCat Android API key for in-app purchases
- `EXPO_PUBLIC_REVENUECAT_IOS_KEY`: RevenueCat iOS API key (optional if only testing Android)

### Android Assets

The following assets are required and already configured:

- **Icon**: `./assets/images/icon.png` (1024x1024)
- **Adaptive Icon Foreground**: `./assets/images/android-icon-foreground.png`
- **Adaptive Icon Background**: `./assets/images/android-icon-background.png`
- **Adaptive Icon Monochrome**: `./assets/images/android-icon-monochrome.png`
- **Splash Screen**: `./assets/images/splash-icon.png`

All assets are present and properly configured in `app.json`.

## Development

### Running on Android Emulator

1. Start the Metro bundler:
```bash
npm start
```

2. Press `a` to open in Android emulator, or:
```bash
npm run android
```

### Running on Physical Device

1. Enable USB debugging on your Android device
2. Connect via USB
3. Run:
```bash
npm start
```
4. Scan the QR code with Expo Go app, or build a development client

## Building for Production

### Using EAS Build

1. Configure EAS (if not already done):
```bash
eas login
eas build:configure
```

2. Build APK for testing:
```bash
eas build --platform android --profile preview
```

3. Build App Bundle for Google Play:
```bash
eas build --platform android --profile production
```

### Build Profiles

Configured in `eas.json`:

- **development**: Creates development APK with dev client
- **preview**: Creates internal testing APK
- **production**: Creates optimized App Bundle for Play Store

## Android-Specific Features

### Notifications

The app uses `expo-notifications` with Android-specific configuration:

- **Notification Channel**: "default" with MAX importance
- **Vibration Pattern**: [0, 250, 250, 250]
- **Color**: #FF6B35
- **Exact Alarm Scheduling**: For wake-up reminders at specific times

Key notification features:
- Daily wake-up notifications
- Pre-wake alerts (5 minutes before)
- Miss reminder notifications
- Customizable wake-up time

### Keyboard Handling

Android-specific keyboard behavior is implemented:
- `KeyboardAvoidingView` with behavior "height" for Android
- Different vertical offsets than iOS (typically 20px vs 90px)

### Icon System

The app uses:
- **iOS**: Native SF Symbols via `expo-symbols`
- **Android**: Material Icons from `@expo/vector-icons`

All icons are properly mapped in `components/ui/icon-symbol.tsx`.

### In-App Purchases

RevenueCat is integrated for subscription management:
- Requires `EXPO_PUBLIC_REVENUECAT_ANDROID_KEY`
- Supports Google Play billing
- Automatic subscription status syncing
- Purchase restoration

## Platform-Specific Code

The app properly handles platform differences:

### Files with Platform-Specific Logic
- `app/(tabs)/subscription.native.tsx`: Checks for native store availability
- `app/paywall.native.tsx`: Subscription paywall with platform checks
- `src/lib/revenuecat.ts`: Platform-specific API keys
- `src/figma/utils/notifications.ts`: Android notification channel setup
- `src/figma/context/AppContext.tsx`: Play Store URL for reviews

### Platform Checks
```typescript
Platform.OS === 'android'  // Properly used throughout
```

## Testing Checklist

Before deploying to Android:

- [ ] Test on multiple Android versions (minimum API level 21+)
- [ ] Test notification permissions and functionality
- [ ] Test exact alarm scheduling
- [ ] Test in-app purchases with test account
- [ ] Test keyboard behavior on different screen sizes
- [ ] Test deep linking with `club5native://` scheme
- [ ] Test adaptive icon on different launchers
- [ ] Test dark mode
- [ ] Test locale/language switching
- [ ] Test offline functionality
- [ ] Verify all Material Icons render correctly

## Common Issues & Solutions

### Notifications Not Working
- Check that all notification permissions are granted
- Verify notification channel is created (happens automatically)
- Test on Android 13+ with POST_NOTIFICATIONS permission

### RevenueCat Not Initializing
- Ensure `EXPO_PUBLIC_REVENUECAT_ANDROID_KEY` is set
- Check that key matches your RevenueCat Android project
- Verify Google Play billing library is properly linked

### Keyboard Covering Input
- Already handled with `KeyboardAvoidingView`
- Android uses "height" behavior (different from iOS "padding")

### Icons Not Displaying
- All SF Symbol names are mapped to Material Icons
- Add new mappings in `components/ui/icon-symbol.tsx` if needed

## Google Play Store Deployment

### Pre-deployment Checklist
- [ ] Update version in `app.json` and `app.config.ts`
- [ ] Increment `versionCode` in `app.json`
- [ ] Test production build thoroughly
- [ ] Prepare store listing assets
- [ ] Configure RevenueCat products in Google Play Console
- [ ] Set up proper signing keys
- [ ] Review permissions and privacy policy

### Store Listing Requirements
- App icon (512x512)
- Feature graphic (1024x500)
- Screenshots (at least 2)
- Privacy policy URL
- App description
- Content rating

## Current Status

✅ **Android Ready**: The app is fully configured for Android deployment with all necessary permissions, assets, and platform-specific code in place.

### Verified Components:
- ✅ Android configuration in `app.json`
- ✅ Required permissions configured
- ✅ Notification system with Android channel
- ✅ All Android assets present
- ✅ RevenueCat integration
- ✅ Platform-specific keyboard handling
- ✅ Icon fallbacks for Android
- ✅ Proper Play Store URL
- ✅ TypeScript compilation
- ✅ EAS build configuration

The app is production-ready for Android deployment pending environment variable configuration and testing on physical devices.
