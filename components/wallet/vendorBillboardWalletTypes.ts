import type { PayoutBankDto, SavePayoutBankPayload } from "@endpoint/wallet/wallet";

/** Alias for wallet payout rows (GET /wallet/banks) */
export type SavedPayoutBank = PayoutBankDto;

export type { SavePayoutBankPayload };
