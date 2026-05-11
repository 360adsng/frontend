import { baseFetchJson } from "../baseFetch";

export type StorageUploadKind =
  | "profile"
  | "billboard"
  | "influencer"
  | "booking"
  | "dispute"
  | "support"
  | "signup";

export type PresignUploadResponse = {
  uploadUrl: string;
  key: string;
  publicUrl: string;
  expiresIn: number;
};

export function postStoragePresign(body: {
  kind: StorageUploadKind;
  fileName: string;
  contentType: string;
}): Promise<PresignUploadResponse> {
  return baseFetchJson<PresignUploadResponse>("/storage/presign", {
    method: "POST",
    body,
  } as unknown as RequestInit);
}

/**
 * Client-side direct upload to Cloudflare R2 using a presigned URL from the API.
 */
export async function uploadFileToR2(
  file: File,
  kind: StorageUploadKind,
): Promise<{ publicUrl: string; key: string }> {
  const contentType = file.type || "image/jpeg";
  const presign = await postStoragePresign({
    kind,
    fileName: file.name || "upload.jpg",
    contentType,
  });
  const res = await fetch(presign.uploadUrl, {
    method: "PUT",
    body: file,
    headers: { "Content-Type": contentType },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `R2 upload failed (${res.status})${text ? `: ${text.slice(0, 200)}` : ""}`,
    );
  }
  return { publicUrl: presign.publicUrl, key: presign.key };
}
