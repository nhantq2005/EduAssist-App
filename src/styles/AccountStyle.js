import { COLORS } from "./theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.title,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    marginHorizontal: 24,
    padding: 20,
    borderRadius: 24,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 32,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.avatarBg,
    justifyContent: "center",
    alignItems: "center",
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
  email: {
    fontSize: 14,
    color: COLORS.subText,
  },
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
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
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
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.iconBg,
    justifyContent: "center",
    alignItems: "center",
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
