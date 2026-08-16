import { CircleArrowLeft, FolderPen, Terminal, TextInitial } from "lucide-react-native";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Apis, { endpoints } from "../../utils/Apis";
import { styles } from "../../styles/EditSubjectStyle";

const EditSubject = () => {
    const navigation = useNavigation();
    const [subject, setSubject] = useState({});
    const [loading, setLoading] = useState(false);

    const subjectInfos = [
        {
            field: "name",
            placeholder: "Tên môn học",
            icon: FolderPen
        },
        {
            field: "code",
            placeholder: "Mã môn học",
            icon: Terminal
        },
        {
            field: "description",
            placeholder: "Mô tả môn học",
            icon: TextInitial,
            multiline: true
        }
    ];


    const validate = () => {
        if (!subject.name?.trim()) {
            alert("Vui lòng nhập tên môn học");
            return false;
        }
        if (!subject.description?.trim()) {
            alert("Vui lòng nhập mô tả môn học");
            return false;
        }
        return true;
    }

    const saveSubject = async () => {
        if (validate()) {
            try {
                setLoading(true);

                setSubject({ ...subject, lecturer_id: 3 })

                const res = await Apis.post(endpoints["saveSubject"], subject);
                if (res.status === 200) {
                    alert("Lưu môn học thành công!");
                    navigation.goBack();
                } else {
                    alert("Lưu môn học thất bại. Vui lòng thử lại.");
                }
            } catch (error) {
                console.error(error);
                alert("Đã xảy ra lỗi. Vui lòng thử lại.");
            }
        }
    }


    return (
        <SafeAreaView style={styles.container}>
            {/* NUT QUAY LAI */}
            <View>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton} activeOpacity={0.7}>
                    <CircleArrowLeft size={24} color="#4F46E5" style={styles.backIcon} />
                    <Text style={styles.backButtonText}>Quay lại</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.formContainer}>

                {/* HEADER */}
                <Text style={styles.headerTitle}>Chỉnh sửa môn học</Text>
                <Text style={styles.subTitle}>Cập nhật thông tin chi tiết của môn học dưới đây.</Text>

                {/* CAC O NHAP LIEU */}
                {subjectInfos.map((info, index) => (
                    <TextInput
                        key={index}
                        mode="outlined"
                        placeholder={info.placeholder}
                        value={subject[info.field] || ""}
                        onChangeText={(text) => setSubject({ ...subject, [info.field]: text })}
                        style={[styles.input, info.multiline && styles.textArea]}
                        multiline={info.multiline}
                        numberOfLines={info.multiline ? 4 : 1}
                        left={<TextInput.Icon icon={() => <info.icon size={22} color="#4F46E5" />} />}
                        outlineColor="#e2e8f0"
                        activeOutlineColor="#4F46E5"
                    />
                ))}
            </View>

            {/* NUT LUU */}
            <TouchableOpacity style={styles.saveButton} onPress={saveSubject} activeOpacity={0.8}>
                <Text style={styles.saveButtonText}>Lưu Thay Đổi</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};


export default EditSubject;