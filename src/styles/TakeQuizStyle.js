import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#F9FAFB',
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0f172a',
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
        color: '#334155',
    },
    progressTotal: {
        color: '#94a3b8',
        fontWeight: '500',
    },
    progressBarBackground: {
        height: 8,
        backgroundColor: '#e2e8f0',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#4F46E5',
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
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 3,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    questionText: {
        fontSize: 18,
        lineHeight: 28,
        color: '#1e293b',
        fontWeight: '600',
    },
    optionsContainer: {
        gap: 12, // React Native supports gap in flex containers
    },
    optionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#e2e8f0',
        shadowColor: '#000',
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
        backgroundColor: '#f1f5f9',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    optionLetterContainerCorrect: {
        backgroundColor: '#10b981',
    },
    optionLetterContainerWrong: {
        backgroundColor: '#ef4444',
    },
    optionLetter: {
        fontWeight: '700',
        color: '#64748b',
        fontSize: 14,
    },
    optionLetterCorrect: {
        color: '#ffffff',
    },
    optionLetterWrong: {
        color: '#ffffff',
    },
    optionText: {
        fontSize: 16,
        color: '#334155',
        flex: 1,
        fontWeight: '500',
    },
    optionSelected: {
        borderColor: '#4F46E5',
        backgroundColor: '#f5f7ff',
    },
    optionCorrect: {
        borderColor: '#10b981',
        backgroundColor: '#f0fdf4',
    },
    optionTextCorrect: {
        color: '#059669',
        fontWeight: '700',
    },
    optionWrong: {
        borderColor: '#ef4444',
        backgroundColor: '#fef2f2',
    },
    optionTextWrong: {
        color: '#b91c1c',
    },
    optionDisabled: {
        opacity: 0.5,
    },
    optionTextDisabled: {
        color: '#94a3b8',
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
        backgroundColor: '#F9FAFB',
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
    },
    nextButton: {
        backgroundColor: '#4F46E5',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 16,
        shadowColor: '#4F46E5',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    nextButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
        marginRight: 8,
    },
});
