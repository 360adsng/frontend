"use client";

import { useState } from "react";
import { Modal } from "@components/modal/modal";
import type { TicketPriority } from "./types";

const cancel = "/icons/usericon/modalCancelBotton.svg";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  /** Called with optional image file for multipart upload */
  onSubmit: (input: {
    title: string;
    message: string;
    priority: TicketPriority;
    imageFile: File | null;
  }) => void | Promise<void>;
  isSubmitting?: boolean;
};

export function CreateTicketModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting = false,
}: Props) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState<TicketPriority>("medium");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  function reset() {
    setTitle("");
    setMessage("");
    setPriority("medium");
    setImageFile(null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
  }

  function handleClose() {
    if (isSubmitting) return;
    reset();
    onClose();
  }

  return (
    <Modal isOpen={isOpen}>
      <div className="mx-auto w-11/12 max-w-lg rounded-10 bg-white p-5 md:w-full">
        <div className="mb-4 flex items-start justify-between gap-3">
          <h4 className="font-serif text-lg text-stone-900">Create support ticket</h4>
          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            aria-label="Close"
          >
            <img src={cancel} alt="" className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-3">
          <label className="block">
            <span className="text-xs font-medium text-stone-600">Title</span>
            <input
              className="mt-1 w-full rounded-lg border border-stone-200 p-2.5 text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Short summary"
              disabled={isSubmitting}
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-stone-600">Message</span>
            <textarea
              className="mt-1 w-full rounded-lg border border-stone-200 p-2.5 text-sm"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your issue…"
              disabled={isSubmitting}
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-stone-600">Priority</span>
            <select
              className="mt-1 w-full rounded-lg border border-stone-200 p-2.5 text-sm"
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value as TicketPriority)
              }
              disabled={isSubmitting}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </label>
          <label className="block">
            <span className="text-xs font-medium text-stone-600">
              Attachment (optional)
            </span>
            <input
              type="file"
              accept="image/*"
              className="mt-1 w-full text-sm text-stone-600"
              disabled={isSubmitting}
              onChange={(e) => {
                const f = e.target.files?.[0] ?? null;
                setImageFile(f);
                if (preview) URL.revokeObjectURL(preview);
                setPreview(f ? URL.createObjectURL(f) : null);
              }}
            />
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="mt-2 max-h-32 rounded-lg border object-contain"
              />
            ) : null}
          </label>
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            className="rounded-lg border border-stone-200 px-4 py-2 text-sm"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded-lg bg-ads360yellow-100 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
            disabled={!title.trim() || !message.trim() || isSubmitting}
            onClick={async () => {
              try {
                await onSubmit({
                  title: title.trim(),
                  message: message.trim(),
                  priority,
                  imageFile,
                });
                reset();
                onClose();
              } catch {
                /* mutation shows toast; keep modal open */
              }
            }}
          >
            {isSubmitting ? "Submitting…" : "Submit ticket"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
