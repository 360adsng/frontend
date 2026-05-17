import BlackLogo from "@components/logo/BlackLogo";
import { vendorOnboarding } from "@endpoint/auth/auth";
import { ApiError } from "@endpoint/baseFetch";
import type {
  PublicBillboardBusiness,
  PublicInfluencerProfile,
  VendorOnboardingResponse,
  VendorOnboardingUser,
} from "@endpoint/auth/types";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import BillboardForm from "@components/vendor-onboarding/BillboardForm";
import InfluencerForm from "@components/vendor-onboarding/InfluencerForm";

type BillboardBackendStep = "account" | "business" | "contact" | "fix";
type InfluencerBackendStep = "account" | "profile" | "platforms";

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

function isBillboardVendor(accountType: string | undefined): boolean {
  return accountType === "billboard_owner" || accountType === "billboard";
}

function isSubmitted(data: VendorOnboardingResponse): data is Extract<
  VendorOnboardingResponse,
  { status: "submitted" }
> {
  return "status" in data;
}

function hasStep(data: VendorOnboardingResponse): data is Extract<
  VendorOnboardingResponse,
  { step: string }
> {
  return "step" in data;
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
  const accountType = data && "accountType" in data ? data.accountType : undefined;
  const backendStep = data && hasStep(data) ? (data.step as string) : null;

  const savedUser =
    data &&
    "user" in data &&
    data.user &&
    typeof data.user === "object" &&
    "id" in data.user
      ? (data.user as VendorOnboardingUser)
      : null;

  const savedBusiness =
    data &&
    "business" in data &&
    data.business &&
    typeof data.business === "object" &&
    "id" in data.business
      ? (data.business as PublicBillboardBusiness)
      : null;

  const savedProfile =
    data &&
    "profile" in data &&
    data.profile &&
    typeof data.profile === "object" &&
    "id" in (data.profile as object)
      ? (data.profile as PublicInfluencerProfile)
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

          {!loading && !error && data && isSubmitted(data) && (
            <div className="text-center">
              <h3 className="text-xl font-semibold">Application submitted</h3>
              <p className="text-sm text-gray-700 mt-2">
                We already received your onboarding details.
              </p>
              {"businessStatus" in data ? (
                <p className="text-sm text-gray-600 mt-2">
                  Status:{" "}
                  <span className="font-medium">
                    {data.businessStatus ?? "pending"}
                  </span>
                </p>
              ) : null}
            </div>
          )}

          {!loading && !error && data && hasStep(data) && (
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

                    <BillboardForm
                      inviteToken={token}
                      backendStep={backendStep as BillboardBackendStep}
                      inviteEmail={email}
                      savedUser={savedUser}
                      savedBusiness={savedBusiness}
                      onAfterSave={loadOnboarding}
                    />
                  </div>
                )}

              {backendStep &&
                token &&
                accountType === "influencer" &&
                (backendStep === "account" ||
                  backendStep === "profile" ||
                  backendStep === "platforms") && (
                  <InfluencerForm
                    inviteToken={token}
                    backendStep={backendStep as InfluencerBackendStep}
                    inviteEmail={email}
                    savedUser={savedUser}
                    savedProfile={savedProfile}
                    onAfterSave={loadOnboarding}
                  />
                )}

              {backendStep &&
                accountType &&
                !isBillboardVendor(accountType) &&
                accountType !== "influencer" && (
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

