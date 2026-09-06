import { StyleSheet } from 'react-native';
import { COLORS } from './theme';
import { GlobalStyles } from './GlobalStyles';

export const styles = StyleSheet.create({
    ...GlobalStyles,
    header: {
        ...GlobalStyles.rowBetween,
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.title,
    },
    centerContainer: {
        ...GlobalStyles.centerContent,
        flex: 1,
        padding: 20,
    },
    errorText: {
        fontSize: 16,
        color: COLORS.error,
    },
    content: {
        padding: 20,
    },
    scoreCard: {
        ...GlobalStyles.card,
        padding: 24,
        alignItems: 'center',
        shadowRadius: 15,
        marginBottom: 24,
    },
    scoreIcon: {
        marginBottom: 12,
    },
    scoreText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: COLORS.title,
        marginBottom: 4,
    },
    scoreLabel: {
        fontSize: 16,
        color: COLORS.subText,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    statCard: {
        ...GlobalStyles.card,
        padding: 20,
        alignItems: 'center',
        width: '48%',
        shadowRadius: 15,
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.title,
        marginTop: 12,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 14,
        color: COLORS.subText,
    },
    detailsContainer: {
        ...GlobalStyles.card,
        padding: 20,
        marginBottom: 32,
        shadowRadius: 15,
    },
    detailsTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.title,
        marginBottom: 16,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    detailTextContainer: {
        marginLeft: 12,
        flex: 1,
    },
    detailLabel: {
        fontSize: 14,
        color: COLORS.subText,
        marginBottom: 2,
    },
    detailValue: {
        fontSize: 15,
        fontWeight: '500',
        color: COLORS.title,
    },
    doneButton: {
        ...GlobalStyles.primaryButton,
        padding: 16,
    },
    doneButtonText: GlobalStyles.primaryButtonText
});
