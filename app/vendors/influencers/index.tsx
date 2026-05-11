import { lazy, Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";

const InfluencerVendorDashboard = lazy(
  () => import("./-InfluencerVendorDashboard"),
);

function DashboardRouteFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center bg-ads360-hash px-4 text-stone-500">
      Loading dashboard…
    </div>
  );
}

function InfluencerVendorDashboardRoute() {
  return (
    <Suspense fallback={<DashboardRouteFallback />}>
      <InfluencerVendorDashboard />
    </Suspense>
  );
}

export const Route = createFileRoute("/vendors/influencers/")({
  component: InfluencerVendorDashboardRoute,
});
