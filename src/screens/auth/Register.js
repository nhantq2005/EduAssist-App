import { COLORS } from "../../styles/theme";
import { Mail, RectangleEllipsis, Users, UserRound, ArrowLeft, Camera } from "lucide-react-native";
import { useState } from "react";
import { TouchableOpacity, View, KeyboardAvoidingView, Platform, ScrollView, Dimensions, Alert, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Apis, { endpoints } from "../../utils/Apis";
import { styles } from "../../styles/RegisterStyle";
import FormDropdown from "../../components/FormDropdown";
import * as ImagePicker from 'expo-image-picker';


const Register = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const gender = { "nam": "MALE", "nữ": "FEMALE" };
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
                { label: "Giảng viên", value: "LECTURER" }
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


    const picker = async () => {
        const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (granted) {
            const res = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
            if (!res.canceled) {
                setUser({ ...user, "avatar": res.assets[0] });
            }
        } else {
            Alert.alert("Quyền truy cập bị từ chối!", "Vui lòng cấp quyền truy cập thư viện ảnh để tiếp tục.");
        }
    }

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
                let form = new FormData();

                if (user.avatar) {
                    form.append("avatar", {
                        uri: user.avatar.uri,
                        name: user.avatar.fileName || `avatar_${Date.now()}.jpg`,
                        type: user.avatar.mimeType || "image/jpeg"
                    });
                }

                for (let info of infos) {
                    if (info.field !== "confirmPassword") {
                        form.append(info.field, user[info.field]);
                    }
                }

                const res = await fetch(Apis.defaults.baseURL + endpoints["register"], {
                    method: 'POST',
                    body: form,
                });

                if (res.status === 201) {
                    alert('Đăng ký thành công!');
                    navigation.navigate("Login");
                } else {
                    const errorData = await res.json();
                    setLoading(false);
                    alert("Đăng ký thất bại: " + JSON.stringify(errorData));
                }

            } catch (error) {
                setLoading(false);
                alert("Lỗi kết nối: " + error.message);
            }
        }
    };

    return (
        <SafeAreaView edges={['top']} style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardView}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    <View style={styles.header}>
                        <Text style={styles.appName}>EduAssist</Text>
                    </View>

                    <View >
                        <View style={styles.welcomeSection}>
                            <Text style={styles.welcomeTitle}>Tạo tài khoản</Text>
                            <Text style={styles.welcomeSubtitle}>
                                Vui lòng điền thông tin để đăng ký
                            </Text>
                        </View>

                        <View style={styles.avatarSection}>
                            <TouchableOpacity onPress={picker} style={styles.avatarContainer}>
                                {user.avatar ? (
                                    <Image source={{ uri: user.avatar.uri }} style={styles.avatarImage} />
                                ) : (
                                    <View style={styles.avatarPlaceholder}>
                                        <Camera size={32} color={COLORS.subText} />
                                        <Text style={styles.avatarText}>Chọn ảnh</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
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
                                        outlineColor={COLORS.border}
                                        activeOutlineColor={COLORS.primary}
                                        style={styles.input}
                                        theme={{ roundness: 12 }}
                                        onChangeText={(text) => {
                                            setUser({ ...user, [info.field]: text });
                                        }}
                                        left={<TextInput.Icon icon={() => <info.icon size={20} color={COLORS.subText} />} />}
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