import { COLORS } from "./theme";
import { StyleSheet } from "react-native";
import { GlobalStyles } from "./GlobalStyles";

export const styles = StyleSheet.create({
    ...GlobalStyles,
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.iconBg,
    },
    backButton: {
        padding: 8,
        marginRight: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: COLORS.text,
    },
    scrollContent: {
        ...GlobalStyles.scrollContent,
        padding: 24,
    },
    avatarSection: {
        alignItems: "center",
        marginBottom: 32,
    },
    avatarContainer: {
        ...GlobalStyles.avatarContainer,
        width: 100,
        height: 100,
        borderRadius: 50,
        position: "relative",
    },
    avatarText: {
        fontSize: 40,
        fontWeight: "bold",
        color: COLORS.primary,
    },
    avatarImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    cameraButton: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: COLORS.primary,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: COLORS.white,
    },
    formSection: {
        gap: 16,
        marginBottom: 32,
    },
    input: {
        backgroundColor: COLORS.white,
        fontSize: 15,
    },
    buttonContainer: {
        marginTop: "auto",
    },
    saveButton: {
        ...GlobalStyles.primaryButton,
        flexDirection: "row",
        paddingVertical: 14,
        justifyContent: "center",
        alignItems: "center",
    },
    saveButtonText: {
        ...GlobalStyles.primaryButtonText,
        marginLeft: 8,
        fontWeight: "600",
    },
});
