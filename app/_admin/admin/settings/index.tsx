"use client";

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import type { CountryCode } from "libphonenumber-js";
import {
  useChangePassword,
  useMe,
  useUpdateProfile,
} from "@endpoint/users/useUsers";
import { COUNTRIES } from "../../../../lib/countries";

type Tab = "profile" | "password";

type SettingsSearch = { tab: Tab };

function parseSettingsSearch(raw: Record<string, unknown>): SettingsSearch {
  const t = String(raw.tab ?? "").toLowerCase();
  return { tab: t === "password" ? "password" : "profile" };
}

const profileSchemaAdmin = z.object({
  firstName: z.string().trim().min(1, "First name is required."),
  lastName: z.string().trim().min(1, "Last name is required."),
  altPhoneCountryIso2: z.string().trim().optional(),
  altPhoneNationalNumber: z.string().trim().optional(),
});

const passwordSchema = z
  .object({
    oldPassword: z.string().trim().min(1, "Current password is required."),
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
  return <p className="mt-1 text-sm text-red-600">{message}</p>;
}

const inputBase =
  "w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900 outline-none focus:border-stone-500";

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

function formatRoleLabel(role: string): string {
  const s = role.replace(/_/g, " ");
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : role;
}

function AdminSettingsPage() {
  const navigate = useNavigate();
  const { tab } = Route.useSearch();

  const setTab = (next: Tab) => {
    void navigate({
      to: "/admin/settings",
      search: { tab: next },
      replace: true,
    });
  };

  const meQuery = useMe();
  const me = meQuery.data;

  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
  const { mutate: changePassword, isPending: isChangingPassword } =
    useChangePassword();

  const [profileErrors, setProfileErrors] = useState<Record<string, string>>(
    {},
  );
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>(
    {},
  );

  const defaultCountryIso2 = COUNTRIES[0]?.iso2 ?? "NG";

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    altPhoneCountryIso2: defaultCountryIso2,
    altPhoneNationalNumber: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (!me || me.accountType !== "admin") return;
    const parts = phonePartsFromE164(me.alternatePhoneNumber);
    setForm({
      firstName: me.firstName ?? "",
      lastName: me.lastName ?? "",
      altPhoneCountryIso2: parts?.countryIso2 || defaultCountryIso2,
      altPhoneNationalNumber: parts?.nationalNumber || "",
    });
  }, [me, defaultCountryIso2]);

  const onSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileErrors({});
    if (!me || me.accountType !== "admin") return;

    const parsed = profileSchemaAdmin.safeParse(form);
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
      alternatePhoneNumber: altE164 ?? undefined,
    });
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

  const isAdmin = me?.accountType === "admin";

  return (
    <section className="min-h-screen bg-ads360-hash px-4 py-10 md:px-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-serif text-2xl text-stone-900">Settings</h1>
        <p className="mt-2 text-sm text-stone-600">
          Update your admin profile and password. Sign-in email and primary
          phone are managed by platform staff.
        </p>

        <div className="mt-6 flex gap-2 border-b border-stone-200 pb-2 text-sm font-medium">
          <button
            type="button"
            onClick={() => setTab("profile")}
            className={`rounded-lg px-4 py-2 transition ${
              tab === "profile"
                ? "bg-stone-900 text-white"
                : "text-stone-600 hover:bg-stone-100"
            }`}
          >
            Profile
          </button>
          <button
            type="button"
            onClick={() => setTab("password")}
            className={`rounded-lg px-4 py-2 transition ${
              tab === "password"
                ? "bg-stone-900 text-white"
                : "text-stone-600 hover:bg-stone-100"
            }`}
          >
            Change password
          </button>
        </div>

        <div className="mt-8 rounded-10 border border-stone-200 bg-white p-6 shadow-sm">
          {meQuery.isLoading ? (
            <p className="text-stone-600">Loading…</p>
          ) : null}
          {meQuery.isError ? (
            <p className="text-red-700">Unable to load your account.</p>
          ) : null}

          {me && !isAdmin ? (
            <p className="text-red-700">
              This page is for admin accounts only.
            </p>
          ) : null}

          {tab === "profile" && isAdmin && me ? (
            <form onSubmit={onSaveProfile} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-stone-500">
                  Email
                </label>
                <p className="mt-1 rounded-lg border border-stone-100 bg-stone-50 px-3 py-2 text-sm text-stone-800">
                  {me.email}
                </p>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-stone-500">
                  Primary phone
                </label>
                <p className="mt-1 rounded-lg border border-stone-100 bg-stone-50 px-3 py-2 text-sm text-stone-800">
                  {me.phone}
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-stone-500">
                  Roles
                </label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {me.roles.map((r) => (
                    <span
                      key={r}
                      className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs font-medium capitalize text-stone-800"
                    >
                      {formatRoleLabel(r)}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="admin-first"
                    className="block text-sm font-medium text-stone-700"
                  >
                    First name
                  </label>
                  <input
                    id="admin-first"
                    className={`mt-1 ${inputBase}`}
                    value={form.firstName}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, firstName: e.target.value }))
                    }
                    autoComplete="given-name"
                  />
                  <FieldError message={profileErrors.firstName} />
                </div>
                <div>
                  <label
                    htmlFor="admin-last"
                    className="block text-sm font-medium text-stone-700"
                  >
                    Last name
                  </label>
                  <input
                    id="admin-last"
                    className={`mt-1 ${inputBase}`}
                    value={form.lastName}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, lastName: e.target.value }))
                    }
                    autoComplete="family-name"
                  />
                  <FieldError message={profileErrors.lastName} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700">
                  Alternate phone (optional)
                </label>
                <div className="mt-1 flex flex-col gap-2 sm:flex-row">
                  <select
                    className={`sm:w-40 ${inputBase}`}
                    value={form.altPhoneCountryIso2}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        altPhoneCountryIso2: e.target.value,
                      }))
                    }
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c.iso2} value={c.iso2}>
                        {c.iso2}
                      </option>
                    ))}
                  </select>
                  <input
                    className={`flex-1 ${inputBase}`}
                    placeholder="Phone number"
                    value={form.altPhoneNationalNumber}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        altPhoneNationalNumber: e.target.value,
                      }))
                    }
                    autoComplete="tel-national"
                  />
                </div>
                <FieldError message={profileErrors.altPhoneNationalNumber} />
              </div>

              <button
                type="submit"
                disabled={isUpdating}
                className="rounded-lg border-2 border-stone-900 bg-stone-900 px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
              >
                {isUpdating ? "Saving…" : "Save profile"}
              </button>
            </form>
          ) : null}

          {tab === "password" && isAdmin && me ? (
            <form onSubmit={onSavePassword} className="mx-auto max-w-md space-y-4">
              <div>
                <label
                  htmlFor="old-pw"
                  className="block text-sm font-medium text-stone-700"
                >
                  Current password
                </label>
                <div className="relative mt-1">
                  <input
                    id="old-pw"
                    type={showOldPassword ? "text" : "password"}
                    className={`${inputBase} pr-14`}
                    value={passwordForm.oldPassword}
                    onChange={(e) =>
                      setPasswordForm((f) => ({
                        ...f,
                        oldPassword: e.target.value,
                      }))
                    }
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-500"
                    onClick={() => setShowOldPassword((v) => !v)}
                  >
                    {showOldPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <FieldError message={passwordErrors.oldPassword} />
              </div>
              <div>
                <label
                  htmlFor="new-pw"
                  className="block text-sm font-medium text-stone-700"
                >
                  New password
                </label>
                <div className="relative mt-1">
                  <input
                    id="new-pw"
                    type={showNewPassword ? "text" : "password"}
                    className={`${inputBase} pr-14`}
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm((f) => ({
                        ...f,
                        newPassword: e.target.value,
                      }))
                    }
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-500"
                    onClick={() => setShowNewPassword((v) => !v)}
                  >
                    {showNewPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <FieldError message={passwordErrors.newPassword} />
              </div>
              <div>
                <label
                  htmlFor="confirm-pw"
                  className="block text-sm font-medium text-stone-700"
                >
                  Confirm new password
                </label>
                <div className="relative mt-1">
                  <input
                    id="confirm-pw"
                    type={showConfirmPassword ? "text" : "password"}
                    className={`${inputBase} pr-14`}
                    value={passwordForm.confirmNewPassword}
                    onChange={(e) =>
                      setPasswordForm((f) => ({
                        ...f,
                        confirmNewPassword: e.target.value,
                      }))
                    }
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-500"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <FieldError message={passwordErrors.confirmNewPassword} />
              </div>
              <button
                type="submit"
                disabled={isChangingPassword}
                className="w-full rounded-lg border-2 border-stone-900 bg-stone-900 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
              >
                {isChangingPassword ? "Updating…" : "Update password"}
              </button>
            </form>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export const Route = createFileRoute("/_admin/admin/settings/")({
  validateSearch: (raw: Record<string, unknown>) => parseSettingsSearch(raw),
  component: AdminSettingsPage,
});

export default AdminSettingsPage;
