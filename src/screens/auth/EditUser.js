import React, { useContext, useState, useEffect } from "react";
import { COLORS } from "../../styles/theme";
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-paper";
import { ArrowLeft, Camera, Mail, Save, UserRound, Users } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../styles/EditUserStyle";
import { MyUserContext } from "../../utils/MyContexts";
import FormDropdown from "../../components/FormDropdown";
import Toast from "react-native-toast-message";

const EditUser = () => {
    const navigation = useNavigation();
    const [user, dispatch] = useContext(MyUserContext);
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        gender: "MALE",
    });

    useEffect(() => {
        if (user) {
            setUserInfo({
                name: user.name || "",
                email: user.email || "",
                gender: user.gender || "MALE",
            });
        }
    }, [user]);

    const handleSave = () => {
        if (!userInfo.name.trim() || !userInfo.email.trim()) {
            Toast.show({
                type: 'error',
                text1: 'Lỗi',
                text2: 'Vui lòng điền đầy đủ họ tên và email.'
            });
            return;
        }

        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            Toast.show({
                type: 'success',
                text1: 'Thành công',
                text2: 'Đã cập nhật thông tin thành công!'
            });
            // Update context if needed
            // dispatch({ type: 'update', payload: userInfo });
            navigation.goBack();
        }, 1000);
    };

    return (
        <SafeAreaView edges={['top']} style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <ArrowLeft size={24} color={COLORS.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Chỉnh sửa hồ sơ</Text>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    <View style={styles.avatarSection}>
                        <View style={styles.avatarContainer}>
                            <Text style={styles.avatarText}>
                                {userInfo.name ? userInfo.name.charAt(0).toUpperCase() : "A"}
                            </Text>
                            <TouchableOpacity style={styles.cameraButton}>
                                <Camera size={16} color={COLORS.white} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.formSection}>
                        <TextInput
                            label="Họ và tên"
                            value={userInfo.name}
                            mode="outlined"
                            outlineColor={COLORS.border}
                            activeOutlineColor={COLORS.primary}
                            style={styles.input}
                            theme={{ roundness: 12 }}
                            onChangeText={(text) => setUserInfo({ ...userInfo, name: text })}
                            left={<TextInput.Icon icon={() => <UserRound size={20} color={COLORS.subText} />} />}
                        />

                        <TextInput
                            label="Email"
                            value={userInfo.email}
                            mode="outlined"
                            outlineColor={COLORS.border}
                            activeOutlineColor={COLORS.primary}
                            style={styles.input}
                            theme={{ roundness: 12 }}
                            onChangeText={(text) => setUserInfo({ ...userInfo, email: text })}
                            left={<TextInput.Icon icon={() => <Mail size={20} color={COLORS.subText} />} />}
                            keyboardType="email-address"
                        />

                        <FormDropdown
                            placeholder="Giới tính"
                            initialItems={[
                                { label: "Nam", value: "MALE" },
                                { label: "Nữ", value: "FEMALE" }
                            ]}
                            value={userInfo.gender}
                            onChangeValue={(val) => setUserInfo({ ...userInfo, gender: val })}
                            zIndex={1000}
                            icon={Users}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            <View style={{ padding: 24, backgroundColor: COLORS.white, borderTopWidth: 1, borderTopColor: COLORS.iconBg }}>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
                    <Save size={20} color={COLORS.white} />
                    <Text style={styles.saveButtonText}>
                        {loading ? "Đang lưu..." : "Lưu thay đổi"}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default EditUser;