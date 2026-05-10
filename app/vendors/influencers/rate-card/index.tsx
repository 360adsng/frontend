import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useMyPlatforms } from "@endpoint/influencer/useInfluencer";
import { PlatformsTable } from "@components/ui/PlatformsTable";
const search = "/icons/search.svg";

const InfluencerRateCard = () => {
  const platformsQuery = useMyPlatforms();

  const [q, setQ] = useState("");

  type PlatformRow = {
    id: number;
    name: string;
    platformUrl: string;
    username: string;
    numberOfFollowers: number;
    amountRate: number;
  };

  const platforms: PlatformRow[] = useMemo(() => {
    const raw = platformsQuery.data?.platforms ?? [];
    return raw.map((p: any) => ({
      id: Number(p.id),
      name: String(p.name ?? ""),
      platformUrl: String(p.platformUrl ?? ""),
      username: String(p.username ?? ""),
      numberOfFollowers: Number(p.numberOfFollowers ?? 0),
      amountRate: Number(p.amountRate ?? 0),
    }));
  }, [platformsQuery.data]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return platforms;
    return platforms.filter((p) =>
      `${p.name} ${p.username} ${p.platformUrl}`.toLowerCase().includes(s),
    );
  }, [platforms, q]);

  return (
    <section className="bg-ads360-hash min-h-screen px-4 md:px-10 py-14">
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div>
          <h3 className="text-2xl mb-1">Rate card</h3>
          <p className="text-stone-500 text-sm">Manage your platforms and pricing.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-end">
          <div className="flex lg:w-1/4 md:w-2/5 bg-[#f7f8f8] space-x-2 rounded-[40px] px-5 h-10">
            <button type="button">
              <img src={search} alt="searchicon" />
            </button>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="rounded-10 w-full bg-transparent focus:outline-none h-full"
              placeholder="search..."
            />
          </div>

          <Link
            to="/vendors/influencers/rate-card/add/"
            className="rounded-10 bg-ads360yellow-100 px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            Add platform
          </Link>
        </div>
      </div>

      <div className="w-full my-5">
        <PlatformsTable
          rows={filtered.map((p) => ({
            id: p.id,
            platform: p.name || "-",
            username: p.username || "-",
            followers: Number(p.numberOfFollowers ?? 0),
            rate: Number(p.amountRate ?? 0),
            actionHref: `/vendors/influencers/rate-card/${p.id}/edit/`,
            actionLabel: "Edit",
          }))}
          isLoading={platformsQuery.isLoading}
          isError={platformsQuery.isError}
          emptyText="No platforms found"
          pageSize={10}
        />
      </div>
    </section>
  );
};

export const Route = createFileRoute("/vendors/influencers/rate-card/")({
  component: InfluencerRateCard,
});

export default InfluencerRateCard;
