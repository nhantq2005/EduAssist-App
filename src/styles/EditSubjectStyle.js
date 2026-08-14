import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
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
        color: "#4F46E5",
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
        color: "#1e293b",
        marginBottom: 8,
    },
    subTitle: {
        fontSize: 15,
        color: "#64748b",
        marginBottom: 32,
        lineHeight: 22,
    },
    input: {
        marginBottom: 20,
        backgroundColor: "#ffffff",
    },
    textArea: {
        minHeight: 100,
    },
    saveButton: {
        backgroundColor: "#4F46E5",
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 12,
        shadowColor: "#4F46E5",
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
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
        letterSpacing: 0.5,
    }
});