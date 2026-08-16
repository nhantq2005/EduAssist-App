import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Text, TextInput, RadioButton, Provider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import Apis, { authApis, endpoints } from '../../utils/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from '../../styles/EditQuestionStyle';


const EditQuestion = () => {
    const route = useRoute();
    const quizId = route?.params?.quizId;
    const questionId = route?.params?.questionId;
    const existingQuestion = route?.params?.question || null;
    const nav = useNavigation();
    const questionInfos = {
        "question": "",
        "explanation": "",
        "quiz_id": quizId,
        "options": [
            {
                id: 1,
                "content": "",
                "is_correct": false
            },
            {
                id: 2,
                "content": "",
                "is_correct": false
            },
            {
                id: 3,
                "content": "",
                "is_correct": false
            },
            {
                id: 4,
                "content": "",
                "is_correct": false
            }
        ]

    }
    const [question, setQuestion] = useState(questionInfos);

    const setQuestionChoiceText = (id, text) => {
        setQuestion({
            ...question,
            options: question.options.map(option => option.id == id ? { ...option, content: text } : option)
        });
    };

    const loadQuestionById = async () => {
        try {
            const res = await Apis.get(endpoints['getQuestionById'](questionId));
            setQuestion(res.data);
            console.log("Loaded question data:", res.data);

        } catch (error) {
            console.error("Lỗi khi tải câu hỏi:", error);
        }
    }

    const updateQuestion = async () => {
        try {
            const token = await SecureStore.getItemAsync('access_token');
            const res = await authApis(token).put(endpoints['updateQuestion'](questionId), question);
            if (res.status === 200) {
                Alert.alert("Thành công", "Câu hỏi đã được cập nhật!");
                console.log("Câu hỏi đã được cập nhật:", res.data);
                nav.goBack();
            } else {
                Alert.alert("Lỗi", "Đã xảy ra lỗi khi cập nhật câu hỏi.");
                console.error("Lỗi khi cập nhật câu hỏi:", res.data);
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật câu hỏi:", error);
            Alert.alert("Lỗi", "Không thể cập nhật câu hỏi.");
        }
    }

    const saveQuestions = async () => {
        try {
            const questionsString = await AsyncStorage.getItem(`QUIZ_${quizId}`);
            console.log("Current saved questions string:", questionsString);

            if (!questionsString) {
                Alert.alert("Thông báo", "Không có câu hỏi nào để lưu lên hệ thống.");
                return;
            }
            const questionsArray = JSON.parse(questionsString);
            const token = await SecureStore.getItemAsync('access_token');
            const res = await authApis(token).post(endpoints['saveQuestion'], questionsArray);
            if (res.status === 201 || res.status === 200) {
                Alert.alert("Thành công", "Câu hỏi đã được lưu vào cơ sở dữ liệu!");
                console.log("Đã lưu vào cơ sở dữ liệu thành công.");
                await AsyncStorage.removeItem(`QUIZ_${quizId}`);
                setQuestion(questionInfos);
                nav.goBack();
            } else {
                Alert.alert("Lỗi", "Đã xảy ra lỗi khi lưu câu hỏi vào cơ sở dữ liệu.");
                console.error("Lỗi khi lưu câu hỏi:", res.data);
            }
        } catch (error) {
            console.error("Lỗi khi lưu câu hỏi:", error);
            Alert.alert("Lỗi", "Không thể đẩy câu hỏi lên máy chủ.");
        }
    };

    const saveQuestionToAsyncStorage = async (question) => {
        try {
            const questionData = {
                ...question,
                options: question.options.map(({ id, ...rest }) => rest)
            };

            const existingQuestionsString = await AsyncStorage.getItem(`QUIZ_${quizId}`);
            let savedQuestions = [];
            if (existingQuestionsString) {
                savedQuestions = JSON.parse(existingQuestionsString);
            }
            savedQuestions.push(questionData);
            await AsyncStorage.setItem(`QUIZ_${quizId}`, JSON.stringify(savedQuestions));

            Alert.alert("Thành công", "Câu hỏi đã được lưu vào bộ nhớ máy!");
            console.log("Đã lưu vào AsyncStorage thành công. Tổng số:", savedQuestions.length);
            await AsyncStorage.getItem(`QUIZ_${quizId}`).then(data => console.log("Current saved questions:", data));
            setQuestion(questionInfos);
        } catch (error) {
            console.error("Lỗi khi lưu câu hỏi vào AsyncStorage:", error);
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi lưu câu hỏi.");
        }

    };

    useEffect(() => {
        if (questionId) {
            loadQuestionById();
        }
    }, [questionId]);

    const currentCorrectAnswerId = question.options.find(opt => opt.is_correct)?.id;

    return (
        <Provider>
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
                        <View style={styles.header}>
                            {nav && (
                                <TouchableOpacity onPress={() => nav.goBack()} style={styles.backButton}>
                                    <ChevronLeft size={24} color="#111827" />
                                </TouchableOpacity>
                            )}
                            <Text style={styles.appName}>
                                {existingQuestion ? "Chỉnh sửa câu hỏi" : "Tạo câu hỏi"}
                            </Text>
                            <TouchableOpacity onPress={() => questionId ? updateQuestion() : saveQuestions()} style={styles.headerSaveButton}>
                                <Text style={styles.headerSaveText}>Lưu</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.welcomeSection}>
                            <Text style={styles.welcomeTitle}>Nội dung câu hỏi</Text>
                        </View>

                        <View style={styles.inputSection}>
                            <TextInput
                                placeholder="Nhập câu hỏi"
                                value={question.question}
                                onChangeText={(text) => setQuestion({ ...question, question: text })}
                                multiline
                                numberOfLines={3}
                                mode="outlined"
                                outlineColor="#E5E7EB"
                                activeOutlineColor="#4F46E5"
                                theme={{ roundness: 12 }}
                                style={styles.input}
                            />

                            <TextInput
                                placeholder="Nhập lời giải thích"
                                value={question.explanation}
                                onChangeText={(text) => setQuestion({ ...question, explanation: text })}
                                multiline
                                numberOfLines={3}
                                mode="outlined"
                                outlineColor="#E5E7EB"
                                activeOutlineColor="#4F46E5"
                                theme={{ roundness: 12 }}
                                style={styles.input}
                            />
                        </View>

                        <View style={styles.welcomeSection}>
                            <Text style={styles.welcomeTitle}>Đáp án</Text>
                        </View>

                        <RadioButton.Group onValueChange={newValue => {
                            setQuestion({
                                ...question,
                                options: question.options.map(option => ({
                                    ...option,
                                    is_correct: option.id === newValue
                                }))
                            });
                        }} value={currentCorrectAnswerId}>
                            <View style={styles.inputSection}>
                                {question.options.map((choice, index) => (
                                    <View key={choice.id} style={styles.choiceRow}>
                                        <View style={{
                                            backgroundColor: currentCorrectAnswerId === choice.id ? '#19d16c' : '#E5E7EB',
                                            borderRadius: '50%',
                                            padding: 1,
                                        }}>
                                            <RadioButton value={choice.id} color="#ffff" />
                                        </View>
                                        <TextInput
                                            placeholder={`Đáp án ${index + 1}`}
                                            value={choice.content}
                                            onChangeText={(text) => setQuestionChoiceText(choice.id, text)}
                                            mode="outlined"
                                            outlineColor="#E5E7EB"
                                            activeOutlineColor="#4F46E5"
                                            theme={{ roundness: 12 }}
                                            style={styles.choiceInput}
                                        />
                                    </View>
                                ))}
                            </View>
                        </RadioButton.Group>

                        {!questionId && (
                            <TouchableOpacity style={styles.saveButton} onPress={() => saveQuestionToAsyncStorage(question)}>
                                <Text style={styles.saveButtonText}>Lưu câu hỏi</Text>
                            </TouchableOpacity>
                        )}
                    </KeyboardAvoidingView>
                </ScrollView>
            </SafeAreaView>
        </Provider>
    );
};


export default EditQuestion;