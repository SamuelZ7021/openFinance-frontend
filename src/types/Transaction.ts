// src/types/transaction.ts

import type { OperationType } from "./OperationType";
import type { TransactionLine } from "./TransactionLine";

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string;
  lines: TransactionLine[];
  category: OperationType;
  isReversal?: boolean;
}