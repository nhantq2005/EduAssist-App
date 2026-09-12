import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const BASE_URL = 'http://localhost:8000/api';
export const WS_URL = 'ws://localhost:8000/ws/notifications';

export const endpoints = {
    // AUTH
    login: '/users/login',
    register: '/users/register',
    getCurrentUser: '/users/profile',
    refresh: '/users/refresh',
    // SUBJECT
    saveSubject: '/subjects',
    getSubjects: '/subjects',
    getSubjectById: (id) => `/subjects/${id}`,
    getSubjectByLecturerId: (lecturerId) => `/users/${lecturerId}/subjects`,
    // QUIZ
    saveQuiz: '/quizzes',
    generateQuiz: '/quizzes/generate',
    getQuizzes: '/quizzes',
    getQuizById: (id) => `/quizzes/${id}`,
    updateQuiz: (id) => `/quizzes/${id}`,
    deleteQuiz: (id) => `/quizzes/${id}`,
    // DOCUMENT
    saveDocument: '/documents',
    getDocuments: '/documents',
    getDocumentById: (id) => `/documents/${id}`,
    deleteDocument: (id) => `/documents/${id}`,
    // CHAT
    ragChat: '/chat/stream',
    getChatMessagesOfSession: (sessionId) => `/chat-sessions/${sessionId}/chat-message`,
    // QUESTION
    saveQuestion: '/questions',
    updateQuestion: (id) => `/questions/${id}`,
    deleteQuestion: (id) => `/questions/${id}`,
    getQuestionById: (id) => `/questions/${id}`,
    getQuestionsByQuizId: (quizId) => `/quizzes/${quizId}/questions`,
    // CHAT_SESSION
    getChatSessions: '/chat-sessions',
    createChatSession: '/chat-sessions',
    // QUIZ_ATTEMPT
    quizAttempt: (quizId) => `/quizzes/${quizId}/submit`,
    getQuizAttempts: `/quiz-attempts/me`,
    getQuizAttemptById: (attemptId) => `/quiz-attempts/${attemptId}`,
    // FLASHCARD
    generateFlashcardSet: '/flashcard-sets/generate',
    updateFlashcardSet: (id) => `/flashcard-sets/${id}`,
    deleteFlashcardSet: (id) => `/flashcard-sets/${id}`,
    getFlashcardSets: '/flashcard-sets',
    getFlashcard: (id) => `/flashcard-sets/${id}/flashcards`,
    // STATS
    getScoreDistribution: '/stats/score-distribution',
    getAverageScore: '/stats/average-score',

};

export const authApis = (token) => {                                                                                                                                                                                              
    const instance = axios.create({
        baseURL: BASE_URL,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
                                                                                                                                                                  
    instance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
                                                                                                                                                                          
            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {                                                                                                                                             
                    const refreshToken = await SecureStore.getItemAsync('refresh_token');
                    if (!refreshToken) throw new Error("No refresh token");                                                                                                                                               
                    const refreshResponse = await axios.post(`${BASE_URL}${endpoints['refresh']}`, {
                        refresh_token: refreshToken
                    });
                    const newAccessToken = refreshResponse.data.access_token;                                                                                                                                                                             
                    await SecureStore.setItemAsync('access_token', newAccessToken);                                                                                                                                                            
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return instance(originalRequest);

                } catch (refreshError) {                                                                                                                                                                 
                    await SecureStore.deleteItemAsync('access_token');
                    await SecureStore.deleteItemAsync('refresh_token');
                    return Promise.reject(refreshError);
                }
            }
            return Promise.reject(error);
        }
    );
                                                                                                                                                              
    return instance;
};


export default axios.create({
    baseURL: BASE_URL
});