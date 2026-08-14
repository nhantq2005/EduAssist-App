import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, StatusBar, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Apis, { endpoints } from "../../utils/Apis";
import DocumentItem from "../../components/DocumentItem";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Astroid } from "lucide-react-native";
import { styles } from "../../styles/SubjectStyle";
import { MyUserContext } from "../../utils/MyContexts";

const Subject = () => {
    const nav = useNavigation();
    const route = useRoute();
    const subjectId = route?.params?.subjectId;
    const [subject, setSubject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user,]= useContext(MyUserContext);

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

    useEffect(() => {
console.log("User context:", user);
        loadSubject();
    }, []);

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#4F46E5" />
                </View>
            )}
            <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
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
                                <Ionicons name="arrow-back" size={24} color="#1f2937" />
                            </TouchableOpacity>
                            <View style={styles.codeBadge}>
                                <Text style={styles.codeText}>{subject.code}</Text>
                            </View>
                        </View>

                        <Text style={styles.title}>{subject.name}</Text>

                        <View style={styles.lecturerRow}>
                            <View style={styles.avatar}>
                                <Ionicons name="person" size={16} color="#4F46E5" />
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
                        onPress={() => nav.navigate('DocumentView', { fileUrl: item.file_url })}
                    />
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="document-text-outline" size={64} color="#cbd5e1" />
                        <Text style={styles.emptyText}>Chưa có tài liệu nào.</Text>
                    </View>
                }
            />

            {subject && user.role == 'LECTURER' && (
                <TouchableOpacity style={styles.fab} activeOpacity={0.8} onPress={() => nav.navigate('EditDocument', { subjectId: subject.id })}>
                    <Astroid size={28} color="#ffffff" />
                </TouchableOpacity>
            )}
        </SafeAreaView>
    );
};

export default Subject;