import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useIsFocused } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import { GradientScreen } from '../../src/components/ui/Layout';
import { SurfaceCard } from '../../src/components/ui/Card';
import { Title, Body } from '../../src/components/ui/Typography';
import { PrimaryButton } from '../../src/components/ui/Button';
import { ChallengeCompleteModal } from '@/figma/components/ChallengeCompleteModal';
import { useChallengeGuard } from '@/figma/hooks/useChallengeGuard';
import { useApp } from '@/figma/context/AppContext';

export default function CoachTab() {
  const router = useRouter();
  const { t } = useTranslation();
  const { isDarkMode, userData, updateUserData } = useApp();
  const { isOverFreeLimit, modalVisible, openModal, closeModal, startOver, goPremium } =
    useChallengeGuard();
  const isFocused = useIsFocused();
  const progress = useSharedValue(isFocused ? 1 : 0);

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

  const handlePress = async () => {
    if (isOverFreeLimit) {
      openModal();
      return;
    }
    const coachId = userData.coach || 'max';
    if (!userData.coach) {
      await updateUserData({ coach: coachId });
    }
    router.push({ pathname: '/coach-chat', params: { coachId } });
  };

  return (
    <Animated.View style={[{ flex: 1 }, animatedStyle]}>
      <GradientScreen>
        <View style={styles.container}>
          <SurfaceCard>
            <Title style={styles.title}>{t('coach.title')}</Title>
            <Body style={styles.body}>
              {t('coach.description', {
                defaultValue:
                  'Talk to your 5AM coach for motivation, accountability, and practical next steps.',
              })}
            </Body>
            <PrimaryButton
              label={t('coach.startSession', { defaultValue: 'Talk to Coach' })}
              onPress={handlePress}
              style={styles.button}
            />
          </SurfaceCard>
        </View>
        <ChallengeCompleteModal
          visible={modalVisible}
          onClose={closeModal}
          onStartOver={startOver}
          onGoPremium={goPremium}
          isDarkMode={isDarkMode}
        />
      </GradientScreen>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginBottom: 8,
  },
  body: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
});
