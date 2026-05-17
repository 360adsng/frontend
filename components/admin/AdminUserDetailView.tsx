"use client";

import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  useAdminAccountBlockMutation,
  useAdminUser,
  useAdminVendorCommissionMutation,
  useAdminVendorVerificationMutation,
  useAdminWalletBlockMutation,
  usePatchAdminUserRolesMutation,
} from "@endpoint/admin/useAdminUsers";
import { useMe } from "@endpoint/users/useUsers";
import type {
  AdminAccountType,
  AdminPatchableRole,
  AdminUserDetail,
  AdminVendorStats,
} from "@endpoint/admin/admin";
import { ApiError } from "@endpoint";
import {
  pickCompanyContact,
  pickContactDetails,
  pickCoverageLines,
  pickDisplayName,
  pickLocationLine,
  type DisplayContact,
} from "./adminUserDetailHelpers";
import {
  FiCalendar,
  FiDollarSign,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { HiCheckCircle } from "react-icons/hi2";
import { MdOutlineCampaign, MdOutlineDisplaySettings } from "react-icons/md";
import { TbBan } from "react-icons/tb";

function errMessage(e: unknown): string {
  if (e instanceof ApiError) return e.message;
  if (e instanceof Error) return e.message;
  return "Something went wrong.";
}

function formatShortDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  try {
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function formatNaira(n: number): string {
  try {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(n);
  } catch {
    return `₦${n.toLocaleString()}`;
  }
}

function formatAdminRoleLabel(role: string): string {
  return role
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function adminRolesFromDetail(d: AdminUserDetail): string[] {
  if (d.accountType !== "admin") return [];
  const ap = d.adminProfile as { roles?: unknown } | null | undefined;
  const r = ap?.roles;
  if (!Array.isArray(r)) return [];
  return r.filter((x): x is string => typeof x === "string");
}

const ADMIN_ROLE_OPTIONS: { value: AdminPatchableRole; label: string }[] = [
  { value: "admin", label: "Admin" },
  { value: "finance", label: "Finance" },
  { value: "moderator", label: "Moderator" },
];

function normalizePatchableRoles(roles: string[]): AdminPatchableRole[] {
  const out: AdminPatchableRole[] = [];
  for (const r of roles) {
    if (r === "admin" || r === "moderator" || r === "finance") {
      out.push(r);
    }
  }
  return [...new Set(out)];
}

function AdminRolesEditor({
  userId,
  currentRoles,
}: {
  userId: number;
  currentRoles: string[];
}) {
  const patchRoles = usePatchAdminUserRolesMutation(userId);
  const initial = normalizePatchableRoles(currentRoles);
  const [draft, setDraft] = useState<AdminPatchableRole[]>(initial);

  useEffect(() => {
    setDraft(normalizePatchableRoles(currentRoles));
  }, [currentRoles]);

  const sortedStr = (arr: AdminPatchableRole[]) =>
    [...arr].sort().join(",");

  const dirty =
    sortedStr(draft) !== sortedStr(normalizePatchableRoles(currentRoles));

  const toggle = (role: AdminPatchableRole, checked: boolean) => {
    setDraft((prev) => {
      const s = new Set(prev);
      if (checked) s.add(role);
      else s.delete(role);
      return Array.from(s);
    });
  };

  const onSave = async () => {
    if (draft.length === 0) {
      toast.error("Select at least one role.");
      return;
    }
    try {
      await patchRoles.mutateAsync({ roles: draft });
      toast.success("Roles updated.");
    } catch (e) {
      toast.error(errMessage(e));
    }
  };

  return (
    <div className="mt-4 rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
        Edit roles
      </p>
      <p className="mt-1 text-xs text-stone-500">
        Add or remove roles.
      </p>
      <ul className="mt-3 space-y-2">
        {ADMIN_ROLE_OPTIONS.map((o) => (
          <li key={o.value}>
            <label className="flex cursor-pointer items-center gap-3 text-sm">
              <input
                type="checkbox"
                className="rounded border-stone-300"
                checked={draft.includes(o.value)}
                disabled={patchRoles.isPending}
                onChange={(e) => toggle(o.value, e.target.checked)}
              />
              <span className="text-stone-800">{o.label}</span>
            </label>
          </li>
        ))}
      </ul>
      <button
        type="button"
        disabled={!dirty || patchRoles.isPending}
        onClick={() => void onSave()}
        className="mt-4 rounded-lg border-2 border-stone-900 bg-stone-900 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        {patchRoles.isPending ? "Saving…" : "Save roles"}
      </button>
    </div>
  );
}

function vendorCommissionPercent(d: AdminUserDetail): number {
  if (d.accountType === "billboard_owner") {
    const c = (d.billboardProfile as { commissionPercent?: number } | undefined)
      ?.commissionPercent;
    return typeof c === "number" && Number.isFinite(c) ? c : 10;
  }
  if (d.accountType === "influencer") {
    const c = (d.influencerProfile as { commissionPercent?: number } | undefined)
      ?.commissionPercent;
    return typeof c === "number" && Number.isFinite(c) ? c : 10;
  }
  return 10;
}

function pickSubtitleLabel(accountType: AdminAccountType): string {
  switch (accountType) {
    case "billboard_owner":
      return "Billboard vendor";
    case "influencer":
      return "Influencer";
    case "business_user":
      return "Company";
    case "admin":
      return "Administrator";
    default:
      return "Primary contact";
  }
}

function isVerified(d: AdminUserDetail): boolean {
  const v = (o: Record<string, unknown> | null | undefined) =>
    o && String(o.verificationStatus) === "approved";
  if (d.accountType === "billboard_owner")
    return v(d.billboardProfile as Record<string, unknown>);
  if (d.accountType === "influencer")
    return v(d.influencerProfile as Record<string, unknown>);
  if (d.accountType === "business_user")
    return v(d.businessProfile as Record<string, unknown>);
  return Boolean(d.emailVerifiedAt);
}

function CompanyContactRows({
  email,
  phone,
}: {
  email: string;
  phone: string;
}) {
  return (
    <>
      <div className="flex gap-3">
        <FiMail className="mt-0.5 h-5 w-5 shrink-0 text-stone-400" aria-hidden />
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
            Company email
          </p>
          <p className="font-semibold text-stone-900">{email}</p>
        </div>
      </div>
      <div className="flex gap-3">
        <FiPhone className="mt-0.5 h-5 w-5 shrink-0 text-stone-400" aria-hidden />
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
            Company phone
          </p>
          <p className="font-semibold text-stone-900">{phone}</p>
        </div>
      </div>
    </>
  );
}

function ContactDetailsBody({ contact }: { contact: DisplayContact }) {
  return (
    <div className="space-y-3 text-stone-700">
      {contact.position ? (
        <p className="text-sm text-stone-600">
          <span className="text-stone-500">Role: </span>
          {contact.position}
        </p>
      ) : null}
      <div className="flex items-center gap-2 text-sm">
        <FiMail className="h-4 w-4 shrink-0 text-stone-400" aria-hidden />
        <span>
          <span className="text-stone-500">Email: </span>
          {contact.email}
        </span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <FiPhone className="h-4 w-4 shrink-0 text-stone-400" aria-hidden />
        <span>
          <span className="text-stone-500">Phone: </span>
          {contact.phone}
        </span>
      </div>
      {contact.alternatePhone ? (
        <div className="flex items-center gap-2 text-sm">
          <FiPhone className="h-4 w-4 shrink-0 text-stone-400" aria-hidden />
          <span>
            <span className="text-stone-500">Alternate phone: </span>
            {contact.alternatePhone}
          </span>
        </div>
      ) : null}
    </div>
  );
}

/** Brand logo or profile photo URL for the company / creator header (not “documents”). */
function pickCompanyVisualUrl(d: AdminUserDetail): string | null {
  if (d.accountType === "billboard_owner") {
    const u = d.billboardProfile as { businessLogo?: string } | null | undefined;
    if (typeof u?.businessLogo === "string" && u.businessLogo.startsWith("http")) {
      return u.businessLogo;
    }
  }
  if (d.accountType === "business_user") {
    const u = d.businessProfile as { businessLogoUrl?: string } | null | undefined;
    if (typeof u?.businessLogoUrl === "string" && u.businessLogoUrl.startsWith("http")) {
      return u.businessLogoUrl;
    }
  }
  if (d.accountType === "influencer") {
    const u = d.influencerProfile as { profilePicture?: string } | null | undefined;
    if (typeof u?.profilePicture === "string" && u.profilePicture.startsWith("http")) {
      return u.profilePicture;
    }
  }
  return null;
}

function pickRegularUserProfileImage(d: AdminUserDetail): string | null {
  const ip = d.individualProfile as { profileImage?: string } | null | undefined;
  if (typeof ip?.profileImage === "string" && ip.profileImage.startsWith("http")) {
    return ip.profileImage;
  }
  return null;
}

function VisualAvatar({
  imageUrl,
  label,
  fallbackLetter,
  variant,
}: {
  imageUrl: string | null;
  label: string;
  fallbackLetter: string;
  variant: "gold" | "emerald";
}) {
  const letter = fallbackLetter.slice(0, 1).toUpperCase();
  const fallbackRing =
    variant === "gold"
      ? "bg-ads360yellow-100 text-stone-900"
      : "bg-emerald-100 text-emerald-800";
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={label}
        className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-stone-100"
      />
    );
  }
  return (
    <div
      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-semibold ${fallbackRing} ${variant === "gold" ? "font-serif text-xl" : "text-lg"}`}
      aria-hidden
    >
      {letter}
    </div>
  );
}

type DocItem = {
  id: string;
  label: string;
  /** Plain text (e.g. RC number); not used when `documentUrl` is set. */
  hint?: string;
  /** When CAC field stores an uploaded file URL (e.g. Cloudinary). */
  documentUrl?: string;
};

function isHttpDocumentUrl(s: string): boolean {
  try {
    const u = new URL(s);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

/** Formal verification items only (e.g. CAC reference or uploaded CAC doc). Logos / photos are shown in profile headers. */
function buildVerificationDocs(d: AdminUserDetail): DocItem[] {
  const bbp = d.billboardProfile as { cac?: string } | null | undefined;
  if (d.accountType === "billboard_owner" && bbp?.cac?.trim()) {
    const raw = bbp.cac.trim();
    if (isHttpDocumentUrl(raw)) {
      return [
        {
          id: "cac",
          label: "CAC document",
          documentUrl: raw,
        },
      ];
    }
    return [{ id: "cac", label: "CAC reference", hint: raw }];
  }
  return [];
}

function GoldCard({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border-2 border-ads360yellow-100 bg-white p-6 shadow-sm ${className}`}
    >
      <h2 className="font-serif text-lg font-normal tracking-tight text-stone-900">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function StatusBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-emerald-300 bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
      {children}
    </span>
  );
}

function MetricsInner({ stats }: { stats: AdminVendorStats }) {
  if (stats.kind === "billboard_owner") {
    return (
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-[#F8F9FA] p-4">
            <div className="flex items-start gap-3">
              <MdOutlineDisplaySettings className="mt-0.5 h-6 w-6 text-teal-600" aria-hidden />
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
                  Billboards
                </p>
                <p className="font-serif text-2xl text-stone-900">
                  {stats.listingsCount}
                </p>
                <p className="text-xs text-stone-500">Total listed</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-[#F8F9FA] p-4">
            <div className="flex items-start gap-3">
              <HiCheckCircle className="mt-0.5 h-6 w-6 text-emerald-600" aria-hidden />
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
                  Completed
                </p>
                <p className="font-serif text-2xl text-stone-900">
                  {stats.completedCampaignsCount}
                </p>
                <p className="text-xs text-stone-500">Campaigns</p>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-[#F8F9FA] p-4">
          <div className="flex items-start gap-3">
            <FiDollarSign className="mt-0.5 h-6 w-6 text-ads360yellow-100" aria-hidden />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
                Total revenue
              </p>
              <p className="font-serif text-2xl text-stone-900">
                {formatNaira(stats.totalRevenueNgn)}
              </p>
              <p className="text-xs text-stone-500">Wallet + incoming (estimate)</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-[#F8F9FA] p-4">
          <div className="flex items-start gap-3">
            <MdOutlineCampaign className="mt-0.5 h-6 w-6 text-teal-600" aria-hidden />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
                Completed
              </p>
              <p className="font-serif text-2xl text-stone-900">
                {stats.completedCampaignsCount}
              </p>
              <p className="text-xs text-stone-500">Campaigns</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-[#F8F9FA] p-4">
          <div className="flex items-start gap-3">
            <HiCheckCircle className="mt-0.5 h-6 w-6 text-emerald-600" aria-hidden />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
                Total
              </p>
              <p className="font-serif text-2xl text-stone-900">
                {stats.totalBookingsCount}
              </p>
              <p className="text-xs text-stone-500">Bookings</p>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-xl bg-[#F8F9FA] p-4">
        <div className="flex items-start gap-3">
          <FiDollarSign className="mt-0.5 h-6 w-6 text-ads360yellow-100" aria-hidden />
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
              Total revenue
            </p>
            <p className="font-serif text-2xl text-stone-900">
              {formatNaira(stats.totalRevenueNgn)}
            </p>
            <p className="text-xs text-stone-500">Wallet + incoming (estimate)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AdminUserDetailView({ userId }: { userId: number }) {
  const q = useAdminUser(userId);
  const meQ = useMe();
  const accountBlock = useAdminAccountBlockMutation(userId);
  const walletBlock = useAdminWalletBlockMutation(userId);
  const verifyVendor = useAdminVendorVerificationMutation(userId);
  const setCommission = useAdminVendorCommissionMutation(userId);
  const d = q.data;

  const [commissionDraft, setCommissionDraft] = useState("10");

  useEffect(() => {
    if (!d) return;
    if (
      d.accountType !== "billboard_owner" &&
      d.accountType !== "influencer"
    ) {
      return;
    }
    setCommissionDraft(String(vendorCommissionPercent(d)));
  }, [d]);

  const runAccountToggle = async () => {
    if (!d) return;
    const blocked = Boolean(d.blockedAt);
    const next = !blocked;
    let reason: string | undefined;
    if (next) {
      const r = window.prompt("Optional reason for blocking this account:");
      if (r === null) return;
      reason = r.trim() || undefined;
    }
    try {
      await accountBlock.mutateAsync({ blocked: next, reason });
      toast.success(next ? "Account blocked" : "Account unblocked");
    } catch (e) {
      toast.error(errMessage(e));
    }
  };

  const runWalletToggle = async () => {
    if (!d) return;
    const blocked = Boolean(d.walletBlockedAt);
    const next = !blocked;
    let reason: string | undefined;
    if (next) {
      const r = window.prompt("Optional reason for blocking wallet use:");
      if (r === null) return;
      reason = r.trim() || undefined;
    }
    try {
      await walletBlock.mutateAsync({ blocked: next, reason });
      toast.success(next ? "Wallet blocked" : "Wallet unblocked");
    } catch (e) {
      toast.error(errMessage(e));
    }
  };

  const runApproveAccount = async () => {
    if (!d) return;
    try {
      await verifyVendor.mutateAsync({ decision: "approve" });
      toast.success("Account approved");
    } catch (e) {
      toast.error(errMessage(e));
    }
  };

  const runSaveCommission = async () => {
    if (!d) return;
    const raw = commissionDraft.replace(",", ".").trim();
    const n = Number.parseFloat(raw);
    if (!Number.isFinite(n) || n < 0 || n > 100) {
      toast.error("Enter a commission between 0 and 100.");
      return;
    }
    try {
      await setCommission.mutateAsync({ commission: n });
      toast.success("Commission rate saved");
    } catch (e) {
      toast.error(errMessage(e));
    }
  };

  if (q.isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-stone-500">
        Loading profile…
      </div>
    );
  }

  if (q.isError || !d) {
    return (
      <p className="text-sm text-red-700">
        {q.error instanceof Error ? q.error.message : "Failed to load user."}
      </p>
    );
  }

  const name = pickDisplayName(d);
  const verified = isVerified(d);
  const accountBlocked = Boolean(d.blockedAt);
  const walletBlocked = Boolean(d.walletBlockedAt);
  const loc = pickLocationLine(d);
  const contact = pickContactDetails(d);
  const companyContact = pickCompanyContact(d);
  const coverageLines = pickCoverageLines(d);
  const subtitle = pickSubtitleLabel(d.accountType);
  const docs = buildVerificationDocs(d);
  const companyVisualUrl = pickCompanyVisualUrl(d);
  const regularProfileImage = pickRegularUserProfileImage(d);

  const companyName =
    (d.billboardProfile as { businessName?: string } | undefined)?.businessName ||
    (d.businessProfile as { businessName?: string } | undefined)?.businessName ||
    name;

  const contactName = contact.name;

  const showCompanyCard =
    d.accountType === "billboard_owner" ||
    d.accountType === "business_user" ||
    d.accountType === "influencer";

  const showMetrics =
    d.vendorStats &&
    (d.accountType === "billboard_owner" || d.accountType === "influencer");

  const showDocsSection =
    docs.length > 0 &&
    (d.accountType === "billboard_owner" ||
      d.accountType === "business_user" ||
      d.accountType === "influencer");

  const banks = d.savedBanks ?? [];
  const showBankSection =
    d.accountType === "billboard_owner" ||
    d.accountType === "influencer" ||
    d.accountType === "business_user";

  const showApproveAccount =
    (d.accountType === "billboard_owner" || d.accountType === "influencer") &&
    !verified;

  const showVendorCommission =
    d.accountType === "billboard_owner" || d.accountType === "influencer";

  const isSimpleAccount =
    d.accountType === "admin" || d.accountType === "regular_user";

  const mailtoEmail = contact.email || companyContact.email;
  const contactMailto =
    mailtoEmail && mailtoEmail !== "—"
      ? `mailto:${encodeURIComponent(mailtoEmail)}`
      : null;

  const adminRoles =
    d.accountType === "admin" ? adminRolesFromDetail(d) : [];
  const isSuperAdmin = adminRoles.includes("super_admin");
  const canEditAdminRoles =
    d.accountType === "admin" && !isSuperAdmin;

  const meData = meQ.data;
  const myId =
    meData && "id" in meData ? meData.id : undefined;
  const myRoles =
    meData?.accountType === "admin" ? meData.roles : [];
  const iAmSuperAdmin = myRoles.includes("super_admin");
  const viewingOwnProfile = myId !== undefined && myId === userId;
  const targetIsSuperAdmin =
    d.accountType === "admin" && adminRoles.includes("super_admin");
  const cannotUseAccountBlockControl =
    (viewingOwnProfile && !accountBlocked) ||
    (targetIsSuperAdmin && !iAmSuperAdmin);
  const accountBlockTitle = viewingOwnProfile && !accountBlocked
    ? "You cannot block your own account."
    : targetIsSuperAdmin && !iAmSuperAdmin
      ? "Only a super admin can block or unblock another super admin."
      : undefined;

  const cannotUseWalletBlockControl =
    (viewingOwnProfile && !walletBlocked) ||
    (targetIsSuperAdmin && !iAmSuperAdmin);
  const walletBlockTitle = viewingOwnProfile && !walletBlocked
    ? "You cannot block your own wallet."
    : targetIsSuperAdmin && !iAmSuperAdmin
      ? "Only a super admin can block or unblock wallet for a super admin."
      : undefined;

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-16">
      <header className="border-b border-stone-200/80 pb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="font-serif text-3xl tracking-tight text-stone-900 md:text-4xl">
              {name}
            </h1>
            <div className="mt-3 flex flex-wrap gap-2">
              {accountBlocked ? (
                <span className="inline-flex rounded-full border border-red-300 bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-800">
                  Account blocked
                </span>
              ) : (
                <StatusBadge>Active</StatusBadge>
              )}
              {d.accountType !== "admin" && verified ? (
                <StatusBadge>Verified</StatusBadge>
              ) : null}
              {d.accountType !== "admin" &&
              !verified &&
              d.accountType !== "regular_user" ? (
                <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-900">
                  Pending verification
                </span>
              ) : null}
            </div>
            {d.accountType === "admin" ? (
              <div className="mt-3">
                <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-stone-500">
                  Admin roles
                </p>
                <div className="flex flex-wrap gap-2">
                  {adminRoles.length === 0 ? (
                    <span className="text-xs text-stone-500">None assigned</span>
                  ) : (
                    adminRoles.map((role) => (
                      <span
                        key={role}
                        className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-2.5 py-0.5 text-xs font-medium text-violet-900"
                      >
                        {formatAdminRoleLabel(role)}
                      </span>
                    ))
                  )}
                </div>
                {canEditAdminRoles ? (
                  <AdminRolesEditor
                    userId={userId}
                    currentRoles={adminRoles}
                  />
                ) : null}
                {d.accountType === "admin" && isSuperAdmin ? (
                  <p className="mt-3 text-xs text-stone-500">
                    Super admin roles cannot be edited on this page.
                  </p>
                ) : null}
              </div>
            ) : null}
            <p className="mt-3 text-sm text-stone-500">
              {d.accountType === "billboard_owner" || d.accountType === "influencer"
                ? `Vendor ID: #${d.id}`
                : `User ID: #${d.id}`}
              {" · "}
              <span className="capitalize">
                {d.accountType.replace(/_/g, " ")}
              </span>
            </p>
          </div>
        </div>
      </header>

      {isSimpleAccount ? (
        <GoldCard title="Contact information">
          <div className="flex gap-4">
            <VisualAvatar
              imageUrl={regularProfileImage}
              label={name}
              fallbackLetter={name}
              variant="emerald"
            />
            <div className="min-w-0">
              <p className="font-serif text-xl text-stone-900">{name}</p>
              <p className="text-sm text-sky-900/60">{subtitle}</p>
            </div>
          </div>
          <hr className="my-5 border-stone-200" />
          {d.accountType === "admin" ? (
            <div className="mb-5 flex gap-3">
              <FiMapPin
                className="mt-0.5 h-5 w-5 shrink-0 text-stone-400"
                aria-hidden
              />
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
                  Location
                </p>
                <p className="font-semibold text-stone-900">{loc.primary}</p>
              </div>
            </div>
          ) : null}
          <ContactDetailsBody contact={contact} />
          {d.accountType !== "admin" && d.walletSummary ? (
            <p className="mt-3 text-xs text-stone-500">
              Wallet balance:{" "}
              <span className="font-semibold text-stone-800">
                {formatNaira(d.walletSummary.balance)} {d.walletSummary.currency}
              </span>
              {walletBlocked ? (
                <span className="ml-2 text-red-600">(wallet blocked)</span>
              ) : null}
            </p>
          ) : null}
          {contactMailto ? (
            <a
              href={contactMailto}
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ads360yellow-100 hover:underline"
            >
              Send email
              <FiMail className="h-4 w-4" aria-hidden />
            </a>
          ) : null}
        </GoldCard>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {showCompanyCard ? (
            <GoldCard
              title={
                d.accountType === "influencer"
                  ? "Creator profile"
                  : "Company information"
              }
            >
              <div className="flex gap-4">
                <VisualAvatar
                  imageUrl={companyVisualUrl}
                  label={companyName}
                  fallbackLetter={companyName}
                  variant="gold"
                />
                <div className="min-w-0">
                  <p className="font-serif text-xl text-stone-900">{companyName}</p>
                  <p className="text-sm text-stone-500">{subtitle}</p>
                </div>
              </div>
              <hr className="my-5 border-stone-200" />
              <div className="space-y-4">
                <div className="flex gap-3">
                  <FiMapPin
                    className="mt-0.5 h-5 w-5 shrink-0 text-stone-400"
                    aria-hidden
                  />
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
                      Location
                    </p>
                    <p className="font-semibold text-stone-900">{loc.primary}</p>
                  </div>
                </div>
                <CompanyContactRows
                  email={companyContact.email}
                  phone={companyContact.phone}
                />
                <div className="flex gap-3">
                  <FiCalendar
                    className="mt-0.5 h-5 w-5 shrink-0 text-stone-400"
                    aria-hidden
                  />
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
                      Registration date
                    </p>
                    <p className="font-semibold text-stone-900">
                      {formatShortDate(d.createdAt)}
                    </p>
                  </div>
                </div>
                {d.accountType === "billboard_owner" ? (
                  <div className="pt-2">
                    <Link
                      to="/admin/users/$id/billboards"
                      params={{ id: String(d.id) }}
                      className="inline-flex text-sm font-semibold text-ads360yellow-100 hover:underline"
                    >
                      View all billboards →
                    </Link>
                  </div>
                ) : null}
              </div>
            </GoldCard>
          ) : (
            <GoldCard title="Profile">
              <div className="flex gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                  <span className="text-lg font-semibold">
                    {name.slice(0, 1).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-serif text-xl text-stone-900">{contactName}</p>
                  <p className="text-sm text-stone-500">{subtitle}</p>
                </div>
              </div>
              <hr className="my-5 border-stone-200" />
              <div className="flex gap-3">
                <FiMapPin
                  className="mt-0.5 h-5 w-5 shrink-0 text-stone-400"
                  aria-hidden
                />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
                    Location
                  </p>
                  <p className="font-semibold text-stone-900">{loc.primary}</p>
                </div>
              </div>
            </GoldCard>
          )}

          <GoldCard title="Contact information">
            <div className="flex gap-4">
              <VisualAvatar
                imageUrl={null}
                label={contactName}
                fallbackLetter={contactName}
                variant="emerald"
              />
              <div className="min-w-0">
                <p className="font-serif text-xl text-stone-900">{contactName}</p>
                <p className="text-sm text-sky-900/60">
                  {contact.position ?? "Primary contact"}
                </p>
              </div>
            </div>
            <hr className="my-5 border-stone-200" />
            <ContactDetailsBody contact={contact} />
            {d.walletSummary ? (
              <p className="mt-3 text-xs text-stone-500">
                Wallet balance:{" "}
                <span className="font-semibold text-stone-800">
                  {formatNaira(d.walletSummary.balance)}{" "}
                  {d.walletSummary.currency}
                </span>
                {walletBlocked ? (
                  <span className="ml-2 text-red-600">(wallet blocked)</span>
                ) : null}
              </p>
            ) : null}
            {contactMailto ? (
              <a
                href={contactMailto}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ads360yellow-100 hover:underline"
              >
                Send email
                <FiMail className="h-4 w-4" aria-hidden />
              </a>
            ) : null}
          </GoldCard>
        </div>
      )}

      {d.accountType === "billboard_owner" && coverageLines.length > 0 ? (
        <GoldCard title="Coverage areas">
          <ul className="space-y-2 text-sm text-stone-700">
            {coverageLines.map((line) => (
              <li
                key={line}
                className="rounded-lg border border-stone-200 bg-stone-50 px-4 py-2.5 font-medium text-stone-900"
              >
                {line}
              </li>
            ))}
          </ul>
        </GoldCard>
      ) : null}

      {d.accountType === "influencer" ? (
        <GoldCard title="Platforms">
          {(d.influencerPlatforms ?? []).length === 0 ? (
            <p className="text-sm text-stone-500">No platforms on file.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-stone-200 text-[10px] font-semibold uppercase tracking-wider text-stone-500">
                    <th className="pb-2 pr-4">Platform</th>
                    <th className="pb-2 pr-4">Handle</th>
                    <th className="pb-2 pr-4">Followers</th>
                    <th className="pb-2">Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {(d.influencerPlatforms ?? []).map((p) => (
                    <tr key={p.id}>
                      <td className="py-3 pr-4 font-medium text-stone-900">
                        <a
                          href={p.platformUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-ads360yellow-100 hover:underline"
                        >
                          {p.name}
                        </a>
                      </td>
                      <td className="py-3 pr-4 text-stone-700">@{p.username}</td>
                      <td className="py-3 pr-4 tabular-nums text-stone-800">
                        {p.numberOfFollowers.toLocaleString()}
                      </td>
                      <td className="py-3 font-medium tabular-nums text-stone-900">
                        {formatNaira(p.amountRate)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </GoldCard>
      ) : null}

      {showMetrics && d.vendorStats ? (
        <GoldCard title="Business metrics">
          <MetricsInner stats={d.vendorStats} />
        </GoldCard>
      ) : null}

      {showDocsSection ? (
        <GoldCard title="Verification documents">
          <div className="grid gap-3 sm:grid-cols-2">
            {docs.map((doc) => (
              <div
                key={doc.id}
                className="flex flex-col rounded-xl border border-stone-200 bg-[#F8F9FA] p-4"
              >
                <div className="flex items-center gap-2 text-ads360yellow-100">
                  <HiOutlineDocumentText className="h-5 w-5" aria-hidden />
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-stone-400">
                    {doc.documentUrl ? "Uploaded" : "Reference"}
                  </span>
                </div>
                <p className="mt-3 font-semibold text-stone-900">{doc.label}</p>
                {doc.documentUrl ? (
                  <a
                    href={doc.documentUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block text-sm font-medium text-ads360yellow-100 hover:underline"
                  >
                    Open CAC document
                  </a>
                ) : doc.hint ? (
                  <p className="mt-2 break-all text-sm text-stone-800">{doc.hint}</p>
                ) : null}
              </div>
            ))}
          </div>
        </GoldCard>
      ) : null}

      {showBankSection ? (
        <GoldCard title="Bank details">
          {banks.length === 0 ? (
            <p className="text-sm text-stone-500">No bank accounts on file.</p>
          ) : (
            <ul className="divide-y divide-stone-200">
              {banks.map((b) => (
                <li
                  key={b.id}
                  className="flex flex-col gap-1 py-4 text-sm first:pt-0 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6"
                >
                  <span className="font-semibold text-stone-900">{b.bankName}</span>
                  {b.isPrimary ? (
                    <span className="w-fit rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-800">
                      Primary
                    </span>
                  ) : null}
                  <span className="text-stone-600">{b.accountName}</span>
                  <span className="font-mono text-stone-800">{b.accountNumber}</span>
                </li>
              ))}
            </ul>
          )}
        </GoldCard>
      ) : null}

      <GoldCard title="Admin controls">
        <div className="flex flex-col gap-3">
          {showVendorCommission ? (
            <div className="rounded-xl border border-stone-200 bg-[#F8F9FA] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                Platform commission
              </p>
              <p className="mt-1 text-xs text-stone-500">
                Share of settled booking amounts retained by the platform (0–100%).
              </p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-end">
                <label className="flex min-w-[120px] flex-1 flex-col gap-1 text-sm">
                  <span className="font-medium text-stone-700">Rate (%)</span>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    step={0.5}
                    className="rounded-lg border border-stone-300 px-3 py-2 text-stone-900 outline-none focus:border-stone-500"
                    value={commissionDraft}
                    disabled={setCommission.isPending}
                    onChange={(e) => setCommissionDraft(e.target.value)}
                  />
                </label>
                <button
                  type="button"
                  disabled={setCommission.isPending}
                  onClick={() => void runSaveCommission()}
                  className="rounded-full border-2 border-stone-900 bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-95 disabled:opacity-50"
                >
                  {setCommission.isPending ? "Saving…" : "Save commission"}
                </button>
              </div>
            </div>
          ) : null}
          {showApproveAccount ? (
            <button
              type="button"
              disabled={verifyVendor.isPending}
              onClick={() => void runApproveAccount()}
              className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-emerald-800/90 bg-white py-3 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-50 disabled:opacity-50"
            >
              <HiCheckCircle className="h-5 w-5" aria-hidden />
              Approve account
            </button>
          ) : null}
          <button
            type="button"
            title={accountBlockTitle}
            disabled={
              accountBlock.isPending || cannotUseAccountBlockControl
            }
            onClick={() => void runAccountToggle()}
            className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-amber-800/80 bg-white py-3 text-sm font-semibold text-amber-900 transition hover:bg-amber-50 disabled:opacity-50"
          >
            <TbBan className="h-5 w-5" aria-hidden />
            {accountBlocked ? "Unblock account" : "Block account"}
          </button>
          {cannotUseAccountBlockControl && accountBlockTitle ? (
            <p className="text-xs text-stone-500">{accountBlockTitle}</p>
          ) : null}
          {d.accountType !== "admin" ? (
            <button
              type="button"
              title={walletBlockTitle}
              disabled={
                walletBlock.isPending || cannotUseWalletBlockControl
              }
              onClick={() => void runWalletToggle()}
              className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-amber-800/80 bg-white py-3 text-sm font-semibold text-amber-900 transition hover:bg-amber-50 disabled:opacity-50"
            >
              <TbBan className="h-5 w-5" aria-hidden />
              {walletBlocked ? "Unblock wallet" : "Block wallet"}
            </button>
          ) : null}
          {d.accountType !== "admin" &&
          cannotUseWalletBlockControl &&
          walletBlockTitle ? (
            <p className="text-xs text-stone-500">{walletBlockTitle}</p>
          ) : null}
        </div>
        {d.blockedReason ? (
          <p className="mt-3 text-xs text-stone-500">
            Account block note: {d.blockedReason}
          </p>
        ) : null}
        {d.accountType !== "admin" && d.walletBlockedReason ? (
          <p className="mt-1 text-xs text-stone-500">
            Wallet block note: {d.walletBlockedReason}
          </p>
        ) : null}
      </GoldCard>

      <p className="text-center text-xs text-stone-400">
        <Link
          to="/admin/users"
          className="font-medium text-stone-600 underline-offset-2 hover:underline"
        >
          Back to all users
        </Link>
      </p>
    </div>
  );
}
