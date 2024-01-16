// package axios
// 1. instantiated create
// 2. request interceptor
// 3. response interceptor

import axios from "axios";
import {getToken, removeToken} from "./token";

const http = axios.create({
    // baseURL: 'http://3.26.47.174:3001',
    // timeout: 5000
    baseURL: '/',
    timeout: 50000
})

// 2
http.interceptors.request.use((config)=> {
    const token = getToken()
    console.log(token)
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (error)=> {
    console.log('request', error)
    return Promise.reject(error)
})

// 3
http.interceptors.response.use((response) => {
    return response
}, (error) => {
    // if (error.response.status === 401) {
    //     // 删除token
    //     removeToken()
    //     // 跳转到登录页
    //     // history.push('/account/login')
    // }
    return Promise.reject(error)
})

export {http}