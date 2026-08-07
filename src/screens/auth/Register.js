import { Mail, RectangleEllipsis, Users, UserRound, ArrowLeft } from "lucide-react-native";
import { useState } from "react";
import { TouchableOpacity, View, KeyboardAvoidingView, Platform, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Apis, { endpoints } from "../../utils/Apis";
import { styles } from "../../styles/RegisterStyle";
import FormDropdown from "../../components/FormDropdown";


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
            type: "dropdown",
            options: [
                { label: "Nam", value: "MALE" },
                { label: "Nữ", value: "FEMALE" }
            ]
        },
        {
            field: "role",
            placeholder: "Vai trò",
            type: "dropdown",
            options: [
                { label: "Sinh viên", value: "STUDENT" },
                { label: "Giảng viên", value: "TEACHER" }
            ]
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
            try {
                setLoading(true);                                
                const payload = { ...user };                                  
                delete payload.confirmPassword;
                                                          
                payload.role = payload.role || "STUDENT";
                   
                const genderStr = payload.gender?.toLowerCase() || "";
                if (genderStr === "nam" || genderStr === "male") {
                    payload.gender = "MALE";
                } else if (genderStr === "nữ" || genderStr === "female") {
                    payload.gender = "FEMALE";
                } else {
                    payload.gender = "MALE";
                }

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
                                info.type === "dropdown" ? (
                                    <FormDropdown
                                        key={index}
                                        placeholder={info.placeholder}
                                        initialItems={info.options}
                                        value={user[info.field] || null}
                                        onChangeValue={(val) => setUser({ ...user, [info.field]: val })}
                                        zIndex={1000 - index}
                                        icon={info.icon}
                                    />
                                ) : (
                                <TextInput
                                    key={index}
                                    placeholder={info.placeholder}
                                    secureTextEntry={info.secure}
                                    value={user[info.field] || ""}
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
                                )
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

