import { COLORS } from "./theme";
import { StyleSheet } from "react-native";
import { GlobalStyles } from "./GlobalStyles";

export const styles = StyleSheet.create({
    ...GlobalStyles,
    scrollContent: {
        ...GlobalStyles.scrollContent,
        justifyContent: 'center',
        padding: 24,
    },
    header: {
        marginBottom: 32,
    },
    appName: {
        ...GlobalStyles.headerTitle,
        color: COLORS.primary,
    },
    welcomeSection: {
        marginBottom: 24,
    },
    avatarSection: {
        alignItems: 'center',
        marginBottom: 24,
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: COLORS.iconBg,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.border,
        borderStyle: 'dashed',
        overflow: 'hidden',
    },
    avatarImage: {
        width: '100%',
        height: '100%',
    },
    avatarPlaceholder: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        fontSize: 12,
        color: COLORS.subText,
        marginTop: 4,
        fontWeight: '500',
    },
    welcomeTitle: {
        ...GlobalStyles.title,
        marginBottom: 8,
    },
    welcomeSubtitle: GlobalStyles.subtitle,
    button: {
        ...GlobalStyles.primaryButton,
        marginBottom: 8,
    },
    buttonText: GlobalStyles.primaryButtonText,
    loginText: GlobalStyles.linkText,
    dropdown: {
        backgroundColor: COLORS.inputBg,
        borderColor: COLORS.border,
        borderWidth: 1,
        borderRadius: 12,
        height: 52,
    },
    dropdownContainer: {
        backgroundColor: COLORS.white,
        borderColor: COLORS.border,
        borderRadius: 12,
    }
});