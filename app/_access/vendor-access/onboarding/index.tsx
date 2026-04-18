import BlackButtons from "@components/buttons/BlackButton";
import BlackLogo from "@components/logo/BlackLogo";
import { billboardOwnerSignup, vendorOnboarding } from "@endpoint/auth/auth";
import { ApiError } from "@endpoint/baseFetch";
import type {
  PublicBillboardBusiness,
  VendorOnboardingResponse,
  VendorOnboardingUser,
} from "@endpoint/auth/types";
import { NIGERIA_STATES_LGAS, getStateById } from "../../../../lib/nigeriaStatesLgas";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";

const inputBase =
  "bg-[#E4E4E4] focus:outline-none px-2 w-full rounded min-h-[38px] md:min-h-[45px]";

type BackendStep = "account" | "business" | "contact" | "fix";

/** Wizard steps inside billboard onboarding (not the same as backend `step`). */
type BillboardWizardStep = 1 | 2 | 3;

export type BillboardCoverageRow = { state: string; lga: string[] };

function extractToken(): string | null {
  if (typeof window === "undefined") return null;
  const token = new URLSearchParams(window.location.search).get("token");
  return token?.trim() ? token.trim() : null;
}

function errorMessage(error: unknown): string {
  if (error instanceof ApiError) return error.message;
  if (error instanceof Error) return error.message;
  return "Something went wrong. Please try again.";
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result as string);
    fr.onerror = () => reject(fr.error);
    fr.readAsDataURL(file);
  });
}

function isBillboardVendor(accountType: string | undefined): boolean {
  return accountType === "billboard_owner" || accountType === "billboard";
}

function initialWizardStepFromBackend(backendStep: BackendStep): BillboardWizardStep {
  if (backendStep === "account") return 1;
  if (backendStep === "business") return 2;
  if (backendStep === "contact") return 3;
  if (backendStep === "fix") return 2;
  return 1;
}

function BillboardOnboardingWizard({
  inviteToken,
  backendStep,
  inviteEmail,
  savedUser,
  savedBusiness,
  onAfterSave,
}: {
  inviteToken: string;
  backendStep: BackendStep;
  inviteEmail: string;
  savedUser: VendorOnboardingUser | null;
  savedBusiness: PublicBillboardBusiness | null;
  onAfterSave: () => Promise<void>;
}) {
  const [wizardStep, setWizardStep] = useState<BillboardWizardStep>(() =>
    initialWizardStepFromBackend(backendStep),
  );
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Step 1 — user
  const [email] = useState(inviteEmail);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);

  // Step 2 — business
  const [businessName, setBusinessName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [cacPreview, setCacPreview] = useState<string | null>(null);
  const [cacFile, setCacFile] = useState<File | null>(null);
  const [cacServerUrl, setCacServerUrl] = useState<string | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoServerUrl, setLogoServerUrl] = useState<string | null>(null);
  const [website, setWebsite] = useState("");
  const [coverageRows, setCoverageRows] = useState<BillboardCoverageRow[]>([
    { state: "", lga: [] },
  ]);

  // Step 3 — contact
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPosition, setContactPosition] = useState("");

  useEffect(() => {
    if (savedUser?.phone) setPhone(savedUser.phone);
  }, [savedUser]);

  useEffect(() => {
    if (!savedBusiness) return;
    setBusinessName(savedBusiness.businessName ?? "");
    setBusinessAddress(savedBusiness.businessAddress ?? "");
    setWebsite(savedBusiness.businessWebsite ?? "");
    if (savedBusiness.cac) {
      setCacServerUrl(savedBusiness.cac);
      setCacPreview(savedBusiness.cac);
    }
    if (savedBusiness.businessLogo) {
      setLogoServerUrl(savedBusiness.businessLogo);
      setLogoPreview(savedBusiness.businessLogo);
    }
    if (savedBusiness.billboardCoverage?.length) {
      setCoverageRows(
        savedBusiness.billboardCoverage.map((c) => ({
          state: c.state,
          lga: c.lga ?? [],
        })),
      );
    }
    setContactName(savedBusiness.contactPersonName ?? "");
    setContactPhone(savedBusiness.contactPersonPhone ?? "");
    setContactEmail(savedBusiness.contactPersonEmail ?? "");
    setContactPosition(savedBusiness.contactPersonPosition ?? "");
  }, [savedBusiness]);

  const setRowState = (index: number, stateId: string) => {
    setCoverageRows((rows) =>
      rows.map((r, i) => (i === index ? { state: stateId, lga: [] } : r)),
    );
  };

  const addCoverageRow = () => {
    setCoverageRows((rows) => [...rows, { state: "", lga: [] }]);
  };

  const removeCoverageRow = (index: number) => {
    setCoverageRows((rows) => rows.filter((_, i) => i !== index));
  };

  const toggleLga = (rowIndex: number, lgaName: string) => {
    setCoverageRows((rows) =>
      rows.map((r, i) => {
        if (i !== rowIndex) return r;
        const next = new Set(r.lga);
        if (next.has(lgaName)) next.delete(lgaName);
        else next.add(lgaName);
        return { ...r, lga: Array.from(next) };
      }),
    );
  };

  const hasCacOrServer =
    Boolean(cacFile) ||
    Boolean(cacServerUrl) ||
    Boolean(cacPreview && !cacPreview.startsWith("blob:"));

  const canGoNext =
    wizardStep === 1
      ? Boolean(phone.trim() && password && password === confirmPassword)
      : wizardStep === 2
        ? Boolean(
            businessName.trim() &&
              businessAddress.trim() &&
              hasCacOrServer &&
              coverageRows.some((r) => r.state && r.lga.length > 0),
          )
        : Boolean(
            contactName.trim() &&
              contactPhone.trim() &&
              contactEmail.trim() &&
              contactPosition.trim(),
          );

  const handleContinueStep1 = async () => {
    if (!canGoNext || wizardStep !== 1) return;
    setFormError(null);
    setSubmitting(true);
    try {
      await billboardOwnerSignup({
        inviteToken,
        step: 1,
        phoneNumber: phone.trim(),
        password,
      });
      await onAfterSave();
      setWizardStep(2);
    } catch (e) {
      setFormError(errorMessage(e));
    } finally {
      setSubmitting(false);
    }
  };

  const handleContinueStep2 = async () => {
    if (!canGoNext || wizardStep !== 2) return;
    setFormError(null);
    setSubmitting(true);
    try {
      const coverage = coverageRows
        .filter((r) => r.state && r.lga.length)
        .map((r) => ({ state: r.state, lga: r.lga }));

      const payload: Parameters<typeof billboardOwnerSignup>[0] = {
        inviteToken,
        step: 2,
        businessName: businessName.trim(),
        address: businessAddress.trim(),
        billboardCoverage: coverage,
        website: website.trim() || undefined,
      };

      if (cacFile) {
        payload.cacDataUrl = await fileToDataUrl(cacFile);
      } else if (cacServerUrl) {
        payload.cacUrl = cacServerUrl;
      }

      if (logoFile) {
        payload.logoDataUrl = await fileToDataUrl(logoFile);
      } else if (logoServerUrl) {
        payload.logoUrl = logoServerUrl;
      }

      await billboardOwnerSignup(payload);
      await onAfterSave();
      setWizardStep(3);
    } catch (e) {
      setFormError(errorMessage(e));
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitStep3 = async () => {
    if (!canGoNext || wizardStep !== 3) return;
    setFormError(null);
    setSubmitting(true);
    try {
      await billboardOwnerSignup({
        inviteToken,
        step: 3,
        contactName: contactName.trim(),
        contactPhone: contactPhone.trim(),
        contactEmail: contactEmail.trim(),
        contactPosition: contactPosition.trim(),
      });
      await onAfterSave();
    } catch (e) {
      setFormError(errorMessage(e));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-4">
      {formError && (
        <p className="text-red-600 text-sm mb-3" role="alert">
          {formError}
        </p>
      )}
      <div className="flex justify-center gap-2 text-sm mb-6">
        {[1, 2, 3].map((n) => (
          <span
            key={n}
            className={`rounded-full px-3 py-1 ${
              wizardStep === n
                ? "bg-ads360yellow-100 text-black font-medium"
                : "bg-[#E4E4E4] text-gray-700"
            }`}
          >
            {n}. {n === 1 ? "Account" : n === 2 ? "Business" : "Contact"}
          </span>
        ))}
      </div>

      {wizardStep === 1 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Step 1 — Your account</h3>
          <div className="my-3">
            <label>Email</label>
            <input value={email} disabled className={`${inputBase} opacity-70`} />
          </div>
          <div className="my-3">
            <label>Phone number</label>
            <input
              className={inputBase}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+2348012345678"
            />
            <p className="text-xs text-gray-600 mt-1">International format (E.164).</p>
          </div>
          <div className="my-3">
            <label>Password</label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                className={inputBase}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-700"
                onClick={() => setShowPw((s) => !s)}
              >
                {showPw ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="my-3">
            <label>Confirm password</label>
            <div className="relative">
              <input
                type={showPw2 ? "text" : "password"}
                className={inputBase}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-700"
                onClick={() => setShowPw2((s) => !s)}
              >
                {showPw2 ? "Hide" : "Show"}
              </button>
            </div>
          </div>
        </div>
      )}

      {wizardStep === 2 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Step 2 — Business details</h3>
          <div className="my-3">
            <label>Business name</label>
            <input
              className={inputBase}
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
          </div>
          <div className="my-3">
            <label>Business address</label>
            <input
              className={inputBase}
              value={businessAddress}
              onChange={(e) => setBusinessAddress(e.target.value)}
            />
          </div>
          <div className="my-3">
            <label>CAC (image)</label>
            <div className="flex items-center gap-3 flex-wrap">
              <label
                htmlFor="cacFile"
                className="inline-flex items-center justify-center rounded bg-ads360yellow-100 px-3 py-2 cursor-pointer text-sm"
              >
                Upload CAC
              </label>
              <input
                id="cacFile"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  setCacFile(f);
                  setCacPreview(URL.createObjectURL(f));
                }}
              />
              {cacPreview && (
                <img alt="CAC" src={cacPreview} className="h-14 w-14 rounded object-cover bg-white" />
              )}
            </div>
          </div>
          <div className="my-3">
            <label>Business website (optional)</label>
            <input
              className={inputBase}
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://"
            />
          </div>
          <div className="my-3">
            <label>Business logo (optional)</label>
            <div className="flex items-center gap-3 flex-wrap">
              <label
                htmlFor="logoFile"
                className="inline-flex items-center justify-center rounded border border-gray-400 px-3 py-2 cursor-pointer text-sm"
              >
                Upload logo
              </label>
              <input
                id="logoFile"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  setLogoFile(f);
                  setLogoPreview(URL.createObjectURL(f));
                }}
              />
              {logoPreview && (
                <img alt="Logo" src={logoPreview} className="h-14 w-14 rounded object-cover bg-white" />
              )}
            </div>
          </div>

          <div className="my-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Billboard coverage</span>
              <button
                type="button"
                className="text-sm text-ads360yellow-100"
                onClick={addCoverageRow}
              >
                + Add state
              </button>
            </div>
            <p className="text-xs text-gray-600 mb-3">
              For each state, tap the circle next to an LGA to include it. Output shape:{" "}
              <code className="text-[11px]">{"[{ state, lga: [] }]"}</code>
            </p>
            {coverageRows.map((row, idx) => {
              const stateDef = row.state ? getStateById(row.state) : undefined;
              return (
                <div
                  key={idx}
                  className="mb-4 rounded border border-gray-200 p-3 bg-[#fafafa]"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">State {idx + 1}</span>
                    {coverageRows.length > 1 && (
                      <button
                        type="button"
                        className="text-xs text-red-600"
                        onClick={() => removeCoverageRow(idx)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="my-2">
                    <label className="text-sm">State</label>
                    <select
                      className={inputBase}
                      value={row.state}
                      onChange={(e) => setRowState(idx, e.target.value)}
                    >
                      <option value="">Select state</option>
                      {NIGERIA_STATES_LGAS.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {stateDef && (
                    <div className="my-2">
                      <label className="text-sm block mb-2">LGAs</label>
                      <div className="flex flex-col gap-2 max-h-[min(280px,50vh)] overflow-y-auto pr-1">
                        {stateDef.lgas.map((lga) => {
                          const selected = row.lga.includes(lga);
                          return (
                            <button
                              key={lga}
                              type="button"
                              role="checkbox"
                              aria-checked={selected}
                              onClick={() => toggleLga(idx, lga)}
                              className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                                selected
                                  ? "border-ads360yellow-100 bg-ads360yellow-100/15"
                                  : "border-gray-200 bg-white hover:bg-gray-50"
                              }`}
                            >
                              <span
                                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                                  selected
                                    ? "border-ads360yellow-100 bg-ads360yellow-100 text-black"
                                    : "border-gray-400 bg-white"
                                }`}
                                aria-hidden
                              >
                                {selected ? (
                                  <svg
                                    className="h-3.5 w-3.5"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M2 6l3 3 5-5"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                ) : null}
                              </span>
                              <span className="flex-1">{lga}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {wizardStep === 3 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Step 3 — Contact person</h3>
          <div className="my-3">
            <label>Contact name</label>
            <input
              className={inputBase}
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
            />
          </div>
          <div className="my-3">
            <label>Contact phone</label>
            <input
              className={inputBase}
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder="+234..."
            />
          </div>
          <div className="my-3">
            <label>Contact email</label>
            <input
              type="email"
              className={inputBase}
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
            />
          </div>
          <div className="my-3">
            <label>Position / role</label>
            <input
              className={inputBase}
              value={contactPosition}
              onChange={(e) => setContactPosition(e.target.value)}
            />
          </div>
        </div>
      )}

      <div className="flex flex-wrap justify-between gap-3 mt-8">
        {wizardStep > 1 && (
          <button
            type="button"
            disabled={submitting}
            className="rounded border px-4 py-2 text-sm disabled:opacity-50"
            onClick={() => setWizardStep((s) => (s > 1 ? ((s - 1) as BillboardWizardStep) : s))}
          >
            Back
          </button>
        )}
        <div className="flex-1" />
        {wizardStep < 3 ? (
          <button
            type="button"
            disabled={!canGoNext || submitting}
            className="rounded bg-ads360yellow-100 px-4 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => {
              if (wizardStep === 1) void handleContinueStep1();
              else if (wizardStep === 2) void handleContinueStep2();
            }}
          >
            {submitting ? "Saving…" : "Continue"}
          </button>
        ) : (
          <BlackButtons
            text={submitting ? "Submitting…" : "Submit application"}
            isPending={submitting}
            handleClick={() => void handleSubmitStep3()}
          />
        )}
      </div>
    </div>
  );
}

const VendorAccessOnboarding = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<VendorOnboardingResponse | null>(null);

  const token = useMemo(() => extractToken(), []);

  const loadOnboarding = useCallback(async () => {
    if (!token) return;
    const res = await vendorOnboarding({ inviteToken: token });
    setData(res);
  }, [token]);

  useEffect(() => {
    let alive = true;
    (async () => {
      if (!token) {
        setError("Missing invite token.");
        setLoading(false);
        return;
      }
      try {
        await loadOnboarding();
      } catch (e) {
        if (!alive) return;
        setError(errorMessage(e));
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [token, loadOnboarding]);

  const email = data && "email" in data ? data.email : "";
  const accountType =
    data && "accountType" in data ? data.accountType : undefined;

  const backendStep: BackendStep | null =
    data && "step" in data ? (data.step as BackendStep) : null;

  const savedUser =
    data && "user" in data && data.user && typeof data.user === "object" && "id" in data.user
      ? (data.user as VendorOnboardingUser)
      : null;

  const savedBusiness =
    data && "business" in data && data.business && typeof data.business === "object" && "id" in data.business
      ? (data.business as PublicBillboardBusiness)
      : null;

  const rejectionReason =
    backendStep === "fix" ? savedBusiness?.verificationRejectionReason : undefined;

  return (
    <section className="min-h-screen bg-ads360-hash">
      <div className="p-10">
        <BlackLogo />
      </div>

      <div className="mx-auto w-11/12 md:w-7/12 lg:w-6/12 py-12">
        <h2 className="text-center text-4xl">Vendor onboarding</h2>
        <p className="text-center text-ads360yellow-100 font-light my-3">
          Validating your invite link…
        </p>

        <div className="border border-ads360yellow-100 bg-white rounded-10 my-5 p-4 md:p-6">
          {loading && <p className="text-center">Validating token...</p>}

          {!loading && error && (
            <div className="text-center">
              <p className="text-red-600 font-medium">{error}</p>
              <p className="text-sm text-gray-600 mt-2">
                If you believe this is a mistake, request a new invite link.
              </p>
              <div className="mt-5">
                <Link to="/signin" className="text-ads360yellow-100">
                  Go to sign in
                </Link>
              </div>
            </div>
          )}

          {!loading && !error && data && "status" in data && (
            <div className="text-center">
              <h3 className="text-xl font-semibold">Application submitted</h3>
              <p className="text-sm text-gray-700 mt-2">
                We already received your onboarding details.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Status:{" "}
                <span className="font-medium">{data.businessStatus ?? "pending"}</span>
              </p>
            </div>
          )}

          {!loading && !error && data && "step" in data && (
            <div>
              <div className="rounded bg-ads360-hash p-3 text-sm text-gray-700 mb-2">
                <div>
                  Invite email: <span className="font-medium">{email}</span>
                </div>
                <div className="mt-1">
                  Vendor type:{" "}
                  <span className="font-medium">{accountType ?? "—"}</span>
                </div>
              </div>

              {backendStep &&
                token &&
                isBillboardVendor(accountType) &&
                (backendStep === "account" ||
                  backendStep === "business" ||
                  backendStep === "contact" ||
                  backendStep === "fix") && (
                  <div>
                    {(backendStep === "business" || backendStep === "fix") && (
                      <div className="rounded bg-amber-50 border border-amber-200 p-3 text-sm text-gray-800 mb-4">
                        {backendStep === "fix" ? (
                          <div>
                            <p className="font-medium text-amber-900">
                              Your application needs updates before we can approve it.
                            </p>
                            {rejectionReason ? (
                              <p className="mt-2 text-gray-800">
                                <span className="font-medium">Reason: </span>
                                {rejectionReason}
                              </p>
                            ) : (
                              <p className="mt-2 text-gray-700">
                                Update your details below and resubmit.
                              </p>
                            )}
                          </div>
                        ) : (
                          "Complete your business and contact information."
                        )}
                      </div>
                    )}
                    <BillboardOnboardingWizard
                      inviteToken={token}
                      backendStep={backendStep}
                      inviteEmail={email}
                      savedUser={savedUser}
                      savedBusiness={savedBusiness}
                      onAfterSave={loadOnboarding}
                    />
                  </div>
                )}

              {backendStep && accountType && !isBillboardVendor(accountType) && (
                <p className="text-center text-gray-700 mt-6">
                  Onboarding for this vendor type ({String(accountType)}) is not available yet.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export const Route = createFileRoute("/_access/vendor-access/onboarding/")({
  component: VendorAccessOnboarding,
});

export default VendorAccessOnboarding;
