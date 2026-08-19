import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
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
        color: "#4F46E5",
        letterSpacing: 0.5,
    },
    welcomeSection: {
        marginBottom: 24,
    },
    welcomeTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 8,
    },
    welcomeSubtitle: {
        fontSize: 15,
        color: '#6B7280',
    },
    inputSection: {
        gap: 16,
        marginBottom: 24,
    },
    input: {
        backgroundColor: '#FAFAFA',
        fontSize: 15,
    },
    button: {
        backgroundColor: '#4F46E5',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#4F46E5',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
        marginBottom: 8,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 24,
    },
    footerText: {
        color: "#6B7280",
        fontSize: 15,
    },
    loginText: {
        color: "#4F46E5",
        fontSize: 15,
        fontWeight: "700",
    },
    dropdown: {
        backgroundColor: '#FAFAFA',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        borderRadius: 12,
        height: 52,
    },
    dropdownContainer: {
        backgroundColor: '#FFFFFF',
        borderColor: '#E5E7EB',
        borderRadius: 12,
    }
});