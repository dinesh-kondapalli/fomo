import { Platform } from 'react-native';

function fontFamily(webVariable: string, nativeFamily: string) {
  return Platform.OS === 'web' ? `var(${webVariable})` : nativeFamily;
}

export const theme = {
  colors: {
    background: '#04030C',
    surface: '#11121E',
    surfaceSoft: '#191B2B',
    surfaceElevated: '#1E2134',
    border: 'rgba(118, 123, 161, 0.2)',
    textPrimary: '#F5F6FF',
    textMuted: '#8A8EA8',
    textSubtle: '#696D86',
    accentBlue: '#5D6DFF',
    accentBlueSoft: '#3E4AB7',
    accentOrange: '#FF8B4A',
    profit: '#22D16F',
    loss: '#FF7A45',
  },
  spacing: {
    xs: 6,
    sm: 10,
    md: 14,
    lg: 20,
    xl: 28,
  },
  radius: {
    sm: 12,
    md: 18,
    lg: 24,
    pill: 999,
  },
} as const;

export const fonts = {
  body: fontFamily('--font-manrope-600', 'Manrope_600SemiBold'),
  bodyRegular: fontFamily('--font-manrope-400', 'Manrope_400Regular'),
  heading: fontFamily('--font-sora-700', 'Sora_700Bold'),
  headingSemi: fontFamily('--font-sora-600', 'Sora_600SemiBold'),
} as const;
