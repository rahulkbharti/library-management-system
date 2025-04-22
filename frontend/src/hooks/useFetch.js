import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const useFetch = (url, method = 'GET', params = null, body = null) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Memoize params and body to prevent unnecessary re-renders
    const memoizedParams = useMemo(() => params, [JSON.stringify(params)]);
    const memoizedBody = useMemo(() => body, [JSON.stringify(body)]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let response;

                switch (method.toUpperCase()) {
                    case 'GET':
                        response = await axios.get(url, { params: memoizedParams });
                        break;
                    case 'POST':
                        response = await axios.post(url, memoizedBody);
                        break;
                    case 'PUT':
                        response = await axios.put(url, memoizedBody);
                        break;
                    case 'DELETE':
                        response = await axios.delete(url);
                        break;
                    default:
                        response = await axios.get(url, { params: memoizedParams });
                }

                setData(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, method, memoizedParams, memoizedBody]); // Only re-run when relevant changes

    return { data, error, loading };
};

export default useFetch;
