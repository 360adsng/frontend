import type { AdminUserDetail } from "@endpoint/admin/admin";
import {
  NIGERIA_STATES_LGAS,
  getStateById,
} from "../../lib/nigeriaStatesLgas";

export type DisplayContact = {
  name: string;
  email: string;
  phone: string;
  position?: string;
  /** Admin profile alternate phone */
  alternatePhone?: string;
};

export type DisplayLocation = {
  primary: string;
};

export type DisplayCompanyContact = {
  email: string;
  phone: string;
};

function formatStateLabel(stored: string): string {
  if (!stored?.trim()) return "—";
  const byId = getStateById(stored);
  if (byId) return byId.name;
  const lower = stored.toLowerCase();
  const byName = NIGERIA_STATES_LGAS.find(
    (s) => s.id === lower || s.name.toLowerCase() === lower,
  );
  return byName?.name ?? stored;
}

export function pickDisplayName(d: AdminUserDetail): string {
  const bp = d.businessProfile as { businessName?: string } | null | undefined;
  if (bp?.businessName?.trim()) return bp.businessName.trim();
  const bb = d.billboardProfile as { businessName?: string } | null | undefined;
  if (bb?.businessName?.trim()) return bb.businessName.trim();
  const ip = d.individualProfile as
    | { firstName?: string; lastName?: string }
    | null
    | undefined;
  if (ip?.firstName || ip?.lastName) {
    return `${ip.firstName ?? ""} ${ip.lastName ?? ""}`.trim();
  }
  const inf = d.influencerProfile as
    | { mediaName?: string; firstName?: string; lastName?: string }
    | null
    | undefined;
  if (inf?.mediaName?.trim()) return inf.mediaName.trim();
  if (inf?.firstName) {
    return `${inf.firstName} ${inf.lastName ?? ""}`.trim();
  }
  const ap = d.adminProfile as
    | { firstName?: string; lastName?: string }
    | null
    | undefined;
  if (ap?.firstName) {
    return `${ap.firstName} ${ap.lastName ?? ""}`.trim();
  }
  return d.email;
}

export function pickContactDetails(d: AdminUserDetail): DisplayContact {
  const accountEmail = d.email?.trim() || "—";
  const accountPhone = d.phone?.trim() || "—";

  if (d.accountType === "billboard_owner") {
    const bb = d.billboardProfile as
      | {
          ContactPersonName?: string;
          ContactPersonEmail?: string;
          ContactPersonPhone?: string;
          ContactPersonPosition?: string;
        }
      | null
      | undefined;
    return {
      name: bb?.ContactPersonName?.trim() || pickDisplayName(d),
      email: bb?.ContactPersonEmail?.trim() || "—",
      phone: bb?.ContactPersonPhone?.trim() || "—",
      position: bb?.ContactPersonPosition?.trim() || undefined,
    };
  }

  if (d.accountType === "business_user") {
    const bu = d.businessProfile as
      | { contactName?: string; altPhoneNumber?: string | null }
      | null
      | undefined;
    return {
      name: bu?.contactName?.trim() || pickDisplayName(d),
      email: accountEmail,
      phone: bu?.altPhoneNumber?.trim() || accountPhone,
    };
  }

  if (d.accountType === "influencer") {
    const inf = d.influencerProfile as
      | { alternativePhone?: string | null }
      | null
      | undefined;
    return {
      name: pickDisplayName(d),
      email: accountEmail,
      phone: inf?.alternativePhone?.trim() || accountPhone,
    };
  }

  if (d.accountType === "admin") {
    const ap = d.adminProfile as
      | { alternatePhone?: string | null }
      | null
      | undefined;
    const alt = ap?.alternatePhone?.trim();
    return {
      name: pickDisplayName(d),
      email: accountEmail,
      phone: accountPhone,
      alternatePhone: alt || undefined,
    };
  }

  return {
    name: pickDisplayName(d),
    email: accountEmail,
    phone: accountPhone,
  };
}

export function pickCompanyContact(d: AdminUserDetail): DisplayCompanyContact {
  const accountEmail = d.email?.trim() || "—";
  const accountPhone = d.phone?.trim() || "—";

  if (d.accountType === "billboard_owner") {
    return { email: accountEmail, phone: accountPhone };
  }

  if (d.accountType === "business_user") {
    const bu = d.businessProfile as
      | { altPhoneNumber?: string | null }
      | null
      | undefined;
    return {
      email: accountEmail,
      phone: bu?.altPhoneNumber?.trim() || accountPhone,
    };
  }

  if (d.accountType === "influencer") {
    const inf = d.influencerProfile as
      | { alternativePhone?: string | null }
      | null
      | undefined;
    return {
      email: accountEmail,
      phone: inf?.alternativePhone?.trim() || accountPhone,
    };
  }

  return { email: accountEmail, phone: accountPhone };
}

export function pickCoverageLines(d: AdminUserDetail): string[] {
  if (d.accountType !== "billboard_owner") return [];
  const bb = d.billboardProfile as
    | { billboardCoverage?: { state: string; lga: string[] }[] }
    | null
    | undefined;
  return (
    bb?.billboardCoverage?.map((row) => {
      const stateName = formatStateLabel(row.state);
      const lgas = (row.lga ?? []).filter(Boolean);
      if (lgas.length === 0) return stateName;
      return `${stateName} — ${lgas.join(", ")}`;
    }) ?? []
  );
}

export function pickLocationLine(d: AdminUserDetail): DisplayLocation {
  const bb = d.billboardProfile as { businessAddress?: string } | null | undefined;

  if (d.accountType === "billboard_owner" && bb) {
    const address = bb.businessAddress?.trim();
    return { primary: address || "—" };
  }

  const bu = d.businessProfile as { businessAddress?: string } | null | undefined;
  if (bu?.businessAddress?.trim()) {
    return { primary: bu.businessAddress.trim() };
  }

  const inf = d.influencerProfile as { address?: string } | null | undefined;
  if (inf?.address?.trim()) {
    return { primary: inf.address.trim() };
  }

  const ip = d.individualProfile as { address?: string } | null | undefined;
  if (ip?.address?.trim()) {
    return { primary: ip.address.trim() };
  }

  if (d.accountType === "admin") {
    return { primary: "Not applicable" };
  }

  return { primary: "—" };
}
