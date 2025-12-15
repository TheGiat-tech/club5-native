import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';

export interface ChallengeCompleteModalProps {
  visible: boolean;
  onClose: () => void;
  onStartOver: () => void;
  onGoPremium: () => void;
  isDarkMode: boolean;
}

export function ChallengeCompleteModal({
  visible,
  onClose,
  onStartOver,
  onGoPremium,
  isDarkMode,
}: ChallengeCompleteModalProps) {
  const colors = isDarkMode ? COLORS.dark : COLORS.light;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <LinearGradient
            colors={colors.gradient1}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.iconBadge}
          >
            <Ionicons name="trophy" size={28} color="#fff" />
          </LinearGradient>
          <Text style={[styles.title, { color: colors.text }]}>
            Your free 7-day challenge is complete
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            To keep your streak, upgrade to Premium, or start over for free.
          </Text>
          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.background }]}
              onPress={() => {
                onStartOver();
                onClose();
              }}
            >
              <Text style={[styles.buttonText, { color: colors.text }]}>Start Over (Free)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={() => {
                onClose();
                onGoPremium();
              }}
            >
              <Text style={[styles.buttonText, { color: '#fff' }]}>Go Premium</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.xl,
    ...SHADOWS.lg,
    alignItems: 'center',
  },
  iconBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  actions: {
    flexDirection: 'column',
    gap: SPACING.sm,
    width: '100%',
  },
  button: {
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#FF6B35',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
  },
});
