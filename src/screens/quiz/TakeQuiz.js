import React, { useEffect, useState } from 'react';
import { COLORS } from "../../styles/theme";
import { View, Text, TouchableOpacity, ScrollView, StatusBar, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight, CheckCircle2, XCircle, Info, ArrowLeft } from 'lucide-react-native';
import { styles } from '../../styles/TakeQuizStyle';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApis, endpoints } from '../../utils/Apis';
import { useNavigation, useRoute } from '@react-navigation/native';

const TakeQuiz = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const currentQuestion = questions[currentQuestionIndex];
    const isAnswered = selectedOption !== null;
    const nav = useNavigation();
    const route = useRoute();
    const quizId = route.params?.quizId;
    const [timeStart, setTimeStart] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    
    const selectOption = async (index) => {
        if (isAnswered) return;
        setSelectedOption(index);
        setShowExplanation(true);

        try {
            const key = `quiz_answers_${quizId}`;
            const existingAnswersJson = await AsyncStorage.getItem(key);
            const existingAnswers = existingAnswersJson ? JSON.parse(existingAnswersJson) : [];

            existingAnswers.push({
                question_id: currentQuestion.id,
                selected_option_id: currentQuestion.options[index].id
            });

            await AsyncStorage.setItem(key, JSON.stringify(existingAnswers));
        } catch (error) {
            console.error("Lỗi khi lưu câu trả lời:", error);
        }
    };

    const nextQuestion = async () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
            setShowExplanation(false);
        } else {
            setIsSubmitting(true);
            try {
                const token = await SecureStore.getItemAsync('access_token');
                const key = `quiz_answers_${quizId}`;
                const existingAnswersJson = await AsyncStorage.getItem(key);
                const answers = existingAnswersJson ? JSON.parse(existingAnswersJson) : [];
                const payload = { answers, time_start: timeStart };
                const res = await authApis(token).post(endpoints['quizAttempt'](quizId), payload);
                if (res.status === 201 || res.status === 200) {
                    await AsyncStorage.removeItem(key);
                    nav.replace('QuizResult', { resultData: res.data });
                }
            } catch (error) {
                console.error("Lỗi khi nộp bài:", error);
                Alert.alert("Lỗi", "Có lỗi xảy ra khi nộp bài. Vui lòng thử lại.");
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const loadQuestions = async () => {
        try {
            setIsLoading(true);
            await AsyncStorage.removeItem(`quiz_answers_${quizId}`);
            const token = await SecureStore.getItemAsync('access_token');
            const res = await authApis(token).get(endpoints['getQuestionsByQuizId'](quizId));
            setQuestions(res.data);
        } catch (error) {
            console.error("Lỗi khi tải câu hỏi:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadQuestions();
        setTimeStart(new Date().toISOString());
    }, []);



    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

            {isLoading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Đang tải dữ liệu...</Text>
                </View>
            ) : questions.length === 0 ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Không có câu hỏi nào.</Text>
                </View>
            ) : (
                <>
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.backButton} onPress={() => nav.goBack()}>
                            <ArrowLeft color={COLORS.text} size={24} />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Bài Kiểm Tra</Text>
                        <View style={{ width: 24 }} />
                    </View>

                    <View style={styles.progressContainer}>
                        <View style={styles.progressTextContainer}>
                            <Text style={styles.progressText}>Câu hỏi {currentQuestionIndex + 1} <Text style={styles.progressTotal}>/ {questions.length}</Text></Text>
                        </View>
                        <View style={styles.progressBarBackground}>
                            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
                        </View>
                    </View>

                    <ScrollView
                        style={styles.content}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                    >

                        <View style={styles.questionContainer}>
                            <Text style={styles.questionText}>{currentQuestion.question}</Text>
                        </View>

                        <View style={styles.optionsContainer}>
                            {currentQuestion.options.map((option, index) => {
                                let optionStyle = styles.optionCard;
                                let textStyle = styles.optionText;
                                let IconComponent = null;

                                if (isAnswered) {
                                    if (option.is_correct) {
                                        optionStyle = [styles.optionCard, styles.optionCorrect];
                                        textStyle = [styles.optionText, styles.optionTextCorrect];
                                        IconComponent = <CheckCircle2 color={COLORS.success} size={20} />;
                                    } else if (index === selectedOption) {
                                        optionStyle = [styles.optionCard, styles.optionWrong];
                                        textStyle = [styles.optionText, styles.optionTextWrong];
                                        IconComponent = <XCircle color={COLORS.error} size={20} />;
                                    } else {
                                        optionStyle = [styles.optionCard, styles.optionDisabled];
                                        textStyle = [styles.optionText, styles.optionTextDisabled];
                                    }
                                } else if (selectedOption === index) {
                                    optionStyle = [styles.optionCard, styles.optionSelected];
                                }

                                const letter = String.fromCharCode(65 + index);

                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={optionStyle}
                                        activeOpacity={0.7}
                                        onPress={() => selectOption(index)}
                                        disabled={isAnswered}
                                    >
                                        <View style={styles.optionContentLeft}>
                                            <View style={[
                                                styles.optionLetterContainer,
                                                isAnswered && option.is_correct ? styles.optionLetterContainerCorrect : null,
                                                isAnswered && index === selectedOption && !option.is_correct ? styles.optionLetterContainerWrong : null
                                            ]}>
                                                <Text style={[
                                                    styles.optionLetter,
                                                    isAnswered && option.is_correct ? styles.optionLetterCorrect : null,
                                                    isAnswered && index === selectedOption && !option.is_correct ? styles.optionLetterWrong : null
                                                ]}>{letter}</Text>
                                            </View>
                                            <Text style={textStyle}>{option.content}</Text>
                                        </View>
                                        {IconComponent && <View style={styles.optionIconRight}>{IconComponent}</View>}
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        {showExplanation && (
                            <View style={styles.explanationContainer}>
                                <View style={styles.explanationHeader}>
                                    <Info color={COLORS.primary} size={20} />
                                    <Text style={styles.explanationTitle}>Giải thích</Text>
                                </View>
                                <Text style={styles.explanationText}>
                                    {currentQuestion.explanation}
                                </Text>
                            </View>
                        )}
                    </ScrollView>

                    {isAnswered && (
                        <View style={styles.bottomContainer}>
                            <TouchableOpacity
                                style={[styles.nextButton, isSubmitting && { opacity: 0.7 }]}
                                onPress={nextQuestion}
                                activeOpacity={0.8}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <ActivityIndicator color={COLORS.white} size="small" />
                                ) : (
                                    <>
                                        <Text style={styles.nextButtonText}>
                                            {currentQuestionIndex < questions.length - 1 ? 'Câu tiếp theo' : 'Hoàn thành'}
                                        </Text>
                                        <ChevronRight color={COLORS.white} size={20} />
                                    </>
                                )}
                            </TouchableOpacity>
                        </View>
                    )}
                </>
            )}
        </SafeAreaView>
    );
};

export default TakeQuiz;