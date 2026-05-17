"use client";

import {
  BillboardListingForm,
  BillboardListingFormPageShell,
  useBillboardListingFormControls,
} from "@components/billboard/BillboardListingForm";
import {
  useMyBillboardListing,
  useUpdateMyBillboardListing,
} from "@endpoint/billboard/useBillboard";
import {
  buildListingPayload,
  listingToForm,
  validateBillboardListingForm,
} from "@lib/billboardListingForm";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function EditBillboardPage() {
  const { slug } = Route.useParams();
  const parsed = Number.parseInt(slug, 10);
  const listingId =
    Number.isFinite(parsed) && parsed > 0 ? parsed : null;

  const { data: bb, isPending, isError, error, refetch } =
    useMyBillboardListing(listingId);
  const { mutate: updateListing, isPending: isSaving } =
    useUpdateMyBillboardListing();

  const { form, setForm, setField } = useBillboardListingFormControls();
  const [hydratedId, setHydratedId] = useState<number | null>(null);
  const [validationError, setValidationError] = useState("");
  const [imagePreviewName, setImagePreviewName] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (!bb) return;
    if (hydratedId === bb.id) return;
    setForm(listingToForm(bb));
    setHydratedId(bb.id);
    setImageFile(null);
    setImagePreviewName("");
    setImagePreviewUrl(null);
    setImageError("");
    setValidationError("");
  }, [bb, hydratedId, setForm]);

  useEffect(() => {
    if (imageFile) return;
    setImagePreviewUrl(bb?.imageUrl?.trim() || null);
  }, [bb?.imageUrl, imageFile]);

  useEffect(() => {
    if (!imageFile) return;
    const url = URL.createObjectURL(imageFile);
    setImagePreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    _accept: string,
  ) => {
    const file = e.target.files?.[0];
    setImageError("");
    if (!file) {
      setImagePreviewName("");
      setImageFile(null);
      return;
    }
    if (!file.type.startsWith("image/")) {
      setImageError("Use a JPG, PNG, or other image file.");
      setImagePreviewName("");
      setImageFile(null);
      e.target.value = "";
      return;
    }
    setImagePreviewName(file.name);
    setImageFile(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");
    if (listingId == null) {
      setValidationError("Invalid listing id.");
      return;
    }
    const result = validateBillboardListingForm(form, {
      requireImage: false,
      hasImage: Boolean(imageFile || bb?.imageUrl),
    });
    if (!result.ok) {
      setValidationError(result.message);
      if (result.imageError) setImageError(result.imageError);
      return;
    }

    updateListing(
      {
        id: listingId,
        payload: buildListingPayload(form),
        imageFile: imageFile ?? undefined,
      },
      {
        onSuccess: () => {
          toast.success("Listing updated");
          void refetch();
          setImageFile(null);
          setImagePreviewName("");
        },
      },
    );
  };

  if (listingId == null) {
    return (
      <section className="min-h-screen bg-[#E9E9E9] px-4 py-14">
        <p className="text-red-700">Invalid billboard link.</p>
      </section>
    );
  }

  if (isPending && !bb) {
    return (
      <section className="min-h-screen bg-[#E9E9E9] px-4 py-14">
        <p className="text-stone-600">Loading listing…</p>
      </section>
    );
  }

  if (isError || !bb) {
    return (
      <section className="min-h-screen bg-[#E9E9E9] px-4 py-14">
        <div className="max-w-lg rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-800">
          <p>
            {error instanceof Error
              ? error.message
              : "Could not load this listing."}
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-3 font-medium underline"
          >
            Try again
          </button>
        </div>
      </section>
    );
  }

  return (
    <BillboardListingFormPageShell
      title="Edit billboard"
      subtitle="Update pricing, schedule, specs, or replace the hero photo. Changes apply to future bookings."
      backLink={
        <Link
          to="/vendors/billboards/listing/$slug"
          params={{ slug: String(listingId) }}
          className="shrink-0 text-sm font-medium text-ads360yellow-100 underline underline-offset-2 hover:text-amber-800"
        >
          ← Back to listing
        </Link>
      }
    >
      <BillboardListingForm
        mode="edit"
        form={form}
        setForm={setForm}
        setField={setField}
        imagePreviewUrl={imagePreviewUrl}
        imagePreviewName={imagePreviewName}
        imageError={imageError}
        onImageChange={handleImageChange}
        validationError={validationError}
        isSubmitting={isSaving}
        onSubmit={handleSubmit}
        submitLabel="Save changes"
        imageRequired={false}
      />
    </BillboardListingFormPageShell>
  );
}

export const Route = createFileRoute("/vendors/billboards/listing/$slug/edit/")({
  component: EditBillboardPage,
});
