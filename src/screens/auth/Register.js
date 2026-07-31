import { Mail, RectangleEllipsis, Users, UserRound, ArrowLeft } from "lucide-react-native";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View, KeyboardAvoidingView, Platform, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Apis, { endpoints } from "../../utils/Apis";

const { width } = Dimensions.get("window");

const Register = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const infos = [
        {
            field: "name",
            placeholder: "Họ và tên",
            secure: false,
            icon: UserRound
        },
        {
            field: "gender",
            placeholder: "Giới tính",
            secure: false,
            icon: Users
        },
        {
            field: "email",
            placeholder: "Email",
            secure: false,
            icon: Mail
        },
        {
            field: "username",
            placeholder: "Tên đăng nhập",
            secure: false,
            icon: UserRound
        },
        {
            field: "password",
            placeholder: "Mật khẩu",
            secure: true,
            icon: RectangleEllipsis
        },
        {
            field: "confirmPassword",
            placeholder: "Xác nhận mật khẩu",
            secure: true,
            icon: RectangleEllipsis
        }
    ];

    const [user, setUser] = useState({});

    const validate = () => {
        for (let info of infos) {
            if (!user[info.field]?.trim() || user[info.field] === "") {
                alert(`Vui lòng nhập ${info.placeholder.toLowerCase()}`);
                return false;
            }
        }

        if (user["password"] !== user["confirmPassword"]) {
            alert("Mật khẩu và xác nhận mật khẩu không khớp.");
            return false;
        }

        return true;
    };

    const register = async () => {
        if (validate()) {
            // Handle registration logic here
            try {
                setLoading(true);
                // 1. Tạo một bản sao của state user để chuẩn bị gửi lên API                                   
                const payload = { ...user };

                // 2. Xóa trường confirmPassword vì Backend không cần thiết                                    
                delete payload.confirmPassword;

                // 3. Mặc định role là STUDENT                                                                 
                payload.role = "STUDENT";

                // 4. Chuẩn hóa giới tính thành "MALE" hoặc "FEMALE" theo yêu cầu Backend                      
                const genderStr = payload.gender?.toLowerCase() || "";
                if (genderStr === "nam" || genderStr === "male") {
                    payload.gender = "MALE";
                } else if (genderStr === "nữ" || genderStr === "female") {
                    payload.gender = "FEMALE";
                } else {
                    payload.gender = "MALE"; // Mặc định
                }

                // 5. Gọi API
                const res = await Apis.post(endpoints["register"], payload);

                if (res.status === 201) {
                    alert('Đăng ký thành công!');
                    navigation.navigate("Login");
                }

            } catch (error) {
                setLoading(false);
                alert("Đăng ký thất bại. Vui lòng thử lại.");
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardView}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    <View style={styles.header}>
                        <Text style={styles.appName}>Trợ giảng AI</Text>
                    </View>

                    <View style={styles.formContainer}>
                        <View style={styles.welcomeSection}>
                            <Text style={styles.welcomeTitle}>Tạo tài khoản</Text>
                            <Text style={styles.welcomeSubtitle}>
                                Vui lòng điền thông tin để đăng ký
                            </Text>
                        </View>

                        <View style={styles.inputSection}>
                            {infos.map((info, index) => (
                                <TextInput
                                    key={index}
                                    placeholder={info.placeholder}
                                    secureTextEntry={info.secure}
                                    value={info.value}
                                    mode="outlined"
                                    outlineColor="#E5E7EB"
                                    activeOutlineColor="#4F46E5"
                                    style={styles.input}
                                    theme={{ roundness: 12 }}
                                    onChangeText={(text) => {
                                        setUser({ ...user, [info.field]: text });
                                    }}
                                    left={<TextInput.Icon icon={() => <info.icon size={20} color="#6B7280" />} />}
                                />
                            ))}
                        </View>

                        <TouchableOpacity style={styles.button} onPress={register} disabled={loading}>
                            <Text style={styles.buttonText}>Đăng ký ngay</Text>
                        </TouchableOpacity>


                    </View>
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>
                            Bạn đã có tài khoản?{" "}
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                            <Text style={styles.loginText}>
                                Đăng nhập
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 24,
    },
    header: {
        alignItems: "center",
        marginBottom: 32,
    },
    appName: {
        fontSize: 28,
        fontWeight: "800",
        color: "#4F46E5",
        letterSpacing: 0.5,
    },
    formContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 3,
    },
    welcomeSection: {
        marginBottom: 24,
    },
    welcomeTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 8,
    },
    welcomeSubtitle: {
        fontSize: 15,
        color: '#6B7280',
    },
    inputSection: {
        gap: 16,
        marginBottom: 24,
    },
    input: {
        backgroundColor: '#FAFAFA',
        fontSize: 15,
    },
    button: {
        backgroundColor: '#4F46E5',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#4F46E5',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
        marginBottom: 8,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 24,
    },
    footerText: {
        color: "#6B7280",
        fontSize: 15,
    },
    loginText: {
        color: "#4F46E5",
        fontSize: 15,
        fontWeight: "700",
    }
});