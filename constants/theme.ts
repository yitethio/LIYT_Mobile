/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

export const Colors = {
  primary: '#18181B',      // Main background
  secondary: '#000000',    // Cards, darker elements
  accent: '#E0FF32',       // Lime yellow - CTAs, highlights
  white: '#FFFFFF',        // Text, icons
  textPrimary: '#FFFFFF',
  textSecondary: '#9CA3AF',
  textMuted: '#6B7280',
  border: '#27272A',
  cardBg: '#27272A',
  // Status colors
  urgent: '#EF4444',
  success: '#10B981',
  fragile: '#F59E0B',
};

// Legacy support for themed components
export const LegacyColors = {
  light: {
    text: Colors.textPrimary,
    background: Colors.primary,
    tint: Colors.accent,
    icon: Colors.white,
    tabIconDefault: Colors.textSecondary,
    tabIconSelected: Colors.accent,
  },
  dark: {
    text: Colors.textPrimary,
    background: Colors.primary,
    tint: Colors.accent,
    icon: Colors.white,
    tabIconDefault: Colors.textSecondary,
    tabIconSelected: Colors.accent,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
