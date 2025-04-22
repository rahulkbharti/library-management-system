// services/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8001/', // Replace with your API base URL
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Ensure cookies (session data) are sent with each request
});

// GET Request function with session cookies
const getRequest = async (url, params = {}) => {
    try {
        const response = await axiosInstance.get(url, { params });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// POST Request function with session cookies
const postRequest = async (url, body) => {
    console.log(body)
    try {
        const response = await axiosInstance.post(url, body, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response;
    } catch (error) {
        console.error("POST request error:", error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : { message: "Network error", error };
    }
};


// PUT Request function with session cookies
const putRequest = async (url, body) => {
    try {
        const response = await axiosInstance.put(url, body);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// DELETE Request function with session cookies
const deleteRequest = async (url) => {
    try {
        const response = await axiosInstance.delete(url);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

export { getRequest, postRequest, putRequest, deleteRequest };
