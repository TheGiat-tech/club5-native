import { ConfigContext, ExpoConfig } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  android: {
    ...config.android,
    package: 'com.giatech.club5native',
    versionCode: config.android?.versionCode ?? 1,
  },
  ios: {
    ...config.ios,
    bundleIdentifier: 'com.giatech.club5native',
    buildNumber: config.ios?.buildNumber ?? config.version ?? '1.0.0',
    supportsTablet: true,
  },
  runtimeVersion: config.runtimeVersion ?? { policy: 'sdkVersion' },
  // React Compiler disabled for now for compatibility with current React Native / Reanimated setup.
  experiments: {
    ...(config as any).experiments,
    reactCompiler: false,
  },
  extra: {
    ...config.extra,
    openaiApiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
  },
});
