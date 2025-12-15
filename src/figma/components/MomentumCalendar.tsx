import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { getLast7Days, getDayOfWeek } from '../utils/dateUtils';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';

export default function MomentumCalendar() {
  const { checkIns, isDarkMode } = useApp();
  const colors = isDarkMode ? COLORS.dark : COLORS.light;
  const last7Days = getLast7Days();

  const hasCheckIn = (date: string) => {
    return checkIns.some(c => c.date === date);
  };

  return (
    <View style={styles.container}>
      {last7Days.map((date, index) => {
        const checked = hasCheckIn(date);
        const dayLabel = getDayOfWeek(date);
        const dateNum = new Date(date).getDate();

        return (
          <View key={date} style={styles.dayContainer}>
            <Text style={[styles.dayLabel, { color: colors.textSecondary }]}>
              {dayLabel}
            </Text>
            <View
              style={[
                styles.dayCircle,
                {
                  backgroundColor: checked ? colors.primary : colors.border,
                  borderColor: checked ? colors.primary : colors.border,
                },
              ]}
            >
              {checked ? (
                <Text style={styles.checkmark}>✓</Text>
              ) : (
                <Text style={[styles.dateText, { color: colors.textSecondary }]}>
                  {dateNum}
                </Text>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
  },
  dayContainer: {
    alignItems: 'center',
    flex: 1,
  },
  dayLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: SPACING.sm,
  },
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
