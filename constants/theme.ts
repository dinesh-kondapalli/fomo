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
  body: 'Manrope_600SemiBold',
  bodyRegular: 'Manrope_400Regular',
  heading: 'Sora_700Bold',
  headingSemi: 'Sora_600SemiBold',
} as const;
