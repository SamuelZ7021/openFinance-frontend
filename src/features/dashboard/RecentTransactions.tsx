// src/components/dashboard/RecentTransactions.tsx
import React from 'react';
import { useUIStore } from '../../store/useUIStore';
import { ArrowUpRight, ArrowDownLeft, RefreshCcw } from 'lucide-react';
import { clsx } from 'clsx';
import { type Transaction } from '../../types/Transaction';

interface Props {
  transactions: Transaction[];
  currentAccountId: string;
}

export const RecentTransactions: React.FC<Props> = ({ transactions, currentAccountId }) => {
  const { isPrivacyMode } = useUIStore();

  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">Actividad Reciente</h3>
        <button className="text-blue-500 text-sm font-medium hover:text-blue-400 transition">Ver Todo</button>
      </div>

      <div className="space-y-4">
        {transactions.length === 0 ? (
          <p className="text-slate-500 text-center py-4">No hay movimientos recientes.</p>
        ) : (
          transactions.map((tx) => {
            // Extraemos la línea que pertenece a nuestra cuenta para saber el monto y tipo
            const line = tx.lines.find(l => l.accountId === currentAccountId);
            const isDebit = line?.type === 'DEBIT';
            
            return (
              <div key={tx.id} className="flex items-center justify-between p-4 hover:bg-slate-800/30 rounded-2xl transition-colors group">
                <div className="flex items-center gap-4">
                  <div className={clsx(
                    "p-3 rounded-xl",
                    tx.isReversal ? "bg-amber-500/10 text-amber-400" : 
                    isDebit ? "bg-rose-500/10 text-rose-400" : "bg-emerald-500/10 text-emerald-400"
                  )}>
                    {tx.isReversal ? <RefreshCcw size={18} /> : 
                     isDebit ? <ArrowUpRight size={18} /> : <ArrowDownLeft size={18} />}
                  </div>
                  <div>
                    <p className="text-white font-medium group-hover:text-blue-400 transition-colors">
                      {tx.description}
                    </p>
                    <p className="text-slate-500 text-xs">
                      {new Date(tx.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <p className={clsx(
                  "font-mono font-bold transition-all duration-500",
                  isPrivacyMode ? "blur-md opacity-30" : "blur-0 opacity-100",
                  isDebit ? "text-slate-200" : "text-emerald-400"
                )}>
                  {isPrivacyMode ? "•••.••" : `${isDebit ? '-' : '+'}${line?.amount.toFixed(2)}`}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};