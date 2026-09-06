import { COLORS } from "./theme";
import { StyleSheet } from "react-native";
import { GlobalStyles } from "./GlobalStyles";

export const styles = StyleSheet.create({
    ...GlobalStyles,
    scrollContent: {
        ...GlobalStyles.scrollContent,
        padding: 24,
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
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    headerSaveText: {
        color: COLORS.white,
        fontWeight: '700',
        fontSize: 14,
    },
    appName: {
        ...GlobalStyles.headerTitle,
        fontSize: 24,
        color: COLORS.primary,
    },
    formContainer: {
        ...GlobalStyles.card,
        padding: 20,
        borderRadius: 24,
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 3,
    },
    welcomeSection: {
        marginVertical: 24,
    },
    welcomeTitle: {
        ...GlobalStyles.title,
        fontSize: 20,
        marginBottom: 8,
    },
    welcomeSubtitle: {
        ...GlobalStyles.subtitle,
        fontSize: 14,
    },
    inputSection: {
        gap: 16,
    },
    input: {
        ...GlobalStyles.input,
    },
    choiceRow: {
        ...GlobalStyles.rowCenter,
    },
    choiceInput: {
        ...GlobalStyles.input,
        flex: 1,
        marginLeft: 8,
    },
    saveButton: {
        ...GlobalStyles.primaryButton,
        marginTop: 32,
        marginBottom: 16,
    },
    saveButtonText: GlobalStyles.primaryButtonText
});