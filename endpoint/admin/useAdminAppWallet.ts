import { useQuery } from "@tanstack/react-query";
import {
  getAdminAppWallets,
  getAdminAppWalletTransactions,
  getAdminTransactions,
  type AdminAllTransactionsListQuery,
  type AdminAppWalletTransactionsListQuery,
} from "./admin";

export const adminAppWalletQueryKeys = {
  all: ["admin", "app-wallet"] as const,
  balances: () => [...adminAppWalletQueryKeys.all, "balances"] as const,
  transactions: (q: AdminAppWalletTransactionsListQuery) =>
    [...adminAppWalletQueryKeys.all, "transactions", q] as const,
};

export const adminTransactionsLedgerQueryKeys = {
  all: ["admin", "transactions-ledger"] as const,
  list: (q: AdminAllTransactionsListQuery) =>
    [...adminTransactionsLedgerQueryKeys.all, q] as const,
};

export function useAdminAppWallets() {
  return useQuery({
    queryKey: adminAppWalletQueryKeys.balances(),
    queryFn: () => getAdminAppWallets(),
  });
}

export function useAdminAppWalletTransactions(
  params: AdminAppWalletTransactionsListQuery,
) {
  return useQuery({
    queryKey: adminAppWalletQueryKeys.transactions(params),
    queryFn: () => getAdminAppWalletTransactions(params),
  });
}

export function useAdminTransactionsLedger(
  params: AdminAllTransactionsListQuery,
) {
  return useQuery({
    queryKey: adminTransactionsLedgerQueryKeys.list(params),
    queryFn: () => getAdminTransactions(params),
  });
}
