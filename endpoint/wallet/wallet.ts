import { baseFetchJson } from "../baseFetch";

export type WalletDto = {
  id: number;
  balance: number;
  currency: string;
  incomingBalance: number;
  outgoingBalance: number;
  user_id: number;
  createdAt: string;
  updatedAt: string;
};

export type NigerianBank = {
  id: number;
  code: string;
  name: string;
};

export type VerifyAccountResponse = {
  status: string;
  message: string;
  data: {
    account_number: string;
    account_name: string;
  }
}

export type TransactionStatus = "pending" | "completed" | "failed";

export type TransactionType =
  | "wallet_fund"
  | "wallet_withdrawal"
  | "wallet_debit"
  | "billboard_booking"
  | "billboard_payout"
  | "refund"
  | "admin_adjustment"
  | "other";

export type TransactionDto = {
  id: number;
  userId: number;
  vendorId?: number | null;
  walletId: number | null;
  referenceType: string | null;
  referenceId: number | null;
  amount: number;
  currency: string;
  description: string;
  status: TransactionStatus;
  type: TransactionType;
  providerRef: string | null;
  providerTxRef: string | null;
  provider: string;
  metadata: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
};

export function getWallet(): Promise<WalletDto> {
  return baseFetchJson<WalletDto>("/wallet", { method: "GET" });
}

export function getWalletTransactions(limit = 100): Promise<TransactionDto[]> {
  const q = limit ? `?limit=${limit}` : "";
  return baseFetchJson<TransactionDto[]>(`/wallet/transactions${q}`, {
    method: "GET",
  });
}

export type SavedPaymentCardDto = {
  id: number;
  last4: string | null;
  brand: string | null;
  expMonth: string | null;
  expYear: string | null;
  createdAt: string;
};

/** GET /wallet/banks */
export type PayoutBankDto = {
  id: number;
  bankName: string;
  bankCode: string;
  accountName: string;
  accountNumber: string;
  isPrimary: boolean;
  createdAt: string;
  updatedAt: string;
};

/** POST /wallet/banks */
export type SavePayoutBankPayload = {
  bankName: string;
  bankCode: string;
  accountName: string;
  accountNumber: string;
  isPrimary?: boolean;
};

export function getPayoutBanks(): Promise<PayoutBankDto[]> {
  return baseFetchJson<PayoutBankDto[]>("/wallet/banks", { method: "GET" });
}

export function postSavePayoutBank(
  body: SavePayoutBankPayload,
): Promise<PayoutBankDto> {
  return baseFetchJson<PayoutBankDto>("/wallet/banks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

/** POST /wallet/payout */
export type PayoutRequestPayload = {
  amount: number;
  bankId: number;
};

export type PayoutRequestResponse = {
  message?: string;
  payout?: unknown;
  [key: string]: unknown;
};

export function postPayoutRequest(
  body: PayoutRequestPayload,
): Promise<PayoutRequestResponse> {
  return baseFetchJson<PayoutRequestResponse>("/wallet/payout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export type PayoutStatus = "accepted" | "rejected" | "pending";

export type PayoutDto = {
  id: number;
  amount: string | number;
  status: PayoutStatus;
  transactionId: string | null;
  transactionRef: string | null;
  userId: number;
  rejectionReason: string | null;
  transactionDate: string | null;
  acceptedBy: number | null;
  rejectedBy: number | null;
  bankCode: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  createdAt: string;
  updatedAt: string;
};

export function getMyPayouts(): Promise<PayoutDto[]> {
  return baseFetchJson<PayoutDto[]>("/wallet/payouts", { method: "GET" });
}

export function getMyPayoutById(id: number): Promise<PayoutDto> {
  return baseFetchJson<PayoutDto>(`/wallet/payouts/${id}`, { method: "GET" });
}

export type WalletDepositPayload = {
  amount: number;
  saveCard?: boolean;
  savedCardId?: number;
};

/** Flutterwave-style envelope returned by POST /wallet/deposit */
export type WalletDepositResponse = {
  status?: string;
  message?: string;
  data?: { link?: string; [key: string]: unknown };
  [key: string]: unknown;
};

export function getSavedPaymentCards(): Promise<SavedPaymentCardDto[]> {
  return baseFetchJson<SavedPaymentCardDto[]>("/wallet/cards", {
    method: "GET",
  });
}

export function postWalletDeposit(
  body: WalletDepositPayload,
): Promise<WalletDepositResponse> {
  return baseFetchJson<WalletDepositResponse>("/wallet/deposit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export type PayNowPayload = {
  bookingId: number;
  paymentMethod: "wallet" | "flutterwave";
};

/** Flutterwave-style envelope returned by POST /wallet/PayNow (flutterwave) */
export type PayNowResponse = {
  status?: string;
  message?: string;
  data?: { link?: string; [key: string]: unknown };
  [key: string]: unknown;
};

export function postPayNow(body: PayNowPayload): Promise<PayNowResponse> {
  return baseFetchJson<PayNowResponse>("/wallet/PayNow", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

/** Flutterwave `/banks/NG` list exposed via Nest `GET /flutterwave/nigerian-banks` */
export async function getNigerianBanks(): Promise<NigerianBank[]> {
  const res = await baseFetchJson<
    NigerianBank[] | { data?: NigerianBank[]; [key: string]: unknown }
  >("/flutterwave/nigerian-banks", { method: "GET" });
  if (Array.isArray(res)) return res;
  if (res && typeof res === "object" && Array.isArray(res.data)) {
    return res.data;
  }
  return [];
}

export function verifyAccount(accountNumber: string, bankCode: string): Promise<VerifyAccountResponse> {
  return baseFetchJson<VerifyAccountResponse>("/flutterwave/verify-account", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ accountNumber, bankCode }),
  });
}
