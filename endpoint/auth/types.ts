/** Mirrors 360backend `CreateUserDto` / `AccountType` for registration. */

export type RegisterResponse = {
  message: string;
};

type RegisterRegular = {
  accountType: "regular_user";
  email: string;
  password: string;
  phone: string;
  firstName: string;
  lastName: string;
};

type RegisterBusiness = {
  accountType: "business_user";
  email: string;
  password: string;
  phone: string;
  businessName: string;
  contactName: string;
};

export type RegisterPayload = RegisterRegular | RegisterBusiness;

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  id: number;
  email: string;
  accountType:
    | "regular_user"
    | "business_user"
    | "billboard_owner"
    | "admin";
  phoneNumber: string;
  isEmailVerified: string | null;
  accessToken: string;
  refreshToken: string;
};

export type VendorOnboardingPayload = {
  inviteToken: string;
};

/** Matches backend `AccountType` for invites (e.g. billboard_owner). */
export type VendorInviteAccountType =
  | "admin"
  | "regular_user"
  | "business_user"
  | "billboard_owner";

export type BillboardCoverageDto = { state: string; lga: string[] };

export type PublicBillboardBusiness = {
  id: number;
  businessName: string;
  businessAddress: string;
  cac: string;
  businessWebsite: string | null;
  businessLogo: string | null;
  billboardCoverage: BillboardCoverageDto[];
  contactPersonName: string;
  contactPersonPhone: string | null;
  contactPersonEmail: string | null;
  contactPersonPosition: string | null;
  verificationStatus: string;
  /** Present when admin rejected the application */
  verificationRejectionReason?: string | null;
};

export type VendorOnboardingUser = {
  id: number;
  email: string;
  phone: string;
  accountType: string;
};

export type VendorOnboardingResponse =
  | {
      email: string;
      accountType: VendorInviteAccountType;
      step: "account" | "business" | "contact" | "fix";
      user: VendorOnboardingUser | null;
      business: PublicBillboardBusiness | null;
      onboardingProgress?: number;
    }
  | {
      email: string;
      accountType: VendorInviteAccountType;
      status: "submitted";
      businessStatus: string | null;
    };

export type BillboardOwnerSignupPayload =
  | {
      inviteToken: string;
      step: 1;
      phoneNumber: string;
      password: string;
    }
  | {
      inviteToken: string;
      step: 2;
      businessName: string;
      address: string;
      billboardCoverage: BillboardCoverageDto[];
      website?: string;
      cacUrl?: string;
      cacDataUrl?: string;
      logoUrl?: string;
      logoDataUrl?: string;
    }
  | {
      inviteToken: string;
      step: 3;
      contactName: string;
      contactPhone: string;
      contactEmail: string;
      contactPosition: string;
    };

export type BillboardOwnerSignupResponse = {
  step: number;
  message: string;
  onboardingProgress?: number;
  user?: VendorOnboardingUser;
  business?: PublicBillboardBusiness | null;
  status?: "submitted";
};
