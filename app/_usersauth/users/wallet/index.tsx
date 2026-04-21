const naira = "/icons/naira.svg";
const filter = "/icons/filter.svg";
const makepayment = "/icons/makepayment.svg";
const whatsAppPoint = "/icons/usericon/whatsappPoint.svg";

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMe } from "@endpoint/users/useUsers";
import type { MeResponse } from "@endpoint/users/types";
import { useWallet, useWalletTransactions } from "@endpoint/wallet/useWallet";
import { FundWalletModal } from "@components/wallet/FundWalletModal";
import { TransactionsTable } from "@components/ui/TransactionsTable";

function formatMoney(n: number, currency: string) {
  return `${currency === "NGN" ? "₦" : `${currency} `}${new Intl.NumberFormat(
    "en-NG",
    { minimumFractionDigits: 2, maximumFractionDigits: 2 },
  ).format(n)}`;
}

function accountDisplayName(me: MeResponse | undefined): string {
  if (!me) return "—";
  if (me.accountType === "business_user") {
    return me.businessName || me.contactName || me.email;
  }
  if (me.accountType === "regular_user") {
    return `${me.firstName} ${me.lastName}`.trim() || me.email;
  }
  return me.email;
}

const WalletSection = () => {
  const { data: me } = useMe();
  const { data: wallet, isPending: walletLoading, isError: walletError } =
    useWallet();
  const {
    data: transactions = [],
    isPending: txLoading,
    isError: txError,
    refetch: refetchTx,
  } = useWalletTransactions(100);

  const [fundOpen, setFundOpen] = useState(false);

  const displayName = accountDisplayName(me);

  return (
    <section className="min-h-screen bg-ads360-hash px-4 md:px-10 py-14">
      <div className="container mx-auto">
        <h2 className="text-2xl">My Wallet</h2>
        <p className="text-stone-400">
          View billing history and current balance here
        </p>

        <div className="md:flex my-10 justify-around items-start gap-6 bg-white p-5 shadow-md rounded-10 border border-ads360yellow-100">
          <div>
            <h3>Account Name</h3>
            <p className="text-stone-400 text-xl my-4">{displayName}</p>

            <div>
              <p className="my-3">Balance</p>
              <div className="flex">
                <img alt="" src={naira} className="w-14 h-14" />
                <div className="px-3">
                  {walletLoading ? (
                    <p className="text-2xl text-stone-400">…</p>
                  ) : walletError ? (
                    <p className="text-sm text-red-600">Could not load balance</p>
                  ) : (
                    <p className="text-2xl">
                      {formatMoney(wallet?.balance ?? 0, wallet?.currency ?? "NGN")}
                    </p>
                  )}
                  <h3 className="text-stone-400 text-sm">Available Balance</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 md:mt-0">
            <p className="my-3">WhatsApp Point</p>
            <div className="flex">
              <img alt="" src={whatsAppPoint} className="w-14 h-14" />
              <div className="px-3">
                <p className="text-2xl">0</p>
                <h3 className="text-stone-400 text-sm">Available Balance</h3>
              </div>
            </div>
          </div>

          <div className="shrink-0">
            <button
              type="button"
              onClick={() => setFundOpen(true)}
              className="flex px-10 space-x-5 py-5 my-5 md:my-0 rounded border text-ads360light-100 bg-ads360black-100/95 hover:bg-ads360black-100"
            >
              <img alt="" src={makepayment} className="w-5 h-5" />
              <span>Fund Wallet</span>
            </button>
          </div>
        </div>

        <div className="bg-white p-4 shadow-md my-3 rounded-10 border border-ads360yellow-100">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <h3 className="text-lg">Transaction History</h3>
            {txError ? (
              <button
                type="button"
                onClick={() => refetchTx()}
                className="text-sm text-ads360yellow-100 underline"
              >
                Retry
              </button>
            ) : null}
          </div>

          {txLoading ? (
            <p className="text-stone-500 text-sm py-4">Loading transactions…</p>
          ) : txError ? (
            <p className="text-red-600 text-sm py-4">
              Could not load transactions.
            </p>
          ) : (
            <TransactionsTable
              rows={transactions}
              isLoading={txLoading}
              isError={txError}
              emptyText="No transactions found"
            />
          )}
        </div>
      </div>

      <FundWalletModal isOpen={fundOpen} onClose={() => setFundOpen(false)} />
    </section>
  );
};

export const Route = createFileRoute("/_usersauth/users/wallet/")({
  component: WalletSection,
});

export default WalletSection;
