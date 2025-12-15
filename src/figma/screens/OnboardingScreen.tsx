import React, { useMemo, useRef, useState, useCallback, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter, useRootNavigationState } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UiCard } from '../components/UiCard';
import CoachAvatar from '../components/CoachAvatar';
import { useApp } from '../context/AppContext';
import { CoachType, Profile } from '../types';
import { COLORS as THEME_COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { COLORS, LAYOUT, RADII } from '../theme/ui';

type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6;

const PRESET_TIMES = ['4:00 AM', '4:30 AM', '5:00 AM', '5:30 AM', '6:00 AM', '6:30 AM', '7:00 AM', '7:30 AM'];

const formatTime = (hour: number, minute: number, period: 'AM' | 'PM') => {
  const normalizedHour = ((hour - 1 + 12) % 12) + 1;
  const normalizedMinute = Math.max(0, Math.min(59, minute));
  return `${normalizedHour}:${normalizedMinute.toString().padStart(2, '0')} ${period}`;
};

const parseTime = (time: string) => {
  const match = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (match) {
    return {
      hour: Math.min(12, Math.max(1, Number(match[1]))),
      minute: Math.min(59, Math.max(0, Number(match[2]))),
      period: match[3].toUpperCase() === 'PM' ? 'PM' : 'AM',
    } as const;
  }
  return { hour: 5, minute: 0, period: 'AM' as const };
};

const GradientButton = ({
  title,
  onPress,
  disabled,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}) => (
  <TouchableOpacity
    activeOpacity={disabled ? 1 : 0.9}
    onPress={disabled ? undefined : onPress}
    style={styles.ctaWrapper}
  >
    <LinearGradient
      colors={disabled ? ['#D1D5DB', '#D1D5DB'] : ['#FF6B35', '#F7931E']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[styles.ctaButton, disabled && { opacity: 0.7 }]}
    >
      <Text style={styles.ctaText}>{title}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

const OutlineButton = ({ title, onPress }: { title: string; onPress: () => void }) => (
  <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={styles.outlineButton}>
    <Text style={styles.outlineText}>{title}</Text>
  </TouchableOpacity>
);

const PillOption = ({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.9}
    style={[styles.pill, selected ? styles.pillSelected : styles.pillUnselected]}
  >
    <Text style={[styles.pillText, selected ? styles.pillTextSelected : styles.pillTextDefault]}>{label}</Text>
  </TouchableOpacity>
);

const CoachCard = ({
  coach,
  selected,
  onPress,
  subtitle,
  emoji,
}: {
  coach: CoachType;
  selected: boolean;
  onPress: () => void;
  subtitle: string;
  emoji: string;
}) => (
  <TouchableOpacity
    activeOpacity={0.9}
    onPress={onPress}
    style={[
      styles.coachCard,
      selected ? styles.coachCardSelected : styles.coachCardDefault,
    ]}
  >
    <View style={styles.coachHeader}>
      <CoachAvatar coach={coach} size={64} />
      <Text style={styles.coachEmoji}>{emoji}</Text>
    </View>
    <Text style={styles.coachTitle}>{coach === 'natalie' ? 'Natalie' : 'Max'}</Text>
    <Text style={styles.coachSubtitle}>{subtitle}</Text>
  </TouchableOpacity>
);

export default function OnboardingScreen() {
  const KEYBOARD_VERTICAL_OFFSET = Platform.OS === 'ios' ? 90 : 20;
  const { profile, saveProfile, completeOnboarding, isDarkMode, isProfileComplete } = useApp();
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();
  const params = useLocalSearchParams<{ step?: string }>();
  const colors = isDarkMode ? THEME_COLORS.dark : THEME_COLORS.light;
  const hasRedirectedRef = useRef(false);

  const startStep = useMemo<Step>(() => {
    switch ((params.step as string) || '') {
      case 'name':
        return 1;
      case 'pronoun':
        return 2;
      case 'wake':
        return 3;
      case 'coach':
        return 5;
      case 'confirm':
        return 6;
      default:
        return 0;
    }
  }, [params.step]);

  const initialWakeTime = profile.firstName ? profile.wakeTime : '';
  const [step, setStep] = useState<Step>(startStep);
  const [firstName, setFirstName] = useState(profile.firstName);
  const initialGender =
    profile.gender === 'she' ? 'female' : profile.gender === 'he' ? 'male' : (profile.gender as string | null);
  const [gender, setGender] = useState<string | null>(profile.firstName ? initialGender : null);
  const [wakeTime, setWakeTime] = useState(initialWakeTime);
  const [coach, setCoach] = useState<CoachType | null>(profile.firstName ? profile.coach : null);

  const parsed = parseTime(wakeTime || '5:00 AM');
  const [customHour, setCustomHour] = useState(parsed.hour);
  const [customMinute, setCustomMinute] = useState(parsed.minute);
  const [customPeriod, setCustomPeriod] = useState<'AM' | 'PM'>(parsed.period);

  const isLastStep = step === 6;

  const goBack = () => {
    if (step === 0) return;
    setStep((prev) => (prev > 0 ? ((prev - 1) as Step) : prev));
  };

  const handleContinue = useCallback(async () => {
    if (step === 0) {
      setStep(1);
      return;
    }

    if (step === 1) {
      if (!firstName.trim()) return;
      setStep(2);
      return;
    }

    if (step === 2) {
      if (!gender) return;
      setStep(3);
      return;
    }

    if (step === 3) {
      if (!wakeTime) return;
      setStep(5);
      return;
    }

    if (step === 4) {
      const formatted = formatTime(customHour, customMinute, customPeriod);
      setWakeTime(formatted);
      setStep(5);
      return;
    }

    if (step === 5) {
      if (!coach) return;
      setStep(6);
      return;
    }

    const trimmedName = firstName.trim();
    const mappedGender = gender === 'female' ? 'she' : gender === 'male' ? 'he' : 'other';
    await saveProfile({
      firstName: trimmedName,
      gender: mappedGender as any,
      wakeTime: wakeTime || formatTime(customHour, customMinute, customPeriod),
      coach: coach || 'natalie',
    });
    await completeOnboarding();

    if (!rootNavigationState?.key) {
      console.warn('[Onboarding] Root navigation not ready in handleContinue, skipping navigation');
      return;
    }

    if (hasRedirectedRef.current) {
      return;
    }
    hasRedirectedRef.current = true;

    router.replace('/(tabs)');
  }, [
    coach,
    completeOnboarding,
    customHour,
    customMinute,
    customPeriod,
    firstName,
    gender,
    rootNavigationState?.key,
    router,
    saveProfile,
    step,
    wakeTime,
  ]);

  const handleCustomTimeChange = (deltaHour: number, deltaMinute: number) => {
    setCustomHour((prev) => ((prev - 1 + deltaHour + 12) % 12) + 1);
    setCustomMinute((prev) => {
      const next = prev + deltaMinute;
      if (next >= 60) return 0;
      if (next < 0) return 55;
      return next;
    });
  };

  const selectedTime = wakeTime || formatTime(customHour, customMinute, customPeriod);
  const canContinue =
    (step === 0) ||
    (step === 1 && Boolean(firstName.trim())) ||
    (step === 2 && Boolean(gender)) ||
    (step === 3 && Boolean(wakeTime)) ||
    step === 4 ||
    (step === 5 && Boolean(coach)) ||
    step === 6;
  const primaryCtaLabel = step === 0 ? 'Begin Your Journey' : isLastStep ? "Let's Go!" : 'Continue';

  useEffect(() => {
    if (!isProfileComplete) return;

    if (!rootNavigationState?.key) {
      console.warn('[Onboarding] Root navigation not ready in effect, skipping navigation');
      return;
    }

    if (hasRedirectedRef.current) return;
    hasRedirectedRef.current = true;
    router.replace('/(tabs)');
  }, [isProfileComplete, rootNavigationState?.key, router]);

  if (isProfileComplete) {
    return null;
  }

  const renderProgress = () => (
    <View style={styles.progressRow}>
      {[0, 1, 2, 3, 4, 5, 6].map((index) => (
        <View
          key={index}
          style={[
            styles.progressDot,
            { backgroundColor: index <= step ? colors.primary : colors.border },
          ]}
        />
      ))}
    </View>
  );

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <View style={styles.centered}>
            <View style={styles.iconBadge}>
              <Ionicons name="sparkles" size={40} color="#FDE68A" />
            </View>
            <Text style={styles.heroTitle}>Club5 AI</Text>
            <Text style={styles.heroSubtitle}>Build unshakeable discipline.{'\n'}Wake up with purpose.</Text>
          </View>
        );
      case 1:
        return (
          <View style={styles.stepSection}>
            <Text style={styles.stepTitle}>What’s your first name?</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Your coach will use this to connect with you.
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.surface,
                  color: colors.text,
                  borderColor: colors.border,
                },
              ]}
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Enter your name"
              placeholderTextColor={colors.textSecondary}
              autoCapitalize="words"
            />
          </View>
        );
      case 2:
        return (
          <View style={styles.stepSection}>
            <Text style={styles.stepTitle}>How should we refer to you?</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              This personalizes your coaching experience.
            </Text>
            <View style={styles.pillRow}>
              <PillOption label="Male" selected={gender === 'male'} onPress={() => setGender('male' as any)} />
              <PillOption label="Female" selected={gender === 'female'} onPress={() => setGender('female' as any)} />
              <PillOption label="Other" selected={gender === 'other'} onPress={() => setGender('other' as any)} />
            </View>
          </View>
        );
      case 3:
        return (
          <View style={styles.stepSection}>
            <Text style={styles.stepTitle}>What time will you wake up?</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Choose your daily commitment.</Text>
            <View style={styles.timeGrid}>
              {PRESET_TIMES.map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[styles.timeButton, wakeTime === time ? styles.timeButtonSelected : styles.timeButtonDefault]}
                  activeOpacity={0.9}
                  onPress={() => setWakeTime(time)}
                >
                  <Text style={[styles.timeButtonText, wakeTime === time ? styles.timeButtonTextSelected : null]}>
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <OutlineButton title="Custom time" onPress={() => setStep(4)} />
          </View>
        );
      case 4:
        return (
          <View style={styles.stepSection}>
            <Text style={styles.stepTitle}>Set your exact time</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Fine-tune your wake-up time.</Text>
            <View style={styles.customTimeRow}>
              <View style={styles.timeColumn}>
                <TouchableOpacity style={styles.adjustButton} onPress={() => handleCustomTimeChange(1, 0)}>
                  <Ionicons name="chevron-up" size={18} color={colors.text} />
                </TouchableOpacity>
                <Text style={styles.timeValue}>{customHour.toString().padStart(2, '0')}</Text>
                <TouchableOpacity style={styles.adjustButton} onPress={() => handleCustomTimeChange(-1, 0)}>
                  <Ionicons name="chevron-down" size={18} color={colors.text} />
                </TouchableOpacity>
              </View>
              <Text style={[styles.colon, { color: colors.textSecondary }]}>:</Text>
              <View style={styles.timeColumn}>
                <TouchableOpacity style={styles.adjustButton} onPress={() => handleCustomTimeChange(0, 5)}>
                  <Ionicons name="chevron-up" size={18} color={colors.text} />
                </TouchableOpacity>
                <Text style={styles.timeValue}>{customMinute.toString().padStart(2, '0')}</Text>
                <TouchableOpacity style={styles.adjustButton} onPress={() => handleCustomTimeChange(0, -5)}>
                  <Ionicons name="chevron-down" size={18} color={colors.text} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => setCustomPeriod((prev) => (prev === 'AM' ? 'PM' : 'AM'))}
                style={styles.periodChip}
                activeOpacity={0.85}
              >
                <Text style={styles.periodText}>{customPeriod}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.selectedTimePill}>
              <Text style={styles.selectedTimeText}>{formatTime(customHour, customMinute, customPeriod)}</Text>
            </View>
          </View>
        );
      case 5:
        return (
          <View style={styles.stepSection}>
            <Text style={styles.stepTitle}>Choose your AI coach</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>They’ll guide you every morning.</Text>
            <View style={styles.coachRow}>
              <CoachCard
                coach="natalie"
                emoji="✨"
                subtitle="Wise, calm, and nurturing"
                selected={coach === 'natalie'}
                onPress={() => setCoach('natalie')}
              />
              <CoachCard
                coach="max"
                emoji="🔥"
                subtitle="Grounded, strong, supportive"
                selected={coach === 'max'}
                onPress={() => setCoach('max')}
              />
            </View>
          </View>
        );
      case 6:
        return (
          <View style={styles.centered}>
            <Text style={styles.starIcon}>⭐</Text>
            <Text style={styles.heroTitle}>You’re all set, {firstName || 'friend'}!</Text>
            <Text style={styles.heroSubtitle}>
              {(coach === 'max' ? 'Max' : 'Natalie')} will see you tomorrow at {selectedTime}.
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
    >
      <SafeAreaView style={styles.container}>
        <LinearGradient colors={colors.gradientBackground} style={styles.gradient}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.column}>
              {renderProgress()}
              <Animated.View entering={FadeInUp.springify().mass(0.9)} style={{ width: '100%' }}>
                <UiCard style={styles.cardSurface}>
                  {renderStep()}
                  <View style={styles.navRow}>
                    {step > 0 ? (
                      <TouchableOpacity onPress={goBack} style={styles.backLink} activeOpacity={0.8}>
                        <Text style={styles.backLinkText}>Back</Text>
                      </TouchableOpacity>
                    ) : (
                      <View />
                    )}
                    <GradientButton
                      title={primaryCtaLabel}
                      onPress={handleContinue}
                      disabled={!canContinue}
                    />
                  </View>
                </UiCard>
              </Animated.View>
            </View>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: LAYOUT.screenPaddingHorizontal,
    paddingTop: 48,
    paddingBottom: 24,
    alignItems: 'center',
    flexGrow: 1,
  },
  column: {
    width: '100%',
    maxWidth: LAYOUT.columnMaxWidth,
    gap: LAYOUT.blockGap,
  },
  cardSurface: {
    borderRadius: RADII.card,
    paddingVertical: 28,
    paddingHorizontal: 24,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 18,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  centered: {
    alignItems: 'center',
    gap: 12,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    color: '#1F2937',
  },
  heroSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6B7280',
    lineHeight: 22,
  },
  iconBadge: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: '#FFF3E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  stepSection: {
    gap: 14,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
  },
  input: {
    borderWidth: 1.5,
    borderRadius: BORDER_RADIUS.xl,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    fontSize: 18,
  },
  pillRow: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  pill: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: BORDER_RADIUS.full,
    alignItems: 'center',
  },
  pillSelected: {
    backgroundColor: '#FF6B35',
  },
  pillUnselected: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  pillText: {
    fontSize: 16,
    fontWeight: '700',
  },
  pillTextSelected: {
    color: '#FFFFFF',
  },
  pillTextDefault: {
    color: '#1F2937',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  timeButton: {
    width: '48%',
    paddingVertical: 14,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
  },
  timeButtonDefault: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  timeButtonSelected: {
    backgroundColor: '#FFF1E6',
    borderWidth: 1.5,
    borderColor: '#FF6B35',
  },
  timeButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  timeButtonTextSelected: {
    color: '#FF6B35',
  },
  customTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
    marginBottom: 8,
  },
  timeColumn: {
    alignItems: 'center',
    gap: 6,
  },
  adjustButton: {
    padding: 8,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: '#F3F4F6',
  },
  timeValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
  },
  colon: {
    fontSize: 24,
    fontWeight: '800',
  },
  periodChip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  periodText: {
    fontSize: 16,
    fontWeight: '700',
  },
  selectedTimePill: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#FFF7ED',
    borderRadius: BORDER_RADIUS.full,
    marginTop: 6,
  },
  selectedTimeText: {
    color: '#9A3412',
    fontWeight: '700',
  },
  coachRow: {
    flexDirection: 'row',
    gap: 12,
  },
  coachCard: {
    flex: 1,
    padding: 16,
    borderRadius: BORDER_RADIUS.xl,
  },
  coachCardDefault: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  coachCardSelected: {
    backgroundColor: '#FFF1E6',
    borderWidth: 1.5,
    borderColor: '#FF6B35',
  },
  coachHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  coachEmoji: {
    fontSize: 24,
  },
  coachTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginTop: 10,
    color: '#111827',
  },
  coachSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 6,
  },
  starIcon: {
    fontSize: 48,
  },
  navRow: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 14,
  },
  backLink: {
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  backLinkText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6B7280',
  },
  ctaWrapper: {
    flex: 1,
    borderRadius: BORDER_RADIUS.full,
    overflow: 'hidden',
  },
  ctaButton: {
    paddingVertical: 14,
    borderRadius: BORDER_RADIUS.full,
    alignItems: 'center',
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
  outlineButton: {
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignSelf: 'flex-start',
  },
  outlineText: {
    fontWeight: '700',
    color: '#1F2937',
  },
});
