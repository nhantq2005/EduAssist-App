import React, { useContext } from "react";
import { COLORS } from "../../styles/theme";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { User, Settings, Bell, CircleHelp, LogOut, ChevronRight, FolderClock } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../styles/AccountStyle";
import { MyUserContext } from "../../utils/MyContexts";

const Account = () => {
  const [user, dispatch] = useContext(MyUserContext);
  const nav = useNavigation();

  const menuItems = [
    {
      title: "Cài đặt tài khoản",
      items: [
        { icon: User, label: "Chỉnh sửa thông tin", route: "EditUser" },
        { icon: FolderClock, label: "Lịch sử trắc nghiệm", route: "QuizAttempt" },
        { icon: Settings, label: "Đổi mật khẩu", route: "ChangePassword" },
        // { icon: Bell, label: "Thông báo", route: "Notifications" },

      ],
    },
    {
      title: "Ứng dụng",
      items: [
        { icon: CircleHelp, label: "Trợ giúp & Hỗ trợ", route: "Help" },
      ],
    },
  ];

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    nav.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Tài khoản</Text>
        </View>

        {/* THONG TIN USER */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>A</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>
        </View>

        {/* CAC MENU CHON */}
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
                    nav.navigate(item.route);
                  }}
                >
                  <View style={styles.menuItemLeft}>
                    <View style={styles.iconContainer}>
                      <item.icon size={20} color={COLORS.primary} />
                    </View>
                    <Text style={styles.menuItemText}>{item.label}</Text>
                  </View>
                  <ChevronRight size={20} color={COLORS.subText} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* NUT LOGOUT */}
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <LogOut size={20} color={COLORS.error} style={styles.logoutIcon} />
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

