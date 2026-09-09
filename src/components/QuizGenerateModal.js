import React, { useState, useContext, useEffect } from "react";
import { COLORS } from "../styles/theme";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform,
    TouchableWithoutFeedback, Keyboard, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MyUserContext } from "../utils/MyContexts";
import * as SecureStore from 'expo-secure-store';
import Apis, { authApis, endpoints } from "../utils/Apis";
import SelectButtonGroup from "./SelectButtonGroup";
import FormDropdown from "./FormDropdown";

const DIFFICULTY_LEVELS = [
    { label: 'Dễ', value: 'EASY' },
    { label: 'Trung bình', value: 'MEDIUM' },
    { label: 'Khó', value: 'HARD' }
];

const QuizGenerateModal = ({ visible, onClose }) => {
    const [user,] = useContext(MyUserContext);
    const isLecturer = user?.role === "LECTURER";
    const [loading, setLoading] = useState(false);
    
    const initialQuizState = {
        topic: "",
        subject_id: null,
        num_questions: 10,
        difficulty_level: "HARD",
        is_public: isLecturer ? true : false,
    };
    
    const [quiz, setQuiz] = useState(initialQuizState);
    const [subjects, setSubjects] = useState([]);

    const loadSubjects = async () => {
        try {
            const token = await SecureStore.getItemAsync('access_token');
            const res = await Apis.get(endpoints['getSubjects']);
            setSubjects(res.data);
        } catch (error) {
            console.error("Lỗi khi tải danh sách môn học:", error);
        }
    };

        const generateQuiz = async () => {
        try {
            setLoading(true);
            const token = await SecureStore.getItemAsync('access_token');
            const res = await authApis(token).post(endpoints['generateQuiz'], quiz);
            if (res.status === 202) {
                alert("Đang tạo bài trắc nghiệm. Vui lòng chờ trong giây lát...");
                onClose();
            }
        } catch (error) {
            console.error("Lỗi khi tạo bài trắc nghiệm:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSubjects();
    }, []);

    useEffect(() => {
        if (visible) {
            setQuiz({
                ...initialQuizState,
                subject_id: null
            });
        }
    }, [visible, isLecturer]);

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.modalOverlay}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={styles.keyboardView}
                    >
                        <View style={styles.modalContent}>
                            <View style={styles.header}>
                                <Text style={styles.modalTitle}>Tạo trắc nghiệm bằng AI</Text>
                                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                    <Ionicons name="close" size={24} color={COLORS.subText} />
                                </TouchableOpacity>
                            </View>

                            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                                <View style={styles.formGroup}>
                                    <Text style={styles.label}>Chủ đề <Text style={styles.required}>*</Text></Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Nhập chủ đề (VD: Vòng đời phần mềm...)"
                                        placeholderTextColor={COLORS.subText}
                                        value={quiz.topic}
                                        onChangeText={(text) => setQuiz({ ...quiz, topic: text })}
                                    />
                                </View>
                                
                                <View style={styles.formGroup}>
                                    <Text style={styles.label}>Môn học</Text>
                                    <FormDropdown
                                        placeholder="Chọn môn học"
                                        initialItems={subjects.map(sub => ({ label: sub.name, value: sub.id }))}
                                        value={quiz.subject_id}
                                        onChangeValue={(val) => setQuiz({ ...quiz, subject_id: val })}
                                        zIndex={1000}
                                    />
                                </View>

                                <View style={styles.formGroup}>
                                    <Text style={styles.label}>Số lượng câu hỏi</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Nhập số lượng (VD: 10)"
                                        placeholderTextColor={COLORS.subText}
                                        keyboardType="numeric"
                                        value={String(quiz.num_questions)}
                                        onChangeText={(text) => setQuiz({ ...quiz, num_questions: text })}
                                    />
                                </View>

                                <View style={styles.formGroup}>
                                    <Text style={styles.label}>Độ khó</Text>
                                    <SelectButtonGroup
                                        options={DIFFICULTY_LEVELS}
                                        selectedValue={quiz.difficulty_level}
                                        onSelect={(val) => setQuiz({ ...quiz, difficulty_level: val })}
                                    />
                                </View>
                            </ScrollView>
                            <View style={styles.footer}>
                                <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                                    <Text style={styles.cancelBtnText}>Hủy</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.createBtn, !quiz.topic.trim() && styles.createBtnDisabled]}
                                    onPress={generateQuiz}
                                    disabled={!quiz.topic.trim()}
                                >
                                    <Text style={styles.createBtnText}>Tạo bằng AI</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        justifyContent: 'flex-end',
    },
    keyboardView: {
        width: '100%',
    },
    modalContent: {
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        maxHeight: '90%',
        paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 24,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.iconBg,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.title,
    },
    closeButton: {
        padding: 4,
    },
    scrollContent: {
        padding: 24,
        paddingTop: 16,
        paddingBottom: 40,
    },
    formGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 15,
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: 8,
    },
    required: {
        color: COLORS.error,
    },
    input: {
        backgroundColor: '#f8fafc',
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 15,
        color: COLORS.title,
    },
    switchGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    switchLabelContainer: {
        flex: 1,
        paddingRight: 16,
    },
    helperText: {
        fontSize: 13,
        color: COLORS.subText,
        marginTop: 2,
    },
    footer: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        paddingTop: 16,
        gap: 16,
        borderTopWidth: 1,
        borderTopColor: COLORS.iconBg,
    },
    cancelBtn: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: COLORS.iconBg,
        alignItems: 'center',
    },
    cancelBtnText: {
        color: '#475569',
        fontSize: 16,
        fontWeight: '600',
    },
    createBtn: {
        flex: 2,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
    },
    createBtnDisabled: {
        backgroundColor: '#a5b4fc',
    },
    createBtnText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '600',
    },
});

export default QuizGenerateModal;