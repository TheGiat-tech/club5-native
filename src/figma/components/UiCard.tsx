import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, RADII, SHADOW, LAYOUT } from '../theme/ui';

interface UiCardProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
}

export function UiCard({ children, style }: UiCardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADII.card,
    paddingVertical: 32,
    paddingHorizontal: 24,
    ...SHADOW.cardShadow,
  },
});
