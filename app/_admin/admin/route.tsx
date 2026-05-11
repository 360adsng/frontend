import { Outlet, createFileRoute } from "@tanstack/react-router";
import AdminSideNav from "@components/navs/admin/AdminSideNav";
import AdminNav from "@components/navs/admin/AdminNav";

function AdminShell() {
  return (
    <div className="min-h-screen bg-ads360-hash">
      <main className="md:flex md:min-h-screen">
        {/*
          AdminSideNav is position:fixed, so this column has no intrinsic width and
          would collapse otherwise — main content would sit under the rail.
          Match collapsed / expanded widths to the nav’s w/hover percentages.
        */}
        <section className="group hidden shrink-0 transition-[width] duration-300 md:block md:w-[5.7%] md:hover:w-[18.5%] xl:hover:w-[14.5%]">
          <AdminSideNav />
        </section>
        <section className="min-h-screen min-w-0 flex-1">
          <AdminNav />
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export const Route = createFileRoute("/_admin/admin")({
  ssr: false,
  component: AdminShell,
});

