import { COLORS } from "./theme";
import { StyleSheet } from "react-native";
import { GlobalStyles } from "./GlobalStyles";

export const styles = StyleSheet.create({
  ...GlobalStyles,
  keyboardView: {
    ...GlobalStyles.keyboardView,
    justifyContent: "center",
    padding: 24,
  },
  header: {
    marginBottom: 40,
  },
  appName: {
    ...GlobalStyles.headerTitle,
    color: COLORS.primary,
  },
  welcomeSection: {
    marginBottom: 32,
  },
  welcomeTitle: {
    ...GlobalStyles.title,
    marginBottom: 8,
  },
  welcomeSubtitle: GlobalStyles.subtitle,
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: 12,
    marginBottom: 24,
  },
  forgotPasswordText: {
    ...GlobalStyles.linkText,
    fontSize: 14,
  },
  loginButton: GlobalStyles.primaryButton,
  loginButtonText: GlobalStyles.primaryButtonText,
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    marginHorizontal: 12,
    color: COLORS.subText,
    fontSize: 14,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    shadowColor: "#acacac",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    paddingVertical: 14,
  },
  googleIcon: {
    marginRight: 10,
    width: 20,
    height: 20,
  },
  googleButtonText: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "600",
  },
  registerText: GlobalStyles.linkText,
});