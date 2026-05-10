import BlackButtons from "@components/buttons/BlackButton";
import { billboardOwnerSignup } from "@endpoint/auth/auth";
import { ApiError } from "@endpoint/baseFetch";
import type {
  PublicBillboardBusiness,
  VendorOnboardingUser,
} from "@endpoint/auth/types";
import { NIGERIA_STATES_LGAS, getStateById } from "../../lib/nigeriaStatesLgas";
import { useEffect, useMemo, useState } from "react";

const inputBase =
  "bg-[#E4E4E4] focus:outline-none px-2 w-full rounded min-h-[38px] md:min-h-[45px]";

type BackendStep = "account" | "business" | "contact" | "fix";
type BillboardWizardStep = 1 | 2 | 3;
export type BillboardCoverageRow = { state: string; lga: string[] };

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

function initialWizardStepFromBackend(
  backendStep: BackendStep,
): BillboardWizardStep {
  if (backendStep === "account") return 1;
  if (backendStep === "business") return 2;
  if (backendStep === "contact") return 3;
  if (backendStep === "fix") return 2;
  return 1;
}

export default function BillboardForm({
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

      if (cacFile) payload.cacDataUrl = await fileToDataUrl(cacFile);
      else if (cacServerUrl) payload.cacUrl = cacServerUrl;

      if (logoFile) payload.logoDataUrl = await fileToDataUrl(logoFile);
      else if (logoServerUrl) payload.logoUrl = logoServerUrl;

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

  const stateOptions = useMemo(
    () =>
      Object.keys(NIGERIA_STATES_LGAS).map((id) => ({
        id,
        name: getStateById(id)?.name ?? id,
      })),
    [],
  );

  return (
    <div>
      {formError ? (
        <p className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {formError}
        </p>
      ) : null}

      <div className="mb-4 rounded bg-ads360-hash p-3 text-sm">
        <p>
          Step <span className="font-medium">{wizardStep}</span> of 3
        </p>
      </div>

      {wizardStep === 1 && (
        <div>
          <div className="my-3">
            <label>Email</label>
            <input className={inputBase} value={email} disabled />
          </div>
          <div className="my-3">
            <label>Phone number</label>
            <input
              className={inputBase}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="my-3">
            <label>Password</label>
            <div className="flex gap-2">
              <input
                className={inputBase}
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="rounded border px-3 text-sm"
                onClick={() => setShowPw((s) => !s)}
              >
                {showPw ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="my-3">
            <label>Confirm password</label>
            <div className="flex gap-2">
              <input
                className={inputBase}
                type={showPw2 ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="rounded border px-3 text-sm"
                onClick={() => setShowPw2((s) => !s)}
              >
                {showPw2 ? "Hide" : "Show"}
              </button>
            </div>
            {password && confirmPassword && password !== confirmPassword ? (
              <p className="mt-1 text-sm text-red-600">
                Passwords do not match.
              </p>
            ) : null}
          </div>
        </div>
      )}

      {wizardStep === 2 && (
        <div>
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
            <label>Website (optional)</label>
            <input
              className={inputBase}
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <div className="my-3">
            <label>CAC document (required)</label>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => {
                const f = e.target.files?.[0] ?? null;
                setCacFile(f);
                setCacPreview(f ? URL.createObjectURL(f) : cacServerUrl);
              }}
            />
            {cacPreview ? (
              <div className="mt-2 text-sm">
                <a
                  href={cacPreview}
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  Preview CAC
                </a>
              </div>
            ) : null}
          </div>

          <div className="my-3">
            <label>Logo (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files?.[0] ?? null;
                setLogoFile(f);
                setLogoPreview(f ? URL.createObjectURL(f) : logoServerUrl);
              }}
            />
            {logoPreview ? (
              <div className="mt-2 text-sm">
                <a
                  href={logoPreview}
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  Preview logo
                </a>
              </div>
            ) : null}
          </div>

          <div className="my-3">
            <label className="font-medium">Billboard coverage (required)</label>
            <p className="text-sm text-gray-600 mt-1">
              Select a state and at least one LGA for each row.
            </p>
          </div>

          {coverageRows.map((row, idx) => {
            const st = getStateById(row.state);
            const lgas = st?.lgas ?? [];
            return (
              <div key={idx} className="my-4 rounded border p-3">
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    className={inputBase}
                    value={row.state}
                    onChange={(e) => setRowState(idx, e.target.value)}
                  >
                    <option value="">Select state</option>
                    {stateOptions.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                  {coverageRows.length > 1 && (
                    <button
                      type="button"
                      className="rounded border px-3 py-2 text-sm"
                      onClick={() => removeCoverageRow(idx)}
                    >
                      Remove
                    </button>
                  )}
                </div>

                {row.state ? (
                  <div className="mt-3">
                    <p className="text-sm font-medium">Select LGAs</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {lgas.map((lga) => {
                        const active = row.lga.includes(lga);
                        return (
                          <button
                            key={lga}
                            type="button"
                            onClick={() => toggleLga(idx, lga)}
                            className={`rounded border px-3 py-1 text-sm ${
                              active
                                ? "bg-ads360yellow-100 text-white border-ads360yellow-100"
                                : ""
                            }`}
                          >
                            {lga}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}

          <button
            type="button"
            className="rounded border px-3 py-2 text-sm"
            onClick={addCoverageRow}
          >
            Add coverage row
          </button>
        </div>
      )}

      {wizardStep === 3 && (
        <div>
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
            />
          </div>
          <div className="my-3">
            <label>Contact email</label>
            <input
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
            onClick={() =>
              setWizardStep((s) =>
                s > 1 ? ((s - 1) as BillboardWizardStep) : s,
              )
            }
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

