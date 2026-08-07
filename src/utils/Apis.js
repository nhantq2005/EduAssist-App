import axios from "axios";

const BASE_URL = 'http://192.168.113.106:8000/api';

export const endpoints = {
    // AUTH
    login: '/users/login',
    register: '/users/register',
    // SUBJECT
    saveSubject: '/subjects',
    getSubjects: '/subjects',
    // QUIZ
    saveQuiz: '/quizzes',
    // QUESTION
    saveQuestion: '/questions',
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