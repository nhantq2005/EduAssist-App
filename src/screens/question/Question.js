import { COLORS } from "../../styles/theme";
// import React, { useCallback, useEffect, useState } from 'react';
// import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
// import { Text, Card, Surface, FAB } from 'react-native-paper';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { ArrowLeft, CheckCircle2, CircleX, PackageOpen, SquarePen } from 'lucide-react-native';
// import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
// import { authApis, endpoints } from '../../utils/Apis';
// import * as SecureStore from 'expo-secure-store';
// import QuestionItem from '../../components/QuestionItem';

// const Question = () => {
//     const [loading, setLoading] = useState(false);
//     const [questions, setQuestions] = useState([]);
//     const nav = useNavigation();
//     const route = useRoute();
//     const quizId = route.params?.quizId;
//     const attemptId = route.params?.attemptId;
//     const loadQuestion = async () => {
//         try {
//             setLoading(true);
//             const token = await SecureStore.getItemAsync('access_token');
//             const res = await authApis(token).get(endpoints['getQuestionsByQuizId'](quizId));
//             setQuestions(res.data);
//             console.log("Câu hỏi đã được tải:", res.data);
//         } catch (error) {
//             console.error("Lỗi khi tải câu hỏi:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const loadQuizAttempts = async () => {
//         try {
//             const token = await SecureStore.getItemAsync('access_token');
//             const res = await authApis(token).get(endpoints['getQuizAttemptById'](quizId));
//             console.log("Danh sách lần làm bài:", res.data);
//         } catch (error) {
//             console.error("Lỗi khi tải danh sách lần làm bài:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useFocusEffect(
//         useCallback(() => {
//             loadQuestion();
//         }, [])
//     );

//     useEffect(() => {
//         if (attemptId) {
//             loadQuizAttempts();
//         } else {
//             loadQuestion();
//         }
//     }, []);

//     return (
//         <SafeAreaView style={styles.container}>
//             <FlatList
//                 data={questions}
//                 keyExtractor={(item) => item.id.toString()}
//                 renderItem={({ item, index }) => (
//                     <QuestionItem
//                         item={item}
//                         index={index}
//                         onDeleteSuccess={loadQuestion}
//                     />
//                 )}
//                 contentContainerStyle={styles.listContainer}
//                 ListHeaderComponent={
//                     <View style={styles.headerContainer}>
//                         <ArrowLeft size={24} color={COLORS.title} />
//                         <Text variant="titleLarge" style={styles.title}>Danh sách câu hỏi</Text>
//                     </View>
//                 }
//                 ListEmptyComponent={
//                     <View style={styles.emptyContainer}>
//                         <PackageOpen size={48} color={COLORS.subText} />
//                         <Text style={styles.emptyText}>Không có câu hỏi nào.</Text>
//                     </View>
//                 }
//                 showsVerticalScrollIndicator={false}
//             />
//             <FAB
//                 icon="plus"
//                 color={COLORS.white}
//                 style={styles.fab}
//                 onPress={() => nav.navigate('EditQuestion', { quizId })}
//             />
//         </SafeAreaView>
//     );
// };

// export default Question;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: COLORS.iconBg,
//     },
//     listContainer: {
//         padding: 16,
//         flexGrow: 1,
//     },
//     emptyContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         paddingVertical: 40,
//     },
//     emptyText: {
//         fontSize: 16,
//         color: COLORS.subText,
//         textAlign: 'center',
//         marginTop: 12,
//     },
//     headerContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 24,
//     },
//     title: {
//         fontWeight: 'bold',
//         color: COLORS.title,
//     },
//     fab: {
//         position: 'absolute',
//         margin: 16,
//         right: 0,
//         bottom: 0,
//         backgroundColor: COLORS.primary,
//     }
// });

    import React, { useCallback, useEffect, useState } from 'react';                                                                                                            
    import { View, FlatList, StyleSheet } from 'react-native';                                                                                                                  
    import { Text, FAB } from 'react-native-paper';                                                                                                                             
    import { SafeAreaView } from 'react-native-safe-area-context';                                                                                                              
    import { ArrowLeft, PackageOpen } from 'lucide-react-native';                                                                                                               
    import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';                                                                                         
    import { authApis, endpoints } from '../../utils/Apis';                                                                                                                     
    import * as SecureStore from 'expo-secure-store';                                                                                                                           
    import QuestionItem from '../../components/QuestionItem';                                                                                                                   
                                                                                                                                                                                
    const Question = () => {                                                                                                                                                    
        const [loading, setLoading] = useState(false);                                                                                                                          
        const [questions, setQuestions] = useState([]);                                                                                                                         
                                                                                                                                                                                
        // Thêm 2 state này để quản lý giao diện xem kết quả                                                                                                                    
        const [isAttemptView, setIsAttemptView] = useState(false);                                                                                                              
        const [attemptSummary, setAttemptSummary] = useState(null);                                                                                                             
                                                                                                                                                                                
        const nav = useNavigation();                                                                                                                                            
        const route = useRoute();                                                                                                                                               
                                                                                                                                                                                
        const quizId = route.params?.quizId;                                                                                                                                    
        const attemptId = route.params?.attemptId;                                                                                                                              
                                                                                                                                                                                
        // Gộp chung logic load data vào một hàm                                                                                                                                
        const loadData = async () => {                                                                                                                                          
            try {                                                                                                                                                               
                setLoading(true);                                                                                                                                               
                const token = await SecureStore.getItemAsync('access_token');                                                                                                   
                                                                                                                                                                                
                if (attemptId) {                                                                                                                                                
                    // --- CHẾ ĐỘ XEM KẾT QUẢ BÀI LÀM ---                                                                                                                       
                    setIsAttemptView(true);                                                                                                                                     
                    const res = await authApis(token).get(endpoints['getQuizAttemptById'](attemptId));                                                                          
                                                                                                                                                                                
                    const attemptData = res.data;                                                                                                                               
                    // Lưu lại điểm số để hiển thị                                                                                                                              
                    setAttemptSummary({                                                                                                                                         
                        score: attemptData.total_score,                                                                                                                         
                        correct: attemptData.correct_count,                                                                                                                     
                        total: attemptData.total_questions,                                                                                                                     
                    });                                                                                                                                                         
                                                                                                                                                                                
                    // Trích xuất danh sách câu hỏi và thêm id lựa chọn của user                                                                                                
                    const mappedQuestions = attemptData.user_answers.map(ua => ({                                                                                               
                        ...ua.question,                                                                                                                                         
                        userSelectedOptionId: ua.option_id,                                                                                                                     
                    }));                                                                                                                                                        
                    setQuestions(mappedQuestions);                                                                                                                              
                                                                                                                                                                                
                } else if (quizId) {                                                                                                                                            
                                                                                                                          
                    setIsAttemptView(false);                                                                                                                                    
                    const res = await authApis(token).get(endpoints['getQuestionsByQuizId'](quizId));                                                                           
                    setQuestions(res.data);                                                                                                                                     
                }                                                                                                                                                               
            } catch (error) {                                                                                                                                                   
                console.error("Lỗi khi tải dữ liệu:", error);                                                                                                                   
            } finally {                                                                                                                                                         
                setLoading(false);                                                                                                                                              
            }                                                                                                                                                                   
        };                                                                                                                                                                      
                                                                                                                                                                                
        useFocusEffect(                                                                                                                                                         
            useCallback(() => {                                                                                                                                                 
                loadData();                                                                                                                                                     
            }, [attemptId, quizId])                                                                                                                                             
        );                                                                                                                                                                      
              
    return (

        <SafeAreaView style={styles.container}>
            <FlatList
                data={questions}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                    <QuestionItem
                        item={item}
                        index={index}
                        isAttemptView={!!attemptId}
                        onDeleteSuccess={loadData}
                    />
                )}
                contentContainerStyle={styles.listContainer}
                ListHeaderComponent={
                    <View style={styles.headerContainer}>
                        <ArrowLeft size={24} color={COLORS.title} onPress={() => nav.goBack()} />
                        <View style={{ marginLeft: 12 }}>
                            <Text variant="titleLarge" style={styles.title}>
                                {attemptId ? "Kết quả bài làm" : "Danh sách câu hỏi"}
                            </Text>
                            {attemptId && attemptSummary && (
                                <Text variant="bodyMedium" style={{ color: COLORS.subText }}>
                                    Đúng: {attemptSummary.correct}/{attemptSummary.total} - Điểm: {attemptSummary.score}
                                </Text>
                            )}
                        </View>
                    </View>
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <PackageOpen size={48} color={COLORS.subText} />
                        <Text style={styles.emptyText}>Không có câu hỏi nào.</Text>
                    </View>
                }
                showsVerticalScrollIndicator={false}
            />

            {/* Chỉ hiện nút thêm câu hỏi nếu KHÔNG phải chế độ xem bài làm */}
            {!isAttemptView && (
                <FAB
                    icon="plus"
                    color={COLORS.white}
                    style={styles.fab}
                    onPress={() => nav.navigate('EditQuestion', { quizId })}
                />
            )}
        </SafeAreaView>

    );
};

export default Question;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.iconBg,
    },
    listContainer: {
        padding: 16,
        flexGrow: 1,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
    },
    emptyText: {
        fontSize: 16,
        color: COLORS.subText,
        textAlign: 'center',
        marginTop: 12,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontWeight: 'bold',
        color: COLORS.title,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: COLORS.primary,
    }
});