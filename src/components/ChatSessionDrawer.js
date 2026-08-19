import React from 'react';
import { View, TouchableOpacity, Modal, Animated } from 'react-native';
import { Drawer, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X } from 'lucide-react-native';
import { styles } from '../styles/ChatStyle';

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
                    <SafeAreaView edges={['top']} style={styles.drawerInner}>
                        <View style={styles.drawerHeader}>
                            <Text style={styles.drawerTitle}>Tùy chọn</Text>
                            <TouchableOpacity onPress={onClose}>
                                <X color="#64748b" size={24} />
                            </TouchableOpacity>
                        </View>
                        <Drawer.Section>
                            <Drawer.Item
                                icon="plus"
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
                                    label={session.title}
                                    active={activeMenuItem === session.id}
                                    onPress={() => {
                                        onClick(session.id)
                                    }}
                                />
                            ))}
                        </Drawer.Section>
                    </SafeAreaView>
                </Animated.View>
            </View>
        </Modal >
    );
};

export default ChatSessionDrawer;