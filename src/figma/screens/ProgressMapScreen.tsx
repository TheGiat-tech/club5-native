import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProgressCasinoMap } from '../components/ProgressCasinoMap';
import { UiCard } from '../components/UiCard';
import { COLORS, SPACING } from '../constants/theme';
import { useApp } from '../context/AppContext';

export default function ProgressMapScreen() {
  const { userData } = useApp();
  const totalDays = userData.totalCheckIns ?? 0;
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <UiCard>
          <Text style={styles.title}>Journey Map</Text>
          <Text style={styles.subtitle}>See your 90-day progress path</Text>
          <ProgressCasinoMap currentDay={totalDays} totalDays={90} />
        </UiCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FAF8F3',
  },
  container: {
    padding: SPACING.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.light.text,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: COLORS.light.textSecondary,
  },
});
