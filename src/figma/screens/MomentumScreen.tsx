import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useApp } from '../context/AppContext';
import { getLast30Days } from '../utils/dateUtils';
import { SPACING, BORDER_RADIUS, SHADOWS, getThemeColors, ThemeColors } from '../constants/theme';
import { useSubscription } from '@/src/context/SubscriptionContext';
import { ProgressTimeline } from '../components/ProgressTimeline';
import { LAYOUT } from '../theme/ui';
import { UiCard } from '../components/UiCard';
import ChallengePacks from '../components/ChallengePacks';
import InsightsBoard from '../components/InsightsBoard';
import Progress60Timeline from '../components/Progress60Timeline';
import { ProgressCasinoMap } from '../components/ProgressCasinoMap';
import { Ionicons } from '@expo/vector-icons';

type LockableSectionProps = {
  locked: boolean;
  onPress: () => void;
  children: ReactNode;
};

function LockableSection({ locked, onPress, children }: LockableSectionProps) {
  if (!locked) {
    return <>{children}</>;
  }
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={styles.lockedWrapper}>
      <View style={[styles.lockedOverlay]}>
        {children}
        <View style={styles.lockBadge}>
          <Ionicons name="lock-closed" size={14} color="#fff" />
          <Text style={styles.lockBadgeText}>Premium</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

type LevelGaugeProps = {
  currentDay: number;
  totalDays: number;
  colors: ThemeColors;
  isClean: boolean;
};

const LevelGauge: React.FC<LevelGaugeProps> = ({ currentDay, totalDays, colors, isClean }) => {
  const maxDays = Math.max(totalDays, 1);
  const clamped = Math.max(0, Math.min(maxDays, currentDay));
  const progress = clamped / maxDays;

  const ticks = [0, 30, 60, 90];

  return (
    <View style={styles.gaugeContainer}>
      <View
        style={[
          styles.gaugeBar,
          {
            backgroundColor: isClean ? colors.surfaceElevated : '#E5E7EB',
            borderWidth: isClean ? 1 : 0,
            borderColor: isClean ? colors.border : 'transparent',
          },
        ]}
      >
        <View style={[styles.gaugeTrack, { opacity: isClean ? 0.6 : 0.35 }]} />
        <LinearGradient
          colors={['#FB7185', '#FB923C', '#FCD34D']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[styles.gaugeFill, { width: `${progress * 100}%` }]}
        />
        <View
          style={[
            styles.gaugeMarker,
            {
              left: `${progress * 100}%`,
              backgroundColor: colors.surface,
              borderColor: colors.primary,
            },
          ]}
        />
      </View>

      <View style={styles.gaugeTicksRow}>
        {ticks.map(t => (
          <View key={t} style={styles.tickItem}>
            <View
              style={[
                styles.tickMark,
                { backgroundColor: colors.border },
              ]}
            />
            <Text style={[styles.gaugeTickLabel, { color: colors.textSecondary }]}>{t}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default function MomentumScreen() {
  const { checkIns, currentStreak, successRate, isDarkMode, userData } = useApp();
  const { isPremium } = useSubscription();
  const router = useRouter();
  const colors = getThemeColors(userData.themeMode, isDarkMode);
  const isClean = userData.themeMode === 'clean';
  const cleanCardStyle = isClean
    ? { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, shadowColor: colors.cardShadow }
    : {};
  const last30Days = getLast30Days();
  const [trialDaysLeft, setTrialDaysLeft] = useState<number | null>(null);
  const [isTrialEnded, setIsTrialEnded] = useState(false);

  useEffect(() => {
    const initTrial = async () => {
      const key = 'trialStartedAt';
      try {
        const stored = await AsyncStorage.getItem(key);
        let start = stored ? new Date(stored) : null;
        if (!start || Number.isNaN(start.getTime())) {
          start = new Date();
          await AsyncStorage.setItem(key, start.toISOString());
          setTrialDaysLeft(14);
          setIsTrialEnded(false);
          return;
        }
        const now = Date.now();
        const diffDays = Math.max(
          0,
          Math.floor((now - start.getTime()) / (1000 * 60 * 60 * 24)),
        );
        const daysLeft = Math.max(0, 14 - diffDays);
        setTrialDaysLeft(daysLeft);
        setIsTrialEnded(daysLeft === 0);
      } catch {
        setTrialDaysLeft(14);
        setIsTrialEnded(false);
      }
    };
    initTrial();
  }, []);

  const hasCheckIn = (date: string) => {
    return checkIns.some(c => c.date === date);
  };

  const longestStreak = useMemo(() => {
    const sorted = Array.from(new Set(checkIns.map(c => c.date))).sort();
    let longest = 0;
    let current = 0;
    let previous: string | null = null;

    sorted.forEach(date => {
      if (!previous) {
        current = 1;
        longest = 1;
      } else {
        const prevDate = new Date(previous);
        const thisDate = new Date(date);
        const diff =
          (thisDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24);

        if (diff === 1) {
          current += 1;
        } else {
          current = 1;
        }

        longest = Math.max(longest, current);
      }

      previous = date;
    });

    return longest;
  }, [checkIns]);

  const stats = [
    {
      value: currentStreak || 0,
      label: 'Current Streak',
      colors: ['#FF6B35', '#F7931E'] as const,
    },
    {
      value: checkIns.length,
      label: 'Last 30 Days',
      colors: ['#3B82F6', '#6366F1'] as const,
    },
    {
      value: longestStreak || 0,
      label: 'Best Streak',
      colors: ['#A855F7', '#EC4899'] as const,
    },
    {
      value: userData.totalCheckIns ?? checkIns.length,
      label: 'Total Days',
      colors: ['#10B981', '#059669'] as const,
    },
  ];
  const totalDaysCount = userData.totalCheckIns ?? checkIns.length ?? 0;
  const totalChallengeDays = 90;
  const lockedPremium = isTrialEnded && !isPremium;
  const currentDayInChallenge = Math.max(0, Math.min(totalDaysCount, totalChallengeDays));

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={colors.gradientBackground}
        style={styles.gradient}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.column}>
            {/* Hero */}
            <UiCard style={[styles.heroCard, styles.cardPadding, cleanCardStyle]}>
              <Text style={[styles.title, { color: colors.text }]}>
                Your Momentum
              </Text>
              <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                Track your progress and build consistency
              </Text>
              <TouchableOpacity activeOpacity={0.9} onPress={() => router.push('/(tabs)/subscription')}>
                <LinearGradient
                  colors={['#FB7185', '#FB923C']}
                  style={[styles.bannerCard, isTrialEnded ? styles.bannerDim : null]}
                >
                  <Text style={styles.bannerTitle}>
                    {trialDaysLeft === null
                      ? 'Loading your trial...'
                      : trialDaysLeft > 1
                      ? `${trialDaysLeft} days left of full access`
                      : trialDaysLeft === 1
                      ? '1 day left of full access'
                      : 'Your free trial has ended'}
                  </Text>
                  <Text style={styles.bannerSubtitle}>
                    {trialDaysLeft === null
                      ? 'Enjoy all premium insights during your free trial.'
                      : trialDaysLeft > 0
                      ? 'Enjoy all premium insights during your free trial.'
                      : 'Upgrade to keep premium analytics and insights.'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </UiCard>

            {/* Stats Grid */}
            <UiCard style={[styles.sectionCard, styles.cardPadding, cleanCardStyle]}>
              <View style={styles.statsGrid}>
                {stats.map((stat, index) => (
                  <Animated.View
                    key={stat.label}
                    style={styles.statItemWrap}
                    entering={FadeInUp.delay(100 + index * 50).springify().mass(0.9)}
                  >
                    <LinearGradient colors={stat.colors} style={styles.statCard}>
                      <Text style={styles.statValue}>{stat.value}</Text>
                      <Text style={styles.statLabel} numberOfLines={2}>
                        {stat.label}
                      </Text>
                    </LinearGradient>
                  </Animated.View>
                ))}
              </View>
            </UiCard>

            <UiCard style={[styles.sectionCard, styles.cardPadding, cleanCardStyle]}>
              <View style={styles.sectionHeaderRow}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Current Level</Text>
                <Text style={[styles.sectionMeta, { color: colors.textSecondary }]}>
                  Day {currentDayInChallenge} of {totalChallengeDays}
                </Text>
              </View>

              <LevelGauge
                currentDay={currentDayInChallenge}
                totalDays={totalChallengeDays}
                colors={colors}
                isClean={isClean}
              />

              <View
                style={[
                  styles.currentPhaseCard,
                  { backgroundColor: colors.surface, borderColor: colors.border },
                ]}
              >
                <Text style={[styles.currentPhaseTitle, { color: colors.text }]}>
                  Getting Started
                </Text>
                <Text style={[styles.currentPhaseSubtitle, { color: colors.textSecondary }]}>
                  Days 1-6
                </Text>
              </View>
            </UiCard>

            <UiCard style={[styles.sectionCard, styles.cardPadding, cleanCardStyle]}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>Journey Map</Text>
              <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>
                See your path from Day 1 to Day 90.
              </Text>
              <ProgressCasinoMap currentDay={currentDayInChallenge} totalDays={totalChallengeDays} />
            </UiCard>

            <ProgressTimeline totalDays={currentDayInChallenge} isDarkMode={isDarkMode} />
            <Progress60Timeline />
            <LockableSection locked={lockedPremium} onPress={() => router.push('/(tabs)/subscription')}>
              <InsightsBoard />
            </LockableSection>
            <LockableSection locked={lockedPremium} onPress={() => router.push('/(tabs)/subscription')}>
              <ChallengePacks />
            </LockableSection>

            {/* 30-Day Calendar */}
            <UiCard style={[styles.sectionCard, styles.cardPadding, cleanCardStyle]}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                Last 30 Days
              </Text>
              <View style={styles.calendar}>
                {last30Days.map((date, index) => {
                  const checked = hasCheckIn(date);
                  const dateNum = new Date(date).getDate();

                  return (
                    <Animated.View
                      key={date}
                      style={styles.calendarDay}
                      entering={FadeInUp.delay(280 + index * 20).springify().mass(0.9)}
                    >
                      <View
                        style={[
                          styles.dayDot,
                          {
                            backgroundColor: checked ? colors.success : colors.border,
                          },
                        ]}
                      />
                      <Text style={[styles.dayNumber, { color: colors.textSecondary }]}>
                        {dateNum}
                      </Text>
                    </Animated.View>
                  );
                })}
              </View>
              <View style={styles.legend}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: colors.success }]} />
                  <Text style={[styles.legendText, { color: colors.textSecondary }]}>Completed</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: colors.border }]} />
                  <Text style={[styles.legendText, { color: colors.textSecondary }]}>Missed</Text>
                </View>
              </View>
            </UiCard>

            {isPremium || !isTrialEnded ? null : (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => router.push('/(tabs)/subscription')}
                style={[
                  styles.card,
                  styles.premiumCta,
                  styles.sectionCard,
                  {
                    backgroundColor: isClean ? colors.surface : colors.surface,
                    borderWidth: isClean ? 1 : 0,
                    borderColor: isClean ? colors.border : 'transparent',
                    shadowColor: isClean ? colors.cardShadow : undefined,
                  },
                ]}
              >
                <LinearGradient
                  colors={['#FCD34D', '#F97316']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.premiumCtaGradient}
                >
                  <Text style={styles.premiumCtaTitle}>Unlock premium analytics</Text>
                  <Text style={styles.premiumCtaSubtitle}>
                    See longest streaks, on-time rate, and animated trends.
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: LAYOUT.screenPaddingHorizontal,
    paddingTop: 64,
    paddingBottom: SPACING.xl * 2,
    flexGrow: 1,
    alignItems: 'center',
  },
  column: {
    width: '100%',
    maxWidth: LAYOUT.columnMaxWidth,
    alignSelf: 'center',
    gap: LAYOUT.blockGap,
  },
  header: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  heroCard: {
    alignItems: 'center',
    gap: SPACING.md,
  },
  cardPadding: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    columnGap: 12,
    rowGap: 12,
    marginTop: 4,
  },
  statItemWrap: {
    width: '48%',
    aspectRatio: 1,
  },
  statCard: {
    flex: 1,
    borderRadius: BORDER_RADIUS.xl,
    paddingVertical: 18,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
    textAlign: 'center',
    flexShrink: 1,
    color: 'rgba(255,255,255,0.92)',
  },
  card: {
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    ...SHADOWS.md,
    width: '100%',
  },
  sectionCard: {
    width: '100%',
  },
  bannerCard: {
    alignItems: 'flex-start',
    gap: SPACING.xs,
    width: '100%',
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
  },
  bannerDim: {
    opacity: 0.8,
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  bannerSubtitle: {
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.9,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: SPACING.md,
  },
  cardSubtitle: {
    fontSize: 14,
    marginBottom: SPACING.md,
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
    paddingBottom: SPACING.md,
  },
  calendarDay: {
    width: '12%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: SPACING.xs,
  },
  legendText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: SPACING.xs,
  },
  dayDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginBottom: SPACING.xs,
  },
  dayNumber: {
    fontSize: 11,
    fontWeight: '600',
  },
  insight: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  insightIcon: {
    fontSize: 32,
  },
  insightText: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
  },
  insightDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  premiumCta: {
    padding: 0,
    overflow: 'hidden',
  },
  premiumCtaGradient: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.xl,
  },
  premiumCtaTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: SPACING.xs,
  },
  premiumCtaSubtitle: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  lockedWrapper: {
    width: '100%',
  },
  lockedOverlay: {
    opacity: 0.5,
    position: 'relative',
  },
  lockBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#F97316',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  lockBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  sectionMeta: {
    fontSize: 14,
    fontWeight: '600',
  },
  currentPhaseCard: {
    marginTop: 12,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
  },
  currentPhaseTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  currentPhaseSubtitle: {
    fontSize: 14,
  },
  gaugeContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  gaugeBar: {
    width: '100%',
    height: 18,
    borderRadius: 999,
    backgroundColor: '#FCE7DC',
    overflow: 'hidden',
    position: 'relative',
  },
  gaugeTrack: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: 999,
  },
  gaugeFill: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    borderRadius: 999,
  },
  gaugeMarker: {
    position: 'absolute',
    top: -4,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    transform: [{ translateX: -7 }],
  },
  gaugeTicksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 2,
  },
  tickItem: {
    alignItems: 'center',
    width: 40,
  },
  tickMark: {
    width: 2,
    height: 10,
    marginBottom: 4,
    borderRadius: 2,
  },
  gaugeTickLabel: {
    fontSize: 11,
    color: '#94A3B8',
  },
});
