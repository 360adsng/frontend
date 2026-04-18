export type AccountType =
  | "regular_user"
  | "business_user"
  | "billboard_owner"
  | "admin";

export type MeResponse =
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
    };

export type UpdateProfilePayload = Partial<{
  // individual
  firstName: string;
  lastName: string;
  occupation: string;
  address: string;
  alternatePhoneNumber: string;
  // business
  contactName: string;
  businessDescription: string;
}>;

export type ChangePasswordPayload = {
  oldPassword: string;
  newPassword: string;
};

export type SimpleMessageResponse = { message: string };
