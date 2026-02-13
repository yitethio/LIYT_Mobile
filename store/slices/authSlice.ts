import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import api from '../../services/api';
import { AuthState, User } from '../../types';

// Mock API call simulation for testing UI without backend
const mockApiCall = async (userData: any, isLogin: boolean) => {
    return new Promise<{ user: User; token: string }>((resolve) => {
        setTimeout(() => {
            resolve({
                user: {
                    id: '1',
                    full_name: userData.full_name || 'John Doe',
                    email: userData.email,
                    phone: userData.phone || '+251912345678',
                    name: userData.full_name || 'John Doe',
                },
                token: 'mock-jwt-token-123',
            });
        }, 1500);
    });
};

const initialState: AuthState & { isInitialized: boolean } = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: true, // Start loading by default
    error: null,
    isInitialized: false,
};

// Async Thunks
export const fetchProfile = createAsyncThunk(
    'auth/fetchProfile',
    async (_, { rejectWithValue }) => {
        try {
            // Try common endpoint for profile
            const response = await api.get('/drivers/me');
            const data = response.data;
            // Map keys if needed (response is { id, email, full_name, ... })
            return {
                ...data,
                name: data.full_name || data.name || data.email?.split('@')[0] || 'Driver',
            };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: any, { dispatch, rejectWithValue }) => {
        try {
            const response = await api.post('/drivers/sessions', credentials);

            // Response structure based on screenshot: { access_token, refresh_token, token_type, expires_in }
            // Assuming no user object returned for login, so we might need to fetch it or decode token
            // For now, store tokens and set mock user until profile endpoint is confirmed
            const { access_token, refresh_token } = response.data;

            await SecureStore.setItemAsync('token', access_token);
            if (refresh_token) await SecureStore.setItemAsync('refresh_token', refresh_token);

            // Fetch profile immediately after login
            const profileAction = await dispatch(fetchProfile());
            let user: User = {
                id: 'unknown',
                full_name: 'Driver',
                name: 'Driver',
                email: credentials.email,
                phone: ''
            };

            if (fetchProfile.fulfilled.match(profileAction)) {
                user = profileAction.payload;
                await SecureStore.setItemAsync('user', JSON.stringify(user));
            }

            return { user, token: access_token };
        } catch (error: any) {
            const errorMsg =
                error.response?.data?.message ||
                error.response?.data?.error ||
                (typeof error.response?.data === 'string' ? error.response?.data : null) ||
                error.message ||
                'Login failed';

            console.error('Login Error:', errorMsg, error.response?.data);
            return rejectWithValue(errorMsg);
        }
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async (userData: any, { rejectWithValue }) => {
        try {
            // Map frontend fields to API expected fields
            const payload = {
                email: userData.email,
                password: userData.password,
                full_name: userData.full_name,
                phone: userData.phone,
                vehicle_type: userData.vehicle_type,
                license_number: userData.license_number
            };

            const response = await api.post('/drivers/registrations', payload);

            // Register response seems to include driver object based on screenshot 1
            const { access_token, refresh_token, driver } = response.data;

            await SecureStore.setItemAsync('token', access_token);
            if (refresh_token) await SecureStore.setItemAsync('refresh_token', refresh_token);

            const user = driver || {
                id: 'new',
                full_name: userData.full_name,
                name: userData.full_name,
                email: userData.email,
                phone: userData.phone
            };
            await SecureStore.setItemAsync('user', JSON.stringify(user));

            return { user, token: access_token };
        } catch (error: any) {
            const errorMsg =
                error.response?.data?.message ||
                error.response?.data?.error ||
                // Handle Rails validation array if present (e.g. { errors: ["Email has already been taken"] })
                (error.response?.data?.errors ? JSON.stringify(error.response?.data?.errors) : null) ||
                (typeof error.response?.data === 'string' ? error.response?.data : null) ||
                error.message ||
                'Registration failed';

            console.error('Registration Error:', errorMsg, error.response?.data);
            return rejectWithValue(errorMsg);
        }
    }
);

export const logout = createAsyncThunk('auth/logout', async () => {
    await SecureStore.deleteItemAsync('token');
    await SecureStore.deleteItemAsync('user');
});

export const loadUser = createAsyncThunk('auth/loadUser', async (_, { dispatch, rejectWithValue }) => {
    try {
        const token = await SecureStore.getItemAsync('token');
        const userStr = await SecureStore.getItemAsync('user');

        if (token) {
            // Validate token or refresh profile
            const profileAction = await dispatch(fetchProfile());
            let user = userStr ? JSON.parse(userStr) : null;

            if (fetchProfile.fulfilled.match(profileAction)) {
                user = profileAction.payload;
                await SecureStore.setItemAsync('user', JSON.stringify(user));
            }

            return { token, user };
        }
        return rejectWithValue('No user found');
    } catch (error) {
        return rejectWithValue('Failed to load user');
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Login
        builder.addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Register
        builder.addCase(register.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(register.fulfilled, (state) => {
            state.loading = false;
            state.isAuthenticated = false; // Redirect to login manually
            state.user = null;
            state.token = null;
        });
        builder.addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Logout
        builder.addCase(logout.fulfilled, (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        });

        // Load User
        builder.addCase(loadUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(loadUser.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isInitialized = true;
        });
        builder.addCase(loadUser.rejected, (state) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            state.isInitialized = true;
        });

        // Fetch Profile
        builder.addCase(fetchProfile.fulfilled, (state, action) => {
            state.user = action.payload;
        });
    },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
