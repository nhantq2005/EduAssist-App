import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
    },
    createFlashcardButton: {
        backgroundColor: '#0284c7',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },
    createFlashcardText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: 'bold',
    }
});
