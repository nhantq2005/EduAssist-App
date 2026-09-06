import React, { useState } from 'react';
import { COLORS } from "../../styles/theme";
import { View, StyleSheet, TouchableOpacity, Alert, Platform, ScrollView, Keyboard } from 'react-native';
import { Text, TextInput, Button, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import { FileUp, File as FileIcon, X, ArrowLeft } from 'lucide-react-native';
import * as SecureStore from 'expo-secure-store';

import { endpoints, authApis } from '../../utils/Apis';

const EditDocument = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const subjectId = route.params?.subjectId || 1;

    const [document, setDocument] = useState({
        title: "",
        subject_id: subjectId,
        file: null
    });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (field, value) => {
        setDocument((prev) => ({ ...prev, [field]: value }));
    };

    const pickDocument = async () => {
        Keyboard.dismiss();
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: [
                    'application/pdf',
                    'application/msword',
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    'application/vnd.ms-powerpoint',
                    'application/vnd.openxmlformats-officedocument.presentationml.presentation'
                ],
                copyToCacheDirectory: true,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const pickedFile = result.assets[0];
                setDocument(prev => ({ ...prev, file: pickedFile }));
            }
        } catch (err) {
            console.error("Lỗi khi chọn file:", err);
            Alert.alert("Lỗi", "Không thể chọn file, vui lòng thử lại.");
        }
    };

    const removeFile = () => {
        setDocument(prev => ({ ...prev, file: null }));
    };

    const validate = () => {
        if (!(document.title || "").trim()) {
            Alert.alert("Lỗi", "Vui lòng nhập tên tài liệu.");
            return false;
        }
        if (!(document.subject_id || "").toString().trim()) {
            Alert.alert("Lỗi", "Vui lòng nhập ID môn học.");
            return false;
        }
        if (!document.file) {
            Alert.alert("Lỗi", "Vui lòng chọn file tài liệu để upload.");
            return false;
        }
        return true;
    };

    const saveDocument = async () => {
        Keyboard.dismiss();
        if (!validate()) return;

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("title", document.title);
            formData.append("subject_id", document.subject_id);

            const fileUri = Platform.OS === 'ios' ? document.file.uri.replace('file://', '') : document.file.uri;

            formData.append("file", {
                uri: fileUri,
                name: document.file.name,
                type: document.file.mimeType || 'application/octet-stream'
            });

            const token = await SecureStore.getItemAsync('access_token');
            const api = authApis(token);

            const res = await api.post(endpoints['saveDocument'], formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (res.status === 201) {
                Alert.alert("Thành công", "Tài liệu đã được tải lên!");
                navigation.goBack();
            } else {
                Alert.alert("Lỗi", "Lưu tài liệu thất bại. Vui lòng thử lại.");
            }
        } catch (error) {
            console.error("Lỗi khi lưu tài liệu:", error);
            Alert.alert("Lỗi", "Đã xảy ra sự cố. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={[styles.container, styles.content]}>
            <View>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <ArrowLeft size={24} color={COLORS.title} />
                    </TouchableOpacity>
                    <Text variant="headlineSmall" style={styles.headerTitle}>Thêm Tài Liệu Mới</Text>
                </View>


                <TextInput
                    label="Tên tài liệu (Ví dụ: Slide chương 1)"
                    value={document.title}
                    onChangeText={(text) => handleInputChange("title", text)}
                    style={styles.input}
                    mode="outlined"
                    outlineColor="#cbd5e1"
                    activeOutlineColor="#0284c7"
                />

                <Text style={styles.sectionTitle}>File đính kèm</Text>

                {document.file ? (
                    <Surface style={styles.fileCard} elevation={1}>
                        <View style={styles.fileInfo}>
                            <FileIcon size={24} color="#0284c7" />
                            <View style={styles.fileTextContainer}>
                                <Text style={styles.fileName} numberOfLines={1}>{document.file.name}</Text>
                                {document.file.size && (
                                    <Text style={styles.fileSize}>{(document.file.size / 1024 / 1024).toFixed(2)} MB</Text>
                                )}
                            </View>
                        </View>
                        <TouchableOpacity onPress={removeFile} style={styles.removeBtn}>
                            <X size={20} color={COLORS.error} />
                        </TouchableOpacity>
                    </Surface>
                ) : (
                    <TouchableOpacity style={styles.uploadArea} onPress={pickDocument}>
                        <FileUp size={32} color={COLORS.subText} />
                        <Text style={styles.uploadText}>Nhấn để chọn file tài liệu</Text>
                        <Text style={styles.uploadSubText}>(PDF, DOC, DOCX, PPT, PPTX)</Text>
                    </TouchableOpacity>
                )}
            </View>

            <Button
                mode="contained"
                onPress={saveDocument}
                loading={loading}
                disabled={loading}
                style={styles.saveButton}
                contentStyle={{ paddingVertical: 6 }}
            >
                {loading ? "Đang tải lên..." : "Lưu Tài Liệu"}
            </Button>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    content: {
        padding: 20,
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    backButton: {
        marginRight: 12,
        padding: 4,
    },
    headerTitle: {
        fontWeight: 'bold',
        color: COLORS.title,
    },
    input: {
        marginBottom: 16,
        backgroundColor: COLORS.white
    },
    sectionTitle: {
        fontWeight: '600',
        color: COLORS.text,
        marginTop: 8,
        marginBottom: 12,
        fontSize: 16,
    },
    uploadArea: {
        borderWidth: 2,
        borderColor: '#cbd5e1',
        borderStyle: 'dashed',
        borderRadius: 12,
        padding: 32,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.iconBg,
        marginBottom: 24,
    },
    uploadText: {
        marginTop: 12,
        color: '#475569',
        fontWeight: '600',
    },
    uploadSubText: {
        marginTop: 4,
        color: COLORS.subText,
        fontSize: 12,
    },
    fileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: COLORS.white,
        borderRadius: 12,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    fileInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    fileTextContainer: {
        marginLeft: 12,
        flex: 1,
    },
    fileName: {
        fontWeight: '600',
        color: COLORS.title,
        fontSize: 14,
    },
    fileSize: {
        color: COLORS.subText,
        fontSize: 12,
        marginTop: 2,
    },
    removeBtn: {
        padding: 8,
    },
    saveButton: {
        marginTop: 8,
        borderRadius: 8,
        backgroundColor: '#0284c7',
    }
});

export default EditDocument;