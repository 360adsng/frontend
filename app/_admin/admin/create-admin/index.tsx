"use client";

import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { ApiError } from "@endpoint";
import {
  postAdminCreateAdmin,
  type AdminCreatableRole,
} from "@endpoint/admin/admin";

const ROLE_OPTIONS: {
  value: AdminCreatableRole;
  label: string;
  hint: string;
}[] = [
  { value: "admin", label: "Admin", hint: "Standard admin access" },
  {
    value: "finance",
    label: "Finance",
    hint: "Wallet, payouts, and money movement",
  },
  { value: "moderator", label: "Moderator", hint: "Limited admin access" },
];

function errMessage(e: unknown): string {
  if (e instanceof ApiError) return e.message;
  if (e instanceof Error) return e.message;
  return "Something went wrong.";
}

function toggleRole(
  roles: AdminCreatableRole[],
  role: AdminCreatableRole,
  checked: boolean,
): AdminCreatableRole[] {
  const set = new Set(roles);
  if (checked) set.add(role);
  else set.delete(role);
  return Array.from(set);
}

function AdminCreateAdminPage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [roles, setRoles] = useState<AdminCreatableRole[]>(["moderator"]);
  const [createdSummary, setCreatedSummary] = useState<string | null>(null);

  const mut = useMutation({
    mutationFn: postAdminCreateAdmin,
    onSuccess: (data) => {
      toast.success(data.message || "Admin created.");
      const a = data.admin;
      setCreatedSummary(
        `Admin #${a.id} · ${a.email} · ${a.phone}`,
      );
      setEmail("");
      setFirstName("");
      setLastName("");
      setPhoneNumber("");
      setRoles(["moderator"]);
    },
    onError: (e) => {
      setCreatedSummary(null);
      toast.error(errMessage(e));
    },
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCreatedSummary(null);
    if (roles.length === 0) {
      toast.error("Select at least one role.");
      return;
    }
    mut.mutate({
      email: email.trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phoneNumber: phoneNumber.trim(),
      roles,
    });
  };

  return (
    <section className="min-h-[70vh] bg-ads360-hash px-4 py-10 md:px-10">
      <div className="mx-auto max-w-lg">
        <h1 className="font-serif text-2xl text-stone-900">Create admin</h1>
        <p className="mt-2 text-sm text-stone-600">
          Provision a new administrator account. A temporary password is set
          on the server — share credentials securely with the new admin so they
          can sign in and change their password.
        </p>

        <form
          onSubmit={onSubmit}
          className="mt-8 space-y-5 rounded-10 border border-stone-200 bg-white p-6 shadow-sm"
        >
          <label className="block text-sm">
            <span className="font-medium text-stone-700">Email</span>
            <input
              type="email"
              required
              autoComplete="email"
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@company.com"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="font-medium text-stone-700">First name</span>
              <input
                required
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="given-name"
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-stone-700">Last name</span>
              <input
                required
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="family-name"
              />
            </label>
          </div>

          <label className="block text-sm">
            <span className="font-medium text-stone-700">Phone</span>
            <input
              type="tel"
              required
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              autoComplete="tel"
              placeholder="+234…"
            />
          </label>

          <fieldset>
            <legend className="text-sm font-medium text-stone-700">
              Roles (one or more)
            </legend>
            <p className="mt-1 text-xs text-stone-500">
              Choose from <code className="text-stone-600">admin</code>,{" "}
              <code className="text-stone-600">finance</code>, and/or{" "}
              <code className="text-stone-600">moderator</code>. Super admin
              cannot be assigned here.
            </p>
            <ul className="mt-3 space-y-2">
              {ROLE_OPTIONS.map((o) => (
                <li key={o.value}>
                  <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-stone-200 bg-stone-50/80 px-3 py-2">
                    <input
                      type="checkbox"
                      className="mt-1"
                      checked={roles.includes(o.value)}
                      onChange={(e) =>
                        setRoles(
                          toggleRole(roles, o.value, e.target.checked),
                        )
                      }
                    />
                    <span>
                      <span className="font-medium text-stone-900">
                        {o.label}
                      </span>
                      <span className="text-stone-500"> — {o.hint}</span>
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>

          <button
            type="submit"
            disabled={mut.isPending || roles.length === 0}
            className="w-full rounded-lg border-2 border-stone-900 bg-stone-900 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
          >
            {mut.isPending ? "Creating…" : "Create admin"}
          </button>
        </form>

        {createdSummary ? (
          <div className="mt-6 rounded-10 border border-emerald-200 bg-emerald-50/80 p-4 text-sm text-stone-800">
            <p className="font-semibold text-emerald-900">Created</p>
            <p className="mt-2">{createdSummary}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export const Route = createFileRoute("/_admin/admin/create-admin/")({
  component: AdminCreateAdminPage,
});

export default AdminCreateAdminPage;
