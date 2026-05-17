import BlackButtons from "@components/buttons/BlackButton";
import PhoneNumberField from "@components/inputs/PhoneNumberField";
import { billboardOwnerSignup } from "@endpoint/auth/auth";
import { uploadVendorOnboardingFile } from "@endpoint/auth/onboardingStorage";
import {
  ApiError,
  saveAccountType,
  saveAuthTokens,
} from "@endpoint/baseFetch";
import type {
  PublicBillboardBusiness,
  VendorOnboardingUser,
} from "@endpoint/auth/types";
import { resolveStateId } from "../../lib/nigeriaStatesLgas";
import {
  defaultCountryIso2,
  parseE164ToPhoneFields,
  parsePhoneToE164,
  type PhoneFields,
} from "../../lib/phoneInput";
import {
  BillboardCoverageEditor,
  type BillboardCoverageRow,
} from "@components/vendor-settings/billboards/BillboardCoverageEditor";
import VendorDocumentUpload from "./VendorDocumentUpload";
import { useEffect, useState } from "react";

const baseInputClass =
  "bg-[#E4E4E4] focus:outline-none px-2 w-full rounded h-[38px] md:h-[45px] border";

function inputClass(hasError = false) {
  return `${baseInputClass} ${hasError ? "border-red-500" : "border-transparent"}`;
}

const coverageInputBase =
  "bg-[#E4E4E4] focus:outline-none px-2 w-full rounded min-h-[38px] md:min-h-[45px] border border-transparent";

type BackendStep = "account" | "business" | "contact" | "fix";
type BillboardWizardStep = 1 | 2 | 3;

function errorMessage(error: unknown): string {
  if (error instanceof ApiError) return error.message;
  if (error instanceof Error) return error.message;
  return "Something went wrong. Please try again.";
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
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const [email] = useState(inviteEmail);
  const [phone, setPhone] = useState<PhoneFields>({
    countryIso2: defaultCountryIso2,
    nationalNumber: "",
  });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [businessName, setBusinessName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [printingPricePerSqMeter, setPrintingPricePerSqMeter] = useState("");
  const [cacPreview, setCacPreview] = useState<string | null>(null);
  const [cacFileName, setCacFileName] = useState<string | null>(null);
  const [cacServerUrl, setCacServerUrl] = useState<string | null>(null);
  const [cacUploading, setCacUploading] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFileName, setLogoFileName] = useState<string | null>(null);
  const [logoServerUrl, setLogoServerUrl] = useState<string | null>(null);
  const [logoUploading, setLogoUploading] = useState(false);
  const [coverageRows, setCoverageRows] = useState<BillboardCoverageRow[]>([
    { state: "", lga: [] },
  ]);

  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState<PhoneFields>({
    countryIso2: defaultCountryIso2,
    nationalNumber: "",
  });
  const [contactPhoneError, setContactPhoneError] = useState<string | null>(
    null,
  );
  const [contactEmail, setContactEmail] = useState("");
  const [contactPosition, setContactPosition] = useState("");

  useEffect(() => {
    if (savedUser?.phone) {
      setPhone(parseE164ToPhoneFields(savedUser.phone));
    }
  }, [savedUser]);

  useEffect(() => {
    if (!savedBusiness) return;
    setBusinessName(savedBusiness.businessName ?? "");
    setBusinessAddress(savedBusiness.businessAddress ?? "");
    if (
      savedBusiness.printingPricePerSqMeter != null &&
      Number.isFinite(savedBusiness.printingPricePerSqMeter)
    ) {
      setPrintingPricePerSqMeter(String(savedBusiness.printingPricePerSqMeter));
    }
    if (savedBusiness.cac) {
      setCacServerUrl(savedBusiness.cac);
      setCacPreview(savedBusiness.cac);
      setCacFileName("CAC on file");
    }
    if (savedBusiness.businessLogo) {
      setLogoServerUrl(savedBusiness.businessLogo);
      setLogoPreview(savedBusiness.businessLogo);
      setLogoFileName("Logo on file");
    }
    if (savedBusiness.billboardCoverage?.length) {
      setCoverageRows(
        savedBusiness.billboardCoverage.map((c) => ({
          state: resolveStateId(c.state),
          lga: c.lga ?? [],
        })),
      );
    }
    setContactName(savedBusiness.contactPersonName ?? "");
    if (savedBusiness.contactPersonPhone) {
      setContactPhone(parseE164ToPhoneFields(savedBusiness.contactPersonPhone));
    }
    setContactEmail(savedBusiness.contactPersonEmail ?? "");
    setContactPosition(savedBusiness.contactPersonPosition ?? "");
  }, [savedBusiness]);

  const hasCacUrl = Boolean(cacServerUrl);

  const printingNum = parseFloat(printingPricePerSqMeter.replace(/,/g, ""));
  const hasValidPrintingPrice =
    Number.isFinite(printingNum) && printingNum > 0;

  const phoneReady = Boolean(phone.nationalNumber.trim());
  const passwordsMatch =
    Boolean(password) && Boolean(confirmPassword) && password === confirmPassword;

  const canGoNext =
    wizardStep === 1
      ? phoneReady && passwordsMatch
      : wizardStep === 2
        ? Boolean(
            businessName.trim() &&
              businessAddress.trim() &&
              hasValidPrintingPrice &&
              hasCacUrl &&
              !cacUploading &&
              !logoUploading &&
              coverageRows.some((r) => r.state && r.lga.length > 0),
          )
        : Boolean(
            contactName.trim() &&
              contactPhone.nationalNumber.trim() &&
              contactEmail.trim() &&
              contactPosition.trim(),
          );

  const handleContinueStep1 = async () => {
    if (!canGoNext || wizardStep !== 1) return;
    setFormError(null);
    setPhoneError(null);

    const e164 = parsePhoneToE164(phone.countryIso2, phone.nationalNumber);
    if (!e164) {
      setPhoneError("Enter a valid phone number.");
      return;
    }

    setSubmitting(true);
    try {
      const step1 = await billboardOwnerSignup({
        inviteToken,
        step: 1,
        phoneNumber: e164,
        password,
      });
      if (step1.accessToken && step1.refreshToken) {
        saveAuthTokens({
          accessToken: step1.accessToken,
          refreshToken: step1.refreshToken,
        });
        saveAccountType("billboard_owner");
      }
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
        printingPricePerSqMeter: printingNum,
        cacUrl: cacServerUrl!,
        ...(logoServerUrl ? { logoUrl: logoServerUrl } : {}),
      };

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
    setContactPhoneError(null);

    const contactE164 = parsePhoneToE164(
      contactPhone.countryIso2,
      contactPhone.nationalNumber,
    );
    if (!contactE164) {
      setContactPhoneError("Enter a valid contact phone number.");
      return;
    }

    setSubmitting(true);
    try {
      await billboardOwnerSignup({
        inviteToken,
        step: 3,
        contactName: contactName.trim(),
        contactPhone: contactE164,
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

  const handleCacSelect = async (file: File) => {
    setCacUploading(true);
    setFormError(null);
    try {
      const { publicUrl } = await uploadVendorOnboardingFile(file, inviteToken);
      setCacServerUrl(publicUrl);
      setCacPreview(publicUrl);
      setCacFileName(file.name);
    } catch (e) {
      setFormError(errorMessage(e));
    } finally {
      setCacUploading(false);
    }
  };

  const handleCacClear = () => {
    setCacFileName(null);
    setCacPreview(null);
    setCacServerUrl(null);
  };

  const handleLogoSelect = async (file: File) => {
    setLogoUploading(true);
    setFormError(null);
    try {
      const { publicUrl } = await uploadVendorOnboardingFile(file, inviteToken);
      setLogoServerUrl(publicUrl);
      setLogoPreview(publicUrl);
      setLogoFileName(file.name);
    } catch (e) {
      setFormError(errorMessage(e));
    } finally {
      setLogoUploading(false);
    }
  };

  const handleLogoClear = () => {
    setLogoFileName(null);
    setLogoPreview(null);
    setLogoServerUrl(null);
  };

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
            <label htmlFor="onboarding-email">Email</label>
            <br />
            <input
              id="onboarding-email"
              className={inputClass()}
              value={email}
              disabled
            />
          </div>

          <PhoneNumberField
            id="onboarding-phone"
            value={phone}
            onChange={(next) => {
              setPhoneError(null);
              setPhone(next);
            }}
            inputClass={inputClass}
            error={phoneError}
          />

          <div className="lg:flex my-3 gap-0 lg:gap-4">
            <div className="basis-1/2 my-3 lg:my-0">
              <label htmlFor="onboarding-password">Password</label>
              <br />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="onboarding-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  className={inputClass()}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-700"
                  onClick={() => setShowPassword((s) => !s)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="basis-1/2 my-3 lg:my-0">
              <label htmlFor="onboarding-confirm-password">Confirm Password</label>
              <br />
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="onboarding-confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  className={inputClass(
                    Boolean(
                      password &&
                        confirmPassword &&
                        password !== confirmPassword,
                    ),
                  )}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-700"
                  onClick={() => setShowConfirmPassword((s) => !s)}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
              {password && confirmPassword && password !== confirmPassword ? (
                <p className="mt-1 text-sm text-red-600">Passwords do not match.</p>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {wizardStep === 2 && (
        <div>
          <div className="my-3">
            <label>Business name</label>
            <br />
            <input
              className={inputClass()}
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
          </div>
          <div className="my-3">
            <label>Business address</label>
            <br />
            <input
              className={inputClass()}
              value={businessAddress}
              onChange={(e) => setBusinessAddress(e.target.value)}
            />
          </div>

          <div className="my-3">
            <label>Printing price (₦ per m²)</label>
            <p className="text-xs text-gray-600 mt-1 mb-1">
              Used for static vinyl printing quotes (your rate per square metre).
            </p>
            <input
              className={inputClass()}
              type="number"
              min={0}
              step="0.01"
              value={printingPricePerSqMeter}
              onChange={(e) => setPrintingPricePerSqMeter(e.target.value)}
              placeholder="e.g. 4500"
            />
          </div>

          <VendorDocumentUpload
            label="CAC document"
            required
            hint="PDF or image of your CAC registration (max 8MB per file)."
            accept=".pdf,application/pdf,image/png,image/jpeg,image/webp"
            previewUrl={cacPreview}
            fileName={cacFileName}
            onSelect={handleCacSelect}
            onClear={handleCacClear}
            uploading={cacUploading}
          />

          <VendorDocumentUpload
            label="Business logo"
            hint="Optional. PNG or JPG works best for your vendor profile."
            accept="image/png,image/jpeg,image/webp"
            previewUrl={logoPreview}
            fileName={logoFileName}
            onSelect={handleLogoSelect}
            onClear={handleLogoClear}
            uploading={logoUploading}
          />

          <div className="my-4">
            <BillboardCoverageEditor
              rows={coverageRows}
              onChange={setCoverageRows}
              inputBase={coverageInputBase}
            />
          </div>
        </div>
      )}

      {wizardStep === 3 && (
        <div>
          <div className="my-3">
            <label>Contact name</label>
            <br />
            <input
              className={inputClass()}
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
            />
          </div>
          <PhoneNumberField
            id="onboarding-contact-phone"
            label="Contact phone"
            value={contactPhone}
            onChange={(next) => {
              setContactPhoneError(null);
              setContactPhone(next);
            }}
            inputClass={inputClass}
            error={contactPhoneError}
          />

          <div className="my-3">
            <label>Contact email</label>
            <br />
            <input
              className={inputClass()}
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
            />
          </div>
          <div className="my-3">
            <label>Position / role</label>
            <br />
            <input
              className={inputClass()}
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
