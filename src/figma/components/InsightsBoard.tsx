import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { UiCard } from './UiCard';
import { useApp } from '../context/AppContext';
import { useSubscription } from '@/src/context/SubscriptionContext';
import { COLORS as UI_COLORS, RADII } from '../theme/ui';
import { COLORS } from '../constants/theme';

export default function InsightsBoard() {
  const { isPremium } = useSubscription();
  const { currentStreak, successRate, userData, checkIns, isDarkMode } = useApp();
  const colors = isDarkMode ? COLORS.dark : COLORS.light;

  const onTimeRate = useMemo(() => {
    if (!checkIns.length) return 0;
    const onTimeCount = checkIns.filter((c) => c.onTime).length;
    return Math.round((onTimeCount / checkIns.length) * 100);
  }, [checkIns]);

  const premiumInsights = [
    {
      title: 'Streak Power',
      desc: `${currentStreak} days strong. Keep the chain alive.`,
      badge: `${currentStreak}d`,
    },
    {
      title: 'On-Time Rate',
      desc: `${onTimeRate}% wake-ups on time. Aim for 80%+.`,
      badge: `${onTimeRate}%`,
    },
    {
      title: 'Wake Window',
      desc: `Target: ${userData.wakeUpTime || '5:00 AM'}. Prep the night before.`,
      badge: 'Prep',
    },
  ];

  const baseInsight = isPremium
    ? {
        title: 'Keep it up!',
        desc: `You're on a ${currentStreak}-day streak. Don't break the chain!`,
        badge: '✨',
      }
    : {
        title: 'Mini Insight',
        desc: 'Upgrade to unlock detailed premium insights.',
        badge: '✨',
      };

  return (
    <>
      <UiCard>
        <Text style={[styles.heading, { color: colors.text }]}>Insights</Text>
        <View style={[styles.row, { backgroundColor: colors.surface }]}>
          <View style={[styles.emojiBox, { backgroundColor: colors.surface }]}>
            <Text style={styles.emoji}>{baseInsight.badge}</Text>
          </View>
          <View style={styles.textBlock}>
            <Text style={[styles.title, { color: colors.text }]}>{baseInsight.title}</Text>
            <Text style={[styles.desc, { color: colors.textSecondary }]}>{baseInsight.desc}</Text>
          </View>
        </View>
      </UiCard>

      <UiCard>
        <Text style={[styles.heading, { color: colors.text }]}>Premium Insights</Text>
        <View style={styles.list}>
          {premiumInsights.map((item) => (
            <View key={item.title} style={[styles.premiumRow, { backgroundColor: colors.surface }]}>
              <View style={[styles.badge, { backgroundColor: UI_COLORS.gradientMid }]}>
                <Text style={styles.badgeText}>{item.badge}</Text>
              </View>
              <View style={styles.textBlock}>
                <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
                <Text style={[styles.desc, { color: colors.textSecondary }]}>{item.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      </UiCard>
    </>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
  },
  row: {
    borderRadius: RADII.card,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  emojiBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 24,
  },
  list: {
    gap: 12,
  },
  premiumRow: {
    borderRadius: RADII.card,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADII.button,
  },
  badgeText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
  textBlock: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
  },
  desc: {
    fontSize: 13,
    lineHeight: 18,
  },
});
