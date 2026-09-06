import React, { useState, useRef, useEffect } from 'react';
import { COLORS } from "../../styles/theme";
import { View, FlatList, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity, StatusBar, Modal, Animated, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Send, Bot, Menu } from 'lucide-react-native';
import Markdown from 'react-native-markdown-display';
import * as SecureStore from 'expo-secure-store';
import Apis, { authApis, endpoints } from '../../utils/Apis';
import { markdownStyles, styles } from '../../styles/ChatStyle';
import ChatSessionDrawer from '../../components/ChatSessionDrawer';

const { width } = Dimensions.get('window');

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(false);
    const [chatSessions, setChatSessions] = useState([]);
    const [paddingBottom, setPaddingBottom] = useState(50);
    // STATE CUA DRAWER
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [activeMenuItem, setActiveMenuItem] = useState('history');
    const drawerAnim = useRef(new Animated.Value(-width * 0.75)).current;

    useEffect(() => {
        if (isDrawerOpen) {
            Animated.timing(drawerAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(drawerAnim, {
                toValue: -width * 0.75,
                duration: 250,
                useNativeDriver: true,
            }).start();
        }
    }, [isDrawerOpen]);

    const createNewChatSession = async () => {
        try {
            const token = await SecureStore.getItemAsync('access_token');
            const res = await authApis(token).post(endpoints['createChatSession'], { title: 'Đoạn chat mới' });
            setActiveMenuItem(res.data.id);
            console.log("Tạo phiên chat mới:", res.data);
            loadChatSessions();
        } catch (error) {
            console.error("Lỗi khi tạo phiên chat mới:", error);
        }
    }

    const loadChatSessions = async () => {
        try {
            const token = await SecureStore.getItemAsync('access_token');
            const res = await authApis(token).get(endpoints['getChatSessions'])
            console.log("Danh sách phiên chat:", res.data);
            setChatSessions(res.data);
        } catch (error) {
            console.error("Lỗi khi tải phiên chat:", error);
        }
    };

    const loadChatMessagesOfSession = async (sessionId) => {
        try {
            const token = await SecureStore.getItemAsync('access_token');
            const res = await authApis(token).get(endpoints['getChatMessagesOfSession'](sessionId));
            console.log(`Danh sách tin nhắn của phiên chat ${sessionId}:`, res.data);

            const formattedMessages = [];
            res.data.forEach(item => {
                formattedMessages.push({
                    id: item.id + '_user',
                    text: item.question,
                    sender: 'user',
                    timestamp: ''
                });
                formattedMessages.push({
                    id: item.id + '_bot',
                    text: item.answer,
                    sender: 'bot',
                    timestamp: ''
                });
            });
            setMessages(formattedMessages);
        } catch (error) {
            console.error(`Lỗi khi tải tin nhắn của phiên chat ${sessionId}:`, error);
        }
    };

    useEffect(() => {
        loadChatSessions();
    }, [isDrawerOpen]);

    const sendQuestion = async () => {
        if (inputText.trim() === '') return;
                                                                                                                                                                  
        let currentSessionId = activeMenuItem;
        if (currentSessionId === 'history' || !currentSessionId) {                                                                                                                                                                         
            try {
                const token = await SecureStore.getItemAsync('access_token');
                const res = await authApis(token).post(endpoints['createChatSession'], { title: 'Đoạn chat mới' });
                currentSessionId = res.data.id;
                setActiveMenuItem(currentSessionId);
                loadChatSessions();                                                                                                                                                                   
            } catch (error) {
                console.error("Lỗi khi tạo phiên chat mới:", error);
                return;                                                                                                                                                                                 
            }
        }

        const userText = inputText;
        const userMsgId = Date.now().toString();
        const botMsgId = (Date.now() + 1).toString();
                                                                                                                                                                      
        setMessages(prev => [...prev, {
            id: userMsgId,
            text: userText,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);

        setMessages(prev => [...prev, {
            id: botMsgId,
            text: '',
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);

        setInputText('');
        setLoading(true);

        const token = await SecureStore.getItemAsync('access_token');
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${Apis.defaults.baseURL}${endpoints['ragChat']}`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        if (token) {
            xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        }                                                                                                                                                                          
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 3) {
                let responseText = xhr.responseText;
                let cleanText = responseText
                    .split('data: ')
                    .map(chunk => chunk.replace(/(?:\r?\n){2}$/, ''))
                    .join('');

                setMessages(prevMessages =>
                    prevMessages.map(msg =>
                        msg.id === botMsgId
                            ? { ...msg, text: cleanText }
                            : msg
                    )
                );
            }

            if (xhr.readyState === 4) {
                setLoading(false);
            }
        };
                                                                                                                                                      
        xhr.send(JSON.stringify({
            question: userText,
            chat_session_id: currentSessionId
        }));
    };

    const renderMessage = ({ item }) => {
        const isUser = item.sender === 'user' || item.key;

        return (
            <View style={[styles.messageContainer, isUser ? styles.userMessageContainer : styles.botMessageContainer]}>
                {isUser ? (
                    <View style={[styles.messageBubble, styles.userBubble]}>
                        <Text style={[styles.messageText, styles.userMessageText]}>
                            {item.text}
                        </Text>
                        <Text style={[styles.timestamp, styles.userTimestamp]}>
                            {item.timestamp}
                        </Text>
                    </View>
                ) : (
                    <View style={styles.botContentContainer}>
                        <Markdown style={markdownStyles}>
                            {item.text}
                        </Markdown>
                        <Text style={[styles.timestamp, styles.botTimestamp]}>
                            {item.timestamp}
                        </Text>
                    </View>
                )}
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

            <ChatSessionDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                chatSessions={chatSessions}
                activeMenuItem={activeMenuItem}
                setActiveMenuItem={setActiveMenuItem}
                drawerAnim={drawerAnim}
                onCreate={() => {
                    setActiveMenuItem('new_chat');
                    setMessages([]);
                    setIsDrawerOpen(false);
                    createNewChatSession();
                }}
                onClick={(sessionId) => {
                    loadChatMessagesOfSession(sessionId);
                    setActiveMenuItem(sessionId);
                    setIsDrawerOpen(false);
                }}
            />

            <View style={styles.header}>
                <View style={styles.headerTitleContainer}>
                    <TouchableOpacity style={styles.menuButton} onPress={() => setIsDrawerOpen(true)}>
                        <Menu color="#475569" size={26} />
                    </TouchableOpacity>
                    <View style={styles.headerIconWrapper}>
                        <Bot color={COLORS.primary} size={22} />
                    </View>
                    <View>
                        <Text style={styles.headerTitle}>EduAssist</Text>
                    </View>
                </View>
            </View>

            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <FlatList
                    data={messages}
                    keyExtractor={item => item.id}
                    renderItem={renderMessage}
                    contentContainerStyle={styles.messageList}
                    showsVerticalScrollIndicator={false}
                />

                <View style={[styles.inputSection, { paddingBottom: paddingBottom }]}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Hỏi AI bất cứ điều gì..."
                            placeholderTextColor={COLORS.subText}
                            value={inputText}
                            onChangeText={setInputText}
                            multiline
                            onFocus={() => setPaddingBottom(10)}
                            onBlur={() => setPaddingBottom(50)}
                        />
                        <TouchableOpacity
                            style={[
                                styles.sendButton,
                                inputText.trim() ? styles.sendButtonActive : styles.sendButtonInactive
                            ]}
                            onPress={sendQuestion}
                            disabled={!inputText.trim() || loading}
                        >
                            <Send color={inputText.trim() ? COLORS.white : COLORS.subText} size={18} />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Chat;