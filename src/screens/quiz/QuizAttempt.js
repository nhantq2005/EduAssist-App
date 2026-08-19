import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, RefreshControl, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from 'expo-secure-store';
import { authApis, endpoints } from "../../utils/Apis";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft, Inbox } from "lucide-react-native";
import QuizAttemptItem from "../../components/QuizAttemptItem";

const QuizAttempt = () => {
    const [quizAttempts, setQuizAttempts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation();
    
    const loadQuizAttempts = async () => {
        try {
            const token = await SecureStore.getItemAsync('access_token');
            const res = await authApis(token).get(endpoints['getQuizAttempts']);
            setQuizAttempts(res.data);
        } catch (error) {
            console.error('Error loading quiz attempts:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        loadQuizAttempts();
    };

    useEffect(() => {
        loadQuizAttempts();
    }, []);

    const renderEmptyComponent = () => {
        if (loading) return null;
        
        return (
            <View style={styles.emptyContainer}>
                <View style={styles.emptyIconContainer}>
                    <Inbox size={48} color="#94A3B8" />
                </View>
                <Text style={styles.emptyTitle}>Chưa có dữ liệu</Text>
                <Text style={styles.emptyText}>Bạn chưa làm bài kiểm tra nào.</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.backButton} 
                    onPress={() => navigation.goBack()}
                    activeOpacity={0.7}
                >
                    <ArrowLeft size={24} color="#334155" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Lịch sử làm bài</Text>
                <View style={{ width: 40 }} /> {/* Placeholder for balance */}
            </View>

            {loading && !refreshing ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#4F46E5" />
                </View>
            ) : (
                <FlatList
                    data={quizAttempts}
                    renderItem={({ item }) => (
                        <QuizAttemptItem 
                            quizAttempt={item} 
                            onPress={() => { /* Handle item press */ }} 
                        />
                    )}
                    keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={renderEmptyComponent}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={['#4F46E5']}
                            tintColor="#4F46E5"
                        />
                    }
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1E293B',
    },
    listContainer: {
        padding: 16,
        flexGrow: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 80,
    },
    emptyIconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1E293B',
        marginBottom: 8,
    },
    emptyText: {
        fontSize: 14,
        color: '#64748B',
        textAlign: 'center',
    }
});

export default QuizAttempt;