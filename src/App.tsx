// Archivo: src/App.tsx
import { useState } from 'react';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { Dashboard } from './pages/dashboard/Dashboard';
import { useAuthStore } from './store/useAuthStore';

export function App() {
  const { isAuthenticated } = useAuthStore();
  const [showRegister, setShowRegister] = useState(false);

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