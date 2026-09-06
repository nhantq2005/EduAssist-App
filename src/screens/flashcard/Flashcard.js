import React, { useEffect, useState, useRef } from 'react';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import CardItem from "../../components/CardItem";
import { ActivityIndicator } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { authApis, endpoints } from '../../utils/Apis';
import { ArrowLeft, Hand, MoveHorizontal } from 'lucide-react-native';
import { styles } from "../../styles/FlashcardStyle";

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

export default Flashcard;
