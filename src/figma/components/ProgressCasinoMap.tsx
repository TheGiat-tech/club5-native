import React, { useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  Easing,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SHADOW } from '../theme/ui';
import { getThemeColors } from '../constants/theme';
import { useApp } from '../context/AppContext';

type ProgressCasinoMapProps = {
  currentDay: number;
  totalDays?: number;
};

const LEVELS = [
  { title: '6 Days', subtitle: 'Days 1-6', range: [1, 6] as const },
  { title: '1 Week', subtitle: 'Days 7-13', range: [7, 13] as const },
  { title: '2 Weeks', subtitle: 'Days 14-27', range: [14, 27] as const },
  { title: '1 Month', subtitle: 'Days 28-57', range: [28, 57] as const },
  { title: '1.5 Months', subtitle: 'Days 58-75', range: [58, 75] as const },
  { title: '2 Months', subtitle: 'Days 76-90', range: [76, 90] as const },
  { title: '3 Months', subtitle: 'Beyond 90', range: [91, Infinity] as const },
] as const;

const OFFSETS = [-40, 40, -60, 60, -50, 50, 0];

export function ProgressCasinoMap({ currentDay, totalDays = 90 }: ProgressCasinoMapProps) {
  const { userData, isDarkMode } = useApp();
  const colors = getThemeColors(userData.themeMode, isDarkMode);
  const maxDays = Math.max(totalDays || 90, 1);
  const clampedDay = Math.max(0, Math.min(currentDay ?? 0, maxDays));
  const levelIndex = LEVELS.findIndex(({ range }) => clampedDay >= range[0] && clampedDay <= range[1]);
  const currentLevel = (levelIndex === -1 ? 0 : levelIndex);
  const totalSteps = LEVELS.length;

  const shimmer = useSharedValue(0.95);
  useEffect(() => {
    shimmer.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1400, easing: Easing.inOut(Easing.sin) }),
        withTiming(0.95, { duration: 1400, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
      true,
    );
  }, [shimmer]);

  return (
    <View style={styles.container}>
      <View style={styles.trackContainer}>
        <LinearGradient
          colors={[colors.primary, colors.primarySoft]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.track}
        />
        <View style={styles.pathColumn}>
          {LEVELS.map((level, index) => {
            const state =
              index < currentLevel ? 'complete' : index === currentLevel ? 'current' : 'locked';
            return (
              <LevelChip
                key={level.title}
                index={index}
                title={level.title}
                subtitle={level.subtitle}
                state={state}
                shimmer={shimmer}
                isEven={index % 2 === 0}
                colors={colors}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
}

type LevelState = 'complete' | 'current' | 'locked';

type LevelChipProps = {
  index: number;
  title: string;
  subtitle: string;
  state: LevelState;
  shimmer: SharedValue<number>;
  isEven: boolean;
  colors: ReturnType<typeof getThemeColors>;
};

function LevelChip({ index, title, subtitle, state, shimmer, isEven, colors }: LevelChipProps) {
  const floatY = useSharedValue(0);

  useEffect(() => {
    if (state === 'current') {
      floatY.value = withRepeat(
        withSequence(
          withTiming(-6, { duration: 900, easing: Easing.inOut(Easing.sin) }),
          withTiming(0, { duration: 900, easing: Easing.inOut(Easing.sin) }),
        ),
        -1,
        true,
      );
    }
  }, [floatY, state]);

  const chipStyle = useAnimatedStyle(() => {
    const translateY = state === 'current' ? floatY.value : 0;
    const chipScale = state === 'current' ? 1.03 : state === 'complete' ? shimmer.value : 1;
    return {
      transform: [{ translateY }, { scale: chipScale }],
      opacity: state === 'locked' ? 0.6 : 1,
    };
  }, [state]);

  const gradientColors =
    state === 'complete'
      ? [colors.success, colors.primary] as const
      : state === 'current'
      ? [colors.primary, colors.tertiary] as const
      : [colors.border, colors.textSecondary] as const;

  const glowStyle =
    state === 'current'
      ? {
          shadowColor: '#EC4899',
          shadowOpacity: 0.4,
          shadowRadius: 16,
          shadowOffset: { width: 0, height: 8 },
          elevation: 8,
        }
      : state === 'complete'
      ? { ...SHADOW.softGlow }
      : {};

  const offsetStyle: ViewStyle = isEven ? { alignSelf: 'flex-start' } : { alignSelf: 'flex-end' };

  return (
    <Animated.View style={[styles.levelRow, offsetStyle, chipStyle]}>
      <View style={[styles.glow, glowStyle]} />
      <LinearGradient
        colors={[gradientColors[0], gradientColors[1]] as const}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.chipOuter}
      >
        <View style={styles.chipInner}>
          <Text style={[styles.chipNumber, { color: colors.text }]}>{index + 1}</Text>
        </View>
        {state === 'locked' && (
          <View style={styles.lockBadge}>
            <Ionicons name="lock-closed" size={16} color="#fff" />
          </View>
        )}
      </LinearGradient>
      <View style={styles.labelBlock}>
        <Text style={[styles.levelTitle, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.levelSubtitle, { color: colors.textSecondary }]}>{subtitle}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  trackContainer: {
    width: '100%',
    alignSelf: 'center',
    position: 'relative',
    paddingVertical: 8,
    alignItems: 'center',
  },
  track: {
    position: 'absolute',
    width: '100%',
    height: 70,
    top: 0,
    borderRadius: 12,
  },
  pathColumn: {
    width: '100%',
    paddingTop: 16,
    gap: 12,
  },
  trackDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FBBF24',
    opacity: 0.7,
  },
  trackDotsRow: {
    position: 'absolute',
    top: 30,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  levelRow: {
    width: '100%',
    paddingVertical: 14,
    justifyContent: 'center',
  },
  chipWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    gap: 8,
  },
  chipOuter: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  chipInner: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
  },
  lockBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(0,0,0,0.25)',
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelBlock: {
    alignItems: 'center',
  },
  levelTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
  },
  levelSubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  glow: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
  },
});
