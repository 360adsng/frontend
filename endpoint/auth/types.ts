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

export type ForgotPasswordPayload = {
  email: string;
};

export type MessageResponse = {
  message: string;
};

export type ResetPasswordPayload = {
  token: string;
  password: string;
};

export type LoginResponse = {
  id: number;
  email: string;
  accountType:
    | "regular_user"
    | "business_user"
    | "billboard_owner"
    | "influencer"
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
  | "billboard_owner"
  | "influencer";

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
      step: "account" | "business" | "contact" | "fix" | "profile" | "platforms";
      user: VendorOnboardingUser | null;
      business: PublicBillboardBusiness | null;
      profile?: PublicInfluencerProfile | null;
      onboardingProgress?: number;
    }
  | {
      email: string;
      accountType: VendorInviteAccountType;
      status: "submitted";
      businessStatus: string | null;
      user?: VendorOnboardingUser | null;
      profile?: PublicInfluencerProfile | null;
    };

export type PublicInfluencerPlatform = {
  id: number;
  name: string;
  platformUrl: string;
  username: string;
  numberOfFollowers: number;
  estimatedImpressions: number;
  amountRate: number;
};

export type PublicInfluencerProfile = {
  id: number;
  firstName: string;
  lastName: string;
  mediaName: string;
  influencerType?: string | null;
  profilePicture?: string | null;
  alternativePhone?: string | null;
  address: string;
  bio?: string | null;
  allowNegotiation?: boolean;
  userId: number;
  platforms: PublicInfluencerPlatform[];
};

export type InfluencerSignupPayload =
  | {
      inviteToken: string;
      step: 1;
      phoneNumber: string;
      password: string;
    }
  | {
      inviteToken: string;
      step: 2;
      firstName: string;
      lastName: string;
      mediaName: string;
      alternativePhone?: string;
      address: string;
      bio?: string;
      allowNegotiation?: boolean;
      influencerType?: string;
      profilePictureDataUrl?: string;
      profilePictureUrl?: string;
    }
  | {
      inviteToken: string;
      step: 3;
      platforms: Array<{
        name: string;
        platformUrl: string;
        username: string;
        numberOfFollowers: number;
        estimatedImpressions: number;
        amountRate: number;
      }>;
    };

export type InfluencerSignupResponse = {
  step: number;
  message: string;
  onboardingProgress?: number;
  user?: VendorOnboardingUser;
  profile?: PublicInfluencerProfile | null;
  status?: "submitted";
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
