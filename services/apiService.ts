import axios from "axios";
import { getCookie } from "cookies-next";

// const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;
const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

const unAuthAxios = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

const authAxios = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

// authAxios.interceptors.request.use((config:any) => {
//     const tokenValue = getCookie('access');
//     if (tokenValue) {
//         config.headers.Authorization = `Bearer ${tokenValue}`;
//     }
//     return config;
// }, (error:any) => {
//     return Promise.reject(error);
// });


// request interceptors
// authAxios.interceptors.request.use(async (config) => {
//     const tokenValue = getCookie('access');
//     console.log(tokenValue);
//     if (tokenValue) {
//         config.headers.Authorization = `Bearer ${tokenValue}`;
//     }
//     return config;
// }, async (error) => {
//     return Promise.reject(error);
// });


export { authAxios, BASE_URL, unAuthAxios };
