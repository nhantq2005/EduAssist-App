import React, { useEffect, useState, useRef } from "react";
import { COLORS } from "../../styles/theme";
import { View, Text, FlatList, TouchableOpacity, Alert, TextInput, ActivityIndicator } from "react-native";
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

const LIMIT = 20;

const Quiz = () => {
    const [quizList, setQuizList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const nav = useNavigation();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [typeQuiz, setTypeQuiz] = useState("TEACHER_CREATED");
    const searchInputRef = useRef(null);

    const loadQuiz = async (currentOffset = 0, isRefreshing = false) => {
        if (isRefreshing) {
            setLoading(true);
        } else if (currentOffset > 0) {
            setLoadingMore(true);
        } else {
            setLoading(true);
        }

        try {
            const token = await SecureStore.getItemAsync('access_token');
            let url = `${endpoints['getQuizzes']}?offset=${currentOffset}&limit=${LIMIT}`;
            if (title) {
                url += `&title=${encodeURIComponent(title)}`;
            }
            const res = await authApis(token).get(url);
            let newData = res.data || [];
            if (title && Array.isArray(newData)) {
                const query = title.toLowerCase();
                newData = newData.filter(item => 
                    item.title?.toLowerCase().includes(query) || 
                    item.description?.toLowerCase().includes(query) ||
                    item.subject_name?.toLowerCase().includes(query)
                );
            }
            console.log("Danh sách bài trắc nghiệm:", newData);

            if (newData.length < LIMIT) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }

            if (currentOffset === 0) {
                setQuizList(newData);
            } else {
                setQuizList(prev => [...prev, ...newData]);
            }
        } catch (error) {
            console.error("Lỗi khi tải bài trắc nghiệm:", error);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    const handleRefresh = () => {
        setOffset(0);
        loadQuiz(0, true);
    };

    const handleLoadMore = () => {
        if (!loading && !loadingMore && hasMore) {
            const nextOffset = offset + LIMIT;
            setOffset(nextOffset);
            loadQuiz(nextOffset);
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
                            setOffset(0);
                            await loadQuiz(0, true);
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
        setOffset(0);
        loadQuiz(0, true);
    }, [isModalVisible]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setOffset(0);
            loadQuiz(0, true);
        }, 500);
        return () => clearTimeout(timer);
    }, [title]);


    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <QuizCreateModal visible={isModalVisible && typeQuiz === "TEACHER_CREATED"} onClose={() => setIsModalVisible(false)} nav={nav} />
            <QuizGenerateModal visible={isModalVisible && typeQuiz === "AI_GENERATED"} onClose={() => setIsModalVisible(false)} nav={nav} />

            <FlatList
                data={quizList}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                refreshing={loading}
                onRefresh={handleRefresh}
                ListFooterComponent={
                    loadingMore ? (
                        <View style={{ paddingVertical: 20, alignItems: 'center' }}>
                            <ActivityIndicator size="small" color={COLORS.primary} />
                        </View>
                    ) : null
                }
                ListHeaderComponent={
                    <View style={styles.headerContainer}>
                        <View style={styles.topBar}>
                            <TouchableOpacity onPress={() => { setIsModalVisible(true); setTypeQuiz("TEACHER_CREATED"); }} style={styles.backBtn}>
                    
                                <Text style={styles.backBtnText}>Tạo trắc nghiệm</Text>
                            </TouchableOpacity>
                            <View style={styles.headerRight}>
                                <TouchableOpacity style={styles.actionBtn}>
                                    <Ionicons name="filter" size={22} color="#475569" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style={styles.title}>Trắc nghiệm</Text>

                        <View style={styles.searchContainer}>
                            <Ionicons name="search-outline" size={20} color={COLORS.subText} style={styles.searchIcon} />
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Tìm kiếm bài trắc nghiệm..."
                                placeholderTextColor={COLORS.subText}
                                value={title}
                                onChangeText={setTitle}
                            />
                            {title ? (
                                <TouchableOpacity onPress={() => setTitle('')} style={styles.clearButton}>
                                    <Ionicons name="close-circle" size={18} color={COLORS.subText} />
                                </TouchableOpacity>
                            ) : null}
                        </View>
                    </View>
                }
                renderItem={({ item }) => (
                    <QuizItem
                        item={item}
                        onPress={() => {
                            nav.navigate("TakeQuiz", { quizId: item.id });
                        }}
                        onDelete={() => {deleteQuiz(item.id)}}
                        onEdit={() => {nav.navigate("EditQuestion", { quizId: item.id })}}
                    />
                )}
                ListEmptyComponent={
                    !loading && (
                        <View style={styles.emptyContainer}>
                            <View style={styles.emptyIconBox}>
                                <Ionicons name="create-outline" size={48} color={COLORS.subText} />
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

