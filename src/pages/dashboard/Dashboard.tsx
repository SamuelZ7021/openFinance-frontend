// Archivo: src/pages/Dashboard.tsx
import { useUIStore } from '../../store/useUIStore';
import { Eye, EyeOff } from 'lucide-react';
import { AccountCard } from '../../components/dashboard/AccountCard';
import { RecentTransactions } from '../../components/dashboard/RecentTransactions';
export const Dashboard = () => {
  const { isPrivacyMode, togglePrivacy } = useUIStore();

  // Mock data - En el siguiente paso lo conectaremos a tu backend con Axios
  const mockTransactions = [
    { id: 1, description: 'Amazon Web Services', amount: '120.00', type: 'DEBIT', date: 'Today, 2:45 PM', isReversal: false },
    { id: 2, description: 'Internal Transfer', amount: '2,500.00', type: 'CREDIT', date: 'Yesterday', isReversal: false },
    { id: 3, description: 'REVERSAL: AWS Overcharge', amount: '120.00', type: 'CREDIT', date: '2 days ago', isReversal: true },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight">OpenFinance<span className="text-blue-500">.</span></h1>
            <p className="text-slate-500 mt-1 font-medium">Core Banking System v1.0</p>
          </div>
          
          <button 
            onClick={togglePrivacy}
            className="flex items-center gap-3 px-6 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 hover:text-white hover:border-slate-600 transition-all shadow-xl"
          >
            {isPrivacyMode ? <EyeOff size={20} /> : <Eye size={20} />}
            <span className="text-sm font-bold tracking-wide">
              {isPrivacyMode ? 'REVEAL BALANCES' : 'HIDE BALANCES'}
            </span>
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AccountCard accountNumber="8822334411" balance={45800.50} type="Main Assets" trend={2.4} />
          <AccountCard accountNumber="1122334455" balance={1200.00} type="Cash Reserve" trend={-0.8} />
          <AccountCard accountNumber="9900112233" balance={89430.20} type="Investment" trend={12.5} />
        </div>

        <RecentTransactions transactions={mockTransactions} />
      </div>
    </div>
  );
};