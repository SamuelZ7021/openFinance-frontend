// src/components/auth/LoginForm.tsx
import React, { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { Lock, Mail, Loader2, AlertCircle } from 'lucide-react';

export const LoginForm = ({ onSwitchToRegister }: { onSwitchToRegister: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isLoading, error } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await login({ email, password });
      // La redirección ocurrirá automáticamente por el cambio de estado y el Router
      // Mantener isSubmitting en true para mostrar loading mientras navega
    } catch (err) {
      setIsSubmitting(false);
      // El error ya se gestiona en el store
    }
  };

  return (
    <div className={`w-full max-w-md space-y-8 rounded-3xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-xl shadow-2xl transition-all duration-300 ${
      isSubmitting ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
    }`}>
      <div className="text-center">
        <h2 className="text-4xl font-black text-white tracking-tighter">
          OpenFinance<span className="text-blue-500">.</span>
        </h2>
        <p className="mt-2 text-slate-400 font-medium">Acceso al Sistema Central de Ledger</p>
      </div>
      
      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        {error && !isSubmitting && (
          <div className="flex items-center gap-2 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm animate-shake">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div className="group relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={20} />
            <input
              type="email" required
              disabled={isSubmitting || isLoading}
              className="w-full rounded-2xl border border-slate-700 bg-slate-800/40 py-4 pl-12 pr-4 text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all disabled:opacity-60"
              placeholder="correo@ejemplo.com"
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="group relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={20} />
            <input
              type="password" required
              disabled={isSubmitting || isLoading}
              className="w-full rounded-2xl border border-slate-700 bg-slate-800/40 py-4 pl-12 pr-4 text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all disabled:opacity-60"
              placeholder="••••••••"
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit" 
          disabled={isLoading || isSubmitting}
          className="relative flex w-full items-center justify-center overflow-hidden rounded-2xl bg-blue-600 py-4 font-bold text-white hover:bg-blue-500 active:scale-[0.98] disabled:opacity-50 transition-all"
        >
          {isLoading || isSubmitting ? (
            <>
              <Loader2 className="animate-spin" />
              <span className="ml-2">Entrando...</span>
            </>
          ) : (
            'Acceder al Panel'
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500 font-medium">
        ¿Nuevo en el Ledger?{' '}
        <button 
          onClick={onSwitchToRegister} 
          disabled={isSubmitting || isLoading}
          className="text-blue-500 hover:text-blue-400 font-bold underline-offset-4 hover:underline disabled:opacity-50 transition-colors"
        >
          Crea tu cuenta
        </button>
      </p>
    </div>
  );
};