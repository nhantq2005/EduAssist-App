import { useEffect, useState } from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import FlashcardItem from "../../components/FlashcardItem";
import { authApis, endpoints } from "../../utils/Apis";
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from "@react-navigation/native";

const ListFlashcard = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [loading, setLoading] = useState(true);
    const nav = useNavigation();

    const loadFlashcards = async () => {
        try {
            setLoading(true);
            const token = await SecureStore.getItemAsync('access_token');
            const res = await authApis(token).get(endpoints['getFlashcardSets']);
            setFlashcards(res.data);
            console.log("Flashcards loaded:", res.data);
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu flashcard:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadFlashcards();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Flashcard của bạn</Text>
            </View>

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#6200ee" />
                </View>
            ) : (
                <FlatList
                    data={flashcards}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => ( 
                        <FlashcardItem flashcard={item} onPress={() => {nav.navigate('Flashcard', { flashcardSetId: item.id }); console.log("Navigating to Flashcard with ID:", item.id);}} />
                    )}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>Bạn chưa có bộ flashcard nào.</Text>
                        </View>
                    }
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#f5f7fa',
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 15,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    loadingContainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    listContainer: {
        paddingBottom: 20,
        paddingTop: 8,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
    },
    emptyText: {
        fontSize: 16,
        color: '#888',
    }
});

export default ListFlashcard;