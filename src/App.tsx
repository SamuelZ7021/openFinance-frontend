// src/App.tsx
import { useEffect } from 'react';
import { useAuthStore } from './store/useAuthStore';
import apiClient from './api/axiosClient';
import { LoginForm } from './components/auth/LoginForm';
import { Dashboard } from './components/dashboard/Dashboard';
import { Router } from 'lucide-react';

function App() {
  const { accessToken, isInitializing, setAccessToken, logout } = useAuthStore();

  useEffect(() => {
    const handshake = async () => {
      try {
        // Al cargar, forzamos un refresh para recuperar la sesión
        const { data } = await apiClient.post('/auth/refresh');
        setAccessToken(data.accessToken);
      } catch (err) {
        // Si falla (ej: no hay cookie), simplemente terminamos la inicialización
        logout(); 
      }
    };
    handshake();
  }, []);

  // Pantalla de carga profesional para evitar el flicker
  if (isInitializing) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950">
        <div className="animate-pulse text-blue-500 font-bold text-xl">
          OpenFinance Engine...
        </div>
      </div>
    );
  }

  return (
    <Router>
      {!accessToken ? <PublicRoutes /> : <PrivateRoutes />}
    </Router>
  );
}

export default App;