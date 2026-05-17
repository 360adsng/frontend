import { Link } from "@tanstack/react-router";
import { Modal } from "@components/modal/modal";

export type ArconChoice = "yes" | "no";

type ArconCreativeModalProps = {
  isOpen: boolean;
  onComplete: (choice: ArconChoice) => void;
};

export function ArconCreativeModal({ isOpen, onComplete }: ArconCreativeModalProps) {
  return (
    <Modal isOpen={isOpen}>
      <div className="relative z-[10000001] mx-auto max-h-[min(90vh,720px)] w-full max-w-lg overflow-y-auto px-3 py-6 sm:px-4">
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-2xl sm:p-6">
          <h2 className="text-lg font-semibold text-neutral-900 sm:text-xl">
            ARCON certificate for your creative
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            Nigerian practice often requires an{" "}
            <span className="font-medium text-neutral-800">ARCON</span>{" "}
            certificate for out-of-home creatives. Tell us whether you already
            have one, or if you want us to handle the application.
          </p>
          <p className="mt-3 text-xs text-neutral-500">New here? Open a short guide:</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Link
              to="/ads/billboard/learn/arcon"
              className="inline-flex rounded-lg border border-amber-300 bg-white px-3 py-2 text-xs font-semibold text-amber-900 shadow-sm hover:bg-amber-50"
            >
              What is ARCON?
            </Link>
            <Link
              to="/ads/billboard/learn/creative"
              className="inline-flex rounded-lg border border-amber-300 bg-white px-3 py-2 text-xs font-semibold text-amber-900 shadow-sm hover:bg-amber-50"
            >
              What is a creative?
            </Link>
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              className="rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm font-semibold text-neutral-900 shadow-sm hover:bg-neutral-50"
              onClick={() => onComplete("yes")}
            >
              Yes, I have a certificate
            </button>
            <button
              type="button"
              className="rounded-xl bg-ads360yellow-100 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-95"
              onClick={() => onComplete("no")}
            >
              No, apply for me
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
