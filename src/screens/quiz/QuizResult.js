import React from 'react';
import { COLORS } from "../../styles/theme";
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CheckCircle, Clock, Hash, Trophy, ArrowLeft } from 'lucide-react-native';
import { styles } from "../../styles/QuizResultStyle";

const QuizResult = () => {
    const nav = useNavigation();
    const route = useRoute();
    const { resultData } = route.params || {};

    if (!resultData) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => nav.goBack()}>
                        <ArrowLeft color={COLORS.text} size={24} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Lỗi kết quả</Text>
                </View>
                <View style={styles.centerContainer}>
                    <Text style={styles.errorText}>Không tìm thấy dữ liệu kết quả bài thi.</Text>
                </View>
            </SafeAreaView>
        );
    }

    const formatTime = (dateString) => {
        if (!dateString) return 'Không có';
        const date = new Date(dateString);
        return date.toLocaleString('vi-VN');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => nav.goBack()}>
                    <ArrowLeft color={COLORS.text} size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Kết Quả Bài Thi</Text>
                <View style={{ width: 24 }} /> 
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.scoreCard}>
                    <Trophy color="#F59E0B" size={48} style={styles.scoreIcon} />
                    <Text style={styles.scoreText}>{resultData.total_score}</Text>
                    <Text style={styles.scoreLabel}>Điểm số (/10)</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <CheckCircle color={COLORS.success} size={24} />
                        <Text style={styles.statValue}>{resultData.correct_count} / {resultData.total_questions}</Text>
                        <Text style={styles.statLabel}>Câu đúng</Text>
                    </View>
                    
                    <View style={styles.statCard}>
                        <Hash color="#3B82F6" size={24} />
                        <Text style={styles.statValue}>{resultData.total_questions}</Text>
                        <Text style={styles.statLabel}>Tổng số câu</Text>
                    </View>
                </View>

                <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>Chi tiết nộp bài</Text>
                    
                    <View style={styles.detailRow}>
                        <Clock color={COLORS.subText} size={20} />
                        <View style={styles.detailTextContainer}>
                            <Text style={styles.detailLabel}>Thời gian nộp:</Text>
                            <Text style={styles.detailValue}>{formatTime(resultData.time_submitted)}</Text>
                        </View>
                    </View>
                    
                    <View style={styles.detailRow}>
                        <CheckCircle color={COLORS.subText} size={20} />
                        <View style={styles.detailTextContainer}>
                            <Text style={styles.detailLabel}>Trạng thái:</Text>
                            <Text style={[styles.detailValue, { color: resultData.is_completed ? COLORS.success : COLORS.error }]}>
                                {resultData.is_completed ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
                            </Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity 
                    style={styles.doneButton}
                    onPress={() => nav.navigate('TabNavigation')}
                >
                    <Text style={styles.doneButtonText}>Về trang chủ</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default QuizResult;
