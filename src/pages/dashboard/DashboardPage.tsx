// src/pages/dashboard/DashboardPage.tsx
import { useEffect, useMemo, useState } from 'react';
import { DashboardLayout } from '../../layout/DashboardLayout';
import { AccountCard } from '../../features/dashboard/AccountCard';
import { RecentTransactions } from '../../features/dashboard/RecentTransactions';
import { AccountAnalytics } from '../../features/dashboard/AccountAnalytics';
import { CreateAccountModal } from '../../features/dashboard/CreateAccountModal';
import { TransferModal } from '../../features/dashboard/TransferModal';
import { useAccountStore } from '../../store/useAccountStore';
import { Plus, ArrowRightLeft, Lightbulb } from 'lucide-react';

// Mensajes motivacionales de finanzas
const MOTIVATIONAL_MESSAGES = [
  {
    title: '💡 Pequeños pasos, grandes resultados',
    message: 'Cada transferencia que hagas es un paso hacia tu libertad financiera. Sigue adelante.'
  },
  {
    title: '🎯 Ahorra con propósito',
    message: 'Define metas claras para tu dinero. No solo ahorres, ahorra para algo que realmente importa.'
  },
  {
    title: '📈 El mejor momento para invertir fue ayer',
    message: 'El segundo mejor momento es hoy. Comienza a organizar tu dinero ahora mismo.'
  },
  {
    title: '💰 La paciencia es clave',
    message: 'La riqueza se construye gradualmente. Mantén la disciplina y verás los resultados.'
  },
  {
    title: '🛡️ Protege tu futuro',
    message: 'Un seguimiento cuidadoso de tus finanzas es el primer paso para proteger tu futuro.'
  },
  {
    title: '🚀 Tu dinero trabaja para ti',
    message: 'Con buena organización, tu dinero puede trabajar más inteligentemente por ti.'
  }
];

const DashboardPage = () => {
  const { accounts, fetchAccounts, isLoading } = useAccountStore();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics'>('overview');
  const [dailyMessage] = useState(() => {
    const today = new Date().getDate();
    return MOTIVATIONAL_MESSAGES[today % MOTIVATIONAL_MESSAGES.length];
  });

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  // Consolidamos todas las transacciones para el Ledger Global
  const globalTransactions = useMemo(() => {
    return accounts
      .flatMap(acc => (acc.transactions || []).map(tx => ({ ...tx, accountId: acc.id })))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 8);
  }, [accounts]);

  if (isLoading && accounts.length === 0) {
    return <DashboardLoadingState />;
  }

  return (
    <DashboardLayout>
      {/* Mensaje Motivacional con animación */}
      <div className="mb-8 p-6 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-2xl animate-fade-in">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-500/20 rounded-lg flex-shrink-0">
            <Lightbulb size={24} className="text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{dailyMessage.title}</h3>
            <p className="text-slate-300 mt-2">{dailyMessage.message}</p>
          </div>
        </div>
      </div>      {/* Header con acciones */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Panel de Control</h1>
          <p className="text-slate-400 mt-2">Gestiona tus cuentas y transacciones</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setIsTransferModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-xl font-semibold transition-all"
          >
            <ArrowRightLeft size={20} />
            Transferir
          </button>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 rounded-xl font-semibold transition-all"
          >
            <Plus size={20} />
            Nueva Cuenta
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-4 border-b border-slate-800">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-3 font-semibold transition-all ${
            activeTab === 'overview'
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          Resumen
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-3 font-semibold transition-all ${
            activeTab === 'analytics'
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          Análisis
        </button>
      </div>

      {/* Contenido según tab */}
      {activeTab === 'overview' ? (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Lado Izquierdo: Cuentas */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Tus Cuentas</h2>
              <p className="text-slate-400">Gestión de liquidez en tiempo real</p>
            </div>

            {accounts.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-12 bg-slate-900/40 border border-slate-800 rounded-2xl">
                <p className="text-slate-400 mb-4">No tienes cuentas creadas aún</p>
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-all"
                >
                  <Plus size={18} />
                  Crear primera cuenta
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {accounts.map((acc) => (
                  <AccountCard
                    key={acc.id}
                    accountNumber={acc.accountNumber}
                    balance={acc.balance}
                    type="Cuenta"
                    history={[]}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Lado Derecho: Ledger Reciente */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Actividad Reciente</h2>
              <p className="text-slate-400">Últimas transacciones</p>
            </div>
            <RecentTransactions
              transactions={globalTransactions}
              currentAccountId={accounts[0]?.id || ''}
            />
          </div>
        </div>
      ) : (
        <AccountAnalytics accounts={accounts} />
      )}

      {/* Modales */}
      <CreateAccountModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      <TransferModal isOpen={isTransferModalOpen} onClose={() => setIsTransferModalOpen(false)} />
    </DashboardLayout>
  );
};

const DashboardLoadingState = () => (
  <div className="flex h-screen items-center justify-center bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 animate-fade-in">
    <div className="space-y-6 text-center">
      {/* Spinner animado */}
      <div className="flex justify-center">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-spin opacity-20" />
          <div className="absolute inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-spin opacity-50" 
               style={{ animationDirection: 'reverse', animationDuration: '2s' }} />
          <div className="absolute inset-4 bg-slate-950 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* Texto */}
      <div className="space-y-2">
        <p className="text-slate-300 font-semibold text-lg">Iniciando sesión...</p>
        <p className="text-slate-500 text-sm">Sincronizando con el Ledger Central</p>
      </div>

      {/* Puntos animados */}
      <div className="flex justify-center gap-2">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
      </div>
    </div>
  </div>
);

export default DashboardPage;