import axios, { AxiosRequestConfig } from 'axios';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';

// Extend AxiosRequestConfig to include our custom _retry property
declare module 'axios' {
    export interface AxiosRequestConfig {
        _retry?: boolean;
    }
}

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

// Track if we're currently refreshing to prevent multiple refresh calls
let isRefreshing = false;
// Queue of requests to retry after token refresh
let failedQueue: Array<{
    resolve: (value: unknown) => void;
    reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

// Function to refresh the token
const refreshToken = async (): Promise<string | null> => {
    try {
        const refreshToken = await SecureStore.getItemAsync('refresh_token');
        if (!refreshToken) {
            return null;
        }

        const response = await axios.post(`${API_URL}/drivers/sessions/refresh`, {
            refresh_token: refreshToken,
        });

        const { access_token, refresh_token: newRefreshToken } = response.data;
        
        await SecureStore.setItemAsync('token', access_token);
        if (newRefreshToken) {
            await SecureStore.setItemAsync('refresh_token', newRefreshToken);
        }

        return access_token;
    } catch (error) {
        // Refresh failed - clear tokens and redirect to login
        await SecureStore.deleteItemAsync('token');
        await SecureStore.deleteItemAsync('refresh_token');
        await SecureStore.deleteItemAsync('user');
        
        // Redirect to login
        router.replace('/auth/login');
        
        return null;
    }
};

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

// Response interceptor to handle 401 and token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If it's a 401 error and we haven't tried to refresh yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // If already refreshing, queue this request
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return api(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const newToken = await refreshToken();
                
                if (newToken) {
                    processQueue(null, newToken);
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return api(originalRequest);
                } else {
                    processQueue(new Error('Token refresh failed'), null);
                    return Promise.reject(error);
                }
            } catch (refreshError) {
                processQueue(refreshError, null);
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;
