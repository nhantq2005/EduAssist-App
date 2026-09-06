import { COLORS } from "./theme";
import { StyleSheet } from "react-native";
import { GlobalStyles } from "./GlobalStyles";

export const styles = StyleSheet.create({
    ...GlobalStyles,
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    header: {
        ...GlobalStyles.rowCenter,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.iconBg,
        backgroundColor: COLORS.white,
    },
    backButton: {
        padding: 8,
        marginRight: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.title,
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
        color: COLORS.subText,
        fontWeight: '500',
    },
    createFlashcardButton: {
        backgroundColor: '#0284c7',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },
    createFlashcardText: {
        color: COLORS.white,
        fontSize: 14,
        fontWeight: 'bold',
    }
});
