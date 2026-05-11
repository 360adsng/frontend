import { baseFetchJson } from "../baseFetch";
import { uploadFileToR2 } from "../storage/r2";
import type {
  ChangePasswordPayload,
  MeResponse,
  MyBillboardCoverageResponse,
  SimpleMessageResponse,
  UpdateProfilePayload,
  UserDashboardResponse,
} from "./types";

export function getMe(): Promise<MeResponse> {
  return baseFetchJson<MeResponse>("/users/me", { method: "GET" });
}

export function getUserDashboard(): Promise<UserDashboardResponse> {
  return baseFetchJson<UserDashboardResponse>("/users/dashboard", {
    method: "GET",
  });
}

export function updateProfile(
  payload: UpdateProfilePayload,
): Promise<SimpleMessageResponse> {
  return baseFetchJson<SimpleMessageResponse>(
    "/users/profile",
    { method: "PATCH", body: payload } as unknown as RequestInit,
  );
}

export function getMyBillboardCoverage(): Promise<MyBillboardCoverageResponse> {
  return baseFetchJson<MyBillboardCoverageResponse>("/users/me/billboard-coverage", {
    method: "GET",
  });
}

export function setMyBillboardCoverage(payload: {
  billboardCoverage: Array<{ state: string; lga: string[] }>;
}): Promise<SimpleMessageResponse> {
  return baseFetchJson<SimpleMessageResponse>("/users/me/billboard-coverage", {
    method: "PATCH",
    body: payload,
  } as unknown as RequestInit);
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
  const { publicUrl } = await uploadFileToR2(file, "profile");
  return baseFetchJson<UploadPhotoResponse>("/users/profile/photo", {
    method: "POST",
    body: { imageUrl: publicUrl },
  } as unknown as RequestInit);
}

