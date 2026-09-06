import { COLORS } from "./theme";
import { StyleSheet } from "react-native";
import { GlobalStyles } from "./GlobalStyles";

export const styles = StyleSheet.create({
  ...GlobalStyles,
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  profileCard: {
    ...GlobalStyles.card,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 24,
    padding: 20,
    borderRadius: 24,
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 32,
  },
  avatarContainer: {
    ...GlobalStyles.avatarContainer,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.primary,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.title,
    marginBottom: 4,
  },
  email: GlobalStyles.subtitle,
  editButton: {
    backgroundColor: COLORS.avatarBg,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "600",
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 12,
    marginLeft: 4,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.iconBg,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    ...GlobalStyles.iconContainer,
    marginRight: 16,
  },
  menuItemText: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: "500",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 24,
    marginTop: 16,
    marginBottom: 24,
    paddingVertical: 16,
    backgroundColor: COLORS.errorBg,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FEE2E2",
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    color: COLORS.error,
    fontSize: 16,
    fontWeight: "700",
  },
  versionContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  versionText: {
    color: COLORS.subText,
    fontSize: 13,
  }
});
