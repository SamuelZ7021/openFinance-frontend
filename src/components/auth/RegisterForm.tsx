// Archivo: src/components/auth/RegisterForm.tsx
import React, { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { UserPlus, Mail, Lock, Loader2 } from 'lucide-react';

export const RegisterForm = ({ onSwitchToLogin }: { onSwitchToLogin: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const { register, isLoading, error } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Envía email y password al DTO RegisterRequest
      await register(email, username, password);
      alert('Cuenta creada con éxito. Ahora puedes iniciar sesión.');
      onSwitchToLogin();
    } catch (err) {
      // El error se captura en el store
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 rounded-[2.5rem] border border-slate-800 bg-slate-900/50 p-10 backdrop-blur-xl">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white">Únete a la Red</h2>
        <p className="mt-2 text-slate-400">Crea tu cuenta de OpenFinance</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {error && <div className="text-rose-400 text-sm bg-rose-500/10 p-3 rounded-xl border border-rose-500/20">{error}</div>}

        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input
              type="email" required placeholder="Email"
              className="w-full rounded-2xl border border-slate-800 bg-slate-800/50 py-4 pl-12 pr-4 text-white outline-none focus:border-blue-500"
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
             <UserPlus className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                <input
                    type="text"
                    required
                    placeholder="Nombre de usuario"
                    className="w-full rounded-2xl border border-slate-800 bg-slate-800/50 py-4 pl-12 pr-4 text-white placeholder-slate-500 outline-none focus:border-blue-500 transition-all"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
            </div>

          <div className="relative">
            <UserPlus className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input
              type="password" required placeholder="Contraseña"
              className="w-full rounded-2xl border border-slate-800 bg-slate-800/50 py-4 pl-12 pr-4 text-white outline-none focus:border-blue-500"
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit" disabled={isLoading}
          className="w-full rounded-2xl bg-blue-600 py-4 font-bold text-white hover:bg-blue-500 transition-all disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="animate-spin mx-auto" /> : "CREAR CUENTA"}
        </button>
      </form>

      <p className="text-center text-sm text-slate-500">
        ¿Ya tienes cuenta?{' '}
        <button onClick={onSwitchToLogin} className="font-bold text-blue-500 hover:text-blue-400">
          Inicia Sesión
        </button>
      </p>
    </div>
  );
};