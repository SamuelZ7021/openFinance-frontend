// Archivo: src/components/auth/LoginForm.tsx
import React, { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import apiClient from '../../api/axiosClient';
import { Lock, Mail, Loader2 } from 'lucide-react';

export const LoginForm = ({ onSwitchToRegister }: { onSwitchToRegister: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await apiClient.post('/auth/login', { email, password });
      setAccessToken(data.accessToken);
    } catch (error) {
      alert('Error al iniciar sesión. Verifica tus credenciales.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 rounded-3xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-xl">
      <div className="text-center">
        <h2 className="text-3xl font-black text-white">OpenFinance<span className="text-blue-500">.</span></h2>
        <p className="mt-2 text-slate-400">Ingresa a tu cuenta corporativa</p>
      </div>
      
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-slate-500" size={20} />
            <input
              type="email" required
              className="w-full rounded-xl border border-slate-700 bg-slate-800/50 py-3 pl-10 pr-4 text-white placeholder-slate-500 outline-none focus:border-blue-500 transition-colors"
              placeholder="correo@ejemplo.com"
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-slate-500" size={20} />
            <input
              type="password" required
              className="w-full rounded-xl border border-slate-700 bg-slate-800/50 py-3 pl-10 pr-4 text-white placeholder-slate-500 outline-none focus:border-blue-500 transition-colors"
              placeholder="••••••••"
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit" disabled={isLoading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-bold text-white hover:bg-blue-500 disabled:opacity-50 transition-all"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : 'Iniciar Sesión'}
        </button>
      </form>

      {/* NUEVO: Enlace para cambiar al formulario de Registro */}
      <p className="mt-6 text-center text-sm text-slate-500">
        ¿No tienes cuenta?{' '}
        <button 
          onClick={onSwitchToRegister}
          className="font-bold text-blue-500 hover:text-blue-400 transition-colors"
        >
          Regístrate aquí
        </button>
      </p>
    </div>
  );
};