import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Apis, { authApis, endpoints } from "../../utils/Apis";
import QuizItem from "../../components/QuizItem";
import { styles } from "../../styles/QuizStyle";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';
import { Astroid } from "lucide-react-native";
import QuizCreateModal from "../../components/QuizCreateModal";
import QuizGenerateModal from "../../components/QuizGenerateModal";

const Quiz = () => {
    const [quizList, setQuizList] = useState([]);
    const [loading, setLoading] = useState(true);
    const nav = useNavigation();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [typeQuiz, setTypeQuiz] = useState("TEACHER_CREATED");

    const loadQuiz = async () => {
        try {
            setLoading(true);
            const token = await SecureStore.getItemAsync('access_token');
            const res = await authApis(token).get(endpoints['getQuizzes']);
            console.log("Danh sách bài trắc nghiệm:", res.data);
            setQuizList(res.data);
        } catch (error) {
            console.error("Lỗi khi tải bài trắc nghiệm:", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteQuiz = async (quizId) => {
        Alert.alert(
            "Xác nhận xóa",
            "Bạn có chắc chắn muốn xóa bài trắc nghiệm này không?",
            [
                { text: "Hủy", style: "cancel" },
                {
                    text: "Xóa",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            setLoading(true);
                            const token = await SecureStore.getItemAsync('access_token');
                            const res = await authApis(token).delete(endpoints['deleteQuiz'](quizId));
                            if (res.status === 204) {
                                alert("Xóa bài trắc nghiệm thành công!");
                            }
                            await loadQuiz();
                        } catch (error) {
                            alert("Xóa bài trắc nghiệm thất bại. Vui lòng thử lại.");
                            console.error("Lỗi khi xóa bài trắc nghiệm:", error);
                        } finally {
                            setLoading(false);
                        }
                    }
                }
            ]
        );
    }


    useEffect(() => {
        loadQuiz();
    }, [isModalVisible]);


    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <QuizCreateModal visible={isModalVisible && typeQuiz === "TEACHER_CREATED"} onClose={() => setIsModalVisible(false)} nav={nav} />
            <QuizGenerateModal visible={isModalVisible && typeQuiz === "AI_GENERATED"} onClose={() => setIsModalVisible(false)} nav={nav} />
            {/* DSACH BAI TRAC NGHIEM */}
            <FlatList
                data={quizList}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View style={styles.headerContainer}>
                        <View style={styles.topBar}>
                            <TouchableOpacity onPress={() => { setIsModalVisible(true); setTypeQuiz("TEACHER_CREATED"); }} style={styles.backBtn}>
                                {/* <Ionicons name="arrow-back" size={24} color="#1f2937" /> */}
                                <Text style={styles.backBtnText}>Tạo trắc nghiệm</Text>
                            </TouchableOpacity>
                            <View style={styles.headerRight}>
                                <TouchableOpacity style={styles.actionBtn}>
                                    <Ionicons name="search" size={22} color="#475569" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.actionBtn}>
                                    <Ionicons name="filter" size={22} color="#475569" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style={styles.title}>Trắc nghiệm</Text>
                    </View>
                }
                renderItem={({ item }) => (
                    <QuizItem
                        item={item}
                        onPress={() => {
                            nav.navigate("TakeQuiz", { quizId: item.id });
                        }}
                        onDelete={() => {deleteQuiz(item.id)}}
                        onEdit={() => {
                            // Handle edit logic here
                        }}
                    />
                )}
                refreshing={loading}
                onRefresh={loadQuiz}
                ListEmptyComponent={
                    !loading && (
                        <View style={styles.emptyContainer}>
                            <View style={styles.emptyIconBox}>
                                <Ionicons name="create-outline" size={48} color="#94a3b8" />
                            </View>
                            <Text style={styles.emptyText}>Chưa có bài trắc nghiệm nào.</Text>
                            <Text style={styles.emptySubText}>Các bài quiz bạn tạo hoặc được giao sẽ hiển thị ở đây.</Text>
                        </View>
                    )
                }
            />
            <TouchableOpacity style={styles.fab} onPress={() => { setIsModalVisible(true); setTypeQuiz("AI_GENERATED"); }}>
                <Astroid size={28} color="#fff" />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default Quiz;

