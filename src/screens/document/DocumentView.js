import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Platform, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { ArrowLeft } from 'lucide-react-native';
import { styles } from '../../styles/DocumentViewStyle';

const DocumentView = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [loading, setLoading] = useState(true);

    const fileUrl = route.params?.fileUrl;
    const documentTitle = route.params?.title || "Xem tài liệu";
    const pdfUrl = Platform.OS === 'android' 
        ? `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(fileUrl)}` 
        : fileUrl;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <ArrowLeft size={24} color="#0f172a" />
                </TouchableOpacity>
                <Text style={styles.headerTitle} numberOfLines={1}>{documentTitle}</Text>
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