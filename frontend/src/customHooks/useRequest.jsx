import { useState } from 'react';
import axiosInstance from '../axios/AxiosInstance';

const useRequest = (url, method = 'GET', options = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = async (body = null) => {
        setLoading(true);
        setError(null);
        try {
            let response;
            // Perform the request based on the HTTP method
            if (method === 'GET') {
                response = await axiosInstance.get(url, { ...options });
            } else if (method === 'POST') {
                response = await axiosInstance.post(url, body, { ...options });
            } else if (method === 'PUT') {
                response = await axiosInstance.put(url, body, { ...options });
            } else if (method === 'DELETE') {
                response = await axiosInstance.delete(url, { data: body, ...options });
            }
            setData(response.data);
        } catch (err) {
            setError(err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    };

    return { sendRequest, data, loading, error };
};

export default useRequest;
