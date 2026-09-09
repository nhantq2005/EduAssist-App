import React, { useEffect, useState } from "react";
import { COLORS } from "../../styles/theme";
import { View, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, RefreshControl, StatusBar, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from 'expo-secure-store';
import { authApis, endpoints } from "../../utils/Apis";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft, Inbox } from "lucide-react-native";
import QuizAttemptItem from "../../components/QuizAttemptItem";
import { BarChart } from "react-native-chart-kit";

const QuizAttempt = () => {
    const [quizAttempts, setQuizAttempts] = useState([]);
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const nav = useNavigation();

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

    const loadScoresDistribution = async () => {
        try {
            const token = await SecureStore.getItemAsync('access_token');
            const res = await authApis(token).get(endpoints['getScoreDistribution']);
            setScores(res.data);
            console.log('Scores:', res.data);
        } catch (error) {
            console.error('Error loading quiz stats:', error);
        }
    };

    const chartConfig = {
        backgroundColor: COLORS.white,
        backgroundGradientFrom: COLORS.white,
        backgroundGradientTo: COLORS.white,
        decimalPlaces: 0,
        color: () => COLORS.primary,
        labelColor: () => COLORS.text ,
        barPercentage: 0.5,
        style: {
            borderRadius: 16
        }
    };

    const hasScores = Array.isArray(scores) && scores.length > 0;
    
    const chartData = {
        labels: hasScores ? scores.map(item => item.label || '') : [''],
        datasets: [
            {
                data: hasScores ? scores.map(item => item.value || 0) : [0]
            }
        ]
    };

    const onRefresh = () => {
        setRefreshing(true);
        loadQuizAttempts();
    };

    useEffect(() => {
        loadQuizAttempts();
        loadScoresDistribution();
    }, []);

    const renderEmptyComponent = () => {
        if (loading) return null;

        return (
            <View style={styles.emptyContainer}>
                <View style={styles.emptyIconContainer}>
                    <Inbox size={48} color={COLORS.subText} />
                </View>
                <Text style={styles.emptyTitle}>Chưa có dữ liệu</Text>
                <Text style={styles.emptyText}>Bạn chưa làm bài kiểm tra nào.</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => nav.goBack()}
                    activeOpacity={0.7}
                >
                    <ArrowLeft size={24} color={COLORS.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Lịch sử làm bài</Text>
                <View style={{ width: 40 }} />
            </View>

            {loading && !refreshing ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            ) : (
                <>
                    <View style={{ alignItems: 'center', marginVertical: 10 }}>
                        <BarChart
                            data={chartData}
                            width={Dimensions.get("window").width - 32}
                            height={240}
                            chartConfig={chartConfig}
                            fromZero={true}
                            showValuesOnTopOfBars={true}
                            style={{ borderRadius: 16 }}
                        />
                    </View>

                    <FlatList
                        data={quizAttempts}
                        renderItem={({ item }) => (
                            <QuizAttemptItem
                                quizAttempt={item}
                                onPress={() => nav.navigate("Question", { attemptId: item.id })}
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
                                colors={[COLORS.primary]}
                                tintColor={COLORS.primary}
                            />
                        }
                    />
                </>
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
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.iconBg,
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
        color: COLORS.title,
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
        backgroundColor: COLORS.iconBg,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.title,
        marginBottom: 8,
    },
    emptyText: {
        fontSize: 14,
        color: COLORS.subText,
        textAlign: 'center',
    }
});

export default QuizAttempt;