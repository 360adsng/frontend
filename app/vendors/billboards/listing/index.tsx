import { Link, createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";

import { Modal } from "@components/modal/modal";
import BillboardSorter, {
  type BillboardFilterForm,
} from "@components/ui/BillboardSorter";
import { useMyBillboardListings } from "@endpoint/billboard/useBillboard";
import type { BillboardListQueryParams } from "@endpoint/billboard/billboard";
import {
  boardTypeLabel,
  formatRuntime,
  primaryPrice,
} from "@lib/billboardDisplay";
import {
  defaultBillboardFilterForm,
  toBillboardListQuery,
} from "@lib/billboardFilters";

const naira = "/icons/naira.svg";
const location = "/icons/yellowlocation.svg";

const PAGE_SIZE = 12;

function Billboards() {
  const [draft, setDraft] = useState<BillboardFilterForm>(
    defaultBillboardFilterForm,
  );
  const [query, setQuery] = useState<BillboardListQueryParams>({
    page: 1,
    limit: PAGE_SIZE,
  });

  const { data, isPending, isError, error, refetch } =
    useMyBillboardListings(query);

  const listings = data?.data ?? [];
  const meta = data?.meta;

  const [filter, setFilter] = useState(false);

  const applyFilters = useCallback(() => {
    setQuery(toBillboardListQuery(draft, 1, PAGE_SIZE));
    setFilter(false);
  }, [draft]);

  const goPage = (next: number) => {
    if (!meta) return;
    if (next < 1 || next > meta.totalPages) return;
    setQuery((q) => ({ ...q, page: next }));
  };

  return (
    <>
      <section className="bg-ads360-hash min-h-screen px-4 md:px-10 py-14">
        <div>
          <h3 className="text-2xl">Billboard listing</h3>
          <p>Check here for all your billboards</p>
        </div>

        <section className="xl:flex my-5">
          <div className="gap-4 md:pr-4 grid grid-cols-1 md:grid-cols-2 basis-4/5">
            {isPending ? (
              <p className="text-neutral-600 col-span-full">
                Loading your billboards…
              </p>
            ) : null}

            {isError ? (
              <div className="col-span-full rounded border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                <p>
                  {error instanceof Error
                    ? error.message
                    : "Could not load billboards."}
                </p>
                <button
                  type="button"
                  onClick={() => refetch()}
                  className="mt-2 underline"
                >
                  Try again
                </button>
              </div>
            ) : null}

            {!isPending && !isError && listings.length === 0 ? (
              <p className="text-neutral-600 col-span-full">
                No billboards match your filters yet.
              </p>
            ) : null}

            {listings.map((billboard) => (
              <div
                className="rounded bg-white border border-ads360yellow-100"
                key={billboard.id}
              >
                <div className="relative">
                  {billboard.isNegotiable ? (
                    <div className="absolute w-1/2 md:w-2/3 xl:w-1/2 bg-ads360black-100/70 text-ads360light-100 rounded right-3 top-4 text-center py-2">
                      Negotiable
                    </div>
                  ) : null}

                  <img
                    alt={billboard.name}
                    src={billboard.imageUrl}
                    className="w-full rounded-t h-auto object-cover max-h-80"
                  />
                  <div className="flex text-ads360yellow-100 font-bold w-full text-sm md:text-base p-2">
                    <img src={location} alt="" />
                    {billboard.name.toLocaleUpperCase()}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 my-3 w-11/12 mx-auto">
                  <div className="my-1">
                    <span className="font-bold">location: </span>
                    {billboard.address}, {billboard.city}, {billboard.state}
                  </div>

                  {billboard.durationPerDisplay != null ? (
                    <div className="my-1">
                      <p>
                        <span className="font-bold">Display: </span>
                        {billboard.durationPerDisplay}s per rotation
                      </p>
                    </div>
                  ) : null}

                  <div className="my-1">
                    <p>
                      <span className="font-bold">Board-type: </span>
                      {boardTypeLabel(billboard.boardType)}
                    </p>
                  </div>

                  <div className="my-1">
                    <p>
                      <span className="font-bold">Run-time: </span>
                      {formatRuntime(billboard)}
                    </p>
                  </div>
                </div>

                <div className="mb-5 flex justify-between mx-auto w-11/12">
                  <div className="flex items-center">
                    <img src={naira} alt="naira sign" />
                    From ₦{primaryPrice(billboard.pricing)}
                  </div>

                  <button
                    type="button"
                    className="group rounded-10 hover:animate-changeColor hover:text-white border bg-ads360yellow-100 w-123 h-12"
                  >
                    <Link
                      to="/vendors/billboards/listing/$slug"
                      params={{ slug: String(billboard.id) }}
                    >
                      View Details
                    </Link>
                  </button>
                </div>
              </div>
            ))}

            {meta && meta.totalPages > 1 ? (
              <div className="col-span-full flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200 pt-4">
                <p className="text-sm text-neutral-600">
                  Page {meta.page} of {meta.totalPages} ({meta.total} total)
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={meta.page <= 1 || isPending}
                    onClick={() => goPage(meta.page - 1)}
                    className="rounded border border-ads360yellow-100 bg-white px-3 py-1.5 text-sm disabled:opacity-40"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    disabled={meta.page >= meta.totalPages || isPending}
                    onClick={() => goPage(meta.page + 1)}
                    className="rounded border border-ads360yellow-100 bg-white px-3 py-1.5 text-sm disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          <div className="basis-1/5 text-sm hidden xl:block">
            <div className="top-[12.5rem] sticky rounded border p-3 border-ads360yellow-100 bg-white ">
              <BillboardSorter
                modal={false}
                toggleModal={() => {}}
                value={draft}
                onChange={setDraft}
                onApply={applyFilters}
              />
            </div>
          </div>

          {filter === false ? (
            <div className="fixed w-full left-3 bottom-5 xl:hidden">
              <button
                type="button"
                className="rounded-10 font-bold border bg-ads360yellow-100 shadow-md border-white w-12 h-12"
                onClick={() => setFilter(true)}
              >
                Filter
              </button>
            </div>
          ) : null}
        </section>
      </section>

      <Modal isOpen={filter}>
        <div className="bg-white p-3 w-10/12 md:w-9/12 mx-auto rounded-10">
          <BillboardSorter
            modal
            toggleModal={() => setFilter(false)}
            value={draft}
            onChange={setDraft}
            onApply={applyFilters}
          />
        </div>
      </Modal>
    </>
  );
}

export const Route = createFileRoute("/vendors/billboards/listing/")({
  component: Billboards,
});

export default Billboards;
