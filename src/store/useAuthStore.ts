// Archivo: src/store/useAuthStore.ts
import { create } from 'zustand';
import apiClient from '../api/axiosClient';

interface AuthState {
  [x: string]: any;
  accessToken: string | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  isLoading: boolean;
  error: string | null;
  setAccessToken: (token: string | null) => void;
  setInitializing: (val: boolean) => void;
  logout: () => void;
  // FIX: Removido username para coincidir con el backend
  register: (email: string, password: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoading: false,
  error: null,
  accessToken: null,
  isAuthenticated: false,
  isInitializing: true,
  checkAuth: async () => {
    try {
      // Intentamos obtener un nuevo access token usando la cookie httpOnly
      const response = await apiClient.post('/auth/refresh');
      set({ 
        accessToken: response.data.accessToken, 
        isAuthenticated: true, 
        isInitializing: false 
      });
    } catch (error) {
      // Si falla (no hay cookie), limpiamos todo
      set({ accessToken: null, isAuthenticated: false, isInitializing: false });
    }
  },
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
  register: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      // Solo enviamos email y password como espera el backend
      await apiClient.post('/auth/register', { email, password });
      set({ isLoading: false });
    } catch (error: any) {
      set({ 
        isLoading: false, 
        error: error.response?.data?.message || 'Error en el registro' 
      });
      throw error;
    }
  },
}));