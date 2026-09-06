import { COLORS } from "./theme";
import { StyleSheet } from "react-native";
import { GlobalStyles } from "./GlobalStyles";

export const styles = StyleSheet.create({
    ...GlobalStyles,
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
        ...GlobalStyles.headerTitle,
        marginBottom: 8,
    },
    subTitle: {
        ...GlobalStyles.subtitle,
        marginBottom: 32,
        lineHeight: 22,
    },
    input: {
        ...GlobalStyles.input,
        marginBottom: 20,
        backgroundColor: COLORS.white,
    },
    textArea: {
        minHeight: 100,
    },
    saveButton: {
        ...GlobalStyles.primaryButton,
        justifyContent: "center",
        marginTop: 12,
        marginHorizontal: 24,
    },
    saveButtonText: {
        ...GlobalStyles.primaryButtonText,
        letterSpacing: 0.5,
    }
});