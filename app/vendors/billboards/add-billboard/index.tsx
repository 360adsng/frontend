"use client";

import { Modal } from "@components/modal/modal";
import {
  BillboardListingForm,
  BillboardListingFormPageShell,
  useBillboardListingFormControls,
} from "@components/billboard/BillboardListingForm";
import { useCreateBillboardListing } from "@endpoint/billboard/useBillboard";
import {
  buildListingPayload,
  cloneInitialForm,
  validateBillboardListingForm,
} from "@lib/billboardListingForm";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export {
  AUDIENCE_TYPES,
  FACING_DIRECTION,
  ILLUMINATION,
  USP_PLACEHOLDER,
} from "@lib/billboardListingForm";

function AddBillboardPage() {
  const navigate = useNavigate();
  const { mutate: createListing, isPending } = useCreateBillboardListing();
  const { form, setForm, setField } = useBillboardListingFormControls();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [imagePreviewName, setImagePreviewName] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (!imageFile) {
      setImagePreviewUrl(null);
      return;
    }
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
    const result = validateBillboardListingForm(form, {
      requireImage: true,
      hasImage: Boolean(imageFile),
    });
    if (!result.ok) {
      setValidationError(result.message);
      if (result.imageError) setImageError(result.imageError);
      return;
    }
    if (!imageFile) return;

    createListing(
      { payload: buildListingPayload(form), imageFile },
      { onSuccess: () => setShowSuccessModal(true) },
    );
  };

  return (
    <>
      <BillboardListingFormPageShell
        title="Add billboard"
        subtitle="Create a listing with location, pricing tiers, schedule, and creative specs. Your hero photo is what advertisers see first."
        backLink={
          <Link
            to="/vendors/billboards/listing"
            className="shrink-0 text-sm font-medium text-ads360yellow-100 underline underline-offset-2 hover:text-amber-800"
          >
            ← My listings
          </Link>
        }
      >
        <BillboardListingForm
          mode="create"
          form={form}
          setForm={setForm}
          setField={setField}
          imagePreviewUrl={imagePreviewUrl}
          imagePreviewName={imagePreviewName}
          imageError={imageError}
          onImageChange={handleImageChange}
          validationError={validationError}
          isSubmitting={isPending}
          onSubmit={handleSubmit}
          submitLabel="Publish listing"
          imageRequired
        />
      </BillboardListingFormPageShell>

      <Modal isOpen={showSuccessModal}>
        <div className="mx-auto w-11/12 max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">
          <div className="border-b border-stone-100 bg-emerald-50 px-5 py-4">
            <p className="font-semibold text-emerald-900">
              Billboard published
            </p>
            <p className="mt-1 text-sm text-emerald-800">
              Your listing is live. Add another face or return to your listings.
            </p>
          </div>
          <div className="flex flex-col gap-2 p-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => {
                setShowSuccessModal(false);
                setValidationError("");
                setForm(cloneInitialForm());
                setImagePreviewName("");
                setImageFile(null);
                setImageError("");
              }}
              className="rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm font-semibold text-stone-800 hover:bg-stone-50"
            >
              Add another
            </button>
            <button
              type="button"
              onClick={() => navigate({ to: "/vendors/billboards/listing" })}
              className="rounded-xl bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-stone-800"
            >
              View listings
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export const Route = createFileRoute("/vendors/billboards/add-billboard/")({
  component: AddBillboardPage,
});

