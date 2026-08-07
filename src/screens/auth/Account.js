import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  User,
  Settings,
  Bell,
  CircleHelp,
  LogOut,
  ChevronRight,
  FolderClock,
} from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

const Account = () => {
  const navigation = useNavigation();

  const menuItems = [
    {
      title: "Cài đặt tài khoản",
      items: [
        { icon: User, label: "Thông tin cá nhân", route: "Profile" },
        { icon: FolderClock, label: "Lịch sử trắc nghiệm", route: "LearningHistory" },
        { icon: Settings, label: "Đổi mật khẩu", route: "ChangePassword" },
        { icon: Bell, label: "Thông báo", route: "Notifications" },

      ],
    },
    {
      title: "Ứng dụng",
      items: [
        { icon: CircleHelp, label: "Trợ giúp & Hỗ trợ", route: "Help" },
      ],
    },
  ];

  const handleLogout = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Tài khoản</Text>
        </View>

        {/* Profile Info Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>A</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>Nguyễn Văn A</Text>
            <Text style={styles.email}>nguyenvana@gmail.com</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Sửa</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Sections */}
        {menuItems.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.card}>
              {section.items.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.menuItem,
                    index !== section.items.length - 1 && styles.borderBottom,
                  ]}
                  onPress={() => {
                    // Navigate to respective route if needed
                    console.log(`Navigate to ${item.route}`);
                  }}
                >
                  <View style={styles.menuItemLeft}>
                    <View style={styles.iconContainer}>
                      <item.icon size={20} color="#4F46E5" />
                    </View>
                    <Text style={styles.menuItemText}>{item.label}</Text>
                  </View>
                  <ChevronRight size={20} color="#9CA3AF" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="#EF4444" style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Phiên bản 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 24,
    padding: 20,
    borderRadius: 24,
    shadowColor: "#000",
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
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#4F46E5",
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#6B7280",
  },
  editButton: {
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    color: "#4F46E5",
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
    color: "#374151",
    marginBottom: 12,
    marginLeft: 4,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    shadowColor: "#000",
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
    borderBottomColor: "#F3F4F6",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  menuItemText: {
    fontSize: 16,
    color: "#1F2937",
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
    backgroundColor: "#FEF2F2",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FEE2E2",
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    color: "#EF4444",
    fontSize: 16,
    fontWeight: "700",
  },
  versionContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  versionText: {
    color: "#9CA3AF",
    fontSize: 13,
  }
});
