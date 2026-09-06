import React, { useState } from "react";
import { COLORS } from "../../styles/theme";
import { Text, TouchableOpacity, View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Menu, Provider } from "react-native-paper";
import { FileText, AlignLeft, Clock, Database, BarChart, ChevronDown, BookOpen } from "lucide-react-native";
import Apis, { endpoints } from "../../utils/Apis";

const EditQuiz = () => {
  const infos = [
    {
      field: "title",
      placeholder: "Nhập tiêu đề bài kiểm tra",
      icon: FileText,
    },
    {
      field: "description",
      placeholder: "Nhập mô tả bài kiểm tra",
      icon: AlignLeft,
    },
    {
      field: "time_limit",
      placeholder: "Nhập thời gian làm bài (phút)",
      icon: Clock,
      keyboardType: "numeric",
    },
    {
      field: "source_type",
      placeholder: "Chọn nguồn đề thi",
      icon: Database,
      type: "dropdown",
      options: [
        { label: "Giáo viên tự tạo", value: "TEACHER_CREATED" },
        { label: "Do AI sinh ra", value: "AI_GENERATED" },
      ]
    },
    {
      field: "difficulty_level",
      placeholder: "Chọn độ khó",
      icon: BarChart,
      type: "dropdown",
      options: [
        { label: "Dễ", value: "EASY" },
        { label: "Trung bình", value: "MEDIUM" },
        { label: "Khó", value: "HARD" },
      ]
    },
    {
      field: "subject_id",
      placeholder: "Nhập ID môn học",
      icon: BookOpen,
      keyboardType: "numeric",
    }
  ];

  const route = useRoute();
  const [quiz, setQuiz] = useState({});
  const [loading, setLoading] = useState(false);
  const [visibleDropdown, setVisibleDropdown] = useState(null);
 

  const validate = () => {
    for (const info of infos) {
      if (!quiz[info.field]) {
        Alert.alert(`Vui lòng ${info.placeholder.toLowerCase()}`);
        return false;
      }
    }
    return true;
  };

  const saveQuiz = async () => {
    if (validate()) {
      try {
        setLoading(true);
        // Ensure integers are parsed correctly
        const payload = {
          ...quiz,
          time_limit: parseInt(quiz.time_limit, 10),
          subject_id: parseInt(quiz.subject_id, 10),
        };

        const res = await Apis.post(endpoints["saveQuiz"], payload);
        if (res.status === 201 || res.status === 200) {
          Alert.alert("Cập nhật bài kiểm tra thành công!");
        } else {
          Alert.alert("Cập nhật bài kiểm tra thất bại. Vui lòng thử lại.");
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Đã xảy ra lỗi. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Helper function to find label for a dropdown value
  const getDropdownLabel = (item, value) => {
    if (!value) return "";
    const selectedOption = item.options.find(opt => opt.value === value);
    return selectedOption ? selectedOption.label : "";
  };

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            <View style={styles.header}>
              <Text style={styles.appName}>Chỉnh sửa bài thi</Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.welcomeSection}>
                <Text style={styles.welcomeTitle}>Thông tin bài kiểm tra</Text>
                <Text style={styles.welcomeSubtitle}>
                  Cập nhật các thông tin chi tiết bên dưới
                </Text>
              </View>

              <View style={styles.inputSection}>
                {infos.map((item, index) => {
                  if (item.type === "dropdown") {
                    return (
                      <Menu
                        key={index}
                        visible={visibleDropdown === index}
                        onDismiss={() => setVisibleDropdown(null)}
                        contentStyle={styles.menuContent}
                        style={styles.menuContainer}
                        anchor={
                          <TouchableOpacity onPress={() => setVisibleDropdown(index)} activeOpacity={0.8}>
                            <View pointerEvents="none">
                              <TextInput
                                placeholder={item.placeholder}
                                value={getDropdownLabel(item, quiz[item.field])}
                                mode="outlined"
                                outlineColor={COLORS.border}
                                activeOutlineColor={COLORS.primary}
                                style={styles.input}
                                theme={{ roundness: 12 }}
                                left={<TextInput.Icon icon={() => <item.icon size={20} color={visibleDropdown === index ? COLORS.primary : COLORS.subText} />} />}
                                right={<TextInput.Icon icon={() => <ChevronDown size={20} color={visibleDropdown === index ? COLORS.primary : COLORS.subText} />} />}
                                editable={false}
                              />
                            </View>
                          </TouchableOpacity>
                        }
                      >
                        {item.options.map((opt, optIndex) => (
                          <Menu.Item
                            key={optIndex}
                            onPress={() => {
                              const newQuiz = { ...quiz, [item.field]: opt.value };
                              setQuiz(newQuiz);
                              setVisibleDropdown(null);
                            }}
                            title={opt.label}
                            titleStyle={[
                              styles.menuItemTitle,
                              quiz[item.field] === opt.value && styles.menuItemTitleActive
                            ]}
                            style={[
                              styles.menuItem,
                              quiz[item.field] === opt.value && styles.menuItemActive
                            ]}
                            contentStyle={styles.menuItemInner}
                          />
                        ))}
                      </Menu>
                    );
                  }

                  return (
                    <TextInput
                      key={index}
                      placeholder={item.placeholder}
                      value={quiz[item.field] ? String(quiz[item.field]) : ""}
                      keyboardType={item.keyboardType || "default"}
                      mode="outlined"
                      outlineColor={COLORS.border}
                      activeOutlineColor={COLORS.primary}
                      style={styles.input}
                      theme={{ roundness: 12 }}
                      onChangeText={(text) => {
                        const newQuiz = { ...quiz, [item.field]: text };
                        setQuiz(newQuiz);
                      }}
                      left={<TextInput.Icon icon={() => <item.icon size={20} color={COLORS.subText} />} />}
                    />
                  );
                })}
              </View>
              {action === 'CREATE-QUIZ' && (
                <TouchableOpacity style={styles.saveButton} onPress={saveQuiz} disabled={loading}>
                  <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    flexGrow: 1,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  appName: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  formContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 20,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
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
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    marginTop: 32,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
  },
  menuContainer: {
    marginTop: 56, // Push menu below the input
  },
  menuContent: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingVertical: 8,
    width: "100%",
  },
  menuItem: {
    paddingHorizontal: 8,
    marginHorizontal: 8,
    borderRadius: 8,
    marginVertical: 2,
  },
  menuItemActive: {
    backgroundColor: COLORS.avatarBg, // Light indigo background for selected
  },
  menuItemInner: {
    paddingVertical: 10,
  },
  menuItemTitle: {
    fontSize: 15,
    color: COLORS.text,
    fontWeight: "500",
  },
  menuItemTitleActive: {
    color: COLORS.primary,
    fontWeight: "700",
  },
});

export default EditQuiz;
