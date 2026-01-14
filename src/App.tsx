// Archivo: src/App.tsx
import { useEffect, useState } from 'react';
import { useAuthStore } from './store/useAuthStore';
import { Loader2 } from 'lucide-react';
import { Dashboard } from './components/dashboard/Dashboard';
import { RegisterForm } from './components/auth/RegisterForm';
import { LoginForm } from './components/auth/LoginForm';

export function App() {
  const { isAuthenticated, isInitializing, checkAuth } = useAuthStore();
  const [showRegister, setShowRegister] = useState(false);

  // Ejecutamos la verificación de sesión al montar la app
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Mientras se verifica la sesión, mostramos un spinner para evitar el flash del login
  if (isInitializing) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950">
        <Loader2 className="animate-spin text-blue-500" size={40} />
      </div>
    );
  }

  if (isAuthenticated) return <Dashboard />;

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">
      {showRegister ? (
        <RegisterForm onSwitchToLogin={() => setShowRegister(false)} />
      ) : (
        <LoginForm onSwitchToRegister={() => setShowRegister(true)} />
      )}
    </div>
  );
}