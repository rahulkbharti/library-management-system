import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8001/', // Replace with your actual base URL
  withCredentials: true,
  timeout: 55000,
  headers: {
   // 'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
});

export default axiosInstance;