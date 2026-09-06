import { COLORS } from "./theme";
import { StyleSheet, Platform } from "react-native";
import { GlobalStyles } from "./GlobalStyles";

export const styles = StyleSheet.create({
    ...GlobalStyles,
    header: {
        ...GlobalStyles.rowBetween,
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: COLORS.background,
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        ...GlobalStyles.title,
        fontSize: 18,
    },
    progressContainer: {
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    progressTextContainer: {
        marginBottom: 8,
    },
    progressText: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.text,
    },
    progressTotal: {
        color: COLORS.subText,
        fontWeight: '500',
    },
    progressBarBackground: {
        height: 8,
        backgroundColor: COLORS.border,
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: COLORS.primary,
        borderRadius: 4,
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        ...GlobalStyles.scrollContent,
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    questionContainer: {
        ...GlobalStyles.card,
        padding: 20,
        borderRadius: 16,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: COLORS.iconBg,
    },
    questionText: {
        fontSize: 18,
        lineHeight: 28,
        color: COLORS.title,
        fontWeight: '600',
    },
    optionsContainer: {
        gap: 12,
    },
    optionCard: {
        ...GlobalStyles.rowBetween,
        backgroundColor: COLORS.white,
        padding: 16,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: COLORS.border,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 2,
    },
    optionContentLeft: {
        ...GlobalStyles.rowCenter,
        flex: 1,
        paddingRight: 10,
    },
    optionLetterContainer: {
        ...GlobalStyles.iconContainer,
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 12,
    },
    optionLetterContainerCorrect: {
        backgroundColor: COLORS.success,
    },
    optionLetterContainerWrong: {
        backgroundColor: COLORS.error,
    },
    optionLetter: {
        fontWeight: '700',
        color: COLORS.subText,
        fontSize: 14,
    },
    optionLetterCorrect: {
        color: COLORS.white,
    },
    optionLetterWrong: {
        color: COLORS.white,
    },
    optionText: {
        fontSize: 16,
        color: COLORS.text,
        flex: 1,
        fontWeight: '500',
    },
    optionSelected: {
        borderColor: COLORS.primary,
        backgroundColor: '#f5f7ff',
    },
    optionCorrect: {
        borderColor: COLORS.success,
        backgroundColor: COLORS.successBg,
    },
    optionTextCorrect: {
        color: '#059669',
        fontWeight: '700',
    },
    optionWrong: {
        borderColor: COLORS.error,
        backgroundColor: COLORS.errorBg,
    },
    optionTextWrong: {
        color: '#b91c1c',
    },
    optionDisabled: {
        opacity: 0.5,
    },
    optionTextDisabled: {
        color: COLORS.subText,
    },
    optionIconRight: {
        marginLeft: 8,
    },
    explanationContainer: {
        marginTop: 24,
        backgroundColor: '#eff6ff',
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#bfdbfe',
    },
    explanationHeader: {
        ...GlobalStyles.rowCenter,
        marginBottom: 12,
    },
    explanationTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1d4ed8',
        marginLeft: 8,
    },
    explanationText: {
        fontSize: 15,
        lineHeight: 24,
        color: '#1e3a8a',
    },
    bottomContainer: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: Platform.OS === 'ios' ? 0 : 16,
        backgroundColor: COLORS.background,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    nextButton: {
        ...GlobalStyles.primaryButton,
        flexDirection: 'row',
        justifyContent: 'center',
        shadowOpacity: 0.3,
    },
    nextButtonText: {
        ...GlobalStyles.primaryButtonText,
        marginRight: 8,
    },
});
