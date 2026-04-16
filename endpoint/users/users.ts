import { baseFetchJson } from "../baseFetch";
import type {
  ChangePasswordPayload,
  MeResponse,
  SimpleMessageResponse,
  UpdateProfilePayload,
} from "./types";

export function getMe(): Promise<MeResponse> {
  return baseFetchJson<MeResponse>("/users/me", { method: "GET" });
}

export function updateProfile(
  payload: UpdateProfilePayload,
): Promise<SimpleMessageResponse> {
  return baseFetchJson<SimpleMessageResponse>(
    "/users/profile",
    { method: "PATCH", body: payload } as unknown as RequestInit,
  );
}

export function changePassword(
  payload: ChangePasswordPayload,
): Promise<SimpleMessageResponse> {
  return baseFetchJson<SimpleMessageResponse>(
    "/users/password",
    { method: "PATCH", body: payload } as unknown as RequestInit,
  );
}

export type UploadPhotoResponse = { message: string; url: string };

export async function uploadProfilePhoto(file: File): Promise<UploadPhotoResponse> {
  const form = new FormData();
  form.append("file", file);

  return baseFetchJson<UploadPhotoResponse>("/users/profile/photo", {
    method: "POST",
    body: form,
  });
}

