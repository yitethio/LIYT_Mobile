import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Use HTTP to bypass SSL certificate issues in Expo Go (if supported by server)
const API_URL = process.env.EXPO_PUBLIC_BASE_URL || 'http://liyt-api-qoekcr-b740ac-20-164-1-107.traefik.me';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

console.log('API Base URL:', API_URL);

// Request interceptor to add token
api.interceptors.request.use(
    async (config) => {
        const token = await SecureStore.getItemAsync('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle 401 (optional)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access (e.g., clear token)
            await SecureStore.deleteItemAsync('token');
        }
        return Promise.reject(error);
    }
);

export default api;
