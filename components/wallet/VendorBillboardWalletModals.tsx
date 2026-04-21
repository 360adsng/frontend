"use client";

import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import type { SingleValue } from "react-select";
import { Modal } from "@components/modal/modal";
import { toast } from "sonner";
import type { NigerianBank } from "@endpoint/wallet/wallet";
import { useVerifyAccount } from "@endpoint/wallet/useWallet";
import {
  type SavedPayoutBank,
  type SavePayoutBankPayload,
} from "./vendorBillboardWalletTypes";

const cancel = "/icons/usericon/modalCancelBotton.svg";

type BankSelectOption = { value: string; label: string };

/** Must sit above `@components/modal/modal` overlay (`z-[10000000]`). */
const BANK_SELECT_MENU_Z = 10000050;

const bankSelectStyles = {
  control: (base: Record<string, unknown>) => ({
    ...base,
    minHeight: 40,
    borderRadius: "0.5rem",
    borderColor: "#e7e5e4",
    fontSize: "0.875rem",
    boxShadow: "none",
  }),
  menu: (base: Record<string, unknown>) => ({
    ...base,
    fontSize: "0.875rem",
    zIndex: BANK_SELECT_MENU_Z,
  }),
  menuPortal: (base: Record<string, unknown>) => ({
    ...base,
    zIndex: BANK_SELECT_MENU_Z,
  }),
  menuList: (base: Record<string, unknown>) => ({
    ...base,
    zIndex: BANK_SELECT_MENU_Z,
  }),
  option: (base: Record<string, unknown>, state: { isFocused: boolean }) => ({
    ...base,
    backgroundColor: state.isFocused ? "#fafaf9" : "white",
    color: "#1c1917",
    cursor: "pointer",
  }),
};

type AddBankModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSaveBank: (payload: SavePayoutBankPayload) => Promise<void>;
  savePending: boolean;
  nigerianBanks: NigerianBank[] | undefined;
  banksLoading: boolean;
  banksError: boolean;
};

export function AddBankModal({
  isOpen,
  onClose,
  onSaveBank,
  savePending,
  nigerianBanks,
  banksLoading,
  banksError,
}: AddBankModalProps) {
  const [bankCode, setBankCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [verifiedName, setVerifiedName] = useState<string | null>(null);
  const verifyAccountMutation = useVerifyAccount();

  const list = nigerianBanks ?? [];

  const bankOptions: BankSelectOption[] = useMemo(
    () =>
      list.map((b) => ({
        value: String(b.code),
        label: b.name,
      })),
    [list],
  );

  const selectedBankOption = useMemo(
    () => bankOptions.find((o) => o.value === bankCode) ?? null,
    [bankOptions, bankCode],
  );

  useEffect(() => {
    if (!isOpen) {
      setBankCode("");
      setAccountNumber("");
      setVerifiedName(null);
      return;
    }
    if (list.length === 0) return;
    setBankCode((prev) => {
      if (prev && list.some((b) => String(b.code) === prev)) return prev;
      return String(list[0].code);
    });
  }, [isOpen, list]);

  const bankSelectReady = !banksLoading && !banksError && list.length > 0;

  const canVerify =
    bankSelectReady &&
    accountNumber.trim().length >= 10 &&
    bankCode.length > 0 &&
    !verifyAccountMutation.isPending;
  const canSave =
    verifiedName != null &&
    bankSelectReady &&
    accountNumber.trim().length >= 10 &&
    bankCode.length > 0 &&
    !savePending;

  return (
    <Modal isOpen={isOpen}>
      <div className="mx-auto w-11/12 max-w-md rounded-10 bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="font-serif text-lg text-stone-900">Add bank account</h3>
            <p className="mt-1 text-sm text-stone-500">
              Account name is verified with your bank before you can save.
            </p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close">
            <img src={cancel} alt="" className="h-5 w-5" />
          </button>
        </div>

        <label className="block text-xs font-medium text-stone-600">Bank</label>
        {banksError ? (
          <p className="mt-1 text-sm text-red-600">
            Could not load banks. Try again later.
          </p>
        ) : banksLoading ? (
          <p className="mt-1 text-sm text-stone-500">Loading banks…</p>
        ) : list.length === 0 ? (
          <p className="mt-1 text-sm text-stone-500">No banks available.</p>
        ) : (
          <div className="mt-1">
            <Select<BankSelectOption, false>
              inputId="add-bank-institution"
              instanceId="add-bank-institution"
              options={bankOptions}
              value={selectedBankOption}
              onChange={(opt: SingleValue<BankSelectOption>) => {
                if (opt) {
                  setBankCode(opt.value);
                  setVerifiedName(null);
                }
              }}
              isSearchable
              isClearable={false}
              placeholder="Search or choose bank…"
              noOptionsMessage={() => "No bank matches your search"}
              menuPortalTarget={
                typeof document !== "undefined" ? document.body : null
              }
              menuPosition="fixed"
              styles={bankSelectStyles}
            />
          </div>
        )}

        <label className="mt-4 block text-xs font-medium text-stone-600">
          Account number
        </label>
        <input
          type="text"
          inputMode="numeric"
          autoComplete="off"
          maxLength={10}
          value={accountNumber}
          onChange={(e) => {
            const v = e.target.value.replace(/\D/g, "").slice(0, 10);
            setAccountNumber(v);
            setVerifiedName(null);
          }}
          placeholder="10-digit NUBAN"
          className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-2 text-sm"
        />

        {verifiedName ? (
          <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
            {verifiedName}
          </div>
        ) : null}

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            disabled={!canVerify}
            onClick={() => {
              verifyAccountMutation.mutate(
                {
                  accountNumber: accountNumber.trim(),
                  bankCode: String(bankCode),
                },
                {
                  onSuccess: (res) => {
                    const name = res?.data?.account_name?.trim();
                    if (name) {
                      setVerifiedName(name);
                      toast.success("Account name verified");
                    } else {
                      toast.error("Could not read account name from the response");
                    }
                  },
                },
              );
            }}
            className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-800 hover:bg-stone-50 disabled:opacity-50"
          >
            {verifyAccountMutation.isPending ? "Verifying…" : "Verify account name"}
          </button>
          <button
            type="button"
            disabled={!canSave}
            onClick={() => {
              const bank = list.find((b) => String(b.code) === String(bankCode));
              void (async () => {
                try {
                  await onSaveBank({
                    bankName: bank?.name ?? "",
                    bankCode: String(bankCode),
                    accountNumber: accountNumber.trim(),
                    accountName: (verifiedName ?? "").trim(),
                  });
                  onClose();
                } catch {
                  // toast from useSavePayoutBank
                }
              })();
            }}
            className="rounded-lg bg-ads360yellow-100 px-4 py-2 text-sm font-semibold text-white hover:opacity-95 disabled:opacity-50"
          >
            {savePending ? "Saving…" : "Save bank"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

type WithdrawModalProps = {
  isOpen: boolean;
  onClose: () => void;
  banks: SavedPayoutBank[];
  balance: number;
  onOpenAddBank: () => void;
  onPayout: (payload: { amount: number; bankId: number }) => Promise<void>;
  payoutPending: boolean;
};

export function WithdrawModal({
  isOpen,
  onClose,
  banks,
  balance,
  onOpenAddBank,
  onPayout,
  payoutPending,
}: WithdrawModalProps) {
  const [amount, setAmount] = useState("");
  const [selectedBankId, setSelectedBankId] = useState<number | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setAmount("");
      setSelectedBankId(null);
    } else if (banks.length === 1) {
      setSelectedBankId(banks[0].id);
    }
  }, [isOpen, banks]);

  useEffect(() => {
    if (isOpen && banks.length > 0 && selectedBankId) {
      const exists = banks.some((b) => b.id === selectedBankId);
      if (!exists) setSelectedBankId(banks[0]?.id ?? null);
    }
  }, [banks, isOpen, selectedBankId]);

  const amtNum = Number(amount);
  const canSubmit =
    banks.length > 0 &&
    selectedBankId != null &&
    Number.isFinite(amtNum) &&
    amtNum > 0 &&
    amtNum <= balance &&
    !payoutPending;

  return (
    <Modal isOpen={isOpen}>
      <div className="mx-auto w-11/12 max-w-md rounded-10 bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="font-serif text-lg text-stone-900">Withdraw</h3>
            <p className="mt-1 text-sm text-stone-500">
              Available: ₦{balance.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close">
            <img src={cancel} alt="" className="h-5 w-5" />
          </button>
        </div>

        <label className="block text-xs font-medium text-stone-600">Amount (₦)</label>
        <input
          type="number"
          min={0}
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-2 text-sm"
        />

        {banks.length === 0 ? (
          <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-center text-sm text-amber-950">
            <p className="mb-3">Add a bank account to withdraw to.</p>
            <button
              type="button"
              onClick={onOpenAddBank}
              className="rounded-lg bg-ads360yellow-100 px-4 py-2 text-sm font-semibold text-white hover:opacity-95"
            >
              Add bank
            </button>
          </div>
        ) : (
          <fieldset className="mt-4">
            <legend className="text-xs font-medium text-stone-600">
              Withdraw to
            </legend>
            <div className="mt-2 space-y-2">
              {banks.slice(0, 2).map((b) => (
                <label
                  key={b.id}
                  className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm ${
                    selectedBankId === b.id
                      ? "border-ads360yellow-100 bg-amber-50/50"
                      : "border-stone-200 hover:bg-stone-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="payout-bank"
                    checked={selectedBankId === b.id}
                    onChange={() => setSelectedBankId(b.id)}
                    className="mt-1"
                  />
                  <span>
                    <span className="font-medium text-stone-900">{b.bankName}</span>
                    <br />
                    <span className="text-stone-600">
                      {b.accountNumber} · {b.accountName}
                    </span>
                  </span>
                </label>
              ))}
              {banks.length > 2 ? (
                <p className="text-xs text-stone-500">
                  Showing your first two saved accounts. Remove extras from settings
                  when available.
                </p>
              ) : null}
            </div>
          </fieldset>
        )}

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-stone-300 px-4 py-2 text-sm text-stone-700 hover:bg-stone-50"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!canSubmit}
            onClick={() => {
              if (selectedBankId == null) return;
              void (async () => {
                try {
                  await onPayout({ amount: amtNum, bankId: selectedBankId });
                  onClose();
                } catch {
                  // toast from usePayoutRequest
                }
              })();
            }}
            className="rounded-lg bg-ads360black-100/95 px-4 py-2 text-sm font-semibold text-ads360light-100 hover:bg-ads360black-100 disabled:opacity-50"
          >
            {payoutPending ? "Submitting…" : "Submit request"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

