import { COLORS } from "./theme";
import { StyleSheet } from "react-native";
import { GlobalStyles } from "./GlobalStyles";

export const styles = StyleSheet.create({
    ...GlobalStyles,
    listContent: {
        ...GlobalStyles.scrollContent,
        paddingHorizontal: 20,
        paddingBottom: 80,
    },
    headerContainer: {
        paddingTop: 12,
        paddingBottom: 5,
    },
    topBar: {
        ...GlobalStyles.rowBetween,
        marginBottom: 20,
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    codeBadge: {
        backgroundColor: COLORS.avatarBg,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    codeText: {
        color: COLORS.primary,
        fontWeight: '700',
        fontSize: 14,
    },
    title: {
        ...GlobalStyles.headerTitle,
        marginBottom: 12,
        letterSpacing: -0.5,
    },
    lecturerRow: {
        ...GlobalStyles.rowCenter,
        marginBottom: 16,
    },
    avatar: {
        ...GlobalStyles.avatarContainer,
        width: 28,
        height: 28,
        borderRadius: 14,
        marginRight: 10,
    },
    lecturerName: {
        fontSize: 15,
        color: '#475569',
        fontWeight: '600',
    },
    description: {
        ...GlobalStyles.subtitle,
        lineHeight: 24,
        marginBottom: 32,
    },
    sectionHeader: {
        ...GlobalStyles.rowCenter,
        marginBottom: 16,
    },
    sectionTitle: {
        ...GlobalStyles.title,
        marginRight: 12,
    },
    documentCount: {
        backgroundColor: COLORS.iconBg,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    documentCountText: {
        color: COLORS.subText,
        fontWeight: '600',
        fontSize: 14,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40,
    },
    emptyText: {
        fontSize: 16,
        color: COLORS.subText,
        marginTop: 12,
    },
    fab: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    }
});