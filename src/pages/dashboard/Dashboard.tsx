// Archivo: src/pages/dashboard/Dashboard.tsx
import { useEffect, useState } from 'react';
import { useAccountStore } from '../../store/useAccountStore';
import { useUIStore } from '../../store/useUIStore';
import { AccountCard } from '../../components/dashboard/AccountCard';
import { TransferModal } from '../../components/dashboard/TransferModal';
import { Eye, EyeOff, Loader2, Plus } from 'lucide-react';

export const Dashboard = () => {
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const { isPrivacyMode, togglePrivacy } = useUIStore();
  const { accounts, fetchAccounts, isLoading, error } = useAccountStore();

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950">
        <Loader2 className="text-blue-500 animate-spin" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-8 text-white">
      {/* Botón Flotante */}
      <button 
        onClick={() => setIsTransferOpen(true)}
        className="fixed bottom-8 right-8 bg-blue-600 p-4 rounded-full shadow-2xl hover:scale-110 transition-all z-40"
      >
        <Plus size={32} />
      </button>

      <TransferModal 
        isOpen={isTransferOpen} 
        onClose={() => setIsTransferOpen(false)} 
      />

      <div className="mx-auto max-w-6xl">
        <header className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">OpenFinance<span className="text-blue-500">.</span></h1>
            <p className="text-slate-400">Panel de Control de Activos</p>
          </div>
          <button 
            onClick={togglePrivacy}
            className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-6 py-2 text-sm font-bold text-slate-300 hover:text-white transition-all"
          >
            {isPrivacyMode ? <EyeOff size={18} /> : <Eye size={18} />}
            {isPrivacyMode ? 'REVELAR' : 'OCULTAR'}
          </button>
        </header>

        {error && (
          <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/50 rounded-2xl text-rose-400 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {accounts.map((acc) => (
            <AccountCard 
              key={acc.id}
              accountNumber={acc.accountNumber}
              balance={acc.balance}
              type={acc.type}
            />
          ))}
        </div>
      </div>
    </div>
  );
};