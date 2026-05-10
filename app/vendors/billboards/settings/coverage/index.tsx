"use client";

import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  useMe,
  useMyBillboardCoverage,
  useSetMyBillboardCoverage,
} from "@endpoint/users/useUsers";
import {
  BillboardCoverageEditor,
  type BillboardCoverageRow,
} from "@components/vendor-settings/billboards/BillboardCoverageEditor";

const dash = "/icons/dash.svg";

const inputBase =
  "border border-[#c5c4c5] text-[#8B8B8B] focus:outline-none w-full p-2 rounded-10";

function CoverageSettingsPage() {
  const meQuery = useMe();
  const me = meQuery.data;

  const coverageQuery = useMyBillboardCoverage();
  const { mutate: saveCoverage, isPending: isSaving } = useSetMyBillboardCoverage();

  const canEdit = me?.accountType === "billboard_owner";

  const [rows, setRows] = useState<BillboardCoverageRow[]>([{ state: "", lga: [] }]);

  useEffect(() => {
    if (!canEdit) return;
    const cov = coverageQuery.data?.billboardCoverage ?? [];
    if (cov.length) setRows(cov.map((c) => ({ state: c.state, lga: c.lga ?? [] })));
  }, [canEdit, coverageQuery.data]);

  const cleaned = useMemo(
    () => rows.filter((r) => r.state && (r.lga?.length ?? 0) > 0),
    [rows],
  );

  return (
    <div className="w-full h-full bg-[#FDFBF9] py-10">
      <div className="w-[92%] max-w-6xl mx-auto bg-white rounded-10 p-8 md:p-10 border border-[#EEE9E5]">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <img src={dash} alt="" className="w-6 h-6" />
            <div>
              <div className="text-lg font-semibold text-stone-900">
                Billboard coverage
              </div>
              <div className="text-sm text-stone-500">
                Select the states and LGAs you cover.
              </div>
            </div>
          </div>

          <Link
            to="/vendors/billboards/settings/"
            className="text-sm font-semibold text-stone-700 hover:underline"
          >
            Back to settings
          </Link>
        </div>

        {!canEdit ? (
          <div className="mt-6 text-sm text-stone-600">
            You don&apos;t have permission to edit coverage.
          </div>
        ) : (
          <>
            <div className="mt-6">
              <BillboardCoverageEditor
                rows={rows}
                onChange={setRows}
                inputBase={inputBase}
              />
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                className="rounded-10 border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-50"
                onClick={() => setRows([{ state: "", lga: [] }])}
                disabled={isSaving}
              >
                Reset
              </button>
              <button
                type="button"
                className="rounded-10 bg-ads360yellow-100 px-4 py-2 text-sm font-semibold text-black hover:bg-ads360yellow-200 disabled:opacity-60"
                disabled={isSaving}
                onClick={() => saveCoverage({ billboardCoverage: cleaned })}
              >
                {isSaving ? "Saving..." : "Save coverage"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export const Route = createFileRoute("/vendors/billboards/settings/coverage/")({
  component: CoverageSettingsPage,
});

