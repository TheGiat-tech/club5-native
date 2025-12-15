import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../theme';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  style?: ViewStyle;
}

export function PrimaryButton({ label, onPress, style }: ButtonProps) {
  const colors = COLORS.light;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={[styles.buttonContainer, SHADOWS.md, style]}
    >
      <LinearGradient
        colors={colors.gradient1}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <Text style={styles.primaryLabel}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export function SecondaryButton({ label, onPress, style }: ButtonProps) {
  const colors = COLORS.light;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[
        styles.outlineButton,
        {
          borderColor: colors.primary,
        },
        style,
      ]}
    >
      <Text style={[styles.secondaryLabel, { color: colors.primary }]}>{label}</Text>
    </TouchableOpacity>
  );
}

export function GhostButton({ label, onPress, style }: ButtonProps) {
  const colors = COLORS.light;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.ghostButton, style]}
    >
      <Text style={[styles.ghostLabel, { color: colors.text }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
  },
  gradient: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  primaryLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  outlineButton: {
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 2,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    backgroundColor: '#FFFFFF',
  },
  secondaryLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  ghostButton: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
  },
  ghostLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
});

