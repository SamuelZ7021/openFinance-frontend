import { create } from 'zustand';
import apiClient from '../api/axiosClient';


interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  isInitializing: boolean; // Nuevo: Para evitar el parpadeo del Login
  setAccessToken: (token: string | null) => void;
  setInitializing: (val: boolean) => void;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
  register: (email: string, username: string, password: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoading: false,
  error: null,
  accessToken: null,
  isAuthenticated: false,
  isInitializing: true, // Empezamos inicializando
  setAccessToken: (token) => set({ 
    accessToken: token, 
    isAuthenticated: !!token,
    isInitializing: false 
  }),
  setInitializing: (val) => set({ isInitializing: val }),
  logout: () => set({ 
    accessToken: null, 
    isAuthenticated: false,
    isInitializing: false 
  }),
  register: async (email, username, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.post('/auth/register', {
        email,
        username,
        password,
      });
      set({ isLoading: false });
    } catch (error: any) {
      set({ 
        isLoading: false, 
        error: error.response?.data?.message || 'Registration failed' 
      });
      throw error;
    }
  },
}));