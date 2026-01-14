// Archivo: src/store/useAccountStore.ts
import { create } from 'zustand';
import apiClient from '../api/axiosClient';

interface TransactionLine {
  accountId: string;
  amount: number;
  type: 'DEBIT' | 'CREDIT';
}

interface Transaction {
  id: string;
  timestamp: string;
  description: string;
  lines: TransactionLine[];
}

interface Account {
  id: string;
  accountNumber: string;
  type: 'ASSET' | 'LIABILITY';
  balance: number;
  active: boolean;
  transactions?: Transaction[]; // Opcional: para guardar el historial por cuenta
}

interface AccountState {
  accounts: Account[];
  isLoading: boolean;
  error: string | null;
  fetchAccounts: () => Promise<void>;
  fetchTransactions: (accountId: string) => Promise<Transaction[]>;
}

export const useAccountStore = create<AccountState>((set, get) => ({
  accounts: [],
  isLoading: false,
  error: null,

  fetchAccounts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.get<Account[]>('/accounts');
      // Obtenemos las cuentas y cargamos las transacciones para cada una en paralelo
      const accountsWithData = await Promise.all(response.data.map(async (acc) => {
        const txs = await get().fetchTransactions(acc.id);
        return { ...acc, transactions: txs };
      }));
      set({ accounts: accountsWithData, isLoading: false });
    } catch (err: any) {
      set({ error: 'Fallo de conexión con el Ledger', isLoading: false });
    }
  },

  fetchTransactions: async (accountId: string) => {
    try {
      // Llamada al TransactionController
      const response = await apiClient.get<Transaction[]>(`/transactions/${accountId}`);
      return response.data;
    } catch (error) {
      console.error(`Error cargando TX para ${accountId}`, error);
      return [];
    }
  },
}));