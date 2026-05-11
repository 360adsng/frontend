import type { ReactNode } from "react";

export function PlaceholderSection({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-ads360-hash min-h-screen px-4 md:px-10 py-14">
      <h3 className="text-2xl mb-2">{title}</h3>
      <p className="text-stone-500 text-sm mb-6">
        This section is coming soon. You can build out campaigns, requests, and more here.
      </p>
      <div className="shadow border-ads360yellow-100 bg-white rounded-10 border p-6 min-h-[200px]">
        {children ?? (
          <p className="text-stone-400 text-sm">No content yet.</p>
        )}
      </div>
    </section>
  );
}
