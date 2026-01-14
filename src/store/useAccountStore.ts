import { create } from "zustand";
import apiClient from "../api/axiosClient";

interface Account {
    id: string;
    accountNumber: string;
    type: 'ASSET' | 'LIABILITY';
    balance: number;
    active: boolean;
}

interface TransferData {
    sourceAccountId: string;
    targetAccountId: string;
    amount: number;
    description?: string;
}

interface AccountStore {
    accounts: Account[];
    isLoading: boolean;
    error: string | null;
    fetchAccounts: () => Promise<void>;
    executeTransfer: (data: TransferData) => Promise<void>;
}


export const useAccountStore = create<AccountStore>((set, get) => ({
    accounts: [],
    isLoading: false,
    error: null,
    fetchAccounts: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await apiClient.get<Account[]>("/api/v1/accounts");
            set({ accounts: response.data, isLoading: false });
        } catch (err: any ) {
            set({ error: err.response?.data?.detail || 'Error fetching accounts',
            isLoading: false });
        }
    },

    executeTransfer: async (data) => {
    set({ isLoading: true });
    try {
      await apiClient.post('/transfers', {
        ...data,
        // Generamos la Idempotency Key en el cliente
        idempotencyKey: crypto.randomUUID()
      });
      // Refrescamos las cuentas para ver los nuevos saldos
      await get().fetchAccounts();
    } catch (err: any) {
      throw new Error(err.response?.data?.detail || 'Error en la transferencia');
    } finally {
      set({ isLoading: false });
    }
  },
}));