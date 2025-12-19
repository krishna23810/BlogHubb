import axios from 'axios';

export const axiosInstance = axios.create({
    withCredentials: true, // This enables sending cookies with requests
    // Fallback to local API when env var is missing (helps local dev)
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api/v1'

});

export const apiConnector = (method, url, bodyData, headers, params) => {
    console.log("url",url);
    return axiosInstance({
        method: method,
        url: url,
        data: bodyData || null,
        headers: headers || null,
        params: params || null
    });
};
