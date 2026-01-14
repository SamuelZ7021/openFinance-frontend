import { useUIStore } from '../../store/useUIStore';
import { ArrowUpRight, ArrowDownLeft, RefreshCcw } from 'lucide-react';
import { clsx } from 'clsx';

export const RecentTransactions = ({ transactions }: any) => {
  const { isPrivacyMode } = useUIStore();

  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">Recent Activity</h3>
        <button className="text-blue-500 text-sm font-medium hover:underline">View All</button>
      </div>

      <div className="space-y-4">
        {transactions.map((tx: any) => (
          <div key={tx.id} className="flex items-center justify-between p-4 hover:bg-slate-800/30 rounded-2xl transition-colors group">
            <div className="flex items-center gap-4">
              <div className={clsx(
                "p-3 rounded-xl",
                tx.isReversal ? "bg-amber-500/10 text-amber-400" : 
                tx.type === 'DEBIT' ? "bg-rose-500/10 text-rose-400" : "bg-emerald-500/10 text-emerald-400"
              )}>
                {tx.isReversal ? <RefreshCcw size={18} /> : 
                 tx.type === 'DEBIT' ? <ArrowUpRight size={18} /> : <ArrowDownLeft size={18} />}
              </div>
              <div>
                <p className="text-white font-medium group-hover:text-blue-400 transition-colors">{tx.description}</p>
                <p className="text-slate-500 text-xs">{tx.date}</p>
              </div>
            </div>
            <p className={clsx(
              "font-mono font-bold transition-all duration-500",
              isPrivacyMode ? "blur-md opacity-30" : "blur-0 opacity-100",
              tx.type === 'DEBIT' ? "text-slate-200" : "text-emerald-400"
            )}>
              {isPrivacyMode ? "•••.••" : `${tx.type === 'DEBIT' ? '-' : '+'}${tx.amount}`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};