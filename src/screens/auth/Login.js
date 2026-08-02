import { CircleUserRound, SquareAsterisk, Mail } from "lucide-react-native";
import { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Apis, { endpoints } from "../../utils/Apis";

const { width } = Dimensions.get("window");

const Login = () => {
  const nav = useNavigation();
  const [loading, setLoading] = useState(false);

  const infos = [
    {
      field: "username",
      placeholder: "Tên đăng nhập",
      icon: CircleUserRound,
      secure: false,
    },
    {
      field: "password",
      placeholder: "Mật khẩu",
      icon: SquareAsterisk,
      secure: true,
    },
  ];

  const [info, setInfo] = useState(
    infos.map((item) => ({ ...item, value: "" }))
  );

  const validate = () => {
    for (const item of info) {
      if (!item.value.trim()) {
        alert(`Vui lòng nhập ${item.field}`);
        return false;
      }
    }
    return true;
  };

  const login = async () => {
    if (validate()) {
      setLoading(true);
      try {
        const res = await Apis.post(endpoints["login"], {
          username: info[0].value,
          password: info[1].value
        });
        if (res.status === 200) {
          // Lưu token vào AsyncStorage hoặc Context để sử dụng sau này
          // Ví dụ: await AsyncStorage.setItem('token', token);
          const token = res.data.access_token;
          console.log("Token:", token); // In ra token để kiểm tra

          setLoading(false);
          nav.reset({
            index: 0,
            routes: [{ name: "TabNavigation" }],
          });
        }
      } catch (error) {
        alert('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <View style={styles.header}>
          <Text style={styles.appName}>Trợ giảng AI</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeTitle}>Chào mừng trở lại</Text>
            <Text style={styles.welcomeSubtitle}>
              Vui lòng đăng nhập để tiếp tục
            </Text>
          </View>

          <View style={styles.inputSection}>
            {info.map((item, index) => (
              <TextInput
                key={index}
                placeholder={item.placeholder}
                secureTextEntry={item.secure}
                mode="outlined"
                outlineColor="#E5E7EB"
                activeOutlineColor="#4F46E5"
                style={styles.input}
                theme={{ roundness: 12 }}
                onChangeText={(text) => {
                  const newInfo = [...info];
                  newInfo[index] = { ...newInfo[index], value: text };
                  setInfo(newInfo);
                }}
                left={<TextInput.Icon icon={() => <item.icon size={20} color="#6B7280" />} />}
              />
            ))}
          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={login} disabled={loading}>
            <Text style={styles.loginButtonText}>Đăng nhập</Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>Hoặc tiếp tục với</Text>
            <View style={styles.divider} />
          </View>

          <TouchableOpacity style={styles.googleButton}>
            <Mail size={20} color="#4B5563" style={styles.googleIcon} />
            <Text style={styles.googleButtonText}>Đăng nhập với Google</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Bạn chưa có tài khoản? </Text>
          <TouchableOpacity onPress={() => nav.navigate("Register")}>
            <Text style={styles.registerText}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    alignItems: "center",
    marginBottom: 40,
  },
  appName: {
    fontSize: 28,
    fontWeight: "800",
    color: "#4F46E5",
    letterSpacing: 0.5,
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 15,
    shadowColor: "#000",
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
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingVertical: 14,
  },
  googleIcon: {
    marginRight: 10,
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

export default Login;