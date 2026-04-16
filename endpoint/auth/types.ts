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
  accountType: "regular_user" | "business_user" | "admin";
  phoneNumber: string;
  isEmailVerified: string | null;
  accessToken: string;
  refreshToken: string;
};
