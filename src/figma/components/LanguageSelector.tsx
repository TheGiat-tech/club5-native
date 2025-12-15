import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { AVAILABLE_LANGUAGES } from '../i18n';
import { useApp } from '../context/AppContext';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LANGUAGE_KEY = '@club5ai_language';

export const LanguageSelector: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { isDarkMode } = useApp();
  const colors = isDarkMode ? COLORS.dark : COLORS.light;
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelectLanguage = async (languageCode: string) => {
    try {
      await i18n.changeLanguage(languageCode);
      await AsyncStorage.setItem(LANGUAGE_KEY, languageCode);
      setModalVisible(false);
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

  const currentLanguage = AVAILABLE_LANGUAGES.find((lang) => lang.code === i18n.language);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.settingRow}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <View style={styles.settingLeft}>
          <Ionicons name="language" size={24} color={colors.primary} />
          <Text style={[styles.settingLabel, { color: colors.text }]}>
            Language
          </Text>
        </View>
        <View style={styles.settingRight}>
          <Text style={styles.flag}>{currentLanguage?.flag}</Text>
          <Text style={[styles.settingValue, { color: colors.textSecondary }]}>
            {currentLanguage?.name}
          </Text>
          <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        </View>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={[styles.modal, { backgroundColor: colors.background }]}>
          {/* Header */}
          <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={28} color={colors.text} />
            </TouchableOpacity>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Select Language
            </Text>
            <View style={styles.closeButton} />
          </View>

          {/* Language List */}
          <ScrollView style={styles.languageList}>
            {AVAILABLE_LANGUAGES.map((language) => {
              const isSelected = language.code === i18n.language;

              return (
                <TouchableOpacity
                  key={language.code}
                  style={[
                    styles.languageItem,
                    { backgroundColor: colors.surface },
                    isSelected && { 
                      backgroundColor: colors.primary + '20',
                      borderColor: colors.primary,
                      borderWidth: 2,
                    },
                  ]}
                  onPress={() => handleSelectLanguage(language.code)}
                  activeOpacity={0.7}
                >
                  <View style={styles.languageInfo}>
                    <Text style={styles.languageFlag}>{language.flag}</Text>
                    <Text
                      style={[
                        styles.languageText,
                        { color: colors.text },
                        isSelected && { 
                          color: colors.primary,
                          fontWeight: '700' 
                        },
                      ]}
                    >
                      {language.name}
                    </Text>
                  </View>
                  {isSelected && (
                    <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  settingValue: {
    fontSize: 16,
  },
  flag: {
    fontSize: 20,
  },
  modal: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingTop: Platform.OS === 'ios' ? 60 : SPACING.lg,
    paddingBottom: SPACING.lg,
    borderBottomWidth: 1,
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  languageList: {
    flex: 1,
    padding: SPACING.lg,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.sm,
    ...SHADOWS.sm,
  },
  languageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageFlag: {
    fontSize: 32,
    marginRight: SPACING.md,
  },
  languageText: {
    fontSize: 18,
    fontWeight: '500',
  },
});
