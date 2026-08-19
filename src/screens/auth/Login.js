import { CircleUserRound, SquareAsterisk, Mail } from "lucide-react-native";
import { useContext, useState } from "react";
import { Text, TouchableOpacity, View, KeyboardAvoidingView, Platform, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';
import Apis, { authApis, endpoints } from "../../utils/Apis";
import { styles } from "../../styles/LoginStyle";
import { MyUserContext } from "../../utils/MyContexts";

const Login = () => {
  const nav = useNavigation();
  const [loading, setLoading] = useState(false);
  const [, dispatch] = useContext(MyUserContext);

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

  const [info, setInfo] = useState({});

  const validate = () => {
    for (const item of infos) {
      if (!info[item.field]?.trim()) {
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
          username: info.username,
          password: info.password
        });
        if (res.status === 200) {
          const token = res.data.access_token;
          await SecureStore.setItemAsync('access_token', token);
          const userRes = await authApis(token).get(endpoints['getCurrentUser']);
          dispatch({ type: 'login', payload: userRes.data });
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
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View style={styles.header}>
            <Text style={styles.appName}>EduAssist</Text>
          </View>

          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeTitle}>Chào mừng trở lại</Text>
            <Text style={styles.welcomeSubtitle}>
              Vui lòng đăng nhập để tiếp tục
            </Text>
          </View>

          <View style={styles.inputSection}>
            {infos.map((item, index) => (
              <TextInput
                key={index}
                placeholder={item.placeholder}
                secureTextEntry={item.secure}
                mode="outlined"
                outlineColor="#E5E7EB"
                activeOutlineColor="#4F46E5"
                style={styles.input}
                theme={{ roundness: 12 }}
                onChangeText={(text) => { setInfo({ ...info, [item.field]: text }) }}
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
            <Image source={require("../../../assets/google.png")} style={styles.googleIcon} />
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

export default Login;