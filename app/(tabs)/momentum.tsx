import React, { ReactNode, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useIsFocused } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useApp } from '@/figma/context/AppContext';
import { getLast30Days } from '@/figma/utils/dateUtils';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '@/figma/constants/theme';
import { ProgressTimeline } from '@/figma/components/ProgressTimeline';
import { LAYOUT } from '@/figma/theme/ui';
import { UiCard } from '@/figma/components/UiCard';
import ChallengePacks from '@/figma/components/ChallengePacks';
import InsightsBoard from '@/figma/components/InsightsBoard';
import Progress60Timeline from '@/figma/components/Progress60Timeline';
import { ProgressCasinoMap } from '@/figma/components/ProgressCasinoMap';
import { Ionicons } from '@expo/vector-icons';
import { useProEntitlement } from '@/src/hooks/useProEntitlement';

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
};

const LevelGauge: React.FC<LevelGaugeProps> = ({ currentDay, totalDays }) => {
  const clamped = Math.max(0, Math.min(totalDays, currentDay));
  const progress = totalDays === 0 ? 0 : clamped / totalDays;

  const ticks = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];

  return (
    <View style={styles.gaugeContainer}>
      <View style={styles.gaugeBar}>
        <LinearGradient
          colors={['#FB7185', '#FB923C', '#FCD34D'] as const}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[styles.gaugeTrack, { opacity: 0.35 }]}
        />
        <LinearGradient
          colors={['#FB7185', '#FB923C', '#FCD34D'] as const}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[styles.gaugeFill, { width: `${progress * 100}%` }]}
        />
      </View>

      <View style={styles.gaugeTicksRow}>
        {ticks.map(t => (
          <Text key={t} style={styles.gaugeTickLabel}>{t}</Text>
        ))}
      </View>
    </View>
  );
};

type StatCardProps = {
  value: string | number;
  label: string;
  colors: readonly [string, string, ...string[]];
};

function StatCard({ value, label, colors }: StatCardProps) {
  return (
    <LinearGradient colors={colors} style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text numberOfLines={2} style={styles.statLabel}>
        {label}
      </Text>
    </LinearGradient>
  );
}

export default function MomentumTab() {
  const { checkIns, isDarkMode, currentStreak, bestStreak, totalCheckIns, successRate } = useApp();
  const { isPro } = useProEntitlement();
  const router = useRouter();
  const colors = isDarkMode ? COLORS.dark : COLORS.light;
  const last30Days = getLast30Days();
  const [trialDaysLeft, setTrialDaysLeft] = useState<number | null>(null);
  const [isTrialEnded, setIsTrialEnded] = useState(false);
  const isFocused = useIsFocused();
  const progress = useSharedValue(isFocused ? 1 : 0);

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

  const hasCheckIn = (date: string) => checkIns.some((c: { date: string }) => c.date === date);

  useEffect(() => {
    progress.value = withTiming(isFocused ? 1 : 0, {
      duration: 220,
      easing: Easing.out(Easing.cubic),
    });
  }, [isFocused, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [
      {
        translateX: (1 - progress.value) * 12,
      },
    ],
  }));

  const currentDayInChallenge = checkIns.length;
  const totalChallengeDays = 90;
  const lockedPremium = isTrialEnded && !isPro;

  return (
    <Animated.View style={[{ flex: 1 }, animatedStyle]}>
      <View style={[styles.container, { backgroundColor: '#FAF8F3' }]}>
        <LinearGradient
          colors={colors.gradientBackground as readonly [string, string, ...string[]]}
          style={styles.gradient}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.column}>
              {/* Hero */}
              <UiCard style={[styles.heroCard, styles.cardPadding]}>
                <Text style={[styles.title, { color: colors.text }]}>
                  Your Momentum
                </Text>
                <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                  Track your progress and build consistency
                </Text>
                <TouchableOpacity
                  activeOpacity={lockedPremium ? 0.9 : 1}
                  disabled={!lockedPremium}
                  onPress={lockedPremium ? () => router.push('/paywall') : undefined}
                >
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
              <UiCard style={[styles.sectionCard, styles.cardPadding]}>
                <View style={styles.statsGrid}>
                  <StatCard value={currentStreak} label="Current streak" colors={['#FF8A00', '#FF3D00'] as const} />
                  <StatCard value={bestStreak} label="Best streak" colors={['#2979FF', '#0D47A1'] as const} />
                  <StatCard value={`${successRate}%`} label="On-time rate" colors={['#D500F9', '#AA00FF'] as const} />
                  <StatCard value={totalCheckIns} label="Total check-ins" colors={['#00C853', '#009624'] as const} />
                </View>
              </UiCard>

              <UiCard style={[styles.sectionCard, styles.cardPadding]}>
                <View style={styles.sectionHeaderRow}>
                  <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Current Level</Text>
                  <Text style={[styles.sectionMeta, { color: colors.textSecondary }]}>
                    Day {currentDayInChallenge} of {totalChallengeDays}
                  </Text>
                </View>

                <LevelGauge currentDay={currentDayInChallenge} totalDays={totalChallengeDays} />

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

              <UiCard style={[styles.sectionCard, styles.cardPadding]}>
                <Text style={[styles.cardTitle, { color: colors.text }]}>Journey Map</Text>
                <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>
                  See your path from Day 1 to Day 90.
                </Text>
                <ProgressCasinoMap currentDay={currentDayInChallenge} totalDays={totalChallengeDays} />
              </UiCard>

              <ProgressTimeline totalDays={checkIns.length} isDarkMode={isDarkMode} />
              <Progress60Timeline />
              <LockableSection locked={lockedPremium} onPress={() => router.push('/paywall')}>
                <InsightsBoard />
              </LockableSection>
              <LockableSection locked={lockedPremium} onPress={() => router.push('/paywall')}>
                <ChallengePacks />
              </LockableSection>

              {/* 30-Day Calendar */}
              <UiCard style={[styles.sectionCard, styles.cardPadding]}>
                <Text style={[styles.cardTitle, { color: colors.text }]}>
                  Last 30 Days
                </Text>
                <View style={styles.calendar}>
                  {last30Days.map((date: string) => {
                    const checked = hasCheckIn(date);
                    const dateNum = new Date(date).getDate();

                    return (
                      <View
                        key={date}
                        style={styles.calendarDay}
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
                      </View>
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

              {isPro || !isTrialEnded ? null : (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => router.push('/paywall')}
                  style={[styles.card, styles.premiumCta, styles.sectionCard, { backgroundColor: colors.surface }]}
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
    </Animated.View>
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
    paddingHorizontal: 16,
    paddingBottom: 8,
    rowGap: 12,
  },
  statCard: {
    width: '48%',
    borderRadius: 999,
    paddingVertical: 18,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
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
  gaugeTicksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  gaugeTickLabel: {
    fontSize: 11,
    color: '#94A3B8',
  },
});
