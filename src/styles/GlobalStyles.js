import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from './theme';

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    flexGrow: 1,
  },
  padding24: {
    padding: 24,
  },

  headerTitle: {
    fontSize: SIZES.h1,
    fontWeight: '800',
    color: COLORS.title,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: SIZES.h2,
    fontWeight: '700',
    color: COLORS.title,
  },
  subtitle: {
    fontSize: SIZES.body2,
    color: COLORS.subText,
  },


  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: COLORS.white,
    fontSize: SIZES.body1,
    fontWeight: '700',
  },


  inputSection: {
    gap: 16,
    marginBottom: 24,
  },
  input: {
    backgroundColor: COLORS.inputBg,
    fontSize: SIZES.body2,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },


  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },


  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.iconBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.avatarBg,
  },


  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    color: COLORS.subText,
    fontSize: SIZES.body2,
  },
  linkText: {
    color: COLORS.primary,
    fontSize: SIZES.body2,
    fontWeight: '700',
  },


  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
