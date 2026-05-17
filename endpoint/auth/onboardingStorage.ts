import { baseFetchJson } from "../baseFetch";
import type { PresignUploadResponse } from "../storage/r2";

function defaultContentType(file: File): string {
  if (file.type) return file.type;
  const lower = file.name.toLowerCase();
  if (lower.endsWith(".pdf")) return "application/pdf";
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".webp")) return "image/webp";
  return "image/jpeg";
}

/** Presign + PUT for vendor onboarding (CAC, logo) — no JWT; uses invite token. */
export async function uploadVendorOnboardingFile(
  file: File,
  inviteToken: string,
): Promise<{ publicUrl: string; key: string }> {
  const contentType = defaultContentType(file);
  const presign = await baseFetchJson<PresignUploadResponse>(
    "/auth/vendor-onboarding/presign",
    {
      method: "POST",
      body: {
        inviteToken,
        fileName: file.name || "upload",
        contentType,
      },
    } as unknown as RequestInit,
    { skipAuthRefresh: true },
  );

  const res = await fetch(presign.uploadUrl, {
    method: "PUT",
    body: file,
    headers: { "Content-Type": contentType },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Upload failed (${res.status})${text ? `: ${text.slice(0, 200)}` : ""}`,
    );
  }

  return { publicUrl: presign.publicUrl, key: presign.key };
}
