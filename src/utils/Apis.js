import axios from "axios";

const BASE_URL = 'http://192.168.1.177:8000/api/';

export const endpoints = {
    login: 'users/login',
    register: 'users/register',
    saveSubject: 'subjects',
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