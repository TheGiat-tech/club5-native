import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES, SPACING } from '../../theme';

export function Title(props: TextProps) {
  return <Text {...props} style={[styles.title, props.style]} />;
}

export function Subtitle(props: TextProps) {
  return <Text {...props} style={[styles.subtitle, props.style]} />;
}

export function Body(props: TextProps) {
  return <Text {...props} style={[styles.body, props.style]} />;
}

export function Caption(props: TextProps) {
  return <Text {...props} style={[styles.caption, props.style]} />;
}

export function SectionTitle(props: TextProps) {
  return <Text {...props} style={[styles.sectionTitle, props.style]} />;
}

const styles = StyleSheet.create({
  title: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold',
    color: COLORS.light.text,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.light.text,
    marginBottom: SPACING.sm,
  },
  body: {
    fontSize: FONT_SIZES.md,
    color: COLORS.light.textSecondary,
  },
  caption: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.light.textSecondary,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.light.text,
    marginBottom: SPACING.md,
  },
});
