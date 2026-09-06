import { COLORS } from "./theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    backButton: {
        padding: 16,
        paddingHorizontal: 24,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
    },
    backIcon: {
        marginRight: 8,
    },
    backButtonText: {
        color: COLORS.primary,
        fontSize: 16,
        fontWeight: "600",
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 32,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: "bold",
        color: COLORS.title,
        marginBottom: 8,
    },
    subTitle: {
        fontSize: 15,
        color: COLORS.subText,
        marginBottom: 32,
        lineHeight: 22,
    },
    input: {
        marginBottom: 20,
        backgroundColor: COLORS.white,
    },
    textArea: {
        minHeight: 100,
    },
    saveButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 12,
        shadowColor: COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
        marginHorizontal: 24,
    },
    saveButtonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: "bold",
        letterSpacing: 0.5,
    }
});