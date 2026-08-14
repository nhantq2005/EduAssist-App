import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Platform, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { ArrowLeft } from 'lucide-react-native';

const DocumentView = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [loading, setLoading] = useState(true);

    const fileUrl = route.params?.fileUrl || route.params?.file_url || route.params?.file || "https://res.cloudinary.com/mezqqdcy/image/upload/v1786035394/documents/mv4vhqarevldginalifn.pdf";
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
        backgroundColor: '#ffffff',
    },
    backButton: {
        padding: 8,
        marginRight: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0f172a',
        flex: 1,
    },
    webViewContainer: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    webview: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    hiddenWebview: {
        opacity: 0,
    },
    loaderContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    loadingText: {
        marginTop: 12,
        color: '#64748b',
        fontWeight: '500',
    }
});

export default DocumentView;