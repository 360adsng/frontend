import { useId, useRef, useState } from "react";

/** Per-file cap for direct R2 upload. */
export const VENDOR_UPLOAD_MAX_BYTES = 8 * 1024 * 1024;

type VendorDocumentUploadProps = {
  label: string;
  hint?: string;
  required?: boolean;
  accept: string;
  previewUrl: string | null;
  fileName?: string | null;
  onSelect: (file: File) => void | Promise<void>;
  onClear: () => void;
  uploading?: boolean;
};

function isPdf(url: string, name?: string | null) {
  const n = (name ?? url).toLowerCase();
  return n.endsWith(".pdf") || url.includes("application/pdf");
}

export default function VendorDocumentUpload({
  label,
  hint,
  required,
  accept,
  previewUrl,
  fileName,
  onSelect,
  onClear,
  uploading = false,
}: VendorDocumentUploadProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [sizeError, setSizeError] = useState<string | null>(null);
  const showImage =
    previewUrl &&
    !isPdf(previewUrl, fileName) &&
    (previewUrl.startsWith("data:image") ||
      previewUrl.startsWith("blob:") ||
      /\.(png|jpe?g|webp|gif)(\?|$)/i.test(previewUrl));

  return (
    <div className="my-3">
      <label htmlFor={inputId} className="block font-medium">
        {label}
        {required ? <span className="text-red-600"> *</span> : null}
      </label>
      {hint ? (
        <p className="mt-1 text-xs text-gray-600 leading-snug">{hint}</p>
      ) : null}

      <div
        className={`mt-2 rounded-xl border-2 border-dashed p-4 transition-colors ${
          previewUrl
            ? "border-ads360yellow-100 bg-amber-50/40"
            : "border-stone-300 bg-stone-50 hover:border-stone-400"
        }`}
      >
        {previewUrl ? (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {showImage ? (
              <img
                src={previewUrl}
                alt=""
                className="h-24 w-24 shrink-0 rounded-lg border border-stone-200 object-cover bg-white"
              />
            ) : (
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg border border-stone-200 bg-white text-xs font-semibold text-stone-600">
                PDF
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-stone-800">
                {fileName ?? "Document uploaded"}
              </p>
              <a
                href={previewUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-block text-sm text-ads360yellow-100 underline"
              >
                View file
              </a>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <button
                type="button"
                disabled={uploading}
                className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm font-medium hover:bg-stone-50 disabled:opacity-50"
                onClick={() => inputRef.current?.click()}
              >
                Replace
              </button>
              <button
                type="button"
                disabled={uploading}
                className="rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-50"
                onClick={onClear}
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-2">
            <p className="text-sm text-stone-600">
              {uploading
                ? "Uploading to storage…"
                : "Choose a file to upload (stored securely in the cloud)"}
            </p>
            <button
              type="button"
              disabled={uploading}
              className="mt-3 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-50"
              onClick={() => inputRef.current?.click()}
            >
              {uploading ? "Uploading…" : "Choose file"}
            </button>
          </div>
        )}

        <input
          id={inputId}
          ref={inputRef}
          type="file"
          accept={accept}
          className="sr-only"
          onChange={(e) => {
            const f = e.target.files?.[0] ?? null;
            if (!f) return;
            if (f.size > VENDOR_UPLOAD_MAX_BYTES) {
              setSizeError("File is too large. Maximum size is 8MB.");
              e.target.value = "";
              return;
            }
            setSizeError(null);
            onSelect(f);
            e.target.value = "";
          }}
        />
      </div>
      {sizeError ? (
        <p className="mt-1 text-sm text-red-600">{sizeError}</p>
      ) : null}
    </div>
  );
}

