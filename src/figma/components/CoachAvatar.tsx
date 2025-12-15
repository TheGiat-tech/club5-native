import React, { useEffect, useRef } from 'react';
import { Text, StyleSheet, View, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CoachType } from '../types';
import { COACHES } from '../constants/coaches';
import { SHADOWS } from '../constants/theme';

interface CoachAvatarProps {
  coach: CoachType;
  size?: number;
}

export default function CoachAvatar({ coach, size = 72 }: CoachAvatarProps) {
  const coachKey: CoachType = coach === 'natalie' ? 'natalie' : 'max';
  const coachInfo = COACHES[coachKey];
  const gradient = coachInfo?.gradient ?? ['#3B82F6', '#6366F1'];
  const displayEmoji = coachInfo?.emoji ?? (coachKey === 'max' ? '💪' : '😊');
  const float = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(float, {
          toValue: 1,
          duration: 1300,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(float, {
          toValue: 0,
          duration: 1300,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => {
      animation.stop();
      float.setValue(0);
    };
  }, [float]);

  const translateY = float.interpolate({
    inputRange: [0, 1],
    outputRange: [-8, 8],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        coachKey === 'max' ? styles.containerBold : styles.containerSoft,
        {
          width: size,
          height: size,
          transform: [
            { translateY },
            { scale: coachKey === 'max' ? 1.02 : 1 },
          ],
        },
      ]}
    >
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradient, { borderRadius: size / 2 }]}
      >
        <Text style={[styles.emoji, { fontSize: size * 0.45 }]}>{displayEmoji}</Text>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...SHADOWS.md,
  },
  containerBold: {
    shadowOpacity: 0.12,
    shadowRadius: 14,
  },
  containerSoft: {
    shadowOpacity: 0.08,
  },

  gradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    textAlign: 'center',
  },
});
