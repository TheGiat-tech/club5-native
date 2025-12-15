type ThemePalette = {
  background: string;
  surface: string;
  surfaceElevated: string;
  primary: string;
  primarySoft: string;
  secondary: string;
  tertiary: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  error: string;
  warning: string;
  danger: string;
  tabIconActive: string;
  tabIconInactive: string;
  cardShadow: string;
  gradient1: readonly [string, string];
  gradient2: readonly [string, string];
  gradient3: readonly [string, string];
  gradientBackground: readonly [string, string, string];
};

export const COLORS: Record<'light' | 'dark' | 'clean', ThemePalette> = {
  light: {
    background: '#FFF5F0',
    surface: '#FFFFFF',
    surfaceElevated: '#F7F7FF',
    primary: '#FF6B35',
    primarySoft: '#FF6B3533',
    secondary: '#F7931E',
    tertiary: '#A855F7',
    text: '#1F2937',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    danger: '#EF4444',
    tabIconActive: '#FF6B35',
    tabIconInactive: '#9CA3AF',
    cardShadow: 'rgba(0,0,0,0.1)',
    
    // Gradients
    gradient1: ['#FF6B35', '#F7931E'],
    gradient2: ['#A855F7', '#EC4899'],
    gradient3: ['#3B82F6', '#6366F1'],
    gradientBackground: ['#FFF5F0', '#FFEDD5', '#E0F2FE'],
  },
  dark: {
    background: '#111827',
    surface: '#1F2937',
    surfaceElevated: '#111827',
    primary: '#FF6B35',
    primarySoft: '#FF6B3533',
    secondary: '#F7931E',
    tertiary: '#A855F7',
    text: '#000000',
    textSecondary: '#000000',
    border: '#374151',
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    danger: '#EF4444',
    tabIconActive: '#FF6B35',
    tabIconInactive: '#6B7280',
    cardShadow: 'rgba(0,0,0,0.35)',
    
    // Gradients
    gradient1: ['#FF6B35', '#F7931E'],
    gradient2: ['#A855F7', '#EC4899'],
    gradient3: ['#3B82F6', '#6366F1'],
    gradientBackground: ['#111827', '#1E293B', '#1F2937'],
  },
  clean: {
    background: '#050510',
    surface: '#080818',
    surfaceElevated: '#0f1024',
    primary: '#a855f7',
    primarySoft: '#a855f733',
    secondary: '#F7931E',
    tertiary: '#A855F7',
    text: '#F9F5FF',
    textSecondary: '#A1A1BB',
    border: '#262640',
    success: '#4ade80',
    error: '#f97373',
    danger: '#f97373',
    warning: '#F59E0B',
    tabIconActive: '#c4b5fd',
    tabIconInactive: '#6b7280',
    cardShadow: 'rgba(0,0,0,0.7)',
    
    // Gradients
    gradient1: ['#a855f7', '#ec4899'],
    gradient2: ['#6366F1', '#8b5cf6'],
    gradient3: ['#3B82F6', '#6366F1'],
    gradientBackground: ['#050510', '#080818', '#0f1024'],
  },
};

export const CLEAN_THEME = COLORS.clean;

export type ThemeColors = typeof COLORS.light;

export const getThemeColors = (
  themeMode: ThemeMode,
  isDarkMode: boolean
): ThemeColors => {
  if (themeMode === 'clean') {
    return COLORS.clean;
  }
  if (themeMode === 'system') {
    return isDarkMode ? COLORS.dark : COLORS.light;
  }
  return COLORS[themeMode] || COLORS.light;
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const BORDER_RADIUS = {
  sm: 8,
  md: 16,
  lg: 24,
  xl: 28,
  full: 9999,
};

export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};
import { ThemeMode } from '../types';
