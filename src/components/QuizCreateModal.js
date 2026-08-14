import React, { useState, useContext, useEffect } from "react";
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

const QuizCreateModal = ({ visible, onClose, nav }) => {
    const [user,] = useContext(MyUserContext);
    const isLecturer = user?.role === "LECTURER";
    const initialQuizState = {
        title: "",
        description: "",
        source_type: "TEACHER_CREATED",
        difficulty_level: "MEDIUM",
        subject_id: null,
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

    useEffect(() => {
        loadSubjects();
    }, []);

    useEffect(() => {
        if (visible) {
            setQuiz(initialQuizState);
        }
    }, [visible, isLecturer]);


    const createQuiz = async () => {
        try {
            const token = await SecureStore.getItemAsync('access_token');
            const res = await authApis(token).post(endpoints['saveQuiz'], quiz);
            if (res.status === 201) {
                alert("Tạo bài trắc nghiệm thành công!");
                onClose();
                nav.navigate('EditQuestion', { quizId: res.data.id });
            }
            onClose();
        } catch (error) {
            console.error("Lỗi khi tạo bài trắc nghiệm:", error);
        }
    };

    const updateQuiz = async () => {
        try {
            const token = await SecureStore.getItemAsync('access_token');
            const res = await authApis(token).put(endpoints['updateQuiz'](quiz.id), quiz);
            if (res.status === 200) {
                alert("Cập nhật bài trắc nghiệm thành công!");
                onClose();
                nav.navigate('EditQuestion', { quizId: res.data.id });
            }
            onClose();
        } catch (error) {
            console.error("Lỗi khi cập nhật bài trắc nghiệm:", error);
        }
    }

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
                            {/* Header */}
                            <View style={styles.header}>
                                <Text style={styles.modalTitle}>Tạo trắc nghiệm mới</Text>
                                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                    <Ionicons name="close" size={24} color="#64748b" />
                                </TouchableOpacity>
                            </View>

                            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                                {/* Form Fields */}
                                <View style={styles.formGroup}>
                                    <Text style={styles.label}>Tiêu đề <Text style={styles.required}>*</Text></Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Nhập tiêu đề trắc nghiệm"
                                        placeholderTextColor="#94a3b8"
                                        value={quiz.title}
                                        onChangeText={(text) => setQuiz({ ...quiz, title: text })}
                                    />
                                </View>

                                <View style={styles.formGroup}>
                                    <Text style={styles.label}>Mô tả</Text>
                                    <TextInput
                                        style={[styles.input, styles.textArea]}
                                        placeholder="Nhập mô tả..."
                                        placeholderTextColor="#94a3b8"
                                        value={quiz.description}
                                        onChangeText={(text) => setQuiz({ ...quiz, description: text })}
                                        multiline
                                        numberOfLines={3}
                                        textAlignVertical="top"
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
                                <View style={styles.formGroup}>
                                    <FormDropdown
                                        placeholder="Chọn môn học"
                                        initialItems={subjects.map(sub => ({ label: sub.name, value: sub.id }))}
                                        value={quiz.subject_id}
                                        onChangeValue={(val) => setQuiz({ ...quiz, subject_id: val })}
                                        zIndex={1000}
                                    />
                                </View>
                            </ScrollView>

                            {/* Footer / Actions */}
                            <View style={styles.footer}>
                                <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                                    <Text style={styles.cancelBtnText}>Hủy</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.createBtn, !quiz.title.trim() && styles.createBtnDisabled]}
                                    onPress={createQuiz}
                                    disabled={!quiz.title.trim()}
                                >
                                    <Text style={styles.createBtnText}>Tạo mới</Text>
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
        backgroundColor: '#ffffff',
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
        borderBottomColor: '#f1f5f9',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#0f172a',
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
        color: '#334155',
        marginBottom: 8,
    },
    required: {
        color: '#ef4444',
    },
    input: {
        backgroundColor: '#f8fafc',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 15,
        color: '#0f172a',
    },
    textArea: {
        minHeight: 80,
    },
    buttonGroup: {
        flexDirection: 'row',
        gap: 10,
    },
    groupButtonSelected: {
        backgroundColor: '#eff6ff',
        borderColor: '#3b82f6',
    },
    footer: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        paddingTop: 16,
        gap: 16,
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
    },
    cancelBtn: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: '#f1f5f9',
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
        backgroundColor: '#4f46e5',
        alignItems: 'center',
    },
    createBtnDisabled: {
        backgroundColor: '#a5b4fc',
    },
    createBtnText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default QuizCreateModal;