import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Text, TextInput, RadioButton, Provider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { authApis, endpoints } from '../../utils/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const SAVED_QUESTIONS_KEY = 'saved_questions';

const EditQuestion = ({route }) => {
    const quizId = route?.params?.quizId || 1; 
    const existingQuestion = route?.params?.question || null;
    const nav = useNavigation();
    const questionInfos = {
        "question": "",
        "explanation": "",
        "quiz_id":quizId,
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

    const saveQuestions = async () => {                                                                                                                                                                                      
            try {                                                                                                                                                                                                       
                const questionsString = await AsyncStorage.getItem(SAVED_QUESTIONS_KEY);                                                                                                                                     
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
                    await AsyncStorage.removeItem(SAVED_QUESTIONS_KEY);                                                                                                                                                             
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

            const existingQuestionsString = await AsyncStorage.getItem(SAVED_QUESTIONS_KEY);
            let savedQuestions = [];
            if (existingQuestionsString) {
                savedQuestions = JSON.parse(existingQuestionsString);
            }
            savedQuestions.push(questionData);
            await AsyncStorage.setItem(SAVED_QUESTIONS_KEY, JSON.stringify(savedQuestions));

            Alert.alert("Thành công", "Câu hỏi đã được lưu vào bộ nhớ máy!");
            console.log("Đã lưu vào AsyncStorage thành công. Tổng số:", savedQuestions.length);
            await AsyncStorage.getItem(SAVED_QUESTIONS_KEY).then(data => console.log("Current saved questions:", data));
            setQuestion(questionInfos); 
        } catch (error) {
            console.error("Lỗi khi lưu câu hỏi vào AsyncStorage:", error);
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi lưu câu hỏi.");
        }

    };

    const currentCorrectAnswerId = question.options.find(opt => opt.is_correct)?.id;

    return (
        <Provider>
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
                    <View style={styles.header}>
                        {navigation && (
                            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                                <ChevronLeft size={24} color="#111827" />
                            </TouchableOpacity>
                        )}
                        <Text style={styles.appName}>
                            {existingQuestion ? "Chỉnh sửa câu hỏi" : "Tạo câu hỏi"}
                        </Text>
                        <TouchableOpacity onPress={() => saveQuestions()} style={styles.headerSaveButton}>
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

                    <TouchableOpacity style={styles.saveButton} onPress={() => saveQuestionToAsyncStorage(question)}>
                        <Text style={styles.saveButtonText}>Lưu câu hỏi</Text>
                    </TouchableOpacity>
                    </KeyboardAvoidingView>
                </ScrollView>
            </SafeAreaView>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    scrollContent: {
        padding: 24,
        flexGrow: 1,
        justifyContent: "center",
    },
    header: {
        flexDirection: 'row',
        alignItems: "center",
        marginBottom: 32,
        position: 'relative',
        justifyContent: 'center',
    },
    backButton: {
        position: 'absolute',
        left: 0,
        zIndex: 1,
        padding: 8,
    },
    headerSaveButton: {
        position: 'absolute',
        right: 0,
        zIndex: 1,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#4F46E5',
        borderRadius: 12,
        shadowColor: '#4F46E5',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    headerSaveText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 14,
    },
    appName: {
        fontSize: 24,
        fontWeight: "800",
        color: "#4F46E5",
        letterSpacing: 0.5,
    },
    formContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 3,
    },
    welcomeSection: {
        marginVertical: 24,
    },
    welcomeTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 8,
    },
    welcomeSubtitle: {
        fontSize: 14,
        color: '#6B7280',
    },
    inputSection: {
        gap: 16,
    },
    input: {
        backgroundColor: '#FAFAFA',
        fontSize: 15,
    },
    choiceRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    choiceInput: {
        flex: 1,
        marginLeft: 8,
        backgroundColor: '#FAFAFA',
        fontSize: 15,
    },
    saveButton: {
        backgroundColor: '#4F46E5',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        shadowColor: '#4F46E5',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
        marginTop: 32,
        marginBottom: 16,
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    }
});

export default EditQuestion;