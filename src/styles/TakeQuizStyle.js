import { COLORS } from "./theme";
import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: COLORS.background,
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.title,
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
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    questionContainer: {
        backgroundColor: COLORS.white,
        padding: 20,
        borderRadius: 16,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 3,
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
        gap: 12, // React Native supports gap in flex containers
    },
    optionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        paddingRight: 10,
    },
    optionLetterContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: COLORS.iconBg,
        justifyContent: 'center',
        alignItems: 'center',
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
        flexDirection: 'row',
        alignItems: 'center',
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
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 16,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    nextButtonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '700',
        marginRight: 8,
    },
});
