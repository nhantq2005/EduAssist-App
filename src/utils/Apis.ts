import axios from "axios";

const BASE_URL = 'http://192.168.113.105:8080/eLibrary_war/api';

export const endpoints = {

};


export const authApis = (token: string) => {
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