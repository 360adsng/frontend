import BlackButtons from "@components/buttons/BlackButton";
import { influencerSignup } from "@endpoint/auth/auth";
import { ApiError } from "@endpoint/baseFetch";
import type {
  PublicInfluencerProfile,
  VendorOnboardingUser,
} from "@endpoint/auth/types";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import type { CountryCode } from "libphonenumber-js";
import { COUNTRIES } from "../../lib/countries";
import { useEffect, useMemo, useState } from "react";

const inputBase =
  "bg-[#E4E4E4] focus:outline-none px-2 w-full rounded min-h-[38px] md:min-h-[45px]";

type InfluencerBackendStep = "account" | "profile" | "platforms";
type InfluencerWizardStep = 1 | 2 | 3;

const PHONE_NUMBER_HINT = "Enter phone number without the leading 0.";

function errorMessage(error: unknown): string {
  if (error instanceof ApiError) return error.message;
  if (error instanceof Error) return error.message;
  return "Something went wrong. Please try again.";
}

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

function initialWizardStep(step: InfluencerBackendStep): InfluencerWizardStep {
  if (step === "account") return 1;
  if (step === "profile") return 2;
  return 3;
}

type PlatformRow = {
  name: string;
  platformUrl: string;
  username: string;
  numberOfFollowers: string;
  estimatedImpressions: string;
  amountRate: string;
};

const emptyPlatform: PlatformRow = {
  name: "",
  platformUrl: "",
  username: "",
  numberOfFollowers: "",
  estimatedImpressions: "",
  amountRate: "",
};

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result as string);
    fr.onerror = () => reject(fr.error);
    fr.readAsDataURL(file);
  });
}

export default function InfluencerForm({
  inviteToken,
  backendStep,
  inviteEmail,
  savedUser,
  savedProfile,
  onAfterSave,
}: {
  inviteToken: string;
  backendStep: InfluencerBackendStep;
  inviteEmail: string;
  savedUser: VendorOnboardingUser | null;
  savedProfile: PublicInfluencerProfile | null;
  onAfterSave: () => Promise<void>;
}) {
  const [wizardStep, setWizardStep] = useState<InfluencerWizardStep>(() =>
    initialWizardStep(backendStep),
  );
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const defaultCountryIso2 = COUNTRIES[0]?.iso2 ?? "NG";

  // Step 1
  const [email] = useState(inviteEmail);
  const [phoneCountryIso2, setPhoneCountryIso2] =
    useState<string>(defaultCountryIso2);
  const [phoneNationalNumber, setPhoneNationalNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);

  // Step 2
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mediaName, setMediaName] = useState("");
  const [influencerType, setInfluencerType] = useState("influencer");
  const [bio, setBio] = useState("");
  const [allowNegotiation, setAllowNegotiation] = useState(false);
  const [altPhoneCountryIso2, setAltPhoneCountryIso2] =
    useState<string>(defaultCountryIso2);
  const [altPhoneNationalNumber, setAltPhoneNationalNumber] = useState("");
  const [address, setAddress] = useState("");
  const [profilePicturePreview, setProfilePicturePreview] = useState<
    string | null
  >(null);
  const [profilePictureFile, setProfilePictureFile] = useState<File | null>(
    null,
  );
  const [profilePictureServerUrl, setProfilePictureServerUrl] = useState<
    string | null
  >(null);

  // Step 3
  const [platforms, setPlatforms] = useState<PlatformRow[]>([emptyPlatform]);

  useEffect(() => {
    const parts = phonePartsFromE164(savedUser?.phone);
    if (parts?.countryIso2) setPhoneCountryIso2(parts.countryIso2);
    if (parts?.nationalNumber) setPhoneNationalNumber(parts.nationalNumber);
  }, [savedUser]);

  useEffect(() => {
    if (!savedProfile) return;
    setFirstName(savedProfile.firstName ?? "");
    setLastName(savedProfile.lastName ?? "");
    setMediaName(savedProfile.mediaName ?? "");
    setInfluencerType((savedProfile as any).influencerType ?? "influencer");
    setBio((savedProfile as any).bio ?? "");
    setAllowNegotiation(Boolean((savedProfile as any).allowNegotiation ?? false));

    if (savedProfile.profilePicture) {
      setProfilePictureServerUrl(savedProfile.profilePicture);
      setProfilePicturePreview(savedProfile.profilePicture);
    }

    const altParts = phonePartsFromE164(savedProfile.alternativePhone);
    if (altParts?.countryIso2) setAltPhoneCountryIso2(altParts.countryIso2);
    if (altParts?.nationalNumber)
      setAltPhoneNationalNumber(altParts.nationalNumber);
    else setAltPhoneNationalNumber("");

    setAddress(savedProfile.address ?? "");
    if (savedProfile.platforms?.length) {
      setPlatforms(
        savedProfile.platforms.map((p) => ({
          name: p.name ?? "",
          platformUrl: p.platformUrl ?? "",
          username: p.username ?? "",
          numberOfFollowers:
            p.numberOfFollowers != null ? String(p.numberOfFollowers) : "",
          estimatedImpressions:
            p.estimatedImpressions != null ? String(p.estimatedImpressions) : "",
          amountRate: p.amountRate != null ? String(p.amountRate) : "",
        })),
      );
    }
  }, [savedProfile]);

  const canGoNext = useMemo(() => {
    if (wizardStep === 1) {
      const e164 = toE164FromParts(phoneCountryIso2, phoneNationalNumber);
      return Boolean(e164 && password && password === confirmPassword);
    }
    if (wizardStep === 2) {
      const hasPicture = Boolean(profilePictureFile || profilePictureServerUrl);
      return Boolean(
        firstName.trim() &&
          lastName.trim() &&
          mediaName.trim() &&
          bio.trim() &&
          address.trim() &&
          hasPicture,
      );
    }
    return platforms.some(
      (p) =>
        p.name.trim() &&
        p.platformUrl.trim() &&
        p.username.trim() &&
        Number(p.numberOfFollowers) > 0 &&
        Number(p.estimatedImpressions) > 0 &&
        Number(p.amountRate) > 0,
    );
  }, [
    wizardStep,
    phoneCountryIso2,
    phoneNationalNumber,
    password,
    confirmPassword,
    firstName,
    lastName,
    mediaName,
    bio,
    profilePictureFile,
    profilePictureServerUrl,
    altPhoneCountryIso2,
    altPhoneNationalNumber,
    address,
    platforms,
  ]);

  const updatePlatform = (idx: number, patch: Partial<PlatformRow>) => {
    setPlatforms((rows) =>
      rows.map((r, i) => (i === idx ? { ...r, ...patch } : r)),
    );
  };

  const addPlatform = () => setPlatforms((rows) => [...rows, emptyPlatform]);
  const removePlatform = (idx: number) =>
    setPlatforms((rows) => rows.filter((_, i) => i !== idx));

  const handleContinueStep1 = async () => {
    if (!canGoNext || wizardStep !== 1) return;
    setFormError(null);
    setSubmitting(true);
    try {
      const e164 = toE164FromParts(phoneCountryIso2, phoneNationalNumber);
      if (!e164) {
        setFormError("Enter a valid phone number.");
        return;
      }
      await influencerSignup({
        inviteToken,
        step: 1,
        phoneNumber: e164,
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
      const altFilled =
        Boolean(altPhoneCountryIso2.trim()) ||
        Boolean(altPhoneNationalNumber.trim());
      const altE164 = altFilled
        ? toE164FromParts(altPhoneCountryIso2, altPhoneNationalNumber)
        : null;
      if (altFilled && !altE164) {
        setFormError("Enter a valid alternate phone number.");
        return;
      }

      let profilePictureDataUrl: string | undefined = undefined;
      if (profilePictureFile) {
        profilePictureDataUrl = await fileToDataUrl(profilePictureFile);
      }

      await influencerSignup({
        inviteToken,
        step: 2,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        mediaName: mediaName.trim(),
        alternativePhone: altE164 ?? undefined,
        address: address.trim(),
        bio: bio.trim() || undefined,
        allowNegotiation,
        influencerType,
        profilePictureDataUrl,
        profilePictureUrl: profilePictureServerUrl || undefined,
      });
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
      await influencerSignup({
        inviteToken,
        step: 3,
        platforms: platforms
          .filter((p) => p.name.trim() && p.platformUrl.trim())
          .map((p) => ({
            name: p.name.trim(),
            platformUrl: p.platformUrl.trim(),
            username: p.username.trim(),
            numberOfFollowers: Number(p.numberOfFollowers) || 0,
            estimatedImpressions: Number(p.estimatedImpressions) || 0,
            amountRate: Number(p.amountRate) || 0,
          })),
      });
      await onAfterSave();
    } catch (e) {
      setFormError(errorMessage(e));
    } finally {
      setSubmitting(false);
    }
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
            <label>Email</label>
            <input className={inputBase} value={email} disabled />
          </div>
          <div className="my-3">
            <label>Phone number</label>
            <p className="text-sm text-gray-600 mt-1 mb-1.5 leading-snug">
              {PHONE_NUMBER_HINT}
            </p>
            <div className="flex gap-2">
              <div className="basis-1/3">
                <select
                  className={inputBase}
                  value={phoneCountryIso2}
                  onChange={(e) => setPhoneCountryIso2(e.target.value)}
                >
                  {COUNTRIES.map((c) => (
                    <option key={c.iso2} value={c.iso2}>
                      {c.flag} +{c.callingCode}
                    </option>
                  ))}
                </select>
              </div>
              <div className="basis-2/3">
                <input
                  className={inputBase}
                  type="tel"
                  inputMode="tel"
                  placeholder="8012345678"
                  autoComplete="tel-national"
                  value={phoneNationalNumber}
                  onChange={(e) => setPhoneNationalNumber(e.target.value)}
                />
              </div>
            </div>
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
              <p className="mt-1 text-sm text-red-600">Passwords do not match.</p>
            ) : null}
          </div>
        </div>
      )}

      {wizardStep === 2 && (
        <div>
          <div className="my-3">
            <label>First name</label>
            <input
              className={inputBase}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="my-3">
            <label>Last name</label>
            <input
              className={inputBase}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="my-3">
            <label>Media name</label>
            <input
              className={inputBase}
              value={mediaName}
              onChange={(e) => setMediaName(e.target.value)}
              placeholder="Brand / media name"
            />
          </div>

          <div className="my-3">
            <label>Influencer type</label>
            <select
              className={inputBase}
              value={influencerType}
              onChange={(e) => setInfluencerType(e.target.value)}
            >
              {[
                "influencer",
                "content creator",
                "brand",
                "agency",
                "advertiser",
                "marketing agency",
                "ad network",
                "actor",
                "actress",
                "model",
                "musician",
                "dancer",
                "comedian",
                "writer",
                "director",
                "producer",
                "editor",
                "photographer",
                "videographer",
                "graphic designer",
                "seo specialist",
                "social media manager",
                "social media specialist",
                "others",
              ].map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="my-3">
            <label>Bio</label>
            <textarea
              className={inputBase}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell brands about you..."
            />
          </div>

          <div className="my-3">
            <label>Allow negotiation</label>
            <select
              className={inputBase}
              value={allowNegotiation ? "true" : "false"}
              onChange={(e) => setAllowNegotiation(e.target.value === "true")}
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
          <div className="my-3">
            <label>Alternative phone (optional)</label>
            <p className="text-sm text-gray-600 mt-1 mb-1.5 leading-snug">
              {PHONE_NUMBER_HINT}
            </p>
            <div className="flex gap-2">
              <div className="basis-1/3">
                <select
                  className={inputBase}
                  value={altPhoneCountryIso2}
                  onChange={(e) => setAltPhoneCountryIso2(e.target.value)}
                >
                  {COUNTRIES.map((c) => (
                    <option key={c.iso2} value={c.iso2}>
                      {c.flag} +{c.callingCode}
                    </option>
                  ))}
                </select>
              </div>
              <div className="basis-2/3">
                <input
                  className={inputBase}
                  type="tel"
                  inputMode="tel"
                  placeholder="8012345678"
                  autoComplete="tel-national"
                  value={altPhoneNationalNumber}
                  onChange={(e) => setAltPhoneNationalNumber(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="my-3">
            <label>Address</label>
            <input
              className={inputBase}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="my-3">
            <label>Profile picture</label>
            <div className="mt-1 rounded border border-gray-200 bg-white p-3">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm text-gray-600">
                  {profilePictureFile?.name
                    ? profilePictureFile.name
                    : profilePictureServerUrl
                      ? "Existing photo selected"
                      : "No file selected"}
                </div>

                <label className="inline-flex cursor-pointer items-center justify-center rounded bg-black px-3 py-2 text-sm font-medium text-white">
                  Choose file
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0] ?? null;
                      setProfilePictureFile(f);
                      setProfilePicturePreview(
                        f ? URL.createObjectURL(f) : profilePictureServerUrl,
                      );
                    }}
                  />
                </label>
              </div>
            </div>
            {profilePicturePreview ? (
              <div className="mt-2 text-sm">
                <a
                  href={profilePicturePreview}
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  Preview profile picture
                </a>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {wizardStep === 3 && (
        <div>
          <p className="text-sm text-gray-700 mb-2">
            Add at least one platform. You can add multiple.
          </p>
          {platforms.map((p, idx) => (
            <div key={idx} className="my-4 rounded border p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="font-medium text-sm">Platform {idx + 1}</p>
                {platforms.length > 1 ? (
                  <button
                    type="button"
                    className="rounded border px-3 py-1 text-sm"
                    onClick={() => removePlatform(idx)}
                  >
                    Remove
                  </button>
                ) : null}
              </div>
              <div className="my-3">
                <label>Name</label>
                <select
                  className={inputBase}
                  value={p.name}
                  onChange={(e) =>
                    updatePlatform(idx, { name: e.target.value })
                  }
                >
                  <option value="">Select platform</option>
                  {[
                    "Instagram",
                    "Facebook",
                    "X",
                    "TikTok",
                    "YouTube",
                    "Snapchat",
                    "LinkedIn",
                    "Threads",
                  ].map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div className="my-3">
                <label>Platform URL</label>
                <input
                  className={inputBase}
                  value={p.platformUrl}
                  onChange={(e) =>
                    updatePlatform(idx, { platformUrl: e.target.value })
                  }
                />
              </div>
              <div className="my-3">
                <label>Username</label>
                <input
                  className={inputBase}
                  value={p.username}
                  onChange={(e) =>
                    updatePlatform(idx, { username: e.target.value })
                  }
                />
              </div>
              <div className="my-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label>Followers</label>
                  <input
                    className={inputBase}
                    type="number"
                    min={0}
                    value={p.numberOfFollowers}
                    onChange={(e) =>
                      updatePlatform(idx, { numberOfFollowers: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label>Estimated impressions</label>
                  <input
                    className={inputBase}
                    type="number"
                    min={0}
                    value={p.estimatedImpressions}
                    onChange={(e) =>
                      updatePlatform(idx, {
                        estimatedImpressions: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="my-3">
                <label>Rate (₦)</label>
                <input
                  className={inputBase}
                  type="number"
                  min={0}
                  step="0.01"
                  value={p.amountRate}
                  onChange={(e) =>
                    updatePlatform(idx, { amountRate: e.target.value })
                  }
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            className="rounded border px-3 py-2 text-sm"
            onClick={addPlatform}
          >
            Add another platform
          </button>
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
                s > 1 ? ((s - 1) as InfluencerWizardStep) : s,
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
            text={submitting ? "Submitting…" : "Submit"}
            isPending={submitting}
            handleClick={() => void handleSubmitStep3()}
          />
        )}
      </div>
    </div>
  );
}

