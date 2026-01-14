// src/components/dashboard/AccountCard.tsx
import React from 'react';
import { useUIStore } from '../../store/useUIStore';
import { CreditCard, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { clsx } from 'clsx';
import { type AccountType } from '../../types/AccountType';
import { type Account } from '../../types/account';

interface AccountCardProps {
  account?: Account;
  accountNumber?: string;
  balance?: number;
  type?: string | AccountType;
  history?: Array<{ value: number }>;
  accountType?: AccountType;
  trend?: number;
  isPrivate?: boolean;
}

export const AccountCard: React.FC<AccountCardProps> = ({ 
  account, 
  accountNumber, 
  balance,
  type,
  accountType,
  trend,
  isPrivate
}) => {
  const { isPrivacyMode } = useUIStore();
  const effectivePrivacy = isPrivate ?? isPrivacyMode;
  
  // Usar datos de 'account' si existe, sino usar props individuales
  const finalAccountNumber = account?.accountNumber ?? accountNumber ?? '••••';
  const finalBalance = account?.balance ?? balance ?? 0;
  const finalType = accountType ?? type ?? 'Cuenta';

  const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(finalBalance);

  return (
    <div className="group bg-slate-900/40 border border-slate-800 p-6 rounded-3xl hover:border-blue-500/30 transition-all duration-500 shadow-xl">
      <div className="flex justify-between items-start mb-8">
        <div className="p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/5 rounded-2xl text-blue-400 group-hover:scale-110 transition-transform">
          <CreditCard size={22} />
        </div>
        
        {trend !== undefined && (
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
        <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
          {finalType}
        </p>
        <p className="text-slate-400 font-mono text-sm tracking-widest">
          •••• {finalAccountNumber.slice(-4)}
        </p>
      </div>

      <div className="mt-6 relative overflow-hidden">
        <h2 className={clsx(
          "text-3xl font-bold text-white transition-all duration-700",
          effectivePrivacy ? "blur-md opacity-40 scale-95" : "blur-0 opacity-100 scale-100"
        )}>
          {effectivePrivacy ? "$ ••,•••.••" : formattedBalance}
        </h2>
      </div>
    </div>
  );
};