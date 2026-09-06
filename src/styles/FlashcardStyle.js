import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "./theme";
import { GlobalStyles } from "./GlobalStyles";

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    ...GlobalStyles,
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        ...GlobalStyles.rowBetween,
        paddingHorizontal: 16,
        paddingVertical: 14,
        elevation: 3,
        shadowColor: COLORS.shadow,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        backgroundColor: COLORS.white,
    },
    backButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1a1a1a',
    },
    headerRightSpacer: {
        width: 40,
    },
    loadingContainer: {
        ...GlobalStyles.centerContent,
        flex: 1,
    },
    emptyContainer: {
        ...GlobalStyles.centerContent,
        flex: 1,
    },
    emptyText: {
        fontSize: 16,
        color: '#888',
    },
    content: {
        flex: 1,
        alignItems: 'center',
    },
    progressText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginBottom: 12,
        marginTop: 12,
    },
    progressBarBackground: {
        width: '100%',
        height: 6,
        backgroundColor: '#e0e0e0',
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: COLORS.primary,
        borderRadius: 3,
    },
    cardWrapper: {
        width,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    instructionContainer: {
        ...GlobalStyles.rowCenter,
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 30,
        marginBottom: 30,
        marginTop: 10,
        elevation: 2,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    instructionItem: {
        ...GlobalStyles.rowCenter,
    },
    instructionIcon: {
        marginRight: 6,
    },
    instructionText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#444',
    },
    instructionDivider: {
        width: 1,
        height: 20,
        backgroundColor: '#ddd',
        marginHorizontal: 16,
    }
});
