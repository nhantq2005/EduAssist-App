import axios from "axios";

const BASE_URL = 'http://192.168.:8000/api';

export const endpoints = {
    // AUTH
    login: '/users/login',
    register: '/users/register',
    getCurrentUser: '/users/profile',
    // SUBJECT
    saveSubject: '/subjects',
    getSubjects: '/subjects',
    getSubjectById: (id) => `/subjects/${id}`,
    // QUIZ
    saveQuiz: '/quizzes',
    generateQuiz: '/quizzes/generate',
    getQuizzes: '/quizzes',
    getQuizById: (id) => `/quizzes/${id}`,
    updateQuiz: (id) => `/quizzes/${id}`,
    // DOCUMENT
    saveDocument: '/documents',
    getDocuments: '/documents',
    getDocumentById: (id) => `/documents/${id}`,
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
    'quizAttempt': (quizId) => `/quizzes/${quizId}/submit`,
    'getQuizAttempts': `/quiz-attempts/me`
};


export const authApis = (token) => {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
};

export default axios.create({
    baseURL: BASE_URL
});