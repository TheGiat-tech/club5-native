/**
 * Draftbit Configuration for Club5 AI
 * This file configures the project for Draftbit compatibility
 */

module.exports = {
  // Project Info
  projectName: 'Club5 AI',
  projectSlug: 'club5-ai',
  version: '1.0.0',
  
  // Expo SDK Version
  expoSdkVersion: '51.0.0',
  
  // Supported Platforms
  platforms: ['ios', 'android'],
  
  // Theme Configuration
  theme: {
    colors: {
      // Light Mode
      light: {
        primary: '#FF7A00',
        secondary: '#6A5AE0',
        background: '#FFF9F5',
        surface: '#FFFFFF',
        text: '#1A1A1A',
        textSecondary: '#666666',
        border: '#E0E0E0',
        error: '#FF3B30',
        success: '#34C759',
      },
      // Dark Mode
      dark: {
        primary: '#FF7A00',
        secondary: '#8B7EF0',
        background: '#1A1A1A',
        surface: '#2A2A2A',
        text: '#FFFFFF',
        textSecondary: '#A0A0A0',
        border: '#404040',
        error: '#FF453A',
        success: '#32D74B',
      },
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      xxl: 48,
    },
    borderRadius: {
      sm: 8,
      md: 12,
      lg: 16,
      xl: 24,
      full: 9999,
    },
  },
  
  // Navigation Structure
  navigation: {
    type: 'stack',
    initialRouteName: 'Onboarding',
    screens: {
      // Auth Flow
      onboarding: {
        name: 'Onboarding',
        path: '/onboarding',
        component: 'OnboardingScreen',
      },
      // Main App
      main: {
        name: 'Main',
        type: 'tabs',
        screens: {
          home: {
            name: 'Home',
            path: '/home',
            component: 'HomeScreen',
            icon: 'home',
          },
          momentum: {
            name: 'Momentum',
            path: '/momentum',
            component: 'MomentumScreen',
            icon: 'bar-chart',
          },
          coach: {
            name: 'Coach',
            path: '/coach',
            component: 'CoachChatScreen',
            icon: 'chatbubbles',
          },
          settings: {
            name: 'Settings',
            path: '/settings',
            component: 'SettingsScreen',
            icon: 'settings',
          },
        },
      },
    },
  },
  
  // Components Directory Structure
  components: {
    screens: './src/screens',
    components: './src/components',
    navigation: './src/navigation',
    context: './src/context',
    utils: './src/utils',
    constants: './src/constants',
    types: './src/types',
    i18n: './src/i18n',
  },
  
  // Custom Components (for Draftbit UI Builder)
  customComponents: [
    {
      name: 'CheckInButton',
      path: './src/components/CheckInButton.tsx',
      category: 'Buttons',
      description: 'Animated check-in button with confetti',
      props: {
        onPress: 'function',
        disabled: 'boolean',
        hasCheckedIn: 'boolean',
      },
    },
    {
      name: 'CoachAvatar',
      path: './src/components/CoachAvatar.tsx',
      category: 'Display',
      description: 'Coach avatar component',
      props: {
        coach: 'string',
        size: 'number',
      },
    },
    {
      name: 'StatCard',
      path: './src/components/StatCard.tsx',
      category: 'Display',
      description: 'Statistics card component',
      props: {
        title: 'string',
        value: 'string',
        icon: 'string',
      },
    },
    {
      name: 'MomentumCalendar',
      path: './src/components/MomentumCalendar.tsx',
      category: 'Display',
      description: '7-day momentum tracking calendar',
      props: {
        checkIns: 'array',
      },
    },
    {
      name: 'ConfettiAnimation',
      path: './src/components/ConfettiAnimation.tsx',
      category: 'Animation',
      description: 'Confetti celebration animation',
      props: {
        isVisible: 'boolean',
      },
    },
    {
      name: 'TimePicker',
      path: './src/components/TimePicker.tsx',
      category: 'Input',
      description: 'Time picker component',
      props: {
        value: 'string',
        onChange: 'function',
      },
    },
    {
      name: 'LanguageSelector',
      path: './src/components/LanguageSelector.tsx',
      category: 'Input',
      description: 'Language selection modal',
      props: {},
    },
    {
      name: 'FocusModeBanner',
      path: './src/components/FocusModeBanner.tsx',
      category: 'Display',
      description: 'Focus mode banner',
      props: {},
    },
  ],
  
  // Features
  features: {
    // Core Features
    checkIn: true,
    streakTracking: true,
    aiCoach: true,
    momentum: true,
    
    // Advanced Features
    notifications: true,
    darkMode: true,
    i18n: true,
    focusMode: true,
    
    // Storage
    asyncStorage: true,
    
    // Analytics (disabled for MVP)
    analytics: false,
    
    // Backend (disabled for MVP - local only)
    backend: false,
  },
  
  // Data Models
  dataModels: {
    userData: {
      firstName: 'string',
      gender: 'string',
      coach: 'string',
      wakeUpTime: 'string',
      focusMode: 'boolean',
      darkMode: 'boolean',
      themeMode: 'string',
    },
    checkIn: {
      date: 'string',
      timestamp: 'string',
      onTime: 'boolean',
    },
    chatMessage: {
      id: 'string',
      text: 'string',
      sender: 'string',
      timestamp: 'string',
    },
    journalEntry: {
      id: 'string',
      date: 'string',
      content: 'string',
      timestamp: 'string',
    },
  },
  
  // Localization
  localization: {
    enabled: true,
    defaultLanguage: 'en',
    supportedLanguages: ['en', 'he', 'es', 'de', 'fr', 'zh'],
    localesPath: './src/i18n/locales',
  },
  
  // Assets
  assets: {
    images: './assets/images',
    fonts: './assets/fonts',
    sounds: './assets/sounds',
  },
  
  // Build Configuration
  build: {
    ios: {
      bundleIdentifier: 'com.club5ai.app',
      buildNumber: 1,
    },
    android: {
      package: 'com.club5ai.app',
      versionCode: 1,
    },
  },
  
  // Dependencies (Draftbit compatible)
  compatibleDependencies: [
    '@react-navigation/native',
    '@react-navigation/bottom-tabs',
    '@react-navigation/stack',
    'react-native-screens',
    'react-native-safe-area-context',
    '@react-native-async-storage/async-storage',
    'react-native-reanimated',
    'expo-linear-gradient',
    'expo-notifications',
    '@expo/vector-icons',
    'react-native-svg',
    'expo-device',
    'expo-constants',
    'expo-localization',
    'i18next',
    'react-i18next',
  ],
  
  // Export Configuration
  export: {
    // Include these directories
    include: [
      'src/**/*',
      'assets/**/*',
      'App.tsx',
      'app.json',
      'package.json',
      'babel.config.js',
      'tsconfig.json',
    ],
    // Exclude these
    exclude: [
      'node_modules/**',
      '.expo/**',
      '.expo-shared/**',
      'scripts/**',
      '*.md',
      'eas.json',
      'google-services.json',
    ],
  },
};
