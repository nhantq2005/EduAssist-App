import { COLORS } from "./theme";
import { Dimensions, StyleSheet, Platform } from "react-native";

const { width } = Dimensions.get('window');
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    drawerOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        flexDirection: 'row',
    },
    drawerCloseArea: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    drawerContent: {
        width: width * 0.75,
        backgroundColor: COLORS.white,
        height: '100%',
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 10,
    },
    drawerInner: {
        flex: 1,
    },
    drawerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.iconBg,
    },
    drawerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.title,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.iconBg,
    },
    headerTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuButton: {
        marginRight: 16,
        padding: 4,
    },
    headerIconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.avatarBg,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: COLORS.title,
    },
    keyboardView: {
        flex: 1,
    },
    messageList: {
        padding: 20,
        paddingBottom: 40,
    },
    messageContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'flex-end',
    },
    userMessageContainer: {
        justifyContent: 'flex-end',
    },
    botMessageContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    botContentContainer: {
        flex: 1,
    },
    botAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: COLORS.avatarBg,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        borderWidth: 2,
        borderColor: COLORS.white,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    messageBubble: {
        maxWidth: '80%',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 24,
    },
    userBubble: {
        backgroundColor: COLORS.primary,
        borderBottomRightRadius: 4,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    messageText: {
        fontSize: 15,
        lineHeight: 22,
    },
    userMessageText: {
        color: COLORS.white,
    },
    timestamp: {
        fontSize: 11,
        marginTop: 6,
        alignSelf: 'flex-end',
        fontWeight: '500',
    },
    userTimestamp: {
        color: 'rgba(255,255,255,0.7)',
    },
    botTimestamp: {
        color: COLORS.subText,
    },
    inputSection: {
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: COLORS.iconBg,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        backgroundColor: COLORS.background,
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    input: {
        flex: 1,
        maxHeight: 120,
        minHeight: 40,
        fontSize: 15,
        color: COLORS.title,
        paddingTop: 10,
        marginRight: 12,
    },
    sendButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: -2,
    },
    sendButtonActive: {
        backgroundColor: COLORS.primary,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    sendButtonInactive: {
        backgroundColor: COLORS.iconBg,
    },
});

export const markdownStyles = {
    body: {
        fontSize: 15,
        lineHeight: 22,
        color: COLORS.text,
    },
    heading1: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.title,
        marginTop: 16,
        marginBottom: 8,
    },
    heading2: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.title,
        marginTop: 14,
        marginBottom: 6,
    },
    heading3: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.title,
        marginTop: 12,
        marginBottom: 6,
    },
    code_inline: {
        backgroundColor: COLORS.iconBg,
        padding: 4,
        borderRadius: 4,
        fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    },
    code_block: {
        backgroundColor: COLORS.title,
        color: COLORS.background,
        padding: 10,
        borderRadius: 8,
        fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
        marginVertical: 8,
    },
    fence: {
        backgroundColor: COLORS.title,
        color: COLORS.background,
        padding: 10,
        borderRadius: 8,
        fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
        marginVertical: 8,
    },
    paragraph: {
        marginTop: 0,
        marginBottom: 8,
    },
    list_item: {
        marginBottom: 4,
    }
};
