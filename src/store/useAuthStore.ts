import { create } from 'zustand';

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  isInitializing: boolean; // Nuevo: Para evitar el parpadeo del Login
  setAccessToken: (token: string | null) => void;
  setInitializing: (val: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
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
}));