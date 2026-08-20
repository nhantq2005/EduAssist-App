import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
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
    color: "#4F46E5",
    letterSpacing: 0.5,
  },
  welcomeSection: {
    marginBottom: 32,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 15,
    color: "#6B7280",
  },
  inputSection: {
    gap: 16,
  },
  input: {
    backgroundColor: "#FAFAFA",
    fontSize: 15,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: 12,
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: "#4F46E5",
    fontSize: 14,
    fontWeight: "600",
  },
  loginButton: {
    backgroundColor: "#4F46E5",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonText: {
    color: "#FFFFFF",
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
    backgroundColor: "#E5E7EB",
  },
  dividerText: {
    marginHorizontal: 12,
    color: "#6B7280",
    fontSize: 14,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
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
    color: "#374151",
    fontSize: 15,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 32,
  },
  footerText: {
    color: "#6B7280",
    fontSize: 15,
  },
  registerText: {
    color: "#4F46E5",
    fontSize: 15,
    fontWeight: "700",
  },
});