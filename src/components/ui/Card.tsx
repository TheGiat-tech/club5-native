import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../theme';

type CardStyle = ViewStyle | ViewStyle[];

interface CardProps {
  children: ReactNode;
  style?: CardStyle;
}

export function SurfaceCard({ children, style }: CardProps) {
  const colors = COLORS.light;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    ...SHADOWS.md,
  },
});
