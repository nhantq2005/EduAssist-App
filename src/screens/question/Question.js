import React, { useCallback, useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card, Surface, FAB } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, CheckCircle2, CircleX, PackageOpen, SquarePen } from 'lucide-react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { authApis, endpoints } from '../../utils/Apis';
import * as SecureStore from 'expo-secure-store';
import QuestionItem from '../../components/QuestionItem';

const Question = () => {
    const [questions, setQuestions] = useState([]);
    const nav = useNavigation();
    const route = useRoute();
    const quizId = route.params?.quizId;
    const loadQuestion = async () => {
        try {
            const token = await SecureStore.getItemAsync('access_token');
            const res = await authApis(token).get(endpoints['getQuestionsByQuizId'](quizId));
            setQuestions(res.data);
            console.log("Câu hỏi đã được tải:", res.data);
        } catch (error) {
            console.error("Lỗi khi tải câu hỏi:", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadQuestion();
        }, [])
    );

    useEffect(() => {
        loadQuestion();
    }, [quizId]);

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={questions}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                    <QuestionItem 
                        item={item} 
                        index={index} 
                        onDeleteSuccess={loadQuestion} 
                    />
                )}
                contentContainerStyle={styles.listContainer}
                ListHeaderComponent={
                    <View style={styles.headerContainer}>
                        <ArrowLeft size={24} color="#0f172a" />
                        <Text variant="titleLarge" style={styles.title}>Danh sách câu hỏi</Text>
                    </View>
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <PackageOpen size={48} color="#94a3b8" />
                        <Text style={styles.emptyText}>Không có câu hỏi nào.</Text>
                    </View>
                }
                showsVerticalScrollIndicator={false}
            />
            <FAB
                icon="plus"
                color="#FFFFFF"
                style={styles.fab}
                onPress={() => nav.navigate('EditQuestion', { quizId })}
            />
        </SafeAreaView>
    );
};

export default Question;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f5f9',
    },
    listContainer: {
        padding: 16,
        flexGrow: 1,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
    },
    emptyText: {
        fontSize: 16,
        color: '#64748b',
        textAlign: 'center',
        marginTop: 12,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontWeight: 'bold',
        color: '#0f172a',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#4F46E5',
    }
});

