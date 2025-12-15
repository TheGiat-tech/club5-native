import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';

const { width } = Dimensions.get('window');
const PICKER_WIDTH = Math.min(Math.max(width - SPACING.xl * 2, 280), 400);
const IS_SMALL_SCREEN = width < 360;

interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
  isDarkMode: boolean;
  use24Hour?: boolean;
}

export default function TimePicker({ value, onChange, isDarkMode, use24Hour = false }: TimePickerProps) {
  const colors = isDarkMode ? COLORS.dark : COLORS.light;
  
  // Parse existing value or default to 5:00 AM
  const parseTime = (timeStr: string) => {
    const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)?/i);
    if (match) {
      return {
        hour: parseInt(match[1]),
        minute: parseInt(match[2]),
        period: match[3]?.toUpperCase() || 'AM',
      };
    }
    return { hour: 5, minute: 0, period: 'AM' };
  };

  const parsed = parseTime(value);
  const [hour, setHour] = useState(parsed.hour.toString());
  const [minute, setMinute] = useState(parsed.minute.toString().padStart(2, '0'));
  const [period, setPeriod] = useState<'AM' | 'PM'>(parsed.period as 'AM' | 'PM');

  const updateTime = (newHour: string, newMinute: string, newPeriod: 'AM' | 'PM') => {
    const h = parseInt(newHour) || 0;
    const m = parseInt(newMinute) || 0;
    
    if (use24Hour) {
      onChange(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
    } else {
      onChange(`${h}:${m.toString().padStart(2, '0')} ${newPeriod}`);
    }
  };

  const handleHourChange = (text: string) => {
    const num = parseInt(text) || 0;
    const maxHour = use24Hour ? 23 : 12;
    const minHour = use24Hour ? 0 : 1;
    
    if (text === '') {
      setHour('');
      return;
    }
    
    if (num >= minHour && num <= maxHour) {
      setHour(num.toString());
      updateTime(num.toString(), minute, period);
    }
  };

  const handleMinuteChange = (text: string) => {
    const num = parseInt(text) || 0;
    
    if (text === '') {
      setMinute('');
      return;
    }
    
    if (num >= 0 && num <= 59) {
      const paddedMinute = num.toString().padStart(2, '0');
      setMinute(paddedMinute);
      updateTime(hour, paddedMinute, period);
    }
  };

  const handlePeriodToggle = (newPeriod: 'AM' | 'PM') => {
    setPeriod(newPeriod);
    updateTime(hour, minute, newPeriod);
  };

  const incrementHour = () => {
    const current = parseInt(hour) || (use24Hour ? 0 : 1);
    const maxHour = use24Hour ? 23 : 12;
    const minHour = use24Hour ? 0 : 1;
    const next = current >= maxHour ? minHour : current + 1;
    setHour(next.toString());
    updateTime(next.toString(), minute, period);
  };

  const decrementHour = () => {
    const current = parseInt(hour) || (use24Hour ? 0 : 1);
    const maxHour = use24Hour ? 23 : 12;
    const minHour = use24Hour ? 0 : 1;
    const prev = current <= minHour ? maxHour : current - 1;
    setHour(prev.toString());
    updateTime(prev.toString(), minute, period);
  };

  const incrementMinute = () => {
    const current = parseInt(minute) || 0;
    const next = current >= 59 ? 0 : current + 1;
    const paddedMinute = next.toString().padStart(2, '0');
    setMinute(paddedMinute);
    updateTime(hour, paddedMinute, period);
  };

  const decrementMinute = () => {
    const current = parseInt(minute) || 0;
    const prev = current <= 0 ? 59 : current - 1;
    const paddedMinute = prev.toString().padStart(2, '0');
    setMinute(paddedMinute);
    updateTime(hour, paddedMinute, period);
  };

  return (
    <View style={[styles.container, { maxWidth: PICKER_WIDTH }]}>
      <View style={styles.pickerRow}>
        {/* Hour Picker */}
        <View style={styles.timeColumn}>
          <TouchableOpacity
            onPress={incrementHour}
            style={[styles.arrowButton, { backgroundColor: colors.surface }]}
          >
            <Text style={[styles.arrowText, { color: colors.primary }]}>▲</Text>
          </TouchableOpacity>
          
          <View style={[styles.inputContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <TextInput
              style={[styles.input, { color: colors.text }]}
              value={hour}
              onChangeText={handleHourChange}
              keyboardType="number-pad"
              maxLength={2}
              placeholder={use24Hour ? "00" : "12"}
              placeholderTextColor={colors.textSecondary}
              textAlign="center"
            />
          </View>
          
          <TouchableOpacity
            onPress={decrementHour}
            style={[styles.arrowButton, { backgroundColor: colors.surface }]}
          >
            <Text style={[styles.arrowText, { color: colors.primary }]}>▼</Text>
          </TouchableOpacity>
        </View>

        {/* Separator */}
        <Text style={[styles.separator, { color: colors.text }]}>:</Text>

        {/* Minute Picker */}
        <View style={styles.timeColumn}>
          <TouchableOpacity
            onPress={incrementMinute}
            style={[styles.arrowButton, { backgroundColor: colors.surface }]}
          >
            <Text style={[styles.arrowText, { color: colors.primary }]}>▲</Text>
          </TouchableOpacity>
          
          <View style={[styles.inputContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <TextInput
              style={[styles.input, { color: colors.text }]}
              value={minute}
              onChangeText={handleMinuteChange}
              keyboardType="number-pad"
              maxLength={2}
              placeholder="00"
              placeholderTextColor={colors.textSecondary}
              textAlign="center"
            />
          </View>
          
          <TouchableOpacity
            onPress={decrementMinute}
            style={[styles.arrowButton, { backgroundColor: colors.surface }]}
          >
            <Text style={[styles.arrowText, { color: colors.primary }]}>▼</Text>
          </TouchableOpacity>
        </View>

        {/* AM/PM Toggle (12-hour only) */}
        {!use24Hour && (
          <View style={styles.periodColumn}>
            <TouchableOpacity
              onPress={() => handlePeriodToggle('AM')}
              style={[
                styles.periodButton,
                period === 'AM' && styles.periodButtonActive,
              ]}
            >
              {period === 'AM' ? (
                <LinearGradient
                  colors={colors.gradient1}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.periodGradient}
                >
                  <Text style={styles.periodTextActive}>AM</Text>
                </LinearGradient>
              ) : (
                <View style={[styles.periodInactive, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                  <Text style={[styles.periodTextInactive, { color: colors.textSecondary }]}>AM</Text>
                </View>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => handlePeriodToggle('PM')}
              style={[
                styles.periodButton,
                period === 'PM' && styles.periodButtonActive,
              ]}
            >
              {period === 'PM' ? (
                <LinearGradient
                  colors={colors.gradient1}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.periodGradient}
                >
                  <Text style={styles.periodTextActive}>PM</Text>
                </LinearGradient>
              ) : (
                <View style={[styles.periodInactive, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                  <Text style={[styles.periodTextInactive, { color: colors.textSecondary }]}>PM</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
    marginTop: SPACING.lg,
    marginBottom: SPACING.md,
  },
  pickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.md,
  },
  timeColumn: {
    alignItems: 'center',
    gap: SPACING.sm,
  },
  arrowButton: {
    width: 60,
    height: 40,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.sm,
  },
  arrowText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    width: 80,
    height: 80,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.md,
  },
  input: {
    fontSize: 36,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
    includeFontPadding: false,
  },
  separator: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: -40,
  },
  periodColumn: {
    gap: SPACING.sm,
    marginLeft: SPACING.sm,
  },
  periodButton: {
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
  },
  periodButtonActive: {
    ...SHADOWS.sm,
  },
  periodGradient: {
    width: 60,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  periodInactive: {
    width: 60,
    height: 40,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  periodTextActive: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  periodTextInactive: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});