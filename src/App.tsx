// Archivo: src/App.tsx
import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; 
import { useAuthStore } from "./store/useAuthStore";
import apiClient from "./api/axiosClient";
import { LoginForm } from "./components/auth/LoginForm";
import { Dashboard } from "./components/dashboard/Dashboard";

function App() {
  const { accessToken, isInitializing, setAccessToken, logout } = useAuthStore();

  useEffect(() => {
    const handshake = async () => {
      try {
        // Asegúrate de que esta ruta coincida con tu AuthController de Java
        const { data } = await apiClient.post('/auth/refresh');
        setAccessToken(data.accessToken);
      } catch (err) {
        logout(); 
      }
    };
    handshake();
  }, [setAccessToken, logout]);

  if (isInitializing) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950">
        <div className="animate-pulse text-blue-500 font-bold text-xl font-mono">
          OpenFinance Engine...
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-200">
        {/* Renderizado condicional basado en el token */}
        {!accessToken ? <LoginForm /> : <Dashboard />}
      </div>
    </Router>
  );
}

export default App;