import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import { GradientScreen } from '../src/components/ui/Layout';
import { SurfaceCard } from '../src/components/ui/Card';
import { Title, Body, Caption } from '../src/components/ui/Typography';
import { useApp } from '@/figma/context/AppContext';
import { SPACING, BORDER_RADIUS, SHADOWS } from '@/figma/constants/theme';

export default function CoachSelectScreen() {
  const router = useRouter();
  const { updateUserData } = useApp();

  const handleSelect = (coachId: 'max' | 'natalie') => {
    updateUserData({ coach: coachId });
    router.push({ pathname: '/(tabs)/coach', params: { coachId } });
  };

  return (
    <GradientScreen>
      <View style={styles.container}>
        <Title style={styles.title}>Choose your coach</Title>
        <Caption style={styles.subtitle}>
          Pick the voice that fits you best. You can change this later in Settings.
        </Caption>

        <TouchableOpacity
          style={styles.cardWrapper}
          activeOpacity={0.9}
          onPress={() => handleSelect('max')}
        >
          <SurfaceCard
            style={[
              styles.card,
              { backgroundColor: '#FEF3C7', borderColor: '#FB923C', borderWidth: 1 },
            ]}
          >
            <Body style={styles.cardTitle}>Max</Body>
            <Caption>
              Direct, no-excuses 5AM drill coach. Short, punchy guidance that pushes you into
              action now.
            </Caption>
          </SurfaceCard>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cardWrapper}
          activeOpacity={0.9}
          onPress={() => handleSelect('natalie')}
        >
          <SurfaceCard
            style={[
              styles.card,
              { backgroundColor: '#FDF2FF', borderColor: '#EC4899', borderWidth: 1 },
            ]}
          >
            <Body style={styles.cardTitle}>Natalie</Body>
            <Caption>
              Warm, assertive, emotionally intelligent coach. Blends empathy with clear,
              motivating next steps.
            </Caption>
          </SurfaceCard>
        </TouchableOpacity>
      </View>
    </GradientScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.xl,
    paddingTop: 60,
  },
  title: {
    marginBottom: SPACING.sm,
  },
  subtitle: {
    marginBottom: SPACING.xl,
  },
  cardWrapper: {
    marginBottom: SPACING.lg,
    borderRadius: BORDER_RADIUS.xl,
    ...SHADOWS.md,
  },
  card: {
    borderRadius: BORDER_RADIUS.xl,
  },
  cardTitle: {
    marginBottom: SPACING.sm,
    fontWeight: '700',
  },
});
