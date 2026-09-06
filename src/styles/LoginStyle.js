import { COLORS } from "./theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  header: {
    marginBottom: 40,
  },
  appName: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  welcomeSection: {
    marginBottom: 32,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.title,
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 15,
    color: COLORS.subText,
  },
  inputSection: {
    gap: 16,
  },
  input: {
    backgroundColor: COLORS.inputBg,
    fontSize: 15,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: 12,
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "600",
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
  },
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
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 32,
  },
  footerText: {
    color: COLORS.subText,
    fontSize: 15,
  },
  registerText: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: "700",
  },
});