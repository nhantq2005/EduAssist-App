import { COLORS } from "./theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
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
        padding: 24,
    },
    avatarSection: {
        alignItems: "center",
        marginBottom: 32,
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: COLORS.avatarBg,
        justifyContent: "center",
        alignItems: "center",
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
        backgroundColor: COLORS.primary,
        flexDirection: "row",
        paddingVertical: 14,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    saveButtonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: "600",
        marginLeft: 8,
    },
});
