import { MD3DarkTheme, configureFonts } from 'react-native-paper';
import { Platform } from 'react-native';
import type { MD3Theme } from 'react-native-paper';

// Custom dark theme based on MD3
export const darkTheme: MD3Theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#6EC6FF',
    secondary: '#B0BEC5',
    background: '#121212',
    surface: '#1E1E1E',
    surfaceVariant: '#2C2C2C',
    onBackground: '#E0E0E0',
    onSurface: '#E0E0E0',
    onSurfaceVariant: '#9E9E9E',
    outline: '#424242',
    outlineVariant: '#2C2C2C',
    error: '#CF6679',
    onError: '#000000',
    errorContainer: '#B3261E',
    onErrorContainer: '#F9DEDC',
    inverseSurface: '#E0E0E0',
    inverseOnSurface: '#3B3B3B',
    inversePrimary: '#0D47A1',
  },
  fonts: configureFonts({
    config: {
      displayLarge: {
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
        fontWeight: '400' as const,
      },
      displayMedium: {
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
        fontWeight: '400' as const,
      },
      displaySmall: {
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
        fontWeight: '400' as const,
      },
      headlineLarge: {
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
        fontWeight: '500' as const,
      },
      headlineMedium: {
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
        fontWeight: '500' as const,
      },
      headlineSmall: {
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
        fontWeight: '500' as const,
      },
      bodyLarge: {
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
        fontWeight: '400' as const,
      },
      bodyMedium: {
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
        fontWeight: '400' as const,
      },
      bodySmall: {
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
        fontWeight: '400' as const,
      },
      labelLarge: {
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
        fontWeight: '500' as const,
      },
      labelMedium: {
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
        fontWeight: '500' as const,
      },
      labelSmall: {
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
        fontWeight: '500' as const,
      },
      titleLarge: {
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
        fontWeight: '500' as const,
      },
      titleMedium: {
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
        fontWeight: '500' as const,
      },
      titleSmall: {
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
        fontWeight: '500' as const,
      },
    },
  }),
};

export default darkTheme;
