import { baseFetchJson } from "../baseFetch";
import type {
  BillboardOwnerSignupPayload,
  BillboardOwnerSignupResponse,
  ForgotPasswordPayload,
  InfluencerSignupPayload,
  InfluencerSignupResponse,
  LoginPayload,
  LoginResponse,
  MessageResponse,
  RegisterPayload,
  RegisterResponse,
  ResetPasswordPayload,
  VendorOnboardingPayload,
  VendorOnboardingResponse,
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

/** POST /auth/forgot-password — public; generic success message for enumeration safety. */
export async function forgotPassword(
  payload: ForgotPasswordPayload,
): Promise<MessageResponse> {
  return baseFetchJson<MessageResponse>(
    "/auth/forgot-password",
    { method: "POST", body: payload } as unknown as RequestInit,
    { skipAuthRefresh: true },
  );
}

/** POST /auth/reset-password — public; body: { token, password }. */
export async function resetPassword(
  payload: ResetPasswordPayload,
): Promise<MessageResponse> {
  return baseFetchJson<MessageResponse>(
    "/auth/reset-password",
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

/** POST /auth/vendor-onboarding — public; validates invite token and returns onboarding step. */
export async function vendorOnboarding(
  payload: VendorOnboardingPayload,
): Promise<VendorOnboardingResponse> {
  return baseFetchJson<VendorOnboardingResponse>(
    "/auth/vendor-onboarding",
    { method: "POST", body: payload } as unknown as RequestInit,
    { skipAuthRefresh: true },
  );
}

/** POST /auth/billboard-owner-signup — public; progressive billboard onboarding. */
export async function billboardOwnerSignup(
  payload: BillboardOwnerSignupPayload,
): Promise<BillboardOwnerSignupResponse> {
  return baseFetchJson<BillboardOwnerSignupResponse>(
    "/auth/billboard-owner-signup",
    { method: "POST", body: payload } as unknown as RequestInit,
    { skipAuthRefresh: true },
  );
}

/** POST /auth/influencer-signup — public; progressive influencer onboarding. */
export async function influencerSignup(
  payload: InfluencerSignupPayload,
): Promise<InfluencerSignupResponse> {
  return baseFetchJson<InfluencerSignupResponse>(
    "/auth/influencer-signup",
    { method: "POST", body: payload } as unknown as RequestInit,
    { skipAuthRefresh: true },
  );
}
