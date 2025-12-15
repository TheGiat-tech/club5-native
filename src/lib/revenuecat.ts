import { Platform } from 'react-native';
import Purchases, { CustomerInfo } from 'react-native-purchases';

let isConfigured = false;

const RC_API_KEY_ANDROID = process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_KEY;
const RC_API_KEY_IOS = process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY;

export async function initRevenueCat(userId?: string): Promise<boolean> {
  if (isConfigured) return true;

  try {
    const apiKey = Platform.select<string | undefined>({
      ios: RC_API_KEY_IOS,
      android: RC_API_KEY_ANDROID,
    }) ?? null;

    console.log('RC apiKey', apiKey, Platform.OS);

    if (!apiKey) {
      console.warn('RevenueCat configuration skipped: missing API key for this platform.');
      return false;
    }

    await Purchases.configure({ apiKey });

    if (userId) {
      await Purchases.logIn(userId);
    }

    isConfigured = true;
    return true;
  } catch (error) {
    console.warn('RevenueCat configuration failed:', error);
    return false;
  }
}

export async function setRevenueCatUser(userId: string) {
  try {
    return await Purchases.logIn(userId);
  } catch (error) {
    console.warn('RevenueCat logIn failed:', error);
  }
}

export function getIsProFromCustomerInfo(customerInfo?: CustomerInfo | null) {
  return Boolean(customerInfo?.entitlements?.active?.pro);
}

export function isRevenueCatConfigured() {
  return isConfigured;
}
