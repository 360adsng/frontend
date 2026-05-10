"use client";

import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export type PlatformTableRow = {
  id: number | string;
  platform?: string | null;
  username?: string | null;
  followers?: number | null;
  rate?: number | null;
  actionHref: string;
  actionLabel?: string;
};

function formatN(v: number | null | undefined): string {
  if (v == null) return "-";
  if (!Number.isFinite(v)) return String(v);
  return Number(v).toLocaleString();
}

function formatNaira(v: number | null | undefined): string {
  if (v == null) return "-";
  if (!Number.isFinite(v)) return String(v);
  return `₦${Number(v).toLocaleString()}`;
}

function Pagination({
  page,
  pageCount,
  onChange,
}: {
  page: number;
  pageCount: number;
  onChange: (next: number) => void;
}) {
  if (pageCount <= 1) return null;
  const canPrev = page > 1;
  const canNext = page < pageCount;

  return (
    <div className="flex items-center justify-end gap-2 mt-4">
      <button
        type="button"
        disabled={!canPrev}
        onClick={() => onChange(page - 1)}
        className="rounded-10 border border-stone-200 bg-white px-3 py-2 text-sm disabled:opacity-50"
      >
        Previous
      </button>
      <div className="text-sm text-stone-600">
        Page {page} of {pageCount}
      </div>
      <button
        type="button"
        disabled={!canNext}
        onClick={() => onChange(page + 1)}
        className="rounded-10 border border-stone-200 bg-white px-3 py-2 text-sm disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}

export function PlatformsTable({
  rows,
  isLoading,
  isError,
  emptyText = "No platforms found",
  pageSize = 10,
}: {
  rows: PlatformTableRow[] | undefined;
  isLoading?: boolean;
  isError?: boolean;
  emptyText?: string;
  pageSize?: number;
}) {
  const [page, setPage] = useState<number>(1);

  const safeRows = rows ?? [];
  const pageCount = Math.max(1, Math.ceil(safeRows.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const start = (safePage - 1) * pageSize;

  const paged = useMemo(
    () => safeRows.slice(start, start + pageSize),
    [safeRows, start, pageSize],
  );

  return (
    <div>
      <div className="w-full overflow-x-auto mt-4 rounded-10 border border-[#D0B301]/30 bg-white">
        <table className="min-w-full">
          <thead className="bg-[#D0B301]/15">
            <tr className="text-left text-xs font-semibold text-stone-700">
              <th className="py-4 px-4 border-b border-[#D0B301]/25">ID</th>
              <th className="py-4 px-4 border-b border-[#D0B301]/25">PLATFORM</th>
              <th className="py-4 px-4 border-b border-[#D0B301]/25">USERNAME</th>
              <th className="py-4 px-4 border-b border-[#D0B301]/25">
                FOLLOWERS
              </th>
              <th className="py-4 px-4 border-b border-[#D0B301]/25">RATE</th>
              <th className="py-4 px-4 border-b border-[#D0B301]/25">ACTION</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="py-10 px-4 text-center text-stone-500">
                  Loading...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={6} className="py-10 px-4 text-center text-stone-500">
                  Unable to load platforms
                </td>
              </tr>
            ) : paged.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-10 px-4 text-center text-stone-500">
                  {emptyText}
                </td>
              </tr>
            ) : (
              paged.map((r) => (
                <tr key={String(r.id)} className="border-b last:border-b-0">
                  <td className="py-5 px-4 text-stone-800">NG#{r.id}</td>
                  <td className="py-5 px-4 text-stone-800">
                    {r.platform ?? "-"}
                  </td>
                  <td className="py-5 px-4 text-stone-700">
                    {r.username ?? "-"}
                  </td>
                  <td className="py-5 px-4 text-stone-800">
                    {formatN(r.followers ?? null)}
                  </td>
                  <td className="py-5 px-4 text-stone-800">
                    {formatNaira(r.rate ?? null)}
                  </td>
                  <td className="py-5 px-4">
                    <Link
                      to={r.actionHref}
                      className="inline-flex items-center rounded-10 border border-stone-200 bg-white px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50"
                    >
                      {r.actionLabel ?? "Edit"}
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination page={safePage} pageCount={pageCount} onChange={setPage} />
    </div>
  );
}

