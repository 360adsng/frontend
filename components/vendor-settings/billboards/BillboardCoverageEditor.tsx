"use client";

import { useMemo } from "react";
import { NIGERIA_STATES_LGAS, getStateById } from "../../../lib/nigeriaStatesLgas";

export type BillboardCoverageRow = { state: string; lga: string[] };

export function BillboardCoverageEditor({
  rows,
  onChange,
  inputBase,
}: {
  rows: BillboardCoverageRow[];
  onChange: (next: BillboardCoverageRow[]) => void;
  inputBase: string;
}) {
  const stateOptions = useMemo(
    () =>
      NIGERIA_STATES_LGAS.map((s) => ({
        id: s.id,
        name: s.name,
      })),
    [],
  );

  const setRowState = (index: number, stateId: string) => {
    onChange(rows.map((r, i) => (i === index ? { state: stateId, lga: [] } : r)));
  };

  const addRow = () => onChange([...rows, { state: "", lga: [] }]);
  const removeRow = (index: number) =>
    onChange(rows.length <= 1 ? rows : rows.filter((_, i) => i !== index));

  const toggleLga = (rowIndex: number, lgaName: string) => {
    onChange(
      rows.map((r, i) => {
        if (i !== rowIndex) return r;
        const next = new Set(r.lga);
        if (next.has(lgaName)) next.delete(lgaName);
        else next.add(lgaName);
        return { ...r, lga: Array.from(next) };
      }),
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <div>
          <div className="font-medium text-stone-900">Billboard coverage</div>
          <div className="text-xs text-stone-500">
            Select the states and LGAs you cover.
          </div>
        </div>
        <button
          type="button"
          className="rounded-10 border border-stone-200 bg-white px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50"
          onClick={addRow}
        >
          Add state
        </button>
      </div>

      <div className="mt-3 space-y-4">
        {rows.map((r, idx) => {
          const lgas = getStateById(r.state)?.lgas ?? [];

          return (
            <div key={`${idx}-${r.state}`} className="rounded-10 border border-stone-200 p-3">
              <div className="flex items-center justify-between gap-2">
                <div className="w-full max-w-sm">
                  <label className="text-sm text-stone-700">State</label>
                  <select
                    className={inputBase}
                    value={r.state}
                    onChange={(e) => setRowState(idx, e.target.value)}
                  >
                    <option value="">Select state</option>
                    {stateOptions.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  className="text-xs text-red-700 hover:underline"
                  onClick={() => removeRow(idx)}
                >
                  Remove
                </button>
              </div>

              {r.state ? (
                <div className="mt-3">
                  <div className="text-sm text-stone-700 mb-2">LGAs</div>
                  {lgas.length === 0 ? (
                    <div className="text-sm text-stone-500">No LGAs found.</div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {lgas.map((name) => {
                        const checked = r.lga.includes(name);
                        return (
                          <label
                            key={name}
                            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs cursor-pointer ${
                              checked
                                ? "border-ads360yellow-100 bg-amber-50/60"
                                : "border-stone-200 hover:bg-stone-50"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleLga(idx, name)}
                            />
                            <span>{name}</span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

