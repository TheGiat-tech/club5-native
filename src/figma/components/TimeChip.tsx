import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, withSpring, useSharedValue } from 'react-native-reanimated';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface TimeChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  disabled?: boolean;
  isDarkMode: boolean;
  style?: ViewStyle;
}

export default function TimeChip({
  label,
  selected,
  onPress,
  disabled = false,
  isDarkMode,
  style,
}: TimeChipProps) {
  const colors = isDarkMode ? COLORS.dark : COLORS.light;
  const scale = useSharedValue(1);
  const [isPressed, setIsPressed] = useState(false);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (!disabled) {
      setIsPressed(true);
      scale.value = withSpring(0.96);
    }
  };

  const handlePressOut = () => {
    setIsPressed(false);
    scale.value = withSpring(1);
  };

  return (
    <AnimatedTouchable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[styles.container, animatedStyle, style]}
      activeOpacity={0.9}
    >
      {selected ? (
        <LinearGradient
          colors={colors.gradient1}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <Text style={styles.textSelected}>{label}</Text>
        </LinearGradient>
      ) : (
        <Animated.View
          style={[
            styles.default,
            {
              backgroundColor: disabled
                ? colors.border
                : isPressed
                ? colors.border
                : colors.surface,
              borderColor: isPressed ? colors.primary : colors.border,
            },
          ]}
        >
          <Text
            style={[
              styles.textDefault,
              {
                color: disabled ? colors.textSecondary : colors.text,
              },
            ]}
          >
            {label}
          </Text>
        </Animated.View>
      )}
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
    ...SHADOWS.sm,
  },
  gradient: {
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
  },
  default: {
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: BORDER_RADIUS.md,
    minHeight: 56,
  },
  textSelected: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  textDefault: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});
