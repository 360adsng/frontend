"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { NigerianBank } from "@endpoint/wallet/wallet";

/** Above modal overlay (`z-[10000000]`). */
const MENU_Z = 10000050;

type Props = {
  id?: string;
  banks: NigerianBank[];
  bankCode: string;
  onBankCodeChange: (code: string) => void;
  disabled?: boolean;
  placeholder?: string;
};

export function BankSelect({
  id = "vendor-bank-select",
  banks,
  bankCode,
  onBankCodeChange,
  disabled,
  placeholder = "Search or choose bank…",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const selected = useMemo(
    () =>
      banks.find((b) => String(b.code).trim() === String(bankCode).trim()) ??
      null,
    [banks, bankCode],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return banks;
    return banks.filter((b) => b.name.toLowerCase().includes(q));
  }, [banks, query]);

  useEffect(() => {
    const onDocDown = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el || el.contains(e.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onDocDown);
    return () => document.removeEventListener("mousedown", onDocDown);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const listboxId = `${id}-listbox`;
  const inputValue = open ? query : (selected?.name ?? "");

  return (
    <div ref={containerRef} className="relative">
      <input
        id={id}
        type="text"
        autoComplete="off"
        disabled={disabled}
        value={inputValue}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => {
          setOpen(true);
          setQuery(selected?.name ?? "");
        }}
        placeholder={placeholder}
        className="mt-1 w-full min-h-[40px] rounded-lg border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300/40"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        aria-autocomplete="list"
        role="combobox"
      />
      {open && !disabled ? (
        <ul
          id={listboxId}
          role="listbox"
          className="absolute left-0 right-0 top-full z-10 max-h-56 overflow-y-auto rounded-lg border border-stone-200 bg-white py-1 shadow-lg"
          style={{ zIndex: MENU_Z }}
        >
          {filtered.length === 0 ? (
            <li className="px-3 py-2 text-sm text-stone-500">
              No bank matches your search
            </li>
          ) : (
            filtered.map((b) => {
              const code = String(b.code);
              const isActive = code === String(bankCode);
              return (
                <li key={code} role="option" aria-selected={isActive}>
                  <button
                    type="button"
                    className={`w-full px-3 py-2 text-left text-sm hover:bg-stone-50 ${
                      isActive ? "bg-amber-50/80 font-medium" : ""
                    }`}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      onBankCodeChange(code);
                      setQuery(b.name);
                      setOpen(false);
                    }}
                  >
                    {b.name}
                  </button>
                </li>
              );
            })
          )}
        </ul>
      ) : null}
    </div>
  );
}
