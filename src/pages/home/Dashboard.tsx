import React, { useEffect } from 'react';
import { AccountCard } from '../../components/dashboard/AccountCard';
import { useAccountStore } from '../../store/useAccountStore';
import { RecentTransactions } from '../../components/dashboard/RecentTransactions';

export const Dashboard = () => {
  const { accounts, fetchAccounts } = useAccountStore();

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  return (
    <div className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-6xl">
        {/* ... Header anterior ... */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* SECCIÓN DE TARJETAS (Cuentas) */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
              Tus Cuentas
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {accounts.map((acc) => {
                // Generate a simplified balance history for the chart.
                // Start from the current balance and reconstruct previous balances
                // based on the last 10 transactions.
                const sortedTxs = (acc.transactions || [])
                  .slice()
                  .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

                const recentTxs = sortedTxs.slice(0, 10);
                
                let runningBalance = acc.balance;
                // Start with the current balance and prepend previous balances.
                const balanceHistory = [runningBalance];

                // Iterate backwards through recent transactions to calculate past balances.
                for (const tx of recentTxs) {
                  const line = tx.lines.find(l => l.accountId === acc.id);
                  if (line) {
                    if (line.type === 'CREDIT') {
                      runningBalance -= line.amount; // Balance before credit was lower
                    } else { // DEBIT
                      runningBalance += line.amount; // Balance before debit was higher
                    }
                  }
                  balanceHistory.unshift(runningBalance);
                }
                
                const chartData = balanceHistory.map(value => ({ value }));

                return (
                  <AccountCard 
                    key={acc.id}
                    accountNumber={acc.accountNumber}
                    balance={acc.balance}
                    type={acc.type === 'LIABILITY' ? 'Corporativa' : 'Activo'}
                    history={chartData} 
                  />
                );
              })}
            </div>
          </div>

          {/* SECCIÓN DE TRANSACCIONES (Ledger Global) */}
          <div className="space-y-8">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
              Movimientos
            </h2>
            {/* Unimos todas las transacciones de todas las cuentas y las ordenamos por fecha */}
            <RecentTransactions 
              transactions={accounts
                .flatMap(acc => acc.transactions || [])
                .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                .slice(0, 5)
              } 
            />
          </div>
        </div>
      </div>
      {/* ... Botón Plus y Modal ... */}
    </div>
  );
};