import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import { getGreeting } from '../utils/dateUtils';
import CheckInButton from '../components/CheckInButton';
import CoachAvatar from '../components/CoachAvatar';
import StatCard from '../components/StatCard';
import MomentumCalendar from '../components/MomentumCalendar';
import ConfettiAnimation from '../components/ConfettiAnimation';
import { ChallengeCompleteModal } from '../components/ChallengeCompleteModal';
import { useChallengeGuard } from '../hooks/useChallengeGuard';
import { SPACING, BORDER_RADIUS, SHADOWS, getThemeColors } from '../constants/theme';
import { LAYOUT, SHADOW } from '../theme/ui';
import { UiCard } from '../components/UiCard';
import Progress60Timeline from '../components/Progress60Timeline';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  FadeInDown,
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';

type HomeScreenProps = {
  quote?: string;
};

function buildCoachMessage(name: string, total: number, streak: number, wasLate?: boolean) {
  const safeName = name || 'friend';
  const day = total || 1;

  let line1: string;
  if (day === 1) {
    line1 = `Great start, ${safeName}.`;
  } else if (day <= 7) {
    line1 = `Nice work, ${safeName}. Day ${day}.`;
  } else if (day <= 30) {
    line1 = `You're on a roll, ${safeName}. Day ${day}.`;
  } else {
    line1 = `Unstoppable, ${safeName}. Day ${day}.`;
  }

  let line2: string;
  if (streak <= 1) {
    line2 = 'Every check-in counts. Keep going.';
  } else if (streak <= 3) {
    line2 = `That's a ${streak}-day streak. Keep stacking wins.`;
  } else if (streak <= 7) {
    line2 = `You're building real momentum. ${streak} days in a row.`;
  } else {
    line2 = `This streak is serious. ${streak} days and counting.`;
  }

  const timingLine = wasLate
    ? 'A little late, but you still checked in. That matters.'
    : 'Right on time. Love the consistency.';

  return `${line1} ${line2} ${timingLine}`;
}

export default function HomeScreen({ quote }: HomeScreenProps) {
  const { userData, checkInNow, isDarkMode, hasCheckedInToday } = useApp();
  const totalCheckIns = userData.totalCheckIns ?? 0;
  const router = useRouter();
  const colors = getThemeColors(userData.themeMode, isDarkMode);
  const isClean = userData.themeMode === 'clean';
  const { t } = useTranslation();
  const { isOverFreeLimit, modalVisible, openModal, closeModal, startOver, goPremium } =
    useChallengeGuard();
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCoachMessage, setShowCoachMessage] = useState(false);
  const [coachMessage, setCoachMessage] = useState('');
  const displayName = userData.displayName || userData.firstName;
  const streakValue = userData.currentStreak ?? 0;
  const totalCheckInsValue = userData.totalCheckIns ?? totalCheckIns ?? 0;
  const iconFloat = useSharedValue(0);
  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: iconFloat.value }],
  }));
  const heroScale = useSharedValue(1);
  const heroStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heroScale.value }],
  }));

  useEffect(() => {
    iconFloat.value = withRepeat(
      withSequence(
        withTiming(-7, { duration: 1600, easing: Easing.inOut(Easing.sin) }),
        withTiming(7, { duration: 1600, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
      true,
    );
  }, [iconFloat]);

  useEffect(() => {
    if (showConfetti) {
      heroScale.value = withSequence(
        withTiming(1.02, { duration: 220, easing: Easing.out(Easing.ease) }),
        withTiming(1, { duration: 260, easing: Easing.inOut(Easing.ease) }),
      );
    }
  }, [heroScale, showConfetti]);

  const handleAwake = async () => {
    if (hasCheckedInToday) {
      return;
    }

    if (isOverFreeLimit) {
      openModal();
      return;
    }

    const result = await checkInNow();
    if (!result.success) {
      setCoachMessage('You already checked in for today. Keep it up tomorrow.');
      setShowCoachMessage(true);
      return;
    }

    const updated = result.updatedUser ?? userData;
    const total = updated?.totalCheckIns || 1;
    const streak = updated?.currentStreak || 0;
    const name =
      (updated as any)?.displayName ||
      (updated as any)?.firstName ||
      userData.displayName ||
      userData.firstName ||
      '';
    const message = buildCoachMessage(name, total, streak, result.wasLate);

    setCoachMessage(message);
    setShowConfetti(true);

    setTimeout(() => {
      setShowConfetti(false);
      setShowCoachMessage(true);
    }, 2500);
  };

  const cleanCardStyle =
    isClean
      ? { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, shadowColor: colors.cardShadow }
      : {};

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
            {/* Header */}
            <Animated.View
              entering={FadeInDown.duration(400)}
              style={styles.header}
            >
              <UiCard style={[styles.cardPadding, cleanCardStyle]}>
                <Text style={[styles.greeting, { color: colors.primary }]}>
                  {t(
                    getGreeting() === 'Good morning'
                      ? 'home.goodMorning'
                      : getGreeting() === 'Good afternoon'
                      ? 'home.goodAfternoon'
                      : 'home.goodEvening',
                  )}
                </Text>
                <Text style={[styles.name, { color: colors.textSecondary }]}>
                  {displayName}
                </Text>
              </UiCard>
            </Animated.View>

            {/* Check-In Button */}
            <Animated.View
              entering={FadeInUp.delay(100).springify().mass(0.8)}
              style={styles.checkInContainer}
            >
              <Animated.View style={heroStyle}>
                <UiCard style={[styles.heroCard, styles.cardPadding, cleanCardStyle]}>
                  <Animated.View style={[styles.iconWrapper, iconStyle]}>
                    <Ionicons name="star" size={56} color="#FFD166" />
                  </Animated.View>
                  <CheckInButton
                    hasCheckedIn={hasCheckedInToday}
                    onPress={handleAwake}
                  />
                </UiCard>
              </Animated.View>
            </Animated.View>

            {/* Stats */}
            <UiCard style={[styles.cardPadding, cleanCardStyle]}>
              <View style={styles.statsRow}>
                <Animated.View entering={FadeInUp.delay(150).springify().mass(0.9)} style={styles.statItem}>
                  <StatCard
                    icon="flame"
                    label="Streak"
                    value={streakValue}
                    unit={streakValue === 1 ? 'day' : 'days'}
                    gradientColors={['#FF6B35', '#F7931E']}
                  />
                </Animated.View>
                <Animated.View entering={FadeInUp.delay(200).springify().mass(0.9)} style={styles.statItem}>
                  <StatCard
                    icon="star"
                    label="Total"
                    value={totalCheckInsValue}
                    unit="check-ins"
                    gradientColors={['#A855F7', '#EC4899']}
                  />
                </Animated.View>
              </View>
            </UiCard>

            <UiCard style={styles.cardPadding}>
              <Progress60Timeline />
            </UiCard>


            {/* Momentum Calendar */}
            <UiCard style={[styles.cardPadding, cleanCardStyle]}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                {t('home.last7Days')}
              </Text>
              <MomentumCalendar />
            </UiCard>

            {/* Daily Quote */}
            <UiCard style={[styles.quoteCard, styles.cardPadding, cleanCardStyle]}>
              <Text style={styles.quoteIcon}>{'“'}</Text>
              <Text style={[styles.quoteText, { color: colors.text }]}>
                {quote || '"The secret of getting ahead is getting started."'}
              </Text>
              <Text style={[styles.quoteAuthor, { color: colors.textSecondary }]}>
                {quote ? '' : '- Mark Twain'}
              </Text>
            </UiCard>

            {/* Coach Preview */}
            <UiCard style={[styles.cardPadding, cleanCardStyle]}>
              <View style={styles.coachPreview}>
                <CoachAvatar coach={userData.coach} size={64} />
                <View style={styles.coachInfo}>
                  <Text style={[styles.coachLabel, { color: colors.textSecondary }]}>
                    Your Coach
                  </Text>
                  <Text style={[styles.coachName, { color: colors.text }]}>
                    {userData.coach === 'natalie' ? 'Natalie' : 'Max'}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.motivationButton}
                onPress={() => router.push('/coach-select')}
              >
                <LinearGradient
                  colors={colors.gradient2}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.motivationGradient}
                >
                  <Text style={styles.motivationText}>Get Daily Motivation</Text>
                </LinearGradient>
              </TouchableOpacity>
            </UiCard>
          </View>
        </ScrollView>
      </LinearGradient>

      {/* Confetti */}
      {showConfetti && <ConfettiAnimation />}

      {/* Coach Message Modal */}
      <Modal
        visible={showCoachMessage}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCoachMessage(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <CoachAvatar coach={userData.coach} size={80} />
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              {userData.coach === 'natalie' ? 'Natalie' : 'Max'}
            </Text>
            <Text style={[styles.modalMessage, { color: colors.textSecondary }]}>
              {coachMessage}
            </Text>
            <TouchableOpacity
              onPress={() => setShowCoachMessage(false)}
              style={styles.modalButton}
            >
              <LinearGradient
                colors={colors.gradient1}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.modalButtonGradient}
              >
                <Text style={styles.modalButtonText}>Thanks!</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ChallengeCompleteModal
        visible={modalVisible}
        onClose={closeModal}
        onStartOver={startOver}
        onGoPremium={goPremium}
        isDarkMode={isDarkMode}
      />
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
    paddingBottom: 48,
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
  greeting: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  checkInContainer: {
    alignItems: 'center',
  },
  heroCard: {
    width: '100%',
    alignItems: 'center',
    gap: SPACING.md,
  },
  cardPadding: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  heroGlow: {
    ...SHADOW.softGlow,
  },
  statsRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    aspectRatio: 1,
  },
  iconWrapper: {
    padding: SPACING.sm,
  },
  card: {
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    ...SHADOWS.md,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: SPACING.md,
  },
  quoteCard: {
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.xl,
    alignItems: 'center',
    ...SHADOWS.md,
  },
  quoteIcon: {
    fontSize: 40,
    marginBottom: SPACING.md,
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  quoteAuthor: {
    fontSize: 14,
    fontWeight: '600',
  },
  coachPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  coachInfo: {
    flex: 1,
  },
  coachLabel: {
    fontSize: 14,
    marginBottom: SPACING.xs,
  },
  coachName: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  motivationButton: {
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
  },
  motivationGradient: {
    padding: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  motivationText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
    lineHeight: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  modalContent: {
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.xxl,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    ...SHADOWS.lg,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: SPACING.xl,
  },
  modalButton: {
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
    width: '100%',
  },
  modalButtonGradient: {
    padding: SPACING.md,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
