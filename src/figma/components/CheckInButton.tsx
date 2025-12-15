import React, { useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import { useIsFocused } from '@react-navigation/native';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface CheckInButtonProps {
  hasCheckedIn: boolean;
  onPress: () => void;
}

export default function CheckInButton({ hasCheckedIn, onPress }: CheckInButtonProps) {
  const { t } = useTranslation();
  const scale = useSharedValue(1);
  const floatY = useSharedValue(0);
  const isFocused = useIsFocused();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const floatStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: floatY.value }],
  }));

  useEffect(() => {
    if (!isFocused) {
      cancelAnimation(floatY);
      floatY.value = 0;
      return;
    }

    floatY.value = withRepeat(
      withSequence(
        withTiming(-14, { duration: 1200, easing: Easing.inOut(Easing.sin) }),
        withTiming(14, { duration: 1200, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
      true,
    );

    return () => {
      cancelAnimation(floatY);
    };
  }, [floatY, isFocused]);

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const crownName = 'ios-crown';
  const fallbackName = 'star';
  const iconName =
    hasCheckedIn && (Ionicons as any)?.glyphMap?.[crownName] ? crownName : hasCheckedIn ? fallbackName : 'alarm';

  return (
    <AnimatedTouchable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.container, animatedStyle]}
      disabled={hasCheckedIn}
    >
      <LinearGradient
        colors={hasCheckedIn ? ['#10B981', '#059669'] : ['#FF6B35', '#F7931E']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradient, hasCheckedIn && styles.gradientAwake]}
      >
        <Animated.View style={[styles.iconWrapper, floatStyle]}>
          <Ionicons
            name={iconName as any}
            size={64}
            color="#FFFFFF"
            style={styles.icon}
          />
        </Animated.View>
        <Text style={styles.text}>{hasCheckedIn ? t('home.awakeTitle') : t('home.checkIn')}</Text>
        {hasCheckedIn && <Text style={styles.subtitle}>{t('home.awakeSubtitle')}</Text>}
      </LinearGradient>
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS.xl,
    overflow: 'hidden',
    ...SHADOWS.lg,
    backgroundColor: '#FAF8F3',
  },
  gradient: {
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientAwake: {
    paddingVertical: SPACING.lg,
  },
  icon: {
    marginBottom: SPACING.md,
    textAlign: 'center',
    alignSelf: 'center',
    includeFontPadding: false,
  },
  iconWrapper: {
    marginBottom: SPACING.md,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
    lineHeight: 34,
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: SPACING.sm,
    opacity: 0.9,
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
    lineHeight: 20,
  },
});
