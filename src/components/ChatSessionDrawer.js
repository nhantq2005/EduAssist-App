import React from 'react';
import { COLORS } from "../styles/theme";
import { View, TouchableOpacity, Modal, Animated, ScrollView } from 'react-native';
import { Drawer, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X } from 'lucide-react-native';
import { styles } from '../styles/ChatStyle';

const customTheme = {
    colors: {
        secondaryContainer: COLORS.avatarBg,
        onSecondaryContainer: COLORS.primary,
        onSurfaceVariant: COLORS.subText,
        onSurface: COLORS.title,
    }
};

const ChatSessionDrawer = ({ isOpen, onClose, chatSessions, activeMenuItem, setActiveMenuItem, onCreate, onClick, drawerAnim }) => {
    return (
        <Modal visible={isOpen} transparent={true} animationType="none" onRequestClose={onClose}>
            <View style={styles.drawerOverlay}>
                <TouchableOpacity
                    style={styles.drawerCloseArea}
                    activeOpacity={1}
                    onPress={onClose}
                />
                <Animated.View style={[styles.drawerContent, { transform: [{ translateX: drawerAnim }] }]}>
                    <SafeAreaView edges={['top', 'bottom']} style={styles.drawerInner}>
                        <View style={styles.drawerHeader}>
                            <Text style={styles.drawerTitle}>Đoạn chat</Text>
                            <TouchableOpacity onPress={onClose}>
                                <X color={COLORS.subText} size={24} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, paddingTop: 8 }}>
                            <Drawer.Section showDivider={false}>
                                <Drawer.Item
                                    icon="plus"
                                    theme={customTheme}
                                    style={{
                                        backgroundColor: activeMenuItem === 'new_chat' ? COLORS.avatarBg : COLORS.iconBg,
                                        borderRadius: 12,
                                        marginBottom: 12,
                                        marginHorizontal: 12
                                    }}
                                    label="Cuộc hội thoại mới"
                                    active={activeMenuItem === 'new_chat'}
                                    onPress={() => {
                                        onCreate()
                                    }}
                                />
                                {chatSessions.map(session => (
                                    <Drawer.Item
                                        key={session.id}
                                        icon="history"
                                        theme={customTheme}
                                        label={session.title}
                                        active={activeMenuItem === session.id}
                                        onPress={() => {
                                            onClick(session.id)
                                        }}
                                        style={{
                                            marginHorizontal: 12,
                                            borderRadius: 12,
                                            marginBottom: 4
                                        }}
                                    />
                                ))}
                            </Drawer.Section>
                        </ScrollView>
                    </SafeAreaView>
                </Animated.View>
            </View>
        </Modal >
    );
};

export default ChatSessionDrawer;