import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '../context/AppContext';
import { UiCard } from './UiCard';
import { COLORS as UI_COLORS, RADII, SHADOW } from '../theme/ui';
import { getThemeColors } from '../constants/theme';
import ConfettiAnimation from './ConfettiAnimation';

const STAGES = [
  { range: [1, 6] as const, title: 'Getting Started', description: 'Get the habit started.' },
  { range: [7, 29] as const, title: 'First Wins', description: 'Stack your first wins.' },
  { range: [30, 59] as const, title: 'Building Momentum', description: 'Lock the routine.' },
  { range: [60, 90] as const, title: 'Legend Mode', description: 'Become the legend.' },
];

export default function Progress60Timeline() {
  const { checkIns, isDarkMode, userData } = useApp();
  const totalDays = userData.totalCheckIns ?? checkIns.length ?? 0;
  const [showConfetti, setShowConfetti] = useState(false);
  const prevDaysRef = useRef(totalDays);

  const colors = getThemeColors(userData.themeMode, isDarkMode);
  const isClean = userData.themeMode === 'clean';

  const pulse = useRef(new Animated.Value(1)).current;

  const days = useMemo(() => Math.max(0, Math.min(totalDays ?? 0, 90)), [totalDays]);

  const activeStageIndex = useMemo(() => {
    const idx = STAGES.findIndex(({ range }) => days >= range[0] && days <= range[1]);
    return idx === -1 ? 0 : idx;
  }, [days]);

  const activeStage = STAGES[activeStageIndex];

  useEffect(() => {
    if (totalDays > prevDaysRef.current) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 1800);
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.05, duration: 220, easing: Easing.out(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 260, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ]).start();
      prevDaysRef.current = totalDays;
      return () => clearTimeout(timer);
    }
    prevDaysRef.current = totalDays;
  }, [days, totalDays, pulse]);

  const progressText = `Day ${days} of 90`;
  const progressValue = Math.min(days / 90, 1);
  const ticks = [0, 30, 60, 90];

  return (
    <UiCard
      style={[
        styles.card,
        isClean ? { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, shadowColor: colors.cardShadow } : {},
      ]}
    >
      {showConfetti && <ConfettiAnimation />}
      <View style={styles.headerRow}>
        <Text style={[styles.sectionLabel, { color: colors.text }]}>Your Current Level</Text>
        <Text style={[styles.sectionMeta, { color: colors.textSecondary }]}>{progressText}</Text>
      </View>

      <View style={styles.pathWrapper}>
        <View
          style={[
            styles.barTrack,
            {
              backgroundColor: isClean ? colors.surfaceElevated : isDarkMode ? colors.surface : '#E5E7EB',
              borderWidth: isClean ? 1 : 0,
              borderColor: isClean ? colors.border : 'transparent',
            },
          ]}
        >
          <LinearGradient
            colors={['#FF6CAB', '#FFA85A']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={[styles.barFill, { width: `${progressValue * 100}%` }]}
          />
          <View
            style={[
              styles.barMarker,
              {
                left: `${progressValue * 100}%`,
                backgroundColor: colors.surface,
                borderColor: colors.primary,
              },
            ]}
          />
        </View>
        <View style={styles.barLabels}>
          {ticks.map((t) => (
            <View key={t} style={styles.tickItem}>
              <View style={[styles.tickMark, { backgroundColor: colors.border }]} />
              <Text style={[styles.barLabelText, { color: t === days ? colors.text : colors.textSecondary, fontWeight: t === days ? '800' : '700' }]}>
                {t}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <Animated.View
        style={[
          styles.stagePill,
          {
            backgroundColor: isClean ? colors.surface : '#F3EDFF',
            transform: [{ scale: pulse }],
            borderWidth: isClean ? 1 : 0,
            borderColor: isClean ? colors.border : 'transparent',
            shadowColor: isClean ? colors.cardShadow : undefined,
          },
        ]}
      >
        <Text style={[styles.stagePillText, { color: colors.text }]}>{activeStage.title}</Text>
        <Text style={[styles.stagePillSub, { color: colors.textSecondary }]}>{`Days ${activeStage.range[0]}–${activeStage.range[1]}`}</Text>
      </Animated.View>
    </UiCard>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    gap: 14,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: '800',
  },
  sectionMeta: {
    fontSize: 14,
    fontWeight: '600',
  },
  pathWrapper: {
    gap: 8,
  },
  barTrack: {
    height: 14,
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
    position: 'relative',
  },
  barFill: {
    height: '100%',
    borderRadius: 20,
  },
  barMarker: {
    position: 'absolute',
    top: -4,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    transform: [{ translateX: -7 }],
  },
  barLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  barLabelText: {
    fontSize: 12,
    fontWeight: '700',
  },
  tickItem: {
    alignItems: 'center',
    width: 40,
    gap: 4,
  },
  tickMark: {
    width: 2,
    height: 10,
    borderRadius: 2,
  },
  stageBadge: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: RADII.card,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOW.cardShadow,
  },
  glow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: RADII.card,
    backgroundColor: UI_COLORS.gradientEnd,
    opacity: 0.12,
  },
  stageTitle: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  stageSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  ladderGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    columnGap: 12,
    rowGap: 16,
  },
  stagePill: {
    marginTop: 6,
    borderRadius: RADII.card,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOW.cardShadow,
  },
  stagePillText: {
    fontSize: 16,
    fontWeight: '800',
  },
  stagePillSub: {
    fontSize: 13,
    marginTop: 4,
  },
});
