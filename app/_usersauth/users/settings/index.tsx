"use client";

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import type { CountryCode } from "libphonenumber-js";
import {
  useChangePassword,
  useMe,
  useUploadProfilePhoto,
  useUpdateProfile,
} from "@endpoint/users/useUsers";
import { COUNTRIES } from "../../../../lib/countries";

const dash = "/icons/dash.svg";
const avatarFallback = "/icons/user.png";

type Tab = "profile" | "password";

const profileSchemaRegular = z.object({
  firstName: z.string().trim().min(1, "First name is required."),
  lastName: z.string().trim().min(1, "Last name is required."),
  occupation: z.string().trim().optional(),
  address: z.string().trim().optional(),
  altPhoneCountryIso2: z.string().trim().optional(),
  altPhoneNationalNumber: z.string().trim().optional(),
});

const profileSchemaBusiness = z.object({
  contactName: z.string().trim().min(1, "Contact name is required."),
  businessDescription: z.string().trim().optional(),
  altPhoneCountryIso2: z.string().trim().optional(),
  altPhoneNationalNumber: z.string().trim().optional(),
});

const passwordSchema = z
  .object({
    oldPassword: z.string().trim().min(1, "Old password is required."),
    newPassword: z
      .string()
      .trim()
      .min(8, "New password must be at least 8 characters."),
    confirmNewPassword: z.string().trim().min(1, "Confirm your new password."),
  })
  .refine((d) => d.newPassword === d.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "Passwords do not match.",
  });

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-sm text-red-600 mt-1">{message}</p>;
}

const inputBase =
  "border border-[#c5c4c5] text-[#8B8B8B] focus:outline-none w-full p-2 rounded-10";

function phonePartsFromE164(
  e164: string | null | undefined,
): { countryIso2: string; nationalNumber: string } | null {
  if (!e164) return null;
  const parsed = parsePhoneNumberFromString(e164);
  if (!parsed?.isValid()) return null;
  return {
    countryIso2: (parsed.country ?? "") as string,
    nationalNumber: parsed.nationalNumber ?? "",
  };
}

function toE164FromParts(
  countryIso2: string,
  nationalNumber: string,
): string | null {
  const trimmed = nationalNumber.trim().replace(/[\s-]/g, "");
  if (!countryIso2 || !trimmed) return null;
  const parsed = parsePhoneNumberFromString(
    trimmed,
    countryIso2 as CountryCode,
  );
  if (!parsed?.isValid()) return null;
  return parsed.format("E.164");
}

function SettingsPage() {
  const [tab, setTab] = useState<Tab>("profile");

  const meQuery = useMe();
  const me = meQuery.data;

  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
  const { mutate: uploadPhoto, isPending: isUploadingPhoto } =
    useUploadProfilePhoto();
  const { mutate: changePassword, isPending: isChangingPassword } =
    useChangePassword();

  const [profileErrors, setProfileErrors] = useState<Record<string, string>>(
    {},
  );
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>(
    {},
  );

  const defaultCountryIso2 = COUNTRIES[0]?.iso2 ?? "NG";

  const [regularForm, setRegularForm] = useState({
    firstName: "",
    lastName: "",
    occupation: "",
    address: "",
    altPhoneCountryIso2: defaultCountryIso2,
    altPhoneNationalNumber: "",
  });

  const [businessForm, setBusinessForm] = useState({
    contactName: "",
    businessDescription: "",
    altPhoneCountryIso2: defaultCountryIso2,
    altPhoneNationalNumber: "",
  });

  const [avatarPreview, setAvatarPreview] = useState<string>(avatarFallback);

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (!me) return;
    setAvatarPreview(me.profileImage || avatarFallback);

    if (me.accountType === "regular_user") {
      const parts = phonePartsFromE164(me.alternatePhoneNumber);
      setRegularForm({
        firstName: me.firstName ?? "",
        lastName: me.lastName ?? "",
        occupation: me.occupation ?? "",
        address: me.address ?? "",
        altPhoneCountryIso2: parts?.countryIso2 || defaultCountryIso2,
        altPhoneNationalNumber: parts?.nationalNumber || "",
      });
    } else if (me.accountType === "business_user") {
      const parts = phonePartsFromE164(me.alternatePhoneNumber);
      setBusinessForm({
        contactName: me.contactName ?? "",
        businessDescription: me.businessDescription ?? "",
        altPhoneCountryIso2: parts?.countryIso2 || defaultCountryIso2,
        altPhoneNationalNumber: parts?.nationalNumber || "",
      });
    }
  }, [me]);

  const accountTypeLabel = useMemo(() => {
    if (!me) return "";
    return me.accountType === "business_user" ? "Business" : "Individual";
  }, [me]);

  const onSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileErrors({});
    if (!me) return;

    if (me.accountType === "regular_user") {
      const parsed = profileSchemaRegular.safeParse(regularForm);
      if (!parsed.success) {
        const map: Record<string, string> = {};
        for (const issue of parsed.error.issues) {
          map[issue.path.join(".")] = issue.message;
        }
        setProfileErrors(map);
        return;
      }
      const altFilled =
        Boolean(parsed.data.altPhoneCountryIso2?.trim()) ||
        Boolean(parsed.data.altPhoneNationalNumber?.trim());
      const altE164 = altFilled
        ? toE164FromParts(
            parsed.data.altPhoneCountryIso2 || "",
            parsed.data.altPhoneNationalNumber || "",
          )
        : null;
      if (altFilled && !altE164) {
        setProfileErrors({
          altPhoneNationalNumber: "Enter a valid alternate phone number.",
        });
        return;
      }

      updateProfile({
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        occupation: parsed.data.occupation,
        address: parsed.data.address,
        alternatePhoneNumber: altE164 ?? undefined,
      });
      return;
    }

    if (me.accountType === "business_user") {
      const parsed = profileSchemaBusiness.safeParse(businessForm);
      if (!parsed.success) {
        const map: Record<string, string> = {};
        for (const issue of parsed.error.issues) {
          map[issue.path.join(".")] = issue.message;
        }
        setProfileErrors(map);
        return;
      }
      const altFilled =
        Boolean(parsed.data.altPhoneCountryIso2?.trim()) ||
        Boolean(parsed.data.altPhoneNationalNumber?.trim());
      const altE164 = altFilled
        ? toE164FromParts(
            parsed.data.altPhoneCountryIso2 || "",
            parsed.data.altPhoneNationalNumber || "",
          )
        : null;
      if (altFilled && !altE164) {
        setProfileErrors({
          altPhoneNationalNumber: "Enter a valid alternate phone number.",
        });
        return;
      }

      updateProfile({
        contactName: parsed.data.contactName,
        businessDescription: parsed.data.businessDescription,
        alternatePhoneNumber: altE164 ?? undefined,
      });
    }
  };

  const onSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordErrors({});

    const parsed = passwordSchema.safeParse(passwordForm);
    if (!parsed.success) {
      const map: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        map[issue.path.join(".")] = issue.message;
      }
      setPasswordErrors(map);
      return;
    }

    changePassword(
      {
        oldPassword: parsed.data.oldPassword,
        newPassword: parsed.data.newPassword,
      },
      {
        onSuccess: () => {
          setPasswordForm({
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          });
        },
      },
    );
  };

  return (
    <>
      <section className="bg-[#E9E9E9] px-4 md:px-10 pt-14">
        <h3 className="text-2xl">Settings</h3>
        <p className="text-[#8B8B8B] mb-5 mt-3">
          {accountTypeLabel ? `${accountTypeLabel} account` : "Account"}{" "}
          settings
        </p>

        <div className="w-full flex text-sm md:text-base md:justify-start space-x-3">
          <button className="relative" onClick={() => setTab("profile")}>
            Edit Profile
            {tab === "profile" && (
              <img
                alt="selected"
                src={dash}
                className="w-2/3 mx-auto absolute top-[20px] left-[17%]"
              />
            )}
          </button>

          <button className="relative" onClick={() => setTab("password")}>
            Change Password
            {tab === "password" && (
              <img
                alt="selected"
                src={dash}
                className="w-2/5 mx-auto absolute top-[20px] left-[17%]"
              />
            )}
          </button>
        </div>
      </section>

      <section className="min-h-screen bg-ads360-hash px-4 md:px-10 py-14">
        {meQuery.isLoading && <p>Loading...</p>}
        {meQuery.isError && <p>Failed to load profile.</p>}

        {tab === "profile" && me && (
          <div className="border border-ads360yellow-100 bg-white rounded-10 my-5 p-4 md:p-6">
            <h2 className="my-5 font-bold">User Details</h2>

            <div className="text-center mb-8">
              <label htmlFor="profilePhoto" className="inline-block cursor-pointer">
                <img
                  alt="profile"
                  src={avatarPreview}
                  className="w-20 h-20 mx-auto bg-[#f1f1f1] rounded-full object-cover"
                />
                <div className="text-sm text-gray-600 mt-3">
                  Click the image to change
                </div>
              </label>
              <input
                id="profilePhoto"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const url = URL.createObjectURL(file);
                  setAvatarPreview(url);
                  uploadPhoto(file, {
                    onSuccess: (data) => {
                      if (data?.url) setAvatarPreview(data.url);
                    },
                  });
                }}
              />
              <p className="text-xs text-gray-500">
                {isUploadingPhoto
                  ? "Uploading..."
                  : "Select an image to upload."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="my-3">
                  <label>Email:</label>
                  <input
                    value={me.email}
                    disabled
                    className={`${inputBase} bg-gray-100`}
                  />
                </div>
                <div className="my-3">
                  <label>Phone Number:</label>
                  <input
                    value={me.phone}
                    disabled
                    className={`${inputBase} bg-gray-100`}
                  />
                </div>
              </div>
            </div>

            <form onSubmit={onSaveProfile}>
              {me.accountType === "regular_user" ? (
                <div className="md:flex justify-evenly">
                  <div className="md:w-[40%] px-3">
                    <div className="my-3">
                      <label>First Name:</label>
                      <input
                        value={regularForm.firstName}
                        onChange={(e) =>
                          setRegularForm((p) => ({
                            ...p,
                            firstName: e.target.value,
                          }))
                        }
                        className={inputBase}
                      />
                      <FieldError message={profileErrors.firstName} />
                    </div>
                    <div className="my-3">
                      <label>Last Name:</label>
                      <input
                        value={regularForm.lastName}
                        onChange={(e) =>
                          setRegularForm((p) => ({
                            ...p,
                            lastName: e.target.value,
                          }))
                        }
                        className={inputBase}
                      />
                      <FieldError message={profileErrors.lastName} />
                    </div>
                  </div>

                  <div className="md:w-[40%] px-3">
                    <div className="my-3">
                      <label>Alternate Phone Number:</label>
                      <div className="flex gap-2">
                        <select
                          value={regularForm.altPhoneCountryIso2}
                          onChange={(e) =>
                            setRegularForm((p) => ({
                              ...p,
                              altPhoneCountryIso2: e.target.value,
                            }))
                          }
                          className={inputBase}
                        >
                          {COUNTRIES.map((c) => (
                            <option key={c.iso2} value={c.iso2}>
                              {c.flag} +{c.callingCode}
                            </option>
                          ))}
                        </select>
                        <input
                          value={regularForm.altPhoneNationalNumber}
                          onChange={(e) =>
                            setRegularForm((p) => ({
                              ...p,
                              altPhoneNationalNumber: e.target.value,
                            }))
                          }
                          className={inputBase}
                          placeholder="8012345678"
                          inputMode="tel"
                        />
                      </div>
                      <FieldError
                        message={profileErrors.altPhoneNationalNumber}
                      />
                    </div>
                    <div className="my-3">
                      <label>Occupation:</label>
                      <input
                        value={regularForm.occupation}
                        onChange={(e) =>
                          setRegularForm((p) => ({
                            ...p,
                            occupation: e.target.value,
                          }))
                        }
                        className={inputBase}
                      />
                      <FieldError message={profileErrors.occupation} />
                    </div>
                    <div className="my-3">
                      <label>Address:</label>
                      <textarea
                        value={regularForm.address}
                        onChange={(e) =>
                          setRegularForm((p) => ({
                            ...p,
                            address: e.target.value,
                          }))
                        }
                        className={inputBase}
                      />
                      <FieldError message={profileErrors.address} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="md:flex justify-evenly">
                  <div className="md:w-[40%] px-3">
                    <div className="my-3">
                      <label>Contact Name:</label>
                      <input
                        value={businessForm.contactName}
                        onChange={(e) =>
                          setBusinessForm((p) => ({
                            ...p,
                            contactName: e.target.value,
                          }))
                        }
                        className={inputBase}
                      />
                      <FieldError message={profileErrors.contactName} />
                    </div>
                    <div className="my-3">
                      <label>Alternate Phone Number:</label>
                      <div className="flex gap-2">
                        <select
                          value={businessForm.altPhoneCountryIso2}
                          onChange={(e) =>
                            setBusinessForm((p) => ({
                              ...p,
                              altPhoneCountryIso2: e.target.value,
                            }))
                          }
                          className={inputBase}
                        >
                          {COUNTRIES.map((c) => (
                            <option key={c.iso2} value={c.iso2}>
                              {c.flag} +{c.callingCode}
                            </option>
                          ))}
                        </select>
                        <input
                          value={businessForm.altPhoneNationalNumber}
                          onChange={(e) =>
                            setBusinessForm((p) => ({
                              ...p,
                              altPhoneNationalNumber: e.target.value,
                            }))
                          }
                          className={inputBase}
                          placeholder="8012345678"
                          inputMode="tel"
                        />
                      </div>
                      <FieldError
                        message={profileErrors.altPhoneNationalNumber}
                      />
                    </div>
                  </div>
                  <div className="md:w-[40%] px-3">
                    <div className="my-3">
                      <label>Business Description:</label>
                      <textarea
                        value={businessForm.businessDescription}
                        onChange={(e) =>
                          setBusinessForm((p) => ({
                            ...p,
                            businessDescription: e.target.value,
                          }))
                        }
                        className={inputBase}
                      />
                      <FieldError message={profileErrors.businessDescription} />
                    </div>
                  </div>
                </div>
              )}

              <div className="text-center my-7">
                <button
                  disabled={isUpdating}
                  type="submit"
                  className="group rounded-10 hover:animate-changeColor hover:text-white border bg-ads360yellow-100 py-2 px-4 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isUpdating ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        )}

        {tab === "password" && (
          <div className="border border-ads360yellow-100 bg-white rounded-10 my-5 p-4 md:p-6">
            <div className="mx-auto w-full md:w-1/2">
              <h2 className="my-5 font-bold">Change Password</h2>
              <form onSubmit={onSavePassword}>
                <div className="my-3">
                  <label>Old Password:</label>
                  <div className="relative">
                    <input
                      type={showOldPassword ? "text" : "password"}
                      value={passwordForm.oldPassword}
                      onChange={(e) =>
                        setPasswordForm((p) => ({
                          ...p,
                          oldPassword: e.target.value,
                        }))
                      }
                      className={inputBase}
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-700"
                      onClick={() => setShowOldPassword((s) => !s)}
                    >
                      {showOldPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  <FieldError message={passwordErrors.oldPassword} />
                </div>

                <div className="my-3">
                  <label>New Password:</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={passwordForm.newPassword}
                      onChange={(e) =>
                        setPasswordForm((p) => ({
                          ...p,
                          newPassword: e.target.value,
                        }))
                      }
                      className={inputBase}
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-700"
                      onClick={() => setShowNewPassword((s) => !s)}
                    >
                      {showNewPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  <FieldError message={passwordErrors.newPassword} />
                </div>

                <div className="my-3">
                  <label>Confirm Password:</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={passwordForm.confirmNewPassword}
                      onChange={(e) =>
                        setPasswordForm((p) => ({
                          ...p,
                          confirmNewPassword: e.target.value,
                        }))
                      }
                      className={inputBase}
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-700"
                      onClick={() => setShowConfirmPassword((s) => !s)}
                    >
                      {showConfirmPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  <FieldError message={passwordErrors.confirmNewPassword} />
                </div>

                <div className="text-center my-7">
                  <button
                    disabled={isChangingPassword}
                    type="submit"
                    className="group rounded-10 hover:animate-changeColor hover:text-white border bg-ads360yellow-100 py-2 px-4 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isChangingPassword ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export const Route = createFileRoute("/_usersauth/users/settings/")({
  component: SettingsPage,
});
