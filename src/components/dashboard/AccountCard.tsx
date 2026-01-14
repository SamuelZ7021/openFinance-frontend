// Archivo: src/components/dashboard/AccountCard.tsx
import { useUIStore } from '../../store/useUIStore';
import { CreditCard, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { clsx } from 'clsx';

interface AccountCardProps {
  accountNumber: string;
  balance: number;
  type: string;
  trend?: number; // Porcentaje de cambio para el dashboard
  history: { value: number }[];
}

export const AccountCard = ({ accountNumber, balance, type, trend }: AccountCardProps) => {
  const { isPrivacyMode } = useUIStore();

  return (
    <div className="group bg-slate-900/40 border border-slate-800 p-6 rounded-3xl hover:border-blue-500/30 transition-all duration-500 hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.2)]">
      <div className="flex justify-between items-start mb-8">
        <div className="p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/5 rounded-2xl text-blue-400 group-hover:scale-110 transition-transform duration-500">
          <CreditCard size={22} />
        </div>
        {trend && (
          <div className={clsx(
            "flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold",
            trend > 0 ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
          )}>
            {trend > 0 ? <ArrowUpRight size={12} /> : <ArrowDownLeft size={12} />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <p className="text-slate-500 text-xs font-semibold uppercase tracking-[0.2em]">{type}</p>
        <p className="text-slate-400 font-mono text-sm">•••• {accountNumber.slice(-4)}</p>
      </div>

      <div className="mt-6 relative overflow-hidden">
        <h2 className={clsx(
          "text-3xl font-bold text-white transition-all duration-700 tracking-tight",
          isPrivacyMode ? "blur-md opacity-40 scale-95" : "blur-0 opacity-100 scale-100"
        )}>
          {}
          {isPrivacyMode 
            ? "$ ••,•••.••" 
            : `$ ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
          }
        </h2>
      </div>
    </div>
  );
};