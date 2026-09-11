import React, { useContext } from 'react';
import { COLORS } from "../styles/theme";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { ChevronRight, Layers, Calendar, Trash2 } from "lucide-react-native";
import { MyUserContext } from '../utils/MyContexts';
import { authApis, endpoints } from '../utils/Apis';
import * as SecureStore from 'expo-secure-store';

const FlashcardItem = ({ flashcard, onPress, onDelete }) => {
    const [user,] = useContext(MyUserContext);
 

    return (
        <TouchableOpacity style={styles.cardContainer} onPress={onPress} activeOpacity={0.8}>
            <View style={styles.cardContent}>
                <View style={styles.iconContainer}>
                    <Layers size={24} color="#6200ee" />
                </View>
                
                <View style={styles.textContainer}>
                    <Text style={styles.title} numberOfLines={1}>{flashcard.title}</Text>
                    
                    <View style={styles.dateContainer}>
                        <Calendar size={14} color="#888" style={{ marginRight: 4 }} />
                        <Text style={styles.dateText}>{new Date(flashcard.created_date).toLocaleDateString('vi-VN')}</Text>
                    </View>
                </View>
                
                <View style={styles.rightIconContainer}>
                    {flashcard.user_id === user?.id ? (
                        <TouchableOpacity 
                            style={{ marginRight: 8, padding: 4 }} 
                            onPress={onDelete} 
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <Trash2 size={20} color="#e53e3e" />
                        </TouchableOpacity>
                    ):(
                        <ChevronRight size={20} color="#ccc" />
                    )}
                    
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        marginHorizontal: 16,
        marginVertical: 10,
        elevation: 4, 
        shadowColor: COLORS.shadow, 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        flexDirection: 'row',
        overflow: 'hidden', 
    },
    cardContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#f0e6ff', 
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2d3748',
        marginBottom: 6,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateText: {
        fontSize: 13,
        color: '#718096',
    },
    rightIconContainer: {
        paddingLeft: 12,
    }
});

export default FlashcardItem;