import React, { useCallback } from 'react';
import { View, StyleSheet, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PurchasesUI from 'react-native-purchases-ui';
import Purchases from 'react-native-purchases';
import { GradientScreen } from '../../src/components/ui/Layout';
import { SurfaceCard } from '../../src/components/ui/Card';
import { Title, Body, Caption, SectionTitle } from '../../src/components/ui/Typography';
import { PrimaryButton, SecondaryButton } from '../../src/components/ui/Button';
import { useProEntitlement } from '@/src/hooks/useProEntitlement';
import { getIsProFromCustomerInfo, initRevenueCat, isRevenueCatConfigured } from '@/src/lib/revenuecat';
import { useApp } from '@/figma/context/AppContext';

const FREE_FEATURES = [
  '7-day 5AM challenge',
  'Basic streak tracking',
  'Short AI coach mini-sessions',
];

const PREMIUM_FEATURES = [
  'Everything in Free',
  'Unlimited 5AM challenges',
  'Longer AI coach conversations',
  'No 7-day limit',
  'Early-access features (mock)',
];

export default function SubscriptionScreen() {
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

  const handlePurchase = useCallback(async () => {
    const ready = await ensurePurchasesReady();
    if (!ready) return;

    if (isPro) {
      Alert.alert('Already Pro', 'You already have full access.');
      return;
    }
    try {
      await PurchasesUI.presentPaywall();
      const customerInfo = await Purchases.getCustomerInfo();
      if (customerInfo && getIsProFromCustomerInfo(customerInfo)) {
        await refreshEntitlement();
        await setPremiumFromPurchase();
        Alert.alert("You're now Pro!", 'Your premium access is active.');
      }
    } catch (error) {
      console.warn('Purchase failed', error);
      Alert.alert('Purchase failed', 'Please try again later.');
    }
  }, [ensurePurchasesReady, isPro, refreshEntitlement, setPremiumFromPurchase]);

  const handleRestore = useCallback(async () => {
    const ready = await ensurePurchasesReady();
    if (!ready) return;

    try {
      const customerInfo = await Purchases.restorePurchases();
      const hasPro = getIsProFromCustomerInfo(customerInfo);
      if (hasPro) {
        await refreshEntitlement();
        await setPremiumFromPurchase();
        Alert.alert('Purchases restored', 'Welcome back! Your premium access is active.');
      } else {
        Alert.alert('No active purchases found for this account.');
      }
    } catch (error) {
      console.warn('Restore failed', error);
      Alert.alert('Restore failed', 'Please try again later.');
    }
  }, [ensurePurchasesReady, refreshEntitlement, setPremiumFromPurchase]);

  const planLabel = isPro ? 'Premium plan - Full access' : 'Free plan - 7-day challenge';

  return (
    <GradientScreen>
      <View style={styles.container}>
        <Title style={styles.title}>Premium</Title>
        <Body style={styles.subtitle}>
          Compare plans and unlock deeper AI coaching when you are ready.
        </Body>

        <SurfaceCard>
          <SectionTitle>Your current plan</SectionTitle>
          <Body>{planLabel}</Body>
          <Caption style={styles.currentDescription}>
            {isPro
              ? 'Premium gives you longer conversations, more turns, and richer insights.'
              : 'Free users get short AI coach sessions with an early cutoff.'}
          </Caption>
        </SurfaceCard>

        <SurfaceCard>
          <SectionTitle>Free</SectionTitle>
          {FREE_FEATURES.map((text) => (
            <View key={text} style={styles.row}>
              <Ionicons name="checkmark-circle" size={18} color="#34D399" />
              <Caption>{text}</Caption>
            </View>
          ))}
        </SurfaceCard>

        <SurfaceCard>
          <SectionTitle>Premium</SectionTitle>
          {PREMIUM_FEATURES.map((text) => (
            <View key={text} style={styles.row}>
              <Ionicons name="star" size={18} color="#F59E0B" />
              <Caption>{text}</Caption>
            </View>
          ))}
        </SurfaceCard>

        <SurfaceCard>
          <SectionTitle>Choose your plan</SectionTitle>
          <PrimaryButton
            label="Unlock Club5 Pro"
            onPress={handlePurchase}
            style={styles.cta}
          />
          <SecondaryButton label="Restore Purchases" onPress={handleRestore} style={styles.restore} />
          <Caption style={styles.billingNote}>
            Billing handled by RevenueCat / App Store / Google Play.
          </Caption>
        </SurfaceCard>
      </View>
    </GradientScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 16,
  },
  currentDescription: {
    marginTop: 8,
  },
  limitation: {
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 6,
  },
  cta: {
    marginTop: 12,
  },
  restore: {
    marginTop: 8,
  },
  billingNote: {
    marginTop: 10,
  },
});
