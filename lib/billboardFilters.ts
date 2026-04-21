import type { BillboardFilterForm } from "@components/ui/BillboardSorter";
import type { BillboardListQueryParams } from "@endpoint/billboard/billboard";

export function toBillboardListQuery(
  draft: BillboardFilterForm,
  page: number,
  limit: number,
): BillboardListQueryParams {
  const minRaw = draft.minPrice.trim();
  const maxRaw = draft.maxPrice.trim();
  const minPrice = minRaw ? Number(minRaw) : undefined;
  const maxPrice = maxRaw ? Number(maxRaw) : undefined;
  return {
    page,
    limit,
    boardType: draft.boardType || undefined,
    location: draft.location.trim() || undefined,
    minPrice:
      minPrice !== undefined && !Number.isNaN(minPrice) ? minPrice : undefined,
    maxPrice:
      maxPrice !== undefined && !Number.isNaN(maxPrice) ? maxPrice : undefined,
    negotiable:
      draft.negotiable === "all"
        ? undefined
        : draft.negotiable === "yes",
  };
}

export const defaultBillboardFilterForm = (): BillboardFilterForm => ({
  boardType: "",
  minPrice: "",
  maxPrice: "",
  location: "",
  negotiable: "all",
});
