import React, { useEffect, useState, useRef } from 'react';
import { COLORS } from "../../styles/theme";
import { FlatList, View, Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import CardItem from "../../components/CardItem";
import { ActivityIndicator } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { authApis, endpoints } from '../../utils/Apis';
import { ArrowLeft, Hand, MoveHorizontal } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const Flashcard = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const flashcardSetId = route.params?.flashcardSetId;
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const loadCards = async () => {
        try {
            setLoading(true);
            const token = await SecureStore.getItemAsync('access_token');
            const res = await authApis(token).get(endpoints['getFlashcard'](flashcardSetId));
            setCards(res.data);
            console.log("Flashcards loaded:", res.data);
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu flashcard:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadCards();
    }, []);

    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50
    }).current;

    return (
        <SafeAreaView style={styles.container}>
            {/* Styled Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ArrowLeft color="#333" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Flashcard</Text>
                <View style={styles.headerRightSpacer} />
            </View>

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#6200ee" />
                </View>
            ) : (
                <View style={styles.content}>
                    {/* Progress Indicator */}
                    <View>
                        <Text style={styles.progressText}>
                            Thẻ {currentIndex + 1} / {cards.length}
                        </Text>
                    </View>

                    <FlatList
                        data={cards}
                        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onViewableItemsChanged={onViewableItemsChanged}
                        viewabilityConfig={viewabilityConfig}
                        renderItem={({ item }) => (
                            <View style={styles.cardWrapper}>
                                <CardItem question={item.front} answer={item.back} />
                            </View>
                        )}
                        ListEmptyComponent={
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>Chưa có thẻ flashcard nào trong bộ này.</Text>
                            </View>
                        }
                    />

                    {/* Styled Instructions */}
                    <View style={styles.instructionContainer}>
                        <View style={styles.instructionItem}>
                            <Hand size={20} color="#6200ee" style={styles.instructionIcon} />
                            <Text style={styles.instructionText}>Chạm để lật</Text>
                        </View>
                        <View style={styles.instructionDivider} />
                        <View style={styles.instructionItem}>
                            <MoveHorizontal size={20} color="#6200ee" style={styles.instructionIcon} />
                            <Text style={styles.instructionText}>Vuốt để chuyển</Text>
                        </View>
                    </View>
                </View>
            )}
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 14,
        elevation: 3,
        shadowColor: COLORS.shadow,
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    backButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1a1a1a',
    },
    headerRightSpacer: {
        width: 40,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#888',
    },
    content: {
        flex: 1,
        alignItems: 'center',
    },
    progressText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#6200ee',
        marginBottom: 12,
    },
    progressBarBackground: {
        width: '100%',
        height: 6,
        backgroundColor: '#e0e0e0',
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#6200ee',
        borderRadius: 3,
    },
    cardWrapper: {
        width,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    instructionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 30,
        marginBottom: 30,
        marginTop: 10,
        elevation: 2,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    instructionItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    instructionIcon: {
        marginRight: 6,
    },
    instructionText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#444',
    },
    instructionDivider: {
        width: 1,
        height: 20,
        backgroundColor: '#ddd',
        marginHorizontal: 16,
    }
});

export default Flashcard;