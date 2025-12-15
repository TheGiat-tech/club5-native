import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import { UiCard } from './UiCard';

type Level = {
  title: string;
  description: string;
  range: [number, number]; // inclusive
};

const LEVELS: Level[] = [
  { title: 'Getting Started', description: 'Get the habit started.', range: [1, 6] },
  { title: 'First Wins', description: 'Stack your first wins.', range: [7, 29] },
  { title: 'Building Momentum', description: 'Lock the routine.', range: [30, 59] },
  { title: 'Legend Mode', description: 'Become the legend.', range: [60, 90] },
];

interface ProgressTimelineProps {
  totalDays: number;
  isDarkMode: boolean;
}

export function ProgressTimeline({ totalDays, isDarkMode }: ProgressTimelineProps) {
  const colors = isDarkMode ? COLORS.dark : COLORS.light;
  const activeIndex = LEVELS.findIndex(
    (level) => totalDays >= level.range[0] && totalDays <= level.range[1],
  );
  const currentIndex = activeIndex === -1 ? 0 : activeIndex;

  return (
    <UiCard style={[styles.container, { backgroundColor: colors.surface }]}>
      <Text style={[styles.heading, { color: colors.text }]}>Progress</Text>
      <View style={styles.timelineGrid}>
        {LEVELS.map((level, index) => {
          const isActive = index === currentIndex;
          const isComplete = index < currentIndex;
          const stagger = index % 2 === 1 ? styles.staggered : null;
          return (
            <View
              key={level.title}
              style={[
                styles.stepContainer,
                stagger,
                {
                  borderColor: isActive ? colors.primary : colors.border,
                  backgroundColor: isActive ? colors.primary + '10' : colors.surface,
                  shadowColor: isActive ? colors.primary : '#000',
                },
              ]}
            >
              <View style={styles.stepHeader}>
                <View
                  style={[
                    styles.badge,
                    { backgroundColor: isActive || isComplete ? colors.primary : colors.border },
                  ]}
                />
                <Text style={[styles.rangeText, { color: colors.textSecondary }]}>
                  {`Days ${level.range[0]}-${level.range[1]}`}
                </Text>
              </View>
              <Text style={[styles.title, { color: colors.text, fontWeight: isActive ? '800' : '700' }]}>
                {level.title}
              </Text>
              <Text style={[styles.description, { color: colors.textSecondary }]}>
                {level.description}
              </Text>
            </View>
          );
        })}
      </View>
    </UiCard>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.md,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
  },
  heading: {
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'left',
  },
  timelineGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: SPACING.lg,
  },
  stepContainer: {
    width: '48%',
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    ...SHADOWS.sm,
    gap: SPACING.xs,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 140,
  },
  staggered: {
    marginTop: 12,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  badge: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  rangeText: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.2,
  },
  title: {
    fontSize: 16,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
  },
});
