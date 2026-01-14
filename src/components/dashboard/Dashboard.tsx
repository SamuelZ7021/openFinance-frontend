// Archivo: src/components/dashboard/Dashboard.tsx
import React from 'react';
import { useUIStore } from '../../store/useUIStore';
import { AccountCard } from './AccountCard';
import { Eye, EyeOff } from 'lucide-react';

export const Dashboard = () => {
  const { isPrivacyMode, togglePrivacy } = useUIStore();

  return (
    <div className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Hola, Samuel</h1>
            <p className="text-slate-400">Resumen de tu infraestructura financiera</p>
          </div>
          <button 
            onClick={togglePrivacy}
            className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white"
          >
            {isPrivacyMode ? <EyeOff size={18} /> : <Eye size={18} />}
            Privacidad
          </button>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AccountCard accountNumber="8822334411" balance={45800.50} type="Main Assets" history={[{value: 10}, {value: 20}]} />
          {/* Agregaremos más aquí conforme conectemos la API */}
        </div>
      </div>
    </div>
  );
};