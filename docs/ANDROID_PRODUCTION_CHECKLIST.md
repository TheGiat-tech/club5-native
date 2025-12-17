# Android Production Checklist - 6 Critical Validations

This document addresses the 6 mandatory checks to ensure the Club5 Native app is truly "100% ready" for Android production deployment.

## ✅ 1. Configuration File Priority (app.json vs app.config.ts)

### Issue Identified
The project has both `app.json` and `app.config.ts`. Previously, `app.config.ts` was overwriting Android configurations from `app.json`.

### Fix Applied
Updated `app.config.ts` to preserve all Android settings from `app.json`:
```typescript
android: {
  ...config.android,
  package: 'com.giatech.club5native',
  versionCode: config.android?.versionCode ?? 1,
  // Preserve permissions from app.json
  permissions: config.android?.permissions,
  adaptiveIcon: config.android?.adaptiveIcon,
  edgeToEdgeEnabled: config.android?.edgeToEdgeEnabled,
  predictiveBackGestureEnabled: config.android?.predictiveBackGestureEnabled,
}
```

### Verification Required
Run `npx expo config --type public` and verify that output includes:
- Android permissions: NOTIFICATIONS, SCHEDULE_EXACT_ALARM, USE_EXACT_ALARM, POST_NOTIFICATIONS, VIBRATE
- expo-notifications plugin configuration
- Adaptive icon settings

## ✅ 2. Android Notification Channel + Runtime Permissions

### Issue Identified
Notification channel was only created in `registerForPushNotifications()`, which might not be called immediately. Android 13+ requires runtime permission request.

### Fix Applied
1. **Startup Initialization** (`app/_layout.tsx`):
   - Notification channel now created at app startup
   - Runs before any other component loads
   - Handles errors gracefully

2. **Runtime Permission** (`src/figma/utils/notifications.ts`):
   - Already requests permission via `Notifications.requestPermissionsAsync()`
   - Works on Android 13+ with POST_NOTIFICATIONS permission

### Verification Required
On Android 13+ device:
1. Install app fresh (clear data if reinstalling)
2. App should prompt for notification permission on first notification interaction
3. Check Settings → Apps → Club5 → Notifications → Should see "default" channel
4. Send test notification - should appear immediately

### Code Location
- Channel creation: `app/_layout.tsx` line 24-32
- Permission request: `src/figma/utils/notifications.ts` line 57-62

## ✅ 3. Exact Alarms (Android 12+) with Fallback

### Issue Identified
SCHEDULE_EXACT_ALARM permission requires user approval on some devices. No fallback if exact alarms are denied.

### Fix Applied
Added utilities in `src/figma/utils/notifications.ts`:

1. **canScheduleExactAlarms()** - Check if exact alarms are allowed
2. **promptForExactAlarmPermission()** - Guide user to settings if needed

### Current Limitation
Expo doesn't directly expose the Android `canScheduleExactAlarms()` API. The utility functions are prepared but need native module integration for full functionality.

### Recommended Action
For production, consider:
- Using `expo-notifications` scheduled notifications (works with or without exact alarms)
- Adding a native module to check exact alarm permission status
- OR accept that notifications may be slightly delayed on some devices (still functional)

### Verification Required
On Android 12+ device:
1. Go to Settings → Apps → Special app access → Alarms & reminders
2. Toggle Club5 permission off
3. Test if notifications still arrive (may be slightly delayed)
4. Check app logs for any scheduling errors

## ✅ 4. RevenueCat + Google Play Billing Setup

### Issue Identified
No validation that offerings are loaded before showing paywall. Could fail silently if RevenueCat or Play Console is misconfigured.

### Fix Applied
Added offering validation in both subscription screens:

**Files Updated:**
- `app/(tabs)/subscription.native.tsx`
- `app/paywall.native.tsx`

**Validation Logic:**
```typescript
const offerings = await Purchases.getOfferings();
if (!offerings.current || Object.keys(offerings.current.availablePackages).length === 0) {
  Alert.alert('No offerings available', 
    'Unable to load subscription options. Please ensure your app is properly configured...');
  return;
}
```

### Pre-Production Checklist

#### RevenueCat Configuration
- [ ] Android app created in RevenueCat dashboard
- [ ] API key set in environment: `EXPO_PUBLIC_REVENUECAT_ANDROID_KEY`
- [ ] Products created and linked to Google Play SKUs
- [ ] Entitlements configured (e.g., "pro" entitlement)

#### Google Play Console Configuration
- [ ] App created in Google Play Console
- [ ] Package name matches: `com.giatech.club5native`
- [ ] In-app products/subscriptions created
- [ ] Products published (at least to internal testing)
- [ ] Test account added to license testing

#### App Configuration
- [ ] App built with production profile: `eas build --platform android --profile production`
- [ ] App signed with keystore (not debug)
- [ ] App uploaded to Play Console (internal test track minimum)

### Verification Required
On signed production/preview build:
1. Launch app and navigate to subscription screen
2. Should see offerings load (not "No offerings available")
3. Tap "Unlock Club5 Pro" - should show paywall with pricing
4. Cancel without purchasing - verify no crashes
5. Check logs for: "RevenueCat offerings are empty" (should NOT appear)

## ✅ 5. EAS Signing / Keystore Management

### Current Configuration
`eas.json` has three build profiles:
- **development**: APK with dev client
- **preview**: Internal testing APK
- **production**: App Bundle for Play Store

### Issue: Keystore Management Critical!

#### Current Status
- No keystore configured in repository (correct - should not be committed)
- EAS will auto-generate keystore on first production build
- **CRITICAL**: The same keystore MUST be used for all future updates

### Setup Required

#### Option 1: Let EAS Manage (Recommended)
```bash
eas build --platform android --profile production
```
- EAS generates and stores keystore securely
- Automatically used for all future builds
- No manual keystore management needed

#### Option 2: Use Your Own Keystore
1. Generate keystore locally:
```bash
keytool -genkeypair -v -storetype PKCS12 -keystore club5-release.keystore \
  -alias club5-key -keyalg RSA -keysize 2048 -validity 10000
```

2. Add to `eas.json`:
```json
"production": {
  "android": {
    "buildType": "app-bundle",
    "credentialsSource": "local"
  }
}
```

3. Store keystore securely (never commit to git!)

### ⚠️ CRITICAL WARNING
**Once you upload the first signed APK/AAB to Google Play, you MUST use the same keystore for all future updates. If you lose the keystore, you cannot update the app - you'd have to publish a new app.**

### Verification Required
```bash
# Check if keystore is configured
eas credentials

# First production build (generates keystore if using EAS-managed)
eas build --platform android --profile production

# Verify keystore fingerprint
keytool -list -v -keystore <keystore-file> -alias <alias>
```

### Before First Play Store Upload
- [ ] Decide on keystore management strategy (EAS-managed or manual)
- [ ] Backup keystore if using manual management
- [ ] Document keystore password and alias securely
- [ ] Upload app signing key to Play App Signing (Google manages)
- [ ] Keep upload key safe (needed for future updates)

## ✅ 6. react-native-purchases-ui Linking

### Current Usage
The app uses `react-native-purchases-ui` in:
- `app/(tabs)/subscription.native.tsx`
- `app/paywall.native.tsx`

### Issue
This is a native module that requires:
1. Development client build (not Expo Go)
2. Proper linking (automatic with Expo SDK 54)
3. Native rebuild after installation

### Status: ⚠️ Requires Development Build

`react-native-purchases-ui` is NOT available in Expo Go. You MUST use:
- Development build: `eas build --profile development --platform android`
- OR bare workflow with native directories

### Verification Required

#### If you get "doesn't seem to be linked" error:
1. Ensure you're NOT using Expo Go
2. Rebuild development client:
```bash
npm install
eas build --profile development --platform android
```
3. Install the development build APK on your device
4. Test subscription flow

#### Alternative: Use Purchases SDK without UI
If linking issues persist, you can:
- Remove `react-native-purchases-ui` dependency
- Use `react-native-purchases` directly
- Build custom paywall UI
- This removes the native module dependency

### Testing Checklist
On development build:
- [ ] App launches without crashes
- [ ] Navigate to subscription screen - no "linking" error
- [ ] Tap "Unlock Club5 Pro" - paywall appears
- [ ] Paywall shows pricing and options
- [ ] Can close paywall without crashing

## 20-Minute Production Verification Script

Run these commands to prove "100% ready":

### 1. Configuration Check (2 min)
```bash
cd /path/to/club5-native
npx expo config --type public | grep -A 50 "android"
# Verify permissions and plugins appear
```

### 2. Dependencies Check (1 min)
```bash
npx expo-doctor
# Should have 0 critical errors
```

### 3. Build Preview APK (10 min)
```bash
eas build --platform android --profile preview
# Download and install on real Android device
```

### 4. Device Testing (7 min)
On physical Android device:

**Notifications** (2 min):
- [ ] App requests notification permission
- [ ] Send test notification (immediate)
- [ ] Schedule notification for 5 minutes ahead
- [ ] Notification appears on time

**Subscriptions** (2 min):
- [ ] Navigate to subscription screen
- [ ] Offerings load successfully
- [ ] Paywall opens (even if not purchasing)
- [ ] No "linking" errors

**Core Features** (3 min):
- [ ] Login/signup works (Supabase)
- [ ] AI coach responds (if API key configured)
- [ ] Check-in functionality works
- [ ] Settings load and save

## Environment Variables Checklist

Before building for production, ensure all environment variables are set:

```bash
# Required for core functionality
EXPO_PUBLIC_OPENAI_API_KEY=sk-proj-...
EXPO_PUBLIC_SUPABASE_URL=https://....supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# Required for Android in-app purchases
EXPO_PUBLIC_REVENUECAT_ANDROID_KEY=goog_...

# Optional for iOS (if building for iOS too)
EXPO_PUBLIC_REVENUECAT_IOS_KEY=appl_...
```

## Pre-Launch Final Checklist

Before submitting to Google Play:

### Technical
- [x] Android permissions configured
- [x] Notification channel created at startup
- [x] Exact alarm utilities added
- [x] RevenueCat offering validation added
- [ ] EAS keystore configured (run first production build)
- [ ] react-native-purchases-ui working in dev build
- [ ] All environment variables set
- [ ] TypeScript compilation clean
- [ ] No security vulnerabilities

### Testing
- [ ] Tested on Android 8.0+ (minimum)
- [ ] Tested on Android 13+ (notification permissions)
- [ ] Tested on Android 12+ (exact alarms)
- [ ] Tested in-app purchases with test account
- [ ] Tested all core features
- [ ] Tested offline mode
- [ ] Tested deep linking

### Play Console
- [ ] App created in Play Console
- [ ] Package name matches: com.giatech.club5native
- [ ] In-app products configured
- [ ] Content rating completed
- [ ] Privacy policy URL added
- [ ] Store listing complete (icon, screenshots, description)

### RevenueCat
- [ ] Android app configured
- [ ] Products linked to Play Console SKUs
- [ ] Entitlements configured
- [ ] Test purchases verified

## Summary

All code changes have been implemented to address the 6 critical validations. The app is now:

1. ✅ Using correct configuration (app.config.ts preserves app.json settings)
2. ✅ Initializing notification channel at startup
3. ✅ Prepared for exact alarm permission handling
4. ✅ Validating RevenueCat offerings before showing paywall
5. ⚠️ Ready for EAS keystore setup (run first production build)
6. ⚠️ Using react-native-purchases-ui (requires development build)

**Next Actions Required:**
1. Run `eas build --platform android --profile development` to create dev client
2. Test on physical device
3. Run `eas build --platform android --profile production` for first signed build
4. Configure Play Console and RevenueCat
5. Test in-app purchases
6. Submit for review

The app is production-ready from a code perspective, but requires environment configuration and testing as outlined above.
