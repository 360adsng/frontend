import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiError } from "@endpoint/baseFetch";
import { postMyPlatform } from "@endpoint/influencer/influencer";

const inputBase =
  "bg-[#E4E4E4] focus:outline-none px-2 w-full rounded min-h-[38px] md:min-h-[45px]";

function toNumber(v: string): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function toIntNonNegative(v: string): number {
  const n = Math.round(toNumber(v));
  return Math.max(0, Number.isFinite(n) ? n : 0);
}

function newRowId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `row-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

type PlatformFormRow = {
  key: string;
  name: string;
  platformUrl: string;
  username: string;
  numberOfFollowers: string;
  estimatedImpressions: string;
  amountRate: string;
};

function emptyRow(): PlatformFormRow {
  return {
    key: newRowId(),
    name: "",
    platformUrl: "",
    username: "",
    numberOfFollowers: "",
    estimatedImpressions: "",
    amountRate: "",
  };
}

function InfluencerAddPlatform() {
  const nav = useNavigate();
  const queryClient = useQueryClient();
  const [rows, setRows] = useState<PlatformFormRow[]>(() => [emptyRow()]);
  const [isSavingAll, setIsSavingAll] = useState(false);

  const platformOptions = useMemo(
    () => [
      "Instagram",
      "Facebook",
      "X",
      "TikTok",
      "YouTube",
      "Snapchat",
      "LinkedIn",
      "Threads",
    ],
    [],
  );

  const updateRow = (
    key: string,
    patch: Partial<Omit<PlatformFormRow, "key">>,
  ) => {
    setRows((prev) =>
      prev.map((r) => (r.key === key ? { ...r, ...patch } : r)),
    );
  };

  const removeRow = (key: string) => {
    setRows((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((r) => r.key !== key);
    });
  };

  return (
    <section className="bg-ads360-hash min-h-screen px-4 md:px-10 py-14">
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div>
          <h3 className="text-2xl mb-1">Add platform</h3>
          <p className="text-stone-500 text-sm">
            Add one or more platforms to your rate card (saved together).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="rounded-10 border border-ads360yellow-100 bg-white px-4 py-2 text-sm font-semibold text-stone-800 hover:bg-stone-50"
            onClick={() => setRows((prev) => [...prev, emptyRow()])}
          >
            Add more
          </button>
          <Link
            to="/vendors/influencers/rate-card/"
            className="rounded-10 border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-50"
          >
            Back
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-8 my-10">
        {rows.map((row, index) => (
          <div
            key={row.key}
            className="bg-white rounded-10 border border-ads360yellow-100 p-4 shadow-md"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <h4 className="font-semibold text-stone-800">
                Platform {index + 1}
              </h4>
              {rows.length > 1 ? (
                <button
                  type="button"
                  className="text-sm text-red-700 hover:underline"
                  onClick={() => removeRow(row.key)}
                >
                  Remove
                </button>
              ) : null}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1">
              <div>
                <label>Platform</label>
                <select
                  className={inputBase}
                  value={row.name}
                  onChange={(e) =>
                    updateRow(row.key, { name: e.target.value })
                  }
                >
                  <option value="">Select platform</option>
                  {platformOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label>Username</label>
                <input
                  className={inputBase}
                  value={row.username}
                  onChange={(e) =>
                    updateRow(row.key, { username: e.target.value })
                  }
                />
              </div>

              <div className="md:col-span-2">
                <label>Platform URL</label>
                <input
                  className={inputBase}
                  value={row.platformUrl}
                  onChange={(e) =>
                    updateRow(row.key, { platformUrl: e.target.value })
                  }
                />
              </div>

              <div>
                <label>Followers</label>
                <input
                  className={inputBase}
                  type="number"
                  min={0}
                  value={row.numberOfFollowers}
                  onChange={(e) =>
                    updateRow(row.key, {
                      numberOfFollowers: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label>Estimated impressions</label>
                <input
                  className={inputBase}
                  type="number"
                  min={0}
                  value={row.estimatedImpressions}
                  onChange={(e) =>
                    updateRow(row.key, {
                      estimatedImpressions: e.target.value,
                    })
                  }
                />
              </div>

              <div className="md:col-span-2">
                <label>Rate (₦)</label>
                <input
                  className={inputBase}
                  type="number"
                  min={0}
                  step="0.01"
                  value={row.amountRate}
                  onChange={(e) =>
                    updateRow(row.key, { amountRate: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end pb-10">
        <button
          type="button"
          className="rounded bg-ads360yellow-100 px-6 py-2 text-sm text-white disabled:opacity-60"
          disabled={isSavingAll}
          onClick={async () => {
            for (let i = 0; i < rows.length; i++) {
              const row = rows[i];
              const name = row.name.trim();
              const platformUrl = row.platformUrl.trim();
              const username = row.username.trim();
              if (!name || !platformUrl || !username) {
                toast.error(
                  `Platform ${i + 1}: fill platform name, URL, and username.`,
                );
                return;
              }
            }

            setIsSavingAll(true);
            try {
              for (const row of rows) {
                await postMyPlatform({
                  name: row.name.trim(),
                  platformUrl: row.platformUrl.trim(),
                  username: row.username.trim(),
                  numberOfFollowers: toIntNonNegative(row.numberOfFollowers),
                  estimatedImpressions: toIntNonNegative(row.estimatedImpressions),
                  amountRate: toNumber(row.amountRate),
                });
              }
              await queryClient.invalidateQueries({
                queryKey: ["influencer", "platforms"],
              });
              toast.success(
                rows.length > 1
                  ? `${rows.length} platforms added.`
                  : "Platform added.",
              );
              nav({ to: "/vendors/influencers/rate-card/" });
            } catch (err) {
              toast.error(
                err instanceof ApiError
                  ? err.message
                  : "Unable to save platforms.",
              );
            } finally {
              setIsSavingAll(false);
            }
          }}
        >
          {isSavingAll
            ? "Saving..."
            : rows.length > 1
              ? `Save ${rows.length} platforms`
              : "Save platform"}
        </button>
      </div>
    </section>
  );
}

export const Route = createFileRoute("/vendors/influencers/rate-card/add/")({
  component: InfluencerAddPlatform,
});

