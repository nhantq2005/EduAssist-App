import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Award, CheckCircle2, Calendar } from 'lucide-react-native';

const QuizAttemptItem = ({ quizAttempt, onPress }) => {
    let formattedDate = quizAttempt.time_submitted;
    try {
        const dateObj = new Date(quizAttempt.time_submitted);
        if (!isNaN(dateObj.getTime())) {
            formattedDate = dateObj.toLocaleDateString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
        }
    } catch (e) {
        console.error('Error formatting date:', e);
    }

    return (
        <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={onPress}>
            <View style={styles.header}>
                <Text style={styles.title} numberOfLines={1}>
                    {quizAttempt.quiz?.title || 'Bài kiểm tra'}
                </Text>
                <View style={styles.scoreBadge}>
                    <Award size={14} color="#4F46E5" />
                    <Text style={styles.scoreText}>{quizAttempt.total_score}đ</Text>
                </View>
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                    <CheckCircle2 size={16} color="#10B981" />
                    <Text style={styles.statText}>
                        {quizAttempt.correct_count}/{quizAttempt.total_questions} đúng
                    </Text>
                </View>

                <View style={styles.statItem}>
                    <Calendar size={16} color="#64748B" />
                    <Text style={styles.statText}>{formattedDate}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    title: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
        color: '#1E293B',
        marginRight: 12,
    },
    scoreBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EEF2FF',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        gap: 4,
    },
    scoreText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#4F46E5',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#F8FAFC',
        paddingTop: 12,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    statText: {
        fontSize: 13,
        color: '#64748B',
        fontWeight: '500',
    }
});

export default QuizAttemptItem;