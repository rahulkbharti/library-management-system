import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8001/', // Base URL from environment variable
  baseURL: 'http://localhost:8001/', // Base URL from environment variable
  withCredentials: true, // Ensures cookies (session cookies) are sent with the request
  timeout: 55000, // Timeout in ms
  headers: {
    'Content-Type': 'application/json', // Ensure proper content type for requests
  },
});

// Request interceptor (you can modify the request if needed)
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add custom headers or logging here if needed
    // No need to add session cookie explicitly, it will be handled automatically
    return config;
  },
  (error) => {
    // You can log or handle errors before the request is sent
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle successful responses globally (if needed)
    return response;
  },
  (error) => {
    // Global error handling (e.g., handle unauthorized access, server errors)
    if (error.response) {
      if (error.response.status === 401) {
        // If the session has expired or the user is not authenticated
        console.error('Unauthorized access - please login again.');
        window.location.href = '/login'; // Redirect to the login page
      } else if (error.response.status === 500) {
        // Handle server errors globally
        console.error('Server error occurred. Please try again later.');
      } else {
        // Handle other HTTP errors (e.g., 400, 404, etc.)
        console.error(`Error: ${error.response.status} - ${error.response.statusText}`);
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from the server.');
    } else {
      // Something went wrong setting up the request
      console.error('Error setting up the request:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
