const naira = "/icons/naira.svg";
const filter = "/icons/filter.svg";
const makepayment = "/icons/makepayment.svg";
import { GrTooltip } from "react-icons/gr";
import Tooltip from "@components/ui/Tooltip";

import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  useNigerianBanks,
  useVendorPayoutBanks,
  usePayoutRequest,
  useWallet,
  useWalletTransactions,
} from "@endpoint/wallet/useWallet";
import {
  AddBankModal,
  WithdrawModal,
} from "@components/wallet/VendorBillboardWalletModals";
import { TransactionsTable } from "@components/ui/TransactionsTable";

function money(n: number | null | undefined): string {
  const v = Number(n ?? 0);
  if (!Number.isFinite(v)) return "0.00";
  return v.toFixed(2);
}

function dateOnly(s: string | null | undefined): string {
  if (!s) return "-";
  return String(s).slice(0, 10);
}

const WalletSection = () => {
  const wallet = useWallet();
  const txns = useWalletTransactions(20);
  const nigerianBanksQuery = useNigerianBanks();
  const { banks, saveBank, savePending } = useVendorPayoutBanks();
  const payoutRequest = usePayoutRequest();
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [addBankOpen, setAddBankOpen] = useState(false);
  /** When true, reopen withdraw after add-bank modal closes (saved or cancelled). */
  const [reopenWithdrawAfterBank, setReopenWithdrawAfterBank] = useState(false);

  const balance = Number(wallet.data?.balance ?? 0);

  const openWithdraw = () => {
    setWithdrawOpen(true);
  };

  const openAddBank = (fromWithdraw: boolean) => {
    if (fromWithdraw) {
      setReopenWithdrawAfterBank(true);
      setWithdrawOpen(false);
    } else {
      setReopenWithdrawAfterBank(false);
    }
    setAddBankOpen(true);
  };

  const closeAddBank = () => {
    setAddBankOpen(false);
    if (reopenWithdrawAfterBank) {
      setWithdrawOpen(true);
      setReopenWithdrawAfterBank(false);
    }
  };

  return (
    <section className="min-h-screen bg-ads360-hash px-4 py-14 md:px-10">
      <div className="container mx-auto">
        <h2 className="text-2xl">My Wallet</h2>
        <p className="text-stone-400">
          View billing history and current balance here
        </p>

        <div className="my-10 justify-around rounded-10 border border-ads360yellow-100 bg-white p-5 shadow-md md:flex">
          <div>
            <div>
              <div className="my-3 flex items-center space-x-1">
                <div className="group relative">
                  <GrTooltip />
                  <div className="hidden group-hover:inline">
                    <Tooltip info="this is your incoming balance that you receive from bookings" />
                  </div>
                </div>
                <p>Incoming Balance</p>
              </div>
              <div className="flex">
                <img alt="naira" src={naira} className="h-14 w-14" />
                <div className="px-3">
                  <p className="text-2xl">
                    {wallet.data?.currency} {money(wallet.data?.incomingBalance)}
                  </p>
                  <h3 className="text-sm text-stone-400">Available Balance</h3>
                </div>
              </div>
            </div>

            <div>
              <div className="my-3 flex items-center space-x-1">
                <div className="group relative">
                  <GrTooltip />
                  <div className="hidden group-hover:inline">
                    <Tooltip info="this is your outgoing balance that you request to withdraw" />
                  </div>
                </div>
                <p>Outgoing Balance</p>
              </div>
              <div className="flex">
                <img alt="naira" src={naira} className="h-14 w-14" />
                <div className="px-3">
                  <p className="text-2xl">
                    {wallet.data?.currency}{" "}
                    {money(wallet.data?.outgoingBalance)}
                  </p>
                  <h3 className="text-sm text-stone-400">Available Balance</h3>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div>
              <div className="my-3 flex items-center space-x-1">
                <div className="group relative">
                  <GrTooltip />
                  <div className="hidden group-hover:inline">
                    <Tooltip info="this is your actual balance that you can withdraw from" />
                  </div>
                </div>
                <p>Actual Balance</p>
              </div>
              <div className="flex">
                <img alt="naira" src={naira} className="h-14 w-14" />
                <div className="px-3">
                  <p className="text-2xl">
                    {wallet.data?.currency} {money(wallet.data?.balance)}
                  </p>
                  <h3 className="text-sm text-stone-400">Available Balance</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 py-5 md:my-0 md:min-w-[200px] md:justify-center">
            <button
              type="button"
              onClick={openWithdraw}
              className="flex items-center justify-center space-x-3 rounded border bg-ads360black-100/95 px-6 py-4 text-ads360light-100 hover:bg-ads360black-100"
            >
              <img alt="" src={makepayment} className="h-5 w-5" />
              <span>Withdraw</span>
            </button>
            <Link
              to="/vendors/billboards/payouts/"
              className="flex items-center justify-center space-x-3 rounded border border-ads360yellow-100 bg-white px-6 py-4 font-medium text-stone-900 hover:bg-amber-50/80"
            >
              <span>My payouts</span>
            </Link>
            <button
              type="button"
              onClick={() => openAddBank(false)}
              className="flex items-center justify-center space-x-3 rounded border-2 border-ads360yellow-100 bg-white px-6 py-4 font-medium text-stone-900 hover:bg-amber-50/80"
            >
              <span className="text-lg leading-none">+</span>
              <span>Add bank</span>
            </button>
          </div>
        </div>

        <WithdrawModal
          isOpen={withdrawOpen}
          onClose={() => setWithdrawOpen(false)}
          banks={banks}
          balance={balance}
          onOpenAddBank={() => openAddBank(true)}
          onPayout={(payload) => payoutRequest.mutateAsync(payload)}
          payoutPending={payoutRequest.isPending}
        />

        <AddBankModal
          isOpen={addBankOpen}
          onClose={closeAddBank}
          onSaveBank={saveBank}
          savePending={savePending}
          nigerianBanks={nigerianBanksQuery.data}
          banksLoading={nigerianBanksQuery.isLoading}
          banksError={nigerianBanksQuery.isError}
        />

        <div className="group">
          <div className="flex justify-end">
            <button
              type="button"
              className="flex space-x-2 rounded-full bg-[#E4E4E4] px-5 py-1"
            >
              <img
                src={filter}
                alt="filter"
                className="py-2"
                width={20}
                height={20}
              />
              <span>filter</span>
            </button>
          </div>
        </div>

        <div className="my-3 rounded-10 border border-ads360yellow-100 bg-white p-4 shadow-md">
          <h3 className="mb-2 text-lg">Transaction History</h3>
          <TransactionsTable
            rows={txns.data ?? []}
            isLoading={txns.isLoading}
            isError={txns.isError}
            emptyText="No transactions yet"
            showOwnerDetails
          />
        </div>
      </div>
    </section>
  );
};

export const Route = createFileRoute("/vendors/billboards/wallet/")({
  component: WalletSection,
});

export default WalletSection;
