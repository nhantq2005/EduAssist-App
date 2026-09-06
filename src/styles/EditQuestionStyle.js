import { COLORS } from "./theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollContent: {
        padding: 24,
        flexGrow: 1,
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
        fontSize: 24,
        fontWeight: "800",
        color: COLORS.primary,
        letterSpacing: 0.5,
    },
    formContainer: {
        backgroundColor: COLORS.white,
        borderRadius: 24,
        padding: 20,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 3,
    },
    welcomeSection: {
        marginVertical: 24,
    },
    welcomeTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.title,
        marginBottom: 8,
    },
    welcomeSubtitle: {
        fontSize: 14,
        color: COLORS.subText,
    },
    inputSection: {
        gap: 16,
    },
    input: {
        backgroundColor: COLORS.inputBg,
        fontSize: 15,
    },
    choiceRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    choiceInput: {
        flex: 1,
        marginLeft: 8,
        backgroundColor: COLORS.inputBg,
        fontSize: 15,
    },
    saveButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
        marginTop: 32,
        marginBottom: 16,
    },
    saveButtonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '700',
    }
});