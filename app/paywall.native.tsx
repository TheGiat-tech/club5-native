import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import PurchasesUI from 'react-native-purchases-ui';
import Purchases from 'react-native-purchases';
import { GradientScreen } from '@/src/components/ui/Layout';
import { PrimaryButton, SecondaryButton } from '@/src/components/ui/Button';
import { COLORS, SPACING, BORDER_RADIUS } from '@/src/theme';
import { useProEntitlement } from '@/src/hooks/useProEntitlement';
import { useApp } from '@/figma/context/AppContext';
import { getIsProFromCustomerInfo, initRevenueCat, isRevenueCatConfigured } from '@/src/lib/revenuecat';

export default function PaywallScreen() {
  const router = useRouter();
  const { isPro, refreshEntitlement } = useProEntitlement();
  const { setPremiumFromPurchase } = useApp();
  const isNativeStore = Platform.OS === 'ios' || Platform.OS === 'android';

  const ensurePurchasesReady = useCallback(async () => {
    if (!isNativeStore) {
      Alert.alert('Purchases unavailable', 'Subscriptions are only available on mobile apps.');
      return false;
    }

    const configured = isRevenueCatConfigured() ? true : await initRevenueCat();
    if (!configured) {
      Alert.alert('Billing unavailable', 'Purchases are not ready yet. Please try again shortly.');
      return false;
    }

    return true;
  }, [isNativeStore]);

  const handleOpenPaywall = useCallback(async () => {
    const ready = await ensurePurchasesReady();
    if (!ready) return;

    try {
      await PurchasesUI.presentPaywall();
      const customerInfo = await Purchases.getCustomerInfo();
      if (customerInfo && getIsProFromCustomerInfo(customerInfo)) {
        await refreshEntitlement();
        await setPremiumFromPurchase();
      }
    } catch (error) {
      console.warn('Failed to present paywall', error);
    }
  }, [ensurePurchasesReady, refreshEntitlement, setPremiumFromPurchase]);

  return (
    <GradientScreen>
      <View style={styles.card}>
        <Text style={styles.title}>Unlock Club5 Pro</Text>
        <Text style={styles.subtitle}>
          Access deeper coaching, premium insights, and upcoming features.
        </Text>

        {isPro ? (
          <>
            <View style={styles.proBadge}>
              <Text style={styles.proBadgeText}>You are Pro</Text>
            </View>
            <SecondaryButton label="Back" onPress={() => router.back()} style={styles.button} />
          </>
        ) : (
          <>
            <PrimaryButton
              label="Unlock Club5 Pro"
              onPress={handleOpenPaywall}
              style={styles.button}
            />
            <SecondaryButton label="Maybe later" onPress={() => router.back()} style={styles.button} />
          </>
        )}
      </View>
    </GradientScreen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.xl,
    gap: SPACING.md,
    shadowColor: COLORS.light.cardShadow,
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.light.text,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.light.textSecondary,
  },
  button: {
    marginTop: SPACING.sm,
  },
  proBadge: {
    backgroundColor: '#22C55E',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  proBadgeText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
