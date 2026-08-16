import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
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
        backgroundColor: '#4F46E5',
        borderRadius: 12,
        shadowColor: '#4F46E5',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    headerSaveText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 14,
    },
    appName: {
        fontSize: 24,
        fontWeight: "800",
        color: "#4F46E5",
        letterSpacing: 0.5,
    },
    formContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 20,
        shadowColor: '#000',
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
        color: '#111827',
        marginBottom: 8,
    },
    welcomeSubtitle: {
        fontSize: 14,
        color: '#6B7280',
    },
    inputSection: {
        gap: 16,
    },
    input: {
        backgroundColor: '#FAFAFA',
        fontSize: 15,
    },
    choiceRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    choiceInput: {
        flex: 1,
        marginLeft: 8,
        backgroundColor: '#FAFAFA',
        fontSize: 15,
    },
    saveButton: {
        backgroundColor: '#4F46E5',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        shadowColor: '#4F46E5',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
        marginTop: 32,
        marginBottom: 16,
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    }
});