import React, { useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { UiCard } from './UiCard';
import { COLORS as UI_COLORS, RADII, SHADOW } from '../theme/ui';
import { COLORS } from '../constants/theme';
import { useSubscription } from '@/src/context/SubscriptionContext';

type Pack = {
  id: string;
  label: string;
  duration: string;
  note: string;
  premium?: boolean;
};

const PACKS: Pack[] = [
  { id: 'free-7', label: '7-Day Free', duration: '7 days', note: 'Kickstart your habit', premium: false },
  { id: 'p-14', label: '14-Day Focus', duration: '14 days', note: 'Double your streak', premium: true },
  { id: 'p-30', label: '30-Day Builder', duration: '30 days', note: 'Lock the routine', premium: true },
  { id: 'p-45', label: '45-Day Push', duration: '45 days', note: 'Stay unstoppable', premium: true },
  { id: 'p-60', label: '60-Day Legend', duration: '60 days', note: 'Become the legend', premium: true },
];

interface ChallengePacksProps {
  onSelect?: (packId: string) => void;
}

export default function ChallengePacks({ onSelect }: ChallengePacksProps) {
  const { isPremium } = useSubscription();

  return (
    <UiCard>
      <Text style={styles.title}>Challenge Packs</Text>
      <View style={styles.grid}>
        {PACKS.map((pack) => {
          const locked = !!pack.premium && !isPremium;
          return (
            <PackCard key={pack.id} pack={pack} locked={locked} onSelect={onSelect} />
          );
        })}
      </View>
    </UiCard>
  );
}

type PackCardProps = {
  pack: Pack;
  locked: boolean;
  onSelect?: (packId: string) => void;
};

function PackCard({ pack, locked, onSelect }: PackCardProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const animatedStyle = {
    transform: [{ scale }],
  };

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.97, useNativeDriver: true, speed: 14, bounciness: 6 }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 14, bounciness: 6 }).start();
  };

  const handlePress = () => {
    if (onSelect) {
      onSelect(pack.id);
    } else {
      // TODO: hook up pack selection handler
    }
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      disabled={!pack.premium}
      style={({ pressed }) => [
        styles.pressable,
        pressed && styles.pressableActive,
      ]}
    >
      <Animated.View style={[styles.packCard, animatedStyle, locked ? styles.locked : null]}>
        {pack.premium ? (
          <LinearGradient
            colors={[UI_COLORS.gradientStart, UI_COLORS.gradientMid]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.packGradient}
          >
            <View style={styles.row}>
              <Text style={[styles.packLabel, { color: '#FFFFFF' }]}>{pack.label}</Text>
              <Text style={styles.badge}>Included</Text>
            </View>
            <Text style={[styles.packDuration, { color: '#FFFFFF' }]}>
              {pack.duration}
            </Text>
            <Text style={[styles.packNote, { color: '#FFFFFF', opacity: 0.9 }]}>
              {pack.note}
            </Text>
          </LinearGradient>
        ) : (
          <View style={[styles.freeCard, styles.packGradient]}>
            <Text style={[styles.packLabel, { color: COLORS.light.text }]}>{pack.label}</Text>
            <Text style={[styles.packDuration, { color: COLORS.light.textSecondary }]}>{pack.duration}</Text>
            <Text style={[styles.packNote, { color: COLORS.light.textSecondary }]}>{pack.note}</Text>
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
  },
  grid: {
    gap: 14,
    paddingBottom: 4,
  },
  pressable: {
    borderRadius: RADII.card,
    marginBottom: 12,
  },
  pressableActive: {
    transform: [{ translateY: 1 }],
  },
  packCard: {
    borderRadius: RADII.card,
    overflow: 'hidden',
    ...SHADOW.cardShadow,
  },
  packGradient: {
    padding: 16,
    borderRadius: RADII.card,
    gap: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  packLabel: {
    fontSize: 16,
    fontWeight: '700',
  },
  packDuration: {
    fontSize: 14,
    fontWeight: '600',
  },
  packNote: {
    fontSize: 13,
  },
  badge: {
    backgroundColor: '#FFFFFF',
    color: UI_COLORS.gradientMid,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 18,
    fontWeight: '700',
    fontSize: 12,
  },
  locked: {
    opacity: 0.9,
  },
  freeCard: {
    backgroundColor: COLORS.light.surface,
  },
});
