import { COLORS } from "./theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 24,
    },
    header: {
        marginBottom: 32,
    },
    appName: {
        fontSize: 28,
        fontWeight: "800",
        color: COLORS.primary,
        letterSpacing: 0.5,
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
        fontSize: 24,
        fontWeight: '700',
        color: COLORS.title,
        marginBottom: 8,
    },
    welcomeSubtitle: {
        fontSize: 15,
        color: COLORS.subText,
    },
    inputSection: {
        gap: 16,
        marginBottom: 24,
    },
    input: {
        backgroundColor: COLORS.inputBg,
        fontSize: 15,
    },
    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
        marginBottom: 8,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '700',
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 24,
    },
    footerText: {
        color: COLORS.subText,
        fontSize: 15,
    },
    loginText: {
        color: COLORS.primary,
        fontSize: 15,
        fontWeight: "700",
    },
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