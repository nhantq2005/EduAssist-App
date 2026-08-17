import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Text, Card, Surface } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import { ArrowLeft, CheckCircle2, CircleX, SquarePen } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { authApis, endpoints } from '../utils/Apis';



const QuestionItem = ({ item, index, onDeleteSuccess }) => {
    const nav = useNavigation();
    const [loading, setLoading] = useState(false);

    const deleteQuestion = async () => {
        try {
            Alert.alert(
                "Xác nhận xóa",
                "Bạn có chắc chắn muốn xóa câu hỏi này không?",
                [
                    {
                        text: "Hủy",
                        style: "cancel"
                    },
                    {
                        text: "Xóa",
                        style: "destructive",
                        onPress: async () => {
                            setLoading(true);
                            try {
                                const token = await SecureStore.getItemAsync('access_token');
                                const res = await authApis(token).delete(endpoints['deleteQuestion'](item.id));
                                if (res.status === 204 || res.status === 200) {
                                    alert("Xóa câu hỏi thành công!");
                                    if (onDeleteSuccess) {
                                        onDeleteSuccess();
                                    }
                                }
                            } catch (error) {
                                console.error("Lỗi khi xóa API:", error);
                                alert("Đã xảy ra lỗi khi xóa câu hỏi.");
                            } finally {
                                setLoading(false);
                            }
                        }
                    }
                ]
            );
        } catch (error) {
            console.error("Lỗi khi xóa câu hỏi:", error);
        }
    };

    return (
        <Card style={styles.card} mode="elevated">
            <Card.Content>
                <View style={styles.header}>
                    <Text variant="titleMedium" style={styles.questionText}>
                        Câu {index + 1}: {item.question}
                    </Text>
                    {item.score !== null && (
                        <View style={styles.scoreBadge}>
                            <Text variant="labelSmall" style={styles.scoreText}>{item.score} điểm</Text>
                        </View>
                    )}
                </View>

                <View style={styles.optionsContainer}>
                    {item.options.map(option => (
                        <Surface
                            key={option.id}
                            style={[
                                styles.optionSurface,
                                option.is_correct ? styles.correctOption : styles.incorrectOption
                            ]}
                        >
                            <Text
                                style={[
                                    styles.optionText,
                                    option.is_correct && styles.correctOptionText
                                ]}
                            >
                                {option.content}
                            </Text>
                            {option.is_correct ? (
                                <CheckCircle2 size={20} color="#16a34a" />
                            ) : null}
                        </Surface>
                    ))}
                </View>

                {item.explanation && (
                    <View style={styles.explanationContainer}>
                        <Text variant="labelMedium" style={styles.explanationLabel}>Giải thích:</Text>
                        <Text variant="bodySmall" style={styles.explanationText}>{item.explanation}</Text>
                    </View>
                )}
                <View style={styles.actionContainer}>
                    <TouchableOpacity style={styles.actionButtonEdit} onPress={() => nav.navigate('EditQuestion', { questionId: item.id })}>
                        <SquarePen size={18} color="#2563eb" />
                        <Text style={styles.actionTextEdit}>Chỉnh sửa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButtonDelete} onPress={deleteQuestion} disabled={loading}>
                        <CircleX size={18} color="#ef4444" />
                        <Text style={styles.actionTextDelete}>Xóa</Text>
                    </TouchableOpacity>
                </View>
            </Card.Content>
        </Card>
    );
};

export default QuestionItem;

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        marginBottom: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    questionText: {
        flex: 1,
        fontWeight: '700',
        color: '#0f172a',
        marginRight: 12,
        lineHeight: 24,
    },
    scoreBadge: {
        backgroundColor: '#e0f2fe',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    scoreText: {
        color: '#0284c7',
        fontWeight: 'bold',
    },
    optionsContainer: {
        gap: 12,
    },
    optionSurface: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 14,
        borderRadius: 12,
        borderWidth: 1,
        elevation: 0,
    },
    correctOption: {
        backgroundColor: '#f0fdf4',
        borderColor: '#bbf7d0',
    },
    incorrectOption: {
        backgroundColor: '#f8fafc',
        borderColor: '#e2e8f0',
    },
    optionText: {
        flex: 1,
        color: '#334155',
        fontSize: 15,
    },
    correctOptionText: {
        color: '#166534',
        fontWeight: '600',
    },
    explanationContainer: {
        marginTop: 16,
        padding: 14,
        backgroundColor: '#fffbeb',
        borderRadius: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#f59e0b',
    },
    explanationLabel: {
        fontWeight: 'bold',
        color: '#b45309',
        marginBottom: 6,
    },
    explanationText: {
        color: '#78350f',
        lineHeight: 20,
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 12,
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
    },
    actionButtonEdit: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#eff6ff',
        borderRadius: 8,
        gap: 6,
    },
    actionButtonDelete: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#fef2f2',
        borderRadius: 8,
        gap: 6,
    },
    actionTextEdit: {
        color: '#2563eb',
        fontWeight: '600',
        fontSize: 14,
    },
    actionTextDelete: {
        color: '#ef4444',
        fontWeight: '600',
        fontSize: 14,
    }
});