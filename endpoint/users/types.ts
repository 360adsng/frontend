export type AccountType =
  | "regular_user"
  | "business_user"
  | "billboard_owner"
  | "influencer"
  | "admin";

export type MeResponse =
  | {
      id: number;
      email: string;
      phone: string;
      accountType: "admin";
      firstName: string;
      lastName: string;
      alternatePhoneNumber?: string | null;
      roles: string[];
    }
  | {
      id: number;
      email: string;
      phone: string;
      accountType: "regular_user";
      firstName: string;
      lastName: string;
      occupation?: string | null;
      address?: string | null;
      alternatePhoneNumber?: string | null;
      profileImage?: string | null;
    }
  | {
      id: number;
      email: string;
      phone: string;
      accountType: "business_user";
      businessName: string;
      contactName: string;
      businessDescription?: string | null;
      alternatePhoneNumber?: string | null;
      profileImage?: string | null;
    }
  | {
      id: number;
      email: string;
      phone: string;
      accountType: "billboard_owner";
      businessName: string | null;
      contactName: string | null;
      businessDescription?: string | null;
      address?: string | null;
      alternatePhoneNumber?: string | null;
      contactPersonEmail?: string | null;
      contactPersonPosition?: string | null;
      billboardCoverage?: Array<{ state: string; lga: string[] }>;
      /** Naira per m² for static / vinyl printing */
      printingPricePerSqMeter?: number | null;
      profileImage?: string | null;
    }
  | {
      id: number;
      email: string;
      phone: string;
      accountType: "influencer";
      firstName: string;
      lastName: string;
      mediaName: string | null;
      influencerType?: string | null;
      address?: string | null;
      alternatePhoneNumber?: string | null;
      bio?: string | null;
      allowNegotiation?: boolean;
      profileImage?: string | null;
    };

export type UpdateProfilePayload = Partial<{
  // individual
  firstName: string;
  lastName: string;
  occupation: string;
  address: string;
  alternatePhoneNumber: string;
  // business
  businessName: string;
  contactName: string;
  businessDescription: string;
  contactPersonEmail: string;
  contactPersonPosition: string;
  billboardCoverage: Array<{ state: string; lga: string[] }>;
  printingPricePerSqMeter: number;
  // influencer
  mediaName: string;
  bio: string;
  allowNegotiation: boolean;
}>;

export type ChangePasswordPayload = {
  oldPassword: string;
  newPassword: string;
};

export type SimpleMessageResponse = {
  message: string;
  printingPricePerSqMeter?: number | null;
};

export type BillboardCoverageRow = { state: string; lga: string[] };
export type MyBillboardCoverageResponse = { billboardCoverage: BillboardCoverageRow[] };

export type UserDashboardData = {
  walletBalance: number;
  activeBookingsCount: number;
  whatsAppCluster: number;
};

export type UserDashboardResponse = {
  message: string;
  data: UserDashboardData;
};
