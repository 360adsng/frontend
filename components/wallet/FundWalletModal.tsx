import { useState } from "react";
import { toast } from "sonner";
import { Modal } from "@components/modal/modal";
import {
  useInvalidateWalletQueries,
  useSavedPaymentCards,
  useWalletDeposit,
} from "@endpoint/wallet/useWallet";

const cancel = "/icons/usericon/modalCancelBotton.svg";
const cardIcon = "/icons/usericon/card.svg";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function FundWalletModal({ isOpen, onClose }: Props) {
  const [amount, setAmount] = useState("");
  const [selected, setSelected] = useState<number | "new">("new");
  const [saveCard, setSaveCard] = useState(false);

  const { data: savedCards = [], isFetching: cardsLoading } =
    useSavedPaymentCards(isOpen);
  const deposit = useWalletDeposit();
  const invalidateWallet = useInvalidateWalletQueries();

  const handleProceed = async () => {
    const amt = Number(amount);
    if (!Number.isFinite(amt) || amt <= 0) {
      toast.error("Enter a valid amount.");
      return;
    }

    try {
      const res = await deposit.mutateAsync({
        amount: amt,
        saveCard: selected === "new" ? saveCard : false,
        savedCardId: selected === "new" ? undefined : selected,
      });

      const link =
        res &&
        typeof res === "object" &&
        res.data &&
        typeof (res.data as { link?: unknown }).link === "string"
          ? ((res.data as { link: string }).link as string)
          : null;

      if (link) {
        window.location.assign(link);
        return;
      }

      toast.success("Payment started.");
      await invalidateWallet();
      onClose();
    } catch {
      /* toast from mutation onError */
    }
  };

  return (
    <Modal isOpen={isOpen}>
      <div className="bg-white p-5 w-11/12 max-w-md mx-auto rounded-10 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className="text-lg font-semibold">Fund wallet</h4>
            <p className="text-sm text-stone-500 mt-1">
              Pay with a saved card or a new card via checkout
            </p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close">
            <img src={cancel} alt="" className="w-5" />
          </button>
        </div>

        <div className="mb-5">
          <label className="text-sm font-medium text-stone-600" htmlFor="fund-amount">
            Amount
          </label>
          <div className="flex mt-1">
            <div className="bg-ads360black-50/10 rounded-l text-center grid grid-cols-1 basis-14 content-center text-black/50 text-sm">
              ₦
            </div>
            <input
              id="fund-amount"
              inputMode="decimal"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="p-2 w-full border border-l-0 rounded-r focus:outline-none focus:ring-1 focus:ring-ads360yellow-100"
            />
          </div>
        </div>

        <p className="text-sm font-medium text-stone-700 mb-2">Saved cards</p>
        {cardsLoading ? (
          <p className="text-sm text-stone-500 mb-4">Loading cards…</p>
        ) : null}
        <ul className="space-y-2 mb-4">
          {savedCards.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => setSelected(c.id)}
                className={`w-full flex items-center gap-3 rounded border p-3 text-left transition-colors ${
                  selected === c.id
                    ? "border-ads360yellow-100 bg-ads360yellow-100/10"
                    : "border-[#E4E4E4] hover:border-ads360yellow-100/50"
                }`}
              >
                <img src={cardIcon} alt="" width={36} height={36} className="shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">
                    {(c.brand ?? "Card") + (c.last4 ? ` ·••• ${c.last4}` : "")}
                  </p>
                  <p className="text-xs text-stone-500">
                    {c.expMonth && c.expYear
                      ? `Expires ${c.expMonth}/${c.expYear}`
                      : "Saved on file"}
                  </p>
                </div>
                <span
                  className={`h-4 w-4 rounded-full border-2 shrink-0 ${
                    selected === c.id
                      ? "border-ads360black-100 bg-ads360black-100"
                      : "border-stone-300"
                  }`}
                  aria-hidden
                />
              </button>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={() => setSelected("new")}
              className={`w-full flex items-center gap-3 rounded border p-3 text-left transition-colors ${
                selected === "new"
                  ? "border-ads360yellow-100 bg-ads360yellow-100/10"
                  : "border-[#E4E4E4] hover:border-ads360yellow-100/50"
              }`}
            >
              <div className="h-9 w-9 rounded border border-dashed border-stone-400 grid place-items-center text-stone-500 text-lg shrink-0">
                +
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">Use a new card</p>
                <p className="text-xs text-stone-500">Opens secure checkout</p>
              </div>
              <span
                className={`h-4 w-4 rounded-full border-2 shrink-0 ${
                  selected === "new"
                    ? "border-ads360black-100 bg-ads360black-100"
                    : "border-stone-300"
                }`}
                aria-hidden
              />
            </button>
          </li>
        </ul>

        {selected === "new" ? (
          <label className="flex items-center gap-2 cursor-pointer select-none mb-6">
            <input
              type="checkbox"
              checked={saveCard}
              onChange={(e) => setSaveCard(e.target.checked)}
              className="rounded border-stone-400 text-ads360black-100 focus:ring-ads360yellow-100"
            />
            <span className="text-sm text-stone-700">Save this card for next time</span>
          </label>
        ) : (
          <p className="text-xs text-stone-500 mb-6">
            Paying with a card already on file — no need to save again.
          </p>
        )}

        <div className="flex justify-center">
          <button
            type="button"
            disabled={deposit.isPending}
            className="bg-ads360black-100/95 hover:bg-ads360black-100 disabled:opacity-60 rounded text-white w-5/6 h-10 text-sm font-medium"
            onClick={() => void handleProceed()}
          >
            {deposit.isPending ? "Please wait…" : "Proceed"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
