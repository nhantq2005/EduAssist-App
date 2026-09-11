import React, { useEffect, useState } from 'react';
import { COLORS } from "../../styles/theme";
import { View, StyleSheet, ActivityIndicator, Platform, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { ArrowLeft } from 'lucide-react-native';
import { styles } from '../../styles/DocumentViewStyle';
import { authApis, endpoints } from '../../utils/Apis';
import * as SecureStore from 'expo-secure-store';

const DocumentView = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [loading, setLoading] = useState(true);
    const nav = useNavigation();
    const fileUrl = route.params?.fileUrl;
    const documentId = route.params?.documentId;
    const documentTitle = route.params?.title || "Xem tài liệu";
    const pdfUrl = Platform.OS === 'android' 
        ? `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(fileUrl)}` 
        : fileUrl;

    const generateFlashcardSet = async () => {
        try {
            const token = await SecureStore.getItemAsync('access_token');
            const res = await authApis(token).post(endpoints['generateFlashcardSet'], {
                document_id: documentId,
                title: `Flashcards của ${documentTitle} - ${new Date().toLocaleDateString()}`
            });
            if (res.status === 202) {
                alert("Đang tạo bộ flashcards. Vui lòng chờ trong giây lát...");
                nav.goBack();
            }

        } catch (error) {
            console.error('Lỗi khi tạo bộ flashcards:', error);
        }
    };

    useEffect(() => {
        console.log('DocumentView:', route.params.documentId);
    }, [route.params]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <ArrowLeft size={24} color={COLORS.title} />
                </TouchableOpacity>
                <Text style={styles.headerTitle} numberOfLines={1}>{documentTitle}</Text>
                <TouchableOpacity style={styles.createFlashcardButton} onPress={generateFlashcardSet}>
                    <Text style={styles.createFlashcardText}>Tạo flashcards</Text>
                </TouchableOpacity>
            </View>
            
            <View style={styles.webViewContainer}>
                {loading && (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color="#0284c7" />
                        <Text style={styles.loadingText}>Đang tải tài liệu...</Text>
                    </View>
                )}
                
                <WebView
                    source={{ uri: pdfUrl }}
                    style={[styles.webview, loading && styles.hiddenWebview]}
                    onLoadEnd={() => setLoading(false)}
                    startInLoadingState={false}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                />
            </View>
        </SafeAreaView>
    );
};

export default DocumentView;