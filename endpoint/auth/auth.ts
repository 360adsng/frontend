import { baseFetchJson } from "../baseFetch";
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from "./types";

/** POST /auth/register — public; does not attach session or run refresh on 401. */
export async function register(
  payload: RegisterPayload,
): Promise<RegisterResponse> {
  return baseFetchJson<RegisterResponse>(
    "/auth/register",
    { method: "POST", body: payload } as unknown as RequestInit,
    { skipAuthRefresh: true },
  );
}

/** POST /auth/login — public; returns { id, accessToken, refreshToken }. */
export async function login(payload: LoginPayload): Promise<LoginResponse> {
  return baseFetchJson<LoginResponse>(
    "/auth/login",
    { method: "POST", body: payload } as unknown as RequestInit,
    { skipAuthRefresh: true },
  );
}

/** POST /auth/sign-out — clears refresh token on backend (requires access token). */
export async function logout(): Promise<void> {
  await baseFetchJson<void>("/auth/sign-out", { method: "POST" });
}
