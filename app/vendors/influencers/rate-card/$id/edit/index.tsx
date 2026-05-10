import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useEditMyPlatform, useMyPlatforms } from "@endpoint/influencer/useInfluencer";

const inputBase =
  "bg-[#E4E4E4] focus:outline-none px-2 w-full rounded min-h-[38px] md:min-h-[45px]";

function toNumber(v: string): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function InfluencerEditPlatform() {
  const nav = useNavigate();
  const { id } = Route.useParams();
  const platformId = Number(id);

  const platformsQuery = useMyPlatforms();
  const editPlatform = useEditMyPlatform();

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

  const target = useMemo(() => {
    const raw = platformsQuery.data?.platforms ?? [];
    return raw.find((p: any) => Number(p.id) === platformId) ?? null;
  }, [platformsQuery.data, platformId]);

  const [form, setForm] = useState({
    name: "",
    platformUrl: "",
    username: "",
    numberOfFollowers: "",
    estimatedImpressions: "",
    amountRate: "",
  });

  useEffect(() => {
    if (!target) return;
    setForm({
      name: String((target as any).name ?? ""),
      platformUrl: String((target as any).platformUrl ?? ""),
      username: String((target as any).username ?? ""),
      numberOfFollowers: String((target as any).numberOfFollowers ?? 0),
      estimatedImpressions: String((target as any).estimatedImpressions ?? 0),
      amountRate: String((target as any).amountRate ?? 0),
    });
  }, [target]);

  return (
    <section className="bg-ads360-hash min-h-screen px-4 md:px-10 py-14">
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div>
          <h3 className="text-2xl mb-1">Edit platform</h3>
          <p className="text-stone-500 text-sm">
            Update your platform details and pricing.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/vendors/influencers/rate-card/"
            className="rounded-10 border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-50"
          >
            Back
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-10 border border-ads360yellow-100 my-10 p-4 shadow-md">
        {platformsQuery.isLoading ? (
          <div className="py-10 px-4 text-stone-500">Loading...</div>
        ) : platformsQuery.isError ? (
          <div className="py-10 px-4 text-stone-500">
            Unable to load platform.
          </div>
        ) : !target ? (
          <div className="py-10 px-4 text-stone-500">Platform not found.</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1">
              <div>
                <label>Platform</label>
                <select
                  className={inputBase}
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
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
                  value={form.username}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, username: e.target.value }))
                  }
                />
              </div>

              <div className="md:col-span-2">
                <label>Platform URL</label>
                <input
                  className={inputBase}
                  value={form.platformUrl}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, platformUrl: e.target.value }))
                  }
                />
              </div>

              <div>
                <label>Followers</label>
                <input
                  className={inputBase}
                  type="number"
                  min={0}
                  value={form.numberOfFollowers}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      numberOfFollowers: e.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <label>Estimated impressions</label>
                <input
                  className={inputBase}
                  type="number"
                  min={0}
                  value={form.estimatedImpressions}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      estimatedImpressions: e.target.value,
                    }))
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
                  value={form.amountRate}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, amountRate: e.target.value }))
                  }
                />
              </div>
            </div>

            <div className="flex justify-end mt-5">
              <button
                type="button"
                className="rounded bg-ads360yellow-100 px-4 py-2 text-sm text-white disabled:opacity-60"
                disabled={editPlatform.isPending}
                onClick={() => {
                  editPlatform.mutate(
                    {
                      id: platformId,
                      patch: {
                        name: form.name.trim(),
                        platformUrl: form.platformUrl.trim(),
                        username: form.username.trim(),
                        numberOfFollowers: toNumber(form.numberOfFollowers),
                        estimatedImpressions: toNumber(form.estimatedImpressions),
                        amountRate: toNumber(form.amountRate),
                      },
                    },
                    {
                      onSuccess: () => {
                        nav({ to: "/vendors/influencers/rate-card/" });
                      },
                    },
                  );
                }}
              >
                {editPlatform.isPending ? "Saving..." : "Save changes"}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export const Route = createFileRoute(
  "/vendors/influencers/rate-card/$id/edit/",
)({
  component: InfluencerEditPlatform,
});

export default InfluencerEditPlatform;

