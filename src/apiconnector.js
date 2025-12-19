import axios from 'axios';

export const axiosInstance = axios.create({
    withCredentials: true, // This enables sending cookies with requests
    baseURL: process.env.REACT_APP_API_URL 

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
