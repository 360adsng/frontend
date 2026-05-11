import { lazy, Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";

const BillBoardDashboard = lazy(() => import("./-BillBoardDashboard"));

function DashboardRouteFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center bg-ads360-hash px-4 text-stone-500">
      Loading dashboard…
    </div>
  );
}

function BillboardVendorDashboardRoute() {
  return (
    <Suspense fallback={<DashboardRouteFallback />}>
      <BillBoardDashboard />
    </Suspense>
  );
}

export const Route = createFileRoute("/vendors/billboards/")({
  component: BillboardVendorDashboardRoute,
});
