import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useApp } from '../context/AppContext';
import { useSubscription } from '@/src/context/SubscriptionContext';
import type { CoachId } from '@/src/ai/personalities';
import type { UserMessage, CoachMessage, OptionChip } from '@/src/ai/conversationTypes';
import { useCoachConversation } from '@/src/ai/useCoachConversation';
import { CoachType } from '../types';
import CoachAvatar from '../components/CoachAvatar';
import { useChallengeGuard } from '../hooks/useChallengeGuard';
import { ChallengeCompleteModal } from '../components/ChallengeCompleteModal';
import { SPACING, BORDER_RADIUS, SHADOWS, getThemeColors } from '../constants/theme';

const KEYBOARD_OFFSET = Platform.OS === 'ios' ? 80 : 20;

interface AnimatedChipProps {
  chip: OptionChip;
  index: number;
  disabled: boolean;
  onPress: (chip: OptionChip) => void;
  textColor: string;
}

function AnimatedChip({ chip, index, disabled, onPress, textColor }: AnimatedChipProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (disabled) return;
    scale.value = withTiming(0.96, { duration: 80 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 120 });
  };

  return (
    <Animated.View
      style={animatedStyle}
      entering={FadeInUp.delay(60 + index * 80).springify().mass(0.7)}
    >
      <TouchableOpacity
        style={styles.chip}
        onPress={() => onPress(chip)}
        disabled={disabled}
        activeOpacity={0.8}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Text style={[styles.chipLabel, { color: textColor }]}>{chip.label}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function CoachChatScreen() {
  const { userData, isDarkMode } = useApp();
  const { isPremium } = useSubscription();
  const { isOverFreeLimit, modalVisible, openModal, closeModal, startOver, goPremium } =
    useChallengeGuard();
  const router = useRouter();
  const params = useLocalSearchParams<{ coachId?: string }>();
  const paramCoachId = params.coachId;
  const resolvedCoachId: CoachId =
    paramCoachId === 'natalie' || paramCoachId === 'max'
      ? (paramCoachId as CoachId)
      : userData.preferredCoach === 'natalie'
      ? 'natalie'
      : userData.preferredCoach === 'max'
      ? 'max'
      : userData.coach === 'natalie'
      ? 'natalie'
      : 'max';
  const activeCoach: CoachType = resolvedCoachId as CoachType;
  const coachName = activeCoach === 'natalie' ? 'Natalie' : 'Max';

  const colors = getThemeColors(userData.themeMode, isDarkMode);
  const scrollViewRef = useRef<ScrollView>(null);
  const [inputText, setInputText] = useState('');

  const typingScale = useSharedValue(1);
  const typingOpacity = useSharedValue(1);

  const coachId: CoachId = resolvedCoachId;

  const { messages, chips, loading, typing, ended, sendTextMessage, selectChip } =
    useCoachConversation(coachId, isOverFreeLimit);
  const coachReplies = messages.filter((m: UserMessage | CoachMessage) => m.type === 'coach').length;
  const maxTurns = isPremium ? 9 : 3;
  const turnsLeft = Math.max(0, maxTurns - coachReplies);

  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  useEffect(() => {
    if (typing) {
      typingScale.value = withRepeat(
        withSequence(
          withTiming(0.95, { duration: 400 }),
          withTiming(1, { duration: 400 })
        ),
        -1,
        true
      );
      typingOpacity.value = withRepeat(
        withSequence(
          withTiming(0.5, { duration: 400 }),
          withTiming(1, { duration: 400 })
        ),
        -1,
        true
      );
    } else {
      typingScale.value = withTiming(1, { duration: 200 });
      typingOpacity.value = withTiming(1, { duration: 200 });
    }
  }, [typing, typingOpacity, typingScale]);

  const typingAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: typingScale.value }],
    opacity: typingOpacity.value,
  }));

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    });
  };

  const handleSend = () => {
    if (!inputText.trim() || loading || typing) return;
    if (!isPremium && ended) return;

    const text = inputText.trim();
    setInputText('');
    void sendTextMessage(text);
  };

  const handleChipPress = (chip: OptionChip) => {
    if (loading || typing) return;
    if (!isPremium && ended) return;

    void selectChip(chip);
  };

  const renderMessage = (message: UserMessage | CoachMessage) => {
    const isCoach = message.type === 'coach';

    return (
      <Animated.View
        key={message.id}
        entering={FadeInUp.springify().mass(0.6)}
        style={[
          styles.messageContainer,
          isCoach ? styles.coachMessage : styles.userMessage,
        ]}
      >
        {isCoach && <CoachAvatar coach={activeCoach} size={36} />}
        <View
          style={[
            styles.messageBubble,
            {
              backgroundColor: isCoach ? colors.surface : colors.primary,
            },
          ]}
        >
          <Text
            style={[
              styles.messageText,
              {
                color: isCoach ? colors.text : '#FFFFFF',
              },
            ]}
          >
            {message.text}
          </Text>
        </View>
      </Animated.View>
    );
  };

  const renderContent = () => (
    <>
      <LinearGradient colors={colors.gradientBackground} style={styles.gradient}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.surface }]}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            activeOpacity={0.8}
          >
            <Ionicons name="chevron-back" size={22} color={colors.text} />
          </TouchableOpacity>
          <CoachAvatar coach={activeCoach} size={48} />
          <View style={styles.headerText}>
            <Text style={[styles.headerTitle, { color: colors.text }]}>{coachName}</Text>
            <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
              Your AI Coach
            </Text>
          </View>
          <View
            style={[
              styles.planPill,
              {
                backgroundColor: isPremium ? colors.primary : colors.background,
                borderColor: isPremium ? colors.primary : colors.border,
              },
            ]}
          >
            <Text
              style={[
                styles.planPillText,
                { color: isPremium ? '#FFFFFF' : colors.textSecondary },
              ]}
            >
              {isPremium ? 'Premium' : `Free | ${turnsLeft} replies left`}
            </Text>
          </View>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          onContentSizeChange={scrollToBottom}
          showsVerticalScrollIndicator={false}
        >
          {messages.length === 0 && !loading && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>💬</Text>
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                Start a conversation with your coach
              </Text>
              <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>
                Ask for motivation, habits support, or planning help.
              </Text>
            </View>
          )}
          {messages.map(renderMessage)}
          {typing && (
            <View style={styles.typingRow}>
              <CoachAvatar coach={activeCoach} size={24} />
              <Animated.View
                style={[
                  styles.typingBubble,
                  { backgroundColor: colors.surface },
                  typingAnimatedStyle,
                ]}
              >
                <Text style={[styles.typingDots, { color: colors.textSecondary }]}>
                  ...
                </Text>
              </Animated.View>
            </View>
          )}
        </ScrollView>

        {chips.length > 0 && (
          <View style={[styles.chipsContainer, { backgroundColor: colors.surface }]}>
            {chips.map((chip: OptionChip, index: number) => (
              <AnimatedChip
                key={chip.id}
                chip={chip}
                index={index}
                disabled={typing}
                onPress={handleChipPress}
                textColor={colors.text}
              />
            ))}
          </View>
        )}

        {/* Input */}
        <View
          style={[
            styles.inputContainer,
            {
              backgroundColor: colors.surface,
              paddingBottom: SPACING.sm,
              borderTopWidth: StyleSheet.hairlineWidth,
              borderColor: colors.border,
            },
          ]}
        >
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.background,
                color: colors.text,
              },
            ]}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message..."
            placeholderTextColor={colors.textSecondary}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            onPress={handleSend}
            disabled={!inputText.trim() || loading || typing}
            style={styles.sendButton}
          >
            <LinearGradient colors={colors.gradient1} style={styles.sendGradient}>
              <Ionicons name="send" size={24} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {!isPremium && ended && (
        <View style={[styles.paywallInline, { backgroundColor: colors.surface }]}>
          <Text style={[styles.paywallText, { color: colors.textSecondary }]}>
            Free chat limit reached (3 replies).
          </Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/subscription')}>
            <Text style={[styles.paywallButton, { color: colors.primary }]}>
              Upgrade to Premium
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {isPremium && ended && (
        <View style={[styles.paywallInline, { backgroundColor: colors.surface }]}>
          <Text style={[styles.paywallText, { color: colors.textSecondary }]}>
            This session is complete. You can start another session tomorrow at 5AM.
          </Text>
        </View>
      )}

      <ChallengeCompleteModal
        visible={modalVisible}
        onClose={closeModal}
        onStartOver={startOver}
        onGoPremium={goPremium}
        isDarkMode={isDarkMode}
      />
    </>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={KEYBOARD_OFFSET}
    >
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        {isOverFreeLimit ? (
          <ChallengeCompleteModal
            visible={modalVisible}
            onClose={closeModal}
            onStartOver={startOver}
            onGoPremium={goPremium}
            isDarkMode={isDarkMode}
          />
        ) : (
          renderContent()
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingTop: 60,
    paddingBottom: SPACING.md,
    gap: SPACING.md,
    ...SHADOWS.sm,
  },
  planPill: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
  },
  planPillText: {
    fontSize: 12,
    fontWeight: '700',
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 14,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: SPACING.md,
    paddingTop: 16,
    paddingBottom: 16,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  coachMessage: {
    alignSelf: 'flex-start',
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    maxWidth: '80%',
  },
  messageBubble: {
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.sm,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  typingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  typingBubble: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.sm,
  },
  typingDots: {
    fontSize: 18,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.sm,
    paddingTop: SPACING.sm,
  },
  chip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
  },
  chipLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: SPACING.md,
    gap: SPACING.sm,
    ...SHADOWS.md,
  },
  input: {
    flex: 1,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    borderRadius: BORDER_RADIUS.full,
    overflow: 'hidden',
  },
  sendGradient: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paywallInline: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#E5E7EB',
  },
  paywallText: {
    fontSize: 14,
    marginBottom: SPACING.xs,
  },
  paywallButton: {
    fontSize: 14,
    fontWeight: '600',
  },
});
