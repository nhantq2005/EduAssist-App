import React, { useContext, useEffect, useState } from "react";
import { COLORS } from "../../styles/theme";
import { View, Text, FlatList, ActivityIndicator, StatusBar, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Apis, { authApis, endpoints } from "../../utils/Apis";
import DocumentItem from "../../components/DocumentItem";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ArrowLeft, FilePlusCorner, FileText } from "lucide-react-native";
import { styles } from "../../styles/SubjectStyle";
import { MyUserContext } from "../../utils/MyContexts";
import * as SecureStore from 'expo-secure-store';

const Subject = () => {
    const nav = useNavigation();
    const route = useRoute();
    const subjectId = route?.params?.subjectId;
    const [subject, setSubject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user,] = useContext(MyUserContext);

    const loadSubject = async () => {
        try {
            setLoading(true);
            const res = await Apis.get(endpoints['getSubjectById'](subjectId));
            setSubject(res.data);
            // console.log("Chi tiết môn học:", res.data);
        } catch (error) {
            console.error("Lỗi khi tải chi tiết môn học:", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteDocument = async (documentId) => {
        Alert.alert(
            "Xác nhận xóa",
            "Bạn có chắc chắn muốn xóa tài liệu này không?",
            [
                { text: "Hủy", style: "cancel" },
                {
                    text: "Xóa",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            setLoading(true);
                            const token = await SecureStore.getItemAsync('access_token');
                            const res = await authApis(token).delete(endpoints['deleteDocument'](documentId));
                            if (res.status === 204) {
                                alert("Xóa tài liệu thành công!");
                            }
                            await loadSubject();
                        } catch (error) {
                            alert("Xóa tài liệu thất bại. Vui lòng thử lại.");
                            console.error("Lỗi khi xóa tài liệu:", error);
                        } finally {
                            setLoading(false);
                        }
                    }
                }
            ]
        );
    };

    useEffect(() => {
        console.log("User context:", user);
        loadSubject();
    }, []);

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            )}
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
            <FlatList
                data={subject?.documents || []}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    subject ? (
                        <View style={styles.headerContainer}>
                            <View style={styles.topBar}>
                                <TouchableOpacity onPress={() => nav?.goBack()} style={styles.backBtn}>
                                    <ArrowLeft size={24} color={COLORS.text} />
                                </TouchableOpacity>
                                <View style={styles.codeBadge}>
                                    <Text style={styles.codeText}>{subject.code}</Text>
                                </View>
                            </View>

                            <Text style={styles.title}>{subject.name}</Text>

                            <View style={styles.lecturerRow}>
                                <View style={styles.avatar}>
                                    <Ionicons name="person" size={16} color={COLORS.primary} />
                                </View>
                                <Text style={styles.lecturerName}>GV: {subject.lecturer?.name}</Text>
                            </View>

                            <Text style={styles.description}>{subject.description}</Text>

                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Tài liệu môn học</Text>
                                <View style={styles.documentCount}>
                                    <Text style={styles.documentCountText}>{subject.documents?.length || 0}</Text>
                                </View>
                            </View>
                        </View>
                    ) : null
                }
                renderItem={({ item }) => (
                    <DocumentItem
                        title={item.title}
                        size="PDF"
                        date={new Date(item.updated_date).toLocaleDateString('vi-VN')}
                        fileType={item.file_type === 'application/pdf' ? 'pdf' : 'doc'}
                        onPress={() => nav.navigate('DocumentView', { documentId: item.id, fileUrl: item.file_url})}
                        onDelete={() => deleteDocument(item.id)}
                    />
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <FileText size={64} color="#cbd5e1" />
                        <Text style={styles.emptyText}>Chưa có tài liệu nào.</Text>
                    </View>
                }
            />

            {subject && user?.role == 'LECTURER' && (
                <TouchableOpacity style={styles.fab} activeOpacity={0.8} onPress={() => nav.navigate('EditDocument', { subjectId: subject.id })}>
                    <FilePlusCorner size={28} color={COLORS.white} />
                </TouchableOpacity>
            )}
        </SafeAreaView>
    );
};

export default Subject;