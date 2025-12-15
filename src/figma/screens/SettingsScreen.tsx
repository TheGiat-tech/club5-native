import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
  Modal,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useApp } from '../context/AppContext';
import { ThemeMode, CoachType } from '../types';
import CoachAvatar from '../components/CoachAvatar';
import { SPACING, BORDER_RADIUS, SHADOWS, getThemeColors } from '../constants/theme';
import { useSubscription } from '@/src/context/SubscriptionContext';
import { UiCard } from '../components/UiCard';
import { LAYOUT } from '../theme/ui';
import { useTranslation } from 'react-i18next';

const THEME_OPTIONS: { value: ThemeMode; label: string; icon: string }[] = [
  { value: 'system', label: 'System', icon: 'phone-portrait' },
  { value: 'light', label: 'Light', icon: 'sunny' },
  { value: 'dark', label: 'Dark', icon: 'moon' },
  { value: 'clean', label: 'Clean', icon: 'color-filter' },
];

const LANGUAGE_OPTIONS = [{ code: 'en', label: 'English' }];

const VISIBLE_LANGUAGE_OPTIONS = LANGUAGE_OPTIONS;

export default function SettingsScreen() {
  const KEYBOARD_VERTICAL_OFFSET = Platform.OS === 'ios' ? 90 : 20;
  const { userData, updateUserData, updateProfile, resetAllData, isDarkMode, currentStreak, checkIns, language, setLanguage, profile, saveProfile } = useApp();
  const { isPremium, currentPlan } = useSubscription();
  const router = useRouter();
  const colors = getThemeColors(userData.themeMode, isDarkMode);
  const { t, i18n: i18nextInstance } = useTranslation();
  
  const [showCoachOptions, setShowCoachOptions] = useState(false);
  const [showThemeOptions, setShowThemeOptions] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState(profile.firstName || userData.displayName || userData.firstName);
  const [profileGender, setProfileGender] = useState<'he' | 'she'>(profile.gender || 'he');
  const [profileCoach, setProfileCoach] = useState<CoachType>(profile.coach || userData.preferredCoach || userData.coach || 'natalie');
  const [showWakePicker, setShowWakePicker] = useState(false);
  const [tempHour, setTempHour] = useState(5);
  const [tempMinute, setTempMinute] = useState(0);
  const [tempPeriod, setTempPeriod] = useState<'AM' | 'PM'>('AM');
  const [isLanguageSheetVisible, setisLanguageSheetVisible] = useState(false);

  useEffect(() => {
    setProfileName(profile.firstName || userData.displayName || userData.firstName);
    setProfileGender(profile.gender || 'he');
    setProfileCoach(profile.coach || userData.preferredCoach || userData.coach || 'natalie');
  }, [profile.firstName, profile.gender, profile.coach, userData.displayName, userData.firstName, userData.gender, userData.preferredCoach, userData.coach]);

  const handleResetData = () => {
    Alert.alert(
      'Reset All Data',
      'Are you sure you want to reset all data? This will erase your streak, check-ins, and all progress. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => resetAllData(),
        },
      ]
    );
  };

  const parseWakeTime = (time: string): { hour: number; minute: number; period: 'AM' | 'PM' } => {
    const match = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (match) {
      return {
        hour: Math.min(12, Math.max(1, Number(match[1]))),
        minute: Math.min(59, Math.max(0, Number(match[2]))),
        period: match[3].toUpperCase() === 'PM' ? 'PM' : 'AM',
      };
    }
    return { hour: 5, minute: 0, period: 'AM' as const };
  };

  const formatWakeTime = (hour: number, minute: number, period: 'AM' | 'PM') => {
    const normalizedHour = ((hour - 1 + 12) % 12) + 1;
    const normalizedMinute = Math.max(0, Math.min(59, minute));
    return `${normalizedHour}:${normalizedMinute.toString().padStart(2, '0')} ${period}`;
  };

  const handleWakeTimeChange = (time: string) => {
    updateUserData({ wakeUpTime: time });
  };

  const openWakePicker = () => {
    const parsed = parseWakeTime(userData.wakeUpTime || '5:00 AM');
    setTempHour(parsed.hour);
    setTempMinute(parsed.minute);
    setTempPeriod(parsed.period);
    setShowWakePicker(true);
  };

  const handleSaveWakeTime = () => {
    const formatted = formatWakeTime(tempHour, tempMinute, tempPeriod);
    handleWakeTimeChange(formatted);
    setShowWakePicker(false);
  };

  const incrementHour = () => setTempHour(prev => (prev % 12) + 1);
  const decrementHour = () => setTempHour(prev => ((prev + 10) % 12) + 1);
  const incrementMinute = () => setTempMinute(prev => (prev + 5) % 60);
  const decrementMinute = () => setTempMinute(prev => (prev - 5 + 60) % 60);
  const togglePeriod = () => setTempPeriod(prev => (prev === 'AM' ? 'PM' : 'AM'));

  const handleCoachChange = (coach: CoachType) => {
    updateUserData({ coach });
    setShowCoachOptions(false);
  };

  const handleThemeChange = (theme: ThemeMode) => {
    updateUserData({ themeMode: theme });
    setShowThemeOptions(false);
  };

  const handleProfileSave = () => {
    const trimmed = (profileName || '').trim();
    if (!trimmed) {
      Alert.alert('Add your name', 'Please enter your name to save your profile.');
      return;
    }
    void saveProfile({
      firstName: trimmed,
      gender: profileGender,
      coach: profileCoach,
      wakeTime: userData.wakeUpTime,
    });
    setEditingProfile(false);
  };

  const handleSelectLanguage = (code: string) => {
    setLanguage(code as any);
    setisLanguageSheetVisible(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
    >
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <LinearGradient
          colors={colors.gradientBackground}
          style={styles.gradient}
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={[styles.scrollContent, { paddingTop: 16, paddingBottom: 32 }]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.column}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
              <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
                <Ionicons name="close" size={22} color={colors.text} />
              </TouchableOpacity>
            </View>

            {/* Profile Card */}
            <View style={[styles.card, styles.sectionCard, styles.cardPadding, { backgroundColor: colors.surface }]}>
              <View style={styles.cardHeaderRow}>
                <Text style={[styles.cardTitle, { color: colors.text }]}>Profile</Text>
                <TouchableOpacity onPress={() => setEditingProfile((prev) => !prev)}>
                  <Text style={[styles.editLink, { color: colors.primary }]}>
                    {editingProfile ? 'Close' : 'Edit'}
                  </Text>
                </TouchableOpacity>
              </View>
              
              {!editingProfile && (
                <View style={styles.profileInfo}>
                  <Text style={[styles.profileName, { color: colors.text }]}>
                    {profile.firstName || userData.displayName || 'Set your name'}
                  </Text>
                  <Text style={[styles.profileDetail, { color: colors.textSecondary }]}>
                    Gender: {profile.gender || 'Not set'}
                  </Text>
                  <Text style={[styles.profileDetail, { color: colors.textSecondary }]}>
                    Preferred Coach: {profile.coach === 'max' ? 'Max' : 'Natalie'}
                  </Text>
                  <Text style={[styles.profileDetail, { color: colors.textSecondary }]}>
                    {currentStreak} day streak | {checkIns.length} total check-ins
                  </Text>
                </View>
              )}

              {editingProfile && (
                <View style={styles.profileForm}>
                  <Text style={[styles.label, { color: colors.text }]}>Name</Text>
                  <TextInput
                    style={[
                      styles.input,
                      { backgroundColor: colors.background, color: colors.text, borderColor: colors.border },
                    ]}
                    value={profileName}
                    onChangeText={setProfileName}
                    placeholder="Enter your name"
                    placeholderTextColor={colors.textSecondary}
                  />

                  <Text style={[styles.label, { color: colors.text, marginTop: SPACING.md }]}>
                    Gender
                  </Text>
                  <View style={styles.chipRow}>
                    {(['he', 'she'] as const).map((g) => (
                      <TouchableOpacity
                        key={g}
                        style={[
                          styles.chip,
                          {
                            backgroundColor: profileGender === g ? colors.primary : colors.background,
                            borderColor: colors.border,
                          },
                        ]}
                        onPress={() => setProfileGender(g)}
                      >
                        <Text
                          style={[
                            styles.chipText,
                            { color: profileGender === g ? '#FFFFFF' : colors.text },
                          ]}
                        >
                          {g === 'he' ? 'He' : 'She'}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <Text style={[styles.label, { color: colors.text, marginTop: SPACING.md }]}>
                    Preferred Coach
                  </Text>
                  <View style={styles.chipRow}>
                    {(['natalie', 'max'] as CoachType[]).map((coachOption) => (
                      <TouchableOpacity
                        key={coachOption}
                        style={[
                          styles.coachChip,
                          {
                            borderColor: profileCoach === coachOption ? colors.primary : colors.border,
                            backgroundColor: colors.background,
                          },
                        ]}
                        onPress={() => setProfileCoach(coachOption)}
                      >
                        <CoachAvatar coach={coachOption} size={36} />
                        <Text style={[styles.coachChipText, { color: colors.text }]}>
                          {coachOption === 'max' ? 'Max' : 'Natalie'}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <View style={styles.profileActions}>
                    <TouchableOpacity
                      style={[styles.saveButton, { backgroundColor: colors.primary }]}
                      onPress={handleProfileSave}
                    >
                      <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.cancelButton, { borderColor: colors.border }]}
                      onPress={() => {
                        setEditingProfile(false);
                        setProfileName(profile.firstName || userData.displayName || userData.firstName);
                        setProfileGender(profile.gender || 'he');
                        setProfileCoach(profile.coach || userData.preferredCoach || userData.coach || 'natalie');
                      }}
                    >
                      <Text style={[styles.cancelButtonText, { color: colors.text }]}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>

          {/* Subscription */}
          <View style={[styles.card, styles.sectionCard, styles.cardPadding, { backgroundColor: colors.surface }]}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              Subscription
            </Text>

            <TouchableOpacity
              style={styles.settingRow}
              onPress={() => router.push('/(tabs)/subscription')}
            >
              <View style={styles.settingLeft}>
                <Ionicons name="diamond" size={24} color={colors.primary} />
                <View>
                  <Text style={[styles.settingLabel, { color: colors.text }]}>
                    Premium / Subscription
                  </Text>
                  <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                    {isPremium ? 'Premium plan · Unlimited challenges' : 'Free plan · 7-day challenge'} ({currentPlan})
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Preferred Wake Time */}
          <UiCard style={[styles.sectionCard, styles.cardPadding]}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Preferred Wake Time</Text>
            <TouchableOpacity
              style={styles.settingRow}
              onPress={openWakePicker}
              activeOpacity={0.8}
            >
              <View style={styles.settingLeft}>
                <Ionicons name="alarm" size={24} color={colors.primary} />
                <Text style={[styles.settingLabel, { color: colors.text }]}>
                  Current Time
                </Text>
              </View>
              <View style={styles.settingRight}>
                <Text style={[styles.settingValue, { color: colors.textSecondary }]}>
                  {userData.wakeUpTime}
                </Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.textSecondary}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.changeTimeButton, { borderColor: colors.border }]}
              onPress={openWakePicker}
              activeOpacity={0.85}
            >
              <Text style={[styles.changeTimeText, { color: colors.text }]}>
                Change time
              </Text>
            </TouchableOpacity>
          </UiCard>

          {/* Coach Selection */}
          <View style={[styles.card, styles.sectionCard, styles.cardPadding, { backgroundColor: colors.surface }]}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              AI Coach
            </Text>
            
            <TouchableOpacity
              style={styles.settingRow}
              onPress={() => setShowCoachOptions(!showCoachOptions)}
            >
              <View style={styles.settingLeft}>
                <CoachAvatar coach={userData.coach} size={32} />
                <Text style={[styles.settingLabel, { color: colors.text }]}>
                  {userData.coach === 'natalie' ? 'Natalie' : 'Max'}
                </Text>
              </View>
              <Ionicons
                name={showCoachOptions ? 'chevron-up' : 'chevron-down'}
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>

            {showCoachOptions && (
              <View style={styles.coachOptions}>
                <TouchableOpacity
                  style={[
                    styles.coachOption,
                    {
                      borderColor:
                        userData.coach === 'natalie' ? colors.primary : colors.border,
                      borderWidth: userData.coach === 'natalie' ? 3 : 1,
                    },
                  ]}
                  onPress={() => handleCoachChange('natalie')}
                >
                  <CoachAvatar coach="natalie" size={48} />
                  <Text style={[styles.coachName, { color: colors.text }]}>
                    Natalie
                  </Text>
                  <Text style={[styles.coachDesc, { color: colors.textSecondary }]}>
                    Gentle & empathetic
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.coachOption,
                    {
                      borderColor:
                        userData.coach === 'max' ? colors.primary : colors.border,
                      borderWidth: userData.coach === 'max' ? 3 : 1,
                    },
                  ]}
                  onPress={() => handleCoachChange('max')}
                >
                  <CoachAvatar coach="max" size={48} />
                  <Text style={[styles.coachName, { color: colors.text }]}>
                    Max
                  </Text>
                  <Text style={[styles.coachDesc, { color: colors.textSecondary }]}>
                    Direct & motivating
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Theme */}
          <View style={[styles.card, styles.sectionCard, styles.cardPadding, { backgroundColor: colors.surface }]}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Theme</Text>
            
            <TouchableOpacity
              style={styles.settingRow}
              onPress={() => setShowThemeOptions(!showThemeOptions)}
            >
              <View style={styles.settingLeft}>
                <Ionicons
                  name={
                    userData.themeMode === 'dark'
                      ? 'moon'
                      : userData.themeMode === 'light'
                      ? 'sunny'
                      : 'phone-portrait'
                  }
                  size={24}
                  color={colors.primary}
                />
                <Text style={[styles.settingLabel, { color: colors.text }]}>
                  Appearance
                </Text>
              </View>
              <View style={styles.settingRight}>
                <Text style={[styles.settingValue, { color: colors.textSecondary }]}>
                  {userData.themeMode === 'system'
                    ? 'System'
                    : userData.themeMode === 'dark'
                    ? 'Dark'
                    : userData.themeMode === 'clean'
                    ? 'Clean'
                    : 'Light'}
                </Text>
                <Ionicons
                  name={showThemeOptions ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color={colors.textSecondary}
                />
              </View>
            </TouchableOpacity>

            {showThemeOptions && (
              <View style={styles.options}>
                {THEME_OPTIONS.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.option,
                      {
                        backgroundColor:
                          userData.themeMode === option.value
                            ? colors.primary
                            : 'transparent',
                      },
                    ]}
                    onPress={() => handleThemeChange(option.value)}
                  >
                    <Ionicons
                      name={option.icon as any}
                      size={20}
                      color={
                        userData.themeMode === option.value ? '#FFFFFF' : colors.text
                      }
                    />
                    <Text
                      style={[
                        styles.optionText,
                        {
                          color:
                            userData.themeMode === option.value
                              ? '#FFFFFF'
                              : colors.text,
                        },
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Language */}
          <View style={[styles.card, styles.sectionCard, styles.cardPadding, { backgroundColor: colors.surface }]}>
            <TouchableOpacity
              style={styles.settingRow}
              onPress={() => setisLanguageSheetVisible(true)}
              activeOpacity={0.8}
            >
              <View style={styles.settingLeft}>
                <Ionicons name="language" size={24} color={colors.primary} />
                <Text style={[styles.settingLabel, { color: colors.text }]}>Language</Text>
              </View>
              <View style={styles.settingRight}>
                <Text style={[styles.settingValue, { color: colors.textSecondary }]}>
                  {LANGUAGE_OPTIONS.find(l => l.code === language)?.label || language}
                </Text>
                <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
              </View>
            </TouchableOpacity>
          </View>

          {/* Danger Zone */}
          <View style={[styles.card, styles.sectionCard, styles.cardPadding, { backgroundColor: colors.surface }]}>
            <Text style={[styles.cardTitle, { color: colors.error }]}>
              Danger Zone
            </Text>
            
            <TouchableOpacity
              style={styles.dangerButton}
              onPress={handleResetData}
            >
              <Ionicons name="warning" size={24} color={colors.error} />
              <Text style={[styles.dangerText, { color: colors.error }]}>
                Reset All Data
              </Text>
            </TouchableOpacity>
          </View>

          {/* App Info */}
          <View style={styles.appInfo}>
            <Text style={[styles.appInfoText, { color: colors.textSecondary }]}>
              Club5 AI v1.0.0
            </Text>
            <Text style={[styles.appInfoText, { color: colors.textSecondary }]}>
              Made with ❤️ for early risers
            </Text>
          </View>
        </View>
        </ScrollView>
        </LinearGradient>

        <Modal
          visible={showWakePicker}
          transparent
          animationType="fade"
          onRequestClose={() => setShowWakePicker(false)}
        >
          <View style={styles.wakeModalOverlay}>
            <View style={[styles.wakeModalContent, { backgroundColor: colors.surface }]}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>Select Wake Time</Text>
              <View style={styles.wakePickerRow}>
                <View style={styles.timeColumn}>
                  <TouchableOpacity style={styles.timeAdjustButton} onPress={incrementHour}>
                    <Ionicons name="chevron-up" size={18} color={colors.text} />
                  </TouchableOpacity>
                  <Text style={[styles.timeValue, { color: colors.text }]}>{tempHour.toString().padStart(2, '0')}</Text>
                  <TouchableOpacity style={styles.timeAdjustButton} onPress={decrementHour}>
                    <Ionicons name="chevron-down" size={18} color={colors.text} />
                  </TouchableOpacity>
                </View>
                <Text style={[styles.timeSeparator, { color: colors.textSecondary }]}>:</Text>
                <View style={styles.timeColumn}>
                  <TouchableOpacity style={styles.timeAdjustButton} onPress={incrementMinute}>
                    <Ionicons name="chevron-up" size={18} color={colors.text} />
                  </TouchableOpacity>
                  <Text style={[styles.timeValue, { color: colors.text }]}>{tempMinute.toString().padStart(2, '0')}</Text>
                  <TouchableOpacity style={styles.timeAdjustButton} onPress={decrementMinute}>
                    <Ionicons name="chevron-down" size={18} color={colors.text} />
                  </TouchableOpacity>
                </View>
                <View style={styles.periodColumn}>
                  <TouchableOpacity
                    style={[styles.periodToggle, { borderColor: colors.border, backgroundColor: colors.background }]}
                    onPress={togglePeriod}
                  >
                    <Text style={[styles.periodText, { color: colors.text }]}>{tempPeriod}</Text>
                    <Ionicons name="swap-vertical" size={16} color={colors.textSecondary} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.wakeActions}>
                <TouchableOpacity
                  style={[styles.wakeActionButton, { borderColor: colors.border }]}
                  onPress={() => setShowWakePicker(false)}
                  activeOpacity={0.85}
                >
                  <Text style={[styles.wakeActionText, { color: colors.text }]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.wakeActionButton, styles.wakePrimaryButton, { backgroundColor: colors.primary }]}
                  onPress={handleSaveWakeTime}
                  activeOpacity={0.9}
                >
                  <Text style={styles.wakePrimaryText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          visible={isLanguageSheetVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setisLanguageSheetVisible(false)}
        >
          <Pressable
            style={styles.sheetBackdrop}
            onPress={() => setisLanguageSheetVisible(false)}
          >
            <View style={[styles.languageSheet, { backgroundColor: colors.surface }]}>
              <Text style={[styles.sheetTitle, { color: colors.text }]}>
                Select Language
              </Text>

              {VISIBLE_LANGUAGE_OPTIONS.map(option => (
                <TouchableOpacity
                  key={option.code}
                  style={[
                    styles.sheetOption,
                    {
                      backgroundColor:
                        option.code === language ? colors.primary + '22' : 'transparent',
                    },
                  ]}
                  onPress={() => {
                    handleSelectLanguage(option.code);
                    setisLanguageSheetVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.sheetOptionText,
                      {
                        color:
                          option.code === language ? colors.primary : colors.text,
                      },
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}

              <TouchableOpacity
                style={styles.sheetCancel}
                onPress={() => setisLanguageSheetVisible(false)}
              >
                <Text style={[styles.sheetCancelText, { color: colors.text }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}


type LangButtonProps = {
  code: string;
  label: string;
};

function LangButton({ code, label }: LangButtonProps) {
  const { i18n } = useTranslation();
  const isActive = i18n.language.startsWith(code);

  return (
    <Pressable
      onPress={() => i18n.changeLanguage(code)}
      style={[
        styles.langButton,
        isActive && styles.langActive,
      ]}
    >
      <Text style={styles.langLabel}>{label}</Text>
      {isActive && (
        <Text style={styles.langCheck}>?</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: LAYOUT.screenPaddingHorizontal,
    paddingTop: 72,
    paddingBottom: 100,
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
    justifyContent: 'center',
    position: 'relative',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: SPACING.sm,
  },
  card: {
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    marginBottom: 0,
    width: '100%',
    ...SHADOWS.md,
  },
  cardPadding: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionCard: {
    width: '100%',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  editLink: {
    fontSize: 14,
    fontWeight: '700',
  },
  profileInfo: {
    alignItems: 'flex-start',
    paddingVertical: SPACING.md,
    gap: 6,
  },
  profileForm: {
    marginTop: SPACING.md,
    gap: SPACING.sm,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
  },
  profileDetail: {
    fontSize: 14,
  },
  chipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  input: {
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    fontSize: 16,
  },
  chip: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  coachChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.sm,
  },
  coachChipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  profileActions: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.md,
  },
  saveButton: {
    flex: 1,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.md,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  cancelButton: {
    flex: 1,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    borderWidth: 1,
  },
  cancelButtonText: {
    fontWeight: '700',
    fontSize: 16,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  settingDescription: {
    fontSize: 12,
    marginTop: 2,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  settingValue: {
    fontSize: 16,
  },
  changeTimeButton: {
    marginTop: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    paddingVertical: SPACING.sm,
    alignItems: 'center',
  },
  changeTimeText: {
    fontSize: 15,
    fontWeight: '700',
  },
  options: {
    marginTop: SPACING.md,
    gap: SPACING.sm,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
  },
  coachOptions: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.md,
  },
  coachOption: {
    flex: 1,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    alignItems: 'center',
  },
  coachName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: SPACING.sm,
  },
  coachDesc: {
    fontSize: 12,
    textAlign: 'center',
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  dangerText: {
    fontSize: 16,
    fontWeight: '600',
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  appInfoText: {
    fontSize: 12,
    marginBottom: SPACING.xs,
  },
  wakeModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  wakeModalContent: {
    width: '100%',
    maxWidth: 420,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.xl,
    ...SHADOWS.lg,
  },
  wakePickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.md,
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
  },
  timeColumn: {
    alignItems: 'center',
    gap: SPACING.xs,
  },
  timeAdjustButton: {
    padding: SPACING.xs,
    borderRadius: BORDER_RADIUS.md,
  },
  timeValue: {
    fontSize: 28,
    fontWeight: '800',
  },
  timeSeparator: {
    fontSize: 28,
    fontWeight: '700',
  },
  periodColumn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  periodToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
  },
  periodText: {
    fontSize: 16,
    fontWeight: '700',
  },
  wakeActions: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  wakeActionButton: {
    flex: 1,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    borderWidth: 1,
  },
  wakeActionText: {
    fontSize: 16,
    fontWeight: '700',
  },
  wakePrimaryButton: {
    borderWidth: 0,
  },
  wakePrimaryText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  sheetBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  languageSheet: {
    width: '100%',
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    gap: 16,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  sheetOption: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  sheetOptionText: {
    fontSize: 16,
    fontWeight: '600',
  },
  sheetCancel: {
    marginTop: 8,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 12,
  },
  sheetCancelText: {
    fontSize: 16,
    fontWeight: '700',
  },
  langButton: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  langCheck: {
    fontSize: 14,
  },
  langActive: {
    backgroundColor: '#F3F3F3',
  },
  langLabel: {
    fontSize: 14,
  },
});










