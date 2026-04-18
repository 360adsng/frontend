"use client";

import { Link, createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import BlackButtons from "@components/buttons/BlackButton";
import { useRef, useState } from "react";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import type { CountryCode } from "libphonenumber-js";
import { useRegister } from "@endpoint/auth/useAuth";
import { z } from "zod";
import { COUNTRIES } from "../../../lib/countries";
import { getAccountType } from "@endpoint/baseFetch";
import { hasAccessToken } from "../../../lib/auth";
import { getDashboardPathForAccountType } from "../../../lib/accountDashboard";

const MIN_PASSWORD_LENGTH = 8;

const PHONE_NUMBER_HINT = "Enter phone number without the leading 0.";

const requiredString = (label: string) =>
  z.string().trim().min(1, `${label} is required.`);

const phoneSchema = z.object({
  countryIso2: requiredString("Country").transform((v) => v.toUpperCase()),
  nationalNumber: requiredString("Phone number")
    .regex(/^[0-9\s-]+$/, "Phone number must contain only digits.")
    .transform((v) => v.replace(/[\s-]/g, "")),
});

function parsePhoneToE164(countryIso2: string, nationalNumber: string) {
  const parsed = parsePhoneNumberFromString(
    nationalNumber,
    countryIso2 as CountryCode,
  );
  if (!parsed?.isValid()) return null;
  return parsed.format("E.164");
}

const termsSchema = z
  .boolean()
  .refine((v) => v, { message: "You must agree to the terms and conditions." });

const individualSchema = z
  .object({
    firstName: requiredString("First name"),
    lastName: requiredString("Last name"),
    email: requiredString("Email").email("Enter a valid email."),
    password: requiredString("Password").min(
      MIN_PASSWORD_LENGTH,
      `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
    ),
    confirmPassword: requiredString("Confirm password"),
    phone: phoneSchema,
    termsAccepted: termsSchema,
  })
  .refine((d) => d.password === d.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

const businessSchema = z
  .object({
    businessName: requiredString("Business name"),
    email: requiredString("Business email").email("Enter a valid email."),
    contactName: requiredString("Contact name"),
    password: requiredString("Password").min(
      MIN_PASSWORD_LENGTH,
      `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
    ),
    confirmPassword: requiredString("Confirm password"),
    phone: phoneSchema,
    termsAccepted: termsSchema,
  })
  .refine((d) => d.password === d.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

type IndividualForm = z.infer<typeof individualSchema>;
type BusinessForm = z.infer<typeof businessSchema>;

type IndividualErrors = Partial<
  Record<
    | "firstName"
    | "lastName"
    | "email"
    | "password"
    | "confirmPassword"
    | "phone.countryIso2"
    | "phone.nationalNumber"
    | "termsAccepted",
    string
  >
>;

type BusinessErrors = Partial<
  Record<
    | "businessName"
    | "email"
    | "contactName"
    | "password"
    | "confirmPassword"
    | "phone.countryIso2"
    | "phone.nationalNumber"
    | "termsAccepted",
    string
  >
>;

function collectZodErrors(issues: z.ZodIssue[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of issues) {
    const key = issue.path.join(".");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

const baseInputClass =
  "bg-[#E4E4E4] focus:outline-none px-2 w-full rounded h-[38px] md:h-[45px] border";

function inputClass(hasError: boolean) {
  return `${baseInputClass} ${
    hasError ? "border-red-500" : "border-transparent"
  }`;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-sm text-red-600 mt-1">{message}</p>;
}

const CloseAside = "/icons/closeAside.svg";
const girl = "/images/adsgirlblank.png";

const SignUp = () => {
  const router = useRouter();
  const [isIndividual, setIsIndividual] = useState(true);
  const slider = useRef<HTMLDivElement>(null);
  const sliderB = useRef<HTMLDivElement>(null);
  const sliderI = useRef<HTMLDivElement>(null);
  const handleSignUp = () => {
    if (isIndividual) {
      setIsIndividual(false);
      slider.current?.classList.add("SignupSliderB");
      slider.current?.classList.remove("SignupSliderI");
      slider.current?.classList.remove("left-0");
      sliderI.current?.classList.add("SignupI");
      sliderB.current?.classList.add("SignupB");
    } else {
      setIsIndividual(true);
      slider.current?.classList.add("SignupSliderI");
      slider.current?.classList.remove("SignupSliderB");
      sliderB.current?.classList.remove("SignupB");
      sliderI.current?.classList.remove("SignupI");
    }
  };

  const defaultCountryIso2 = COUNTRIES[0]?.iso2 ?? "NG";

  const [individual, setIndividual] = useState<IndividualForm>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: { countryIso2: defaultCountryIso2, nationalNumber: "" },
    termsAccepted: false,
  });

  const [business, setBusiness] = useState<BusinessForm>({
    businessName: "",
    email: "",
    contactName: "",
    password: "",
    confirmPassword: "",
    phone: { countryIso2: defaultCountryIso2, nationalNumber: "" },
    termsAccepted: false,
  });

  const [individualErrors, setIndividualErrors] = useState<IndividualErrors>(
    {},
  );
  const [businessErrors, setBusinessErrors] = useState<BusinessErrors>({});

  const [showIndividualPassword, setShowIndividualPassword] = useState(false);
  const [showIndividualConfirmPassword, setShowIndividualConfirmPassword] =
    useState(false);
  const [showBusinessPassword, setShowBusinessPassword] = useState(false);
  const [showBusinessConfirmPassword, setShowBusinessConfirmPassword] =
    useState(false);

  const { mutate: register, isPending } = useRegister();

  const signUp = () => {
    if (isIndividual) {
      setIndividualErrors({});
      const parsed = individualSchema.safeParse(individual);
      if (!parsed.success) {
        const map = collectZodErrors(parsed.error.issues);
        setIndividualErrors(map as IndividualErrors);
        return;
      }

      const e164 = parsePhoneToE164(
        parsed.data.phone.countryIso2,
        parsed.data.phone.nationalNumber,
      );
      if (!e164) {
        setIndividualErrors((prev) => ({
          ...prev,
          "phone.nationalNumber": "Enter a valid phone number.",
        }));
        return;
      }

      register(
        {
          firstName: parsed.data.firstName,
          lastName: parsed.data.lastName,
          email: parsed.data.email,
          password: parsed.data.password,
          phone: e164,
          accountType: "regular_user",
        },
        {
          onSuccess: (data: any) => {
            console.log(data);
            router.navigate({
              to: "/email-verification",
              state: (prev) => ({ ...(prev ?? {}), user: data?.user || {} }),
            });
          },
        },
      );
    } else {
      setBusinessErrors({});
      const parsed = businessSchema.safeParse(business);
      if (!parsed.success) {
        const map = collectZodErrors(parsed.error.issues);
        setBusinessErrors(map as BusinessErrors);
        return;
      }

      const e164 = parsePhoneToE164(
        parsed.data.phone.countryIso2,
        parsed.data.phone.nationalNumber,
      );
      if (!e164) {
        setBusinessErrors((prev) => ({
          ...prev,
          "phone.nationalNumber": "Enter a valid phone number.",
        }));
        return;
      }

      register(
        {
          businessName: parsed.data.businessName,
          email: parsed.data.email,
          password: parsed.data.password,
          phone: e164,
          accountType: "business_user",
          contactName: parsed.data.contactName,
        },
        {
          onSuccess: (data: any) => {
            console.log(data);
            router.navigate({
              to: "/email-verification",
              state: (prev) => ({ ...(prev ?? {}), user: data?.user || {} }),
            });
          },
        },
      );
    }
  };

  return (
    <>
      <section className="bg-ads360light-100 h-screen">
        <div className="hidden w-1/2 bg-ads360black-100 lg:flex justify-end pt-36 h-full fixed z-40">
          <div className="w-4/5">
            <img src={girl} alt="..." />
          </div>
        </div>

        <div className="lg:flex">
          <div className="hidden lg:flex lg:basis-1/2"></div>
          <div className="lg:basis-1/2">
            <div className="w-[90%] md:w-[80%] mx-auto">
              <div className="flex justify-end">
                <Link to="/">
                  <img src={CloseAside} alt="..." />
                </Link>
              </div>

              <div className="text-center">
                <h3 className="text-2xl lg:text-4xl mb-2">
                  Let’s Dive right in.
                </h3>
                <h5 className="text-ads360yellow-100">
                  Please complete to create your account.
                </h5>
              </div>

              <div className="flex justify-around flex-row-reverse lg:flex-row hover:cursor-pointer relative h-10 rounded-3xl bg-ads360black-100 text-ads360light-100 my-5">
                <div
                  onClick={handleSignUp}
                  className="basis-1/2 text-center py-2"
                >
                  Individual Account
                </div>

                <div
                  ref={slider}
                  className="text-center absolute w-1/2 bg-ads360gray-100 left-0 rounded-3xl top-0 h-10 py-2 transition duration-700"
                >
                  <span className="hidden lg:inline">
                    {isIndividual ? "Individual Account" : "Business Account"}
                  </span>
                  <span className="lg:hidden">
                    {isIndividual ? "Business Account" : "Individual Account"}
                  </span>
                </div>

                <div
                  onClick={handleSignUp}
                  className="basis-1/2 text-center py-2"
                >
                  Business Account
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex overflow-hidden lg:overflow-auto">
          <div
            ref={sliderB}
            className="lg:basis-1/2 bg-ads360light-100 transition duration-700 shrink-0 w-full"
          >
            <div className="w-[80%] mx-auto">
              <div className="">
                <div>
                  <div className="lg:basis-1/2 lg:pr-2">
                    <label htmlFor="firstname">Business Name</label>
                    <br />
                    <input
                      type="text"
                      id="firstname"
                      value={business.businessName}
                      onChange={(e) =>
                        setBusiness((p) => ({
                          ...p,
                          businessName: e.target.value,
                        }))
                      }
                      className={inputClass(!!businessErrors.businessName)}
                    />
                    <FieldError message={businessErrors.businessName} />
                  </div>

                  <div className="my-3">
                    <label htmlFor="email">Business Email</label>
                    <br />
                    <input
                      type="email"
                      id="email"
                      value={business.email}
                      onChange={(e) =>
                        setBusiness((p) => ({ ...p, email: e.target.value }))
                      }
                      className={inputClass(!!businessErrors.email)}
                    />
                    <FieldError message={businessErrors.email} />
                  </div>
                </div>

                <div>
                  <div className="lg:flex my-3">
                    <div className="basis-1/2 my-3 lg:my-0 lg:pr-2">
                      <label htmlFor="password-business">Password</label>
                      <br />
                      <div className="relative">
                        <input
                          type={showBusinessPassword ? "text" : "password"}
                          id="password-business"
                          value={business.password}
                          onChange={(e) =>
                            setBusiness((p) => ({
                              ...p,
                              password: e.target.value,
                            }))
                          }
                          autoComplete="new-password"
                          className={inputClass(!!businessErrors.password)}
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-700"
                          onClick={() => setShowBusinessPassword((s) => !s)}
                        >
                          {showBusinessPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                      <FieldError message={businessErrors.password} />
                    </div>

                    <div className="basis-1/2 my-3 lg:my-0 lg:pl-2">
                      <label htmlFor="confirmPassword-business">
                        Confirm Password
                      </label>
                      <br />
                      <div className="relative">
                        <input
                          type={
                            showBusinessConfirmPassword ? "text" : "password"
                          }
                          id="confirmPassword-business"
                          value={business.confirmPassword}
                          onChange={(e) =>
                            setBusiness((p) => ({
                              ...p,
                              confirmPassword: e.target.value,
                            }))
                          }
                          autoComplete="new-password"
                          className={inputClass(
                            !!businessErrors.confirmPassword,
                          )}
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-700"
                          onClick={() =>
                            setShowBusinessConfirmPassword((s) => !s)
                          }
                        >
                          {showBusinessConfirmPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                      <FieldError message={businessErrors.confirmPassword} />
                    </div>
                  </div>
                  <div className="my-3">
                    <label htmlFor="email">Contact Name</label>
                    <br />
                    <input
                      type="text"
                      id="email"
                      className={inputClass(!!businessErrors.contactName)}
                      value={business.contactName}
                      onChange={(e) =>
                        setBusiness((p) => ({
                          ...p,
                          contactName: e.target.value,
                        }))
                      }
                    />
                    <FieldError message={businessErrors.contactName} />
                  </div>

                  <div className="my-3">
                    <label htmlFor="phoneNumber-business">Phone Number</label>
                    <p className="text-sm text-gray-600 mt-1 mb-1.5 leading-snug">
                      {PHONE_NUMBER_HINT}
                    </p>

                    <div className="flex gap-2">
                      <div className="basis-1/3">
                        <select
                          value={business.phone.countryIso2}
                          onChange={(e) =>
                            setBusiness((p) => ({
                              ...p,
                              phone: {
                                ...p.phone,
                                countryIso2: e.target.value,
                              },
                            }))
                          }
                          className={inputClass(
                            !!businessErrors["phone.countryIso2"],
                          )}
                        >
                          {COUNTRIES.map((c) => (
                            <option key={c.iso2} value={c.iso2}>
                              {c.flag} +{c.callingCode}
                            </option>
                          ))}
                        </select>
                        <FieldError
                          message={businessErrors["phone.countryIso2"]}
                        />
                      </div>

                      <div className="basis-2/3">
                        <input
                          type="tel"
                          inputMode="tel"
                          id="phoneNumber-business"
                          placeholder="8012345678"
                          autoComplete="tel-national"
                          className={inputClass(
                            !!businessErrors["phone.nationalNumber"],
                          )}
                          value={business.phone.nationalNumber}
                          onChange={(e) =>
                            setBusiness((p) => ({
                              ...p,
                              phone: {
                                ...p.phone,
                                nationalNumber: e.target.value,
                              },
                            }))
                          }
                        />
                        <FieldError
                          message={businessErrors["phone.nationalNumber"]}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center my-5">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={business.termsAccepted}
                      onChange={(e) =>
                        setBusiness((p) => ({
                          ...p,
                          termsAccepted: e.target.checked,
                        }))
                      }
                      className={`h-4 w-4 ${
                        businessErrors.termsAccepted ? "accent-red-600" : ""
                      }`}
                    />
                    <span>
                      I agree with{" "}
                      <Link to={"/"} className="text-ads360yellow-100">
                        terms and conditions
                      </Link>
                    </span>
                  </label>
                  <FieldError message={businessErrors.termsAccepted} />
                </div>
                <div className="flex justify-center my-5">
                  <BlackButtons
                    handleClick={signUp}
                    text="Sign Up"
                    isPending={isPending}
                  />
                </div>

                <p className="text-center my-5">
                  Already have an account?{" "}
                  <Link to="/signin" className="text-ads360yellow-100">
                    {" "}
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div
            ref={sliderI}
            className="lg:basis-1/2 bg-ads360light-100 transition duration-700 shrink-0 w-full"
          >
            <div className="w-[80%] mx-auto">
              <div className="">
                <div>
                  <div className="lg:flex my-3">
                    <div className="basis-1/2 my-3 lg:my-0 md:pr-2">
                      <label htmlFor="firstname">First Name</label>
                      <br />
                      <input
                        type="text"
                        id="firstname"
                        value={individual.firstName}
                        onChange={(e) =>
                          setIndividual((p) => ({
                            ...p,
                            firstName: e.target.value,
                          }))
                        }
                        className={inputClass(!!individualErrors.firstName)}
                      />
                      <FieldError message={individualErrors.firstName} />
                    </div>

                    <div className="basis-1/2 my-3 lg:my-0 lg:pl-2">
                      <label htmlFor="lastname">Last Name</label>
                      <br />
                      <input
                        type="text"
                        id="lastname"
                        value={individual.lastName}
                        onChange={(e) =>
                          setIndividual((p) => ({
                            ...p,
                            lastName: e.target.value,
                          }))
                        }
                        className={inputClass(!!individualErrors.lastName)}
                      />
                      <FieldError message={individualErrors.lastName} />
                    </div>
                  </div>
                  <div className="my-3">
                    <label htmlFor="email">Email</label>
                    <br />
                    <input
                      type="email"
                      id="email"
                      value={individual.email}
                      onChange={(e) =>
                        setIndividual((p) => ({ ...p, email: e.target.value }))
                      }
                      className={inputClass(!!individualErrors.email)}
                    />
                    <FieldError message={individualErrors.email} />
                  </div>
                </div>

                <div>
                  <div className="lg:flex my-3">
                    <div className="basis-1/2 my-3 lg:my-0 md:pr-2">
                      <label htmlFor="password-individual">Password</label>
                      <br />
                      <div className="relative">
                        <input
                          type={showIndividualPassword ? "text" : "password"}
                          id="password-individual"
                          value={individual.password}
                          onChange={(e) =>
                            setIndividual((p) => ({
                              ...p,
                              password: e.target.value,
                            }))
                          }
                          autoComplete="new-password"
                          className={inputClass(!!individualErrors.password)}
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-700"
                          onClick={() => setShowIndividualPassword((s) => !s)}
                        >
                          {showIndividualPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                      <FieldError message={individualErrors.password} />
                    </div>

                    <div className="basis-1/2 my-3 lg:my-0 lg:pl-2">
                      <label htmlFor="confirmPassword-individual">
                        Confirm Password
                      </label>
                      <br />
                      <div className="relative">
                        <input
                          type={
                            showIndividualConfirmPassword ? "text" : "password"
                          }
                          id="confirmPassword-individual"
                          value={individual.confirmPassword}
                          onChange={(e) =>
                            setIndividual((p) => ({
                              ...p,
                              confirmPassword: e.target.value,
                            }))
                          }
                          autoComplete="new-password"
                          className={inputClass(
                            !!individualErrors.confirmPassword,
                          )}
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-700"
                          onClick={() =>
                            setShowIndividualConfirmPassword((s) => !s)
                          }
                        >
                          {showIndividualConfirmPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                      <FieldError message={individualErrors.confirmPassword} />
                    </div>
                  </div>
                  <div className="my-3">
                    <label htmlFor="phoneNumber-individual">Phone Number</label>
                    <p className="text-sm text-gray-600 mt-1 mb-1.5 leading-snug">
                      {PHONE_NUMBER_HINT}
                    </p>

                    <div className="flex gap-2">
                      <div className="basis-1/3">
                        <select
                          value={individual.phone.countryIso2}
                          onChange={(e) =>
                            setIndividual((p) => ({
                              ...p,
                              phone: {
                                ...p.phone,
                                countryIso2: e.target.value,
                              },
                            }))
                          }
                          className={inputClass(
                            !!individualErrors["phone.countryIso2"],
                          )}
                        >
                          {COUNTRIES.map((c) => (
                            <option key={c.iso2} value={c.iso2}>
                              {c.flag} +{c.callingCode}
                            </option>
                          ))}
                        </select>
                        <FieldError
                          message={individualErrors["phone.countryIso2"]}
                        />
                      </div>

                      <div className="basis-2/3">
                        <input
                          type="tel"
                          inputMode="tel"
                          id="phoneNumber-individual"
                          placeholder="8012345678"
                          autoComplete="tel-national"
                          value={individual.phone.nationalNumber}
                          onChange={(e) =>
                            setIndividual((p) => ({
                              ...p,
                              phone: {
                                ...p.phone,
                                nationalNumber: e.target.value,
                              },
                            }))
                          }
                          className={inputClass(
                            !!individualErrors["phone.nationalNumber"],
                          )}
                        />
                        <FieldError
                          message={individualErrors["phone.nationalNumber"]}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center my-5">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={individual.termsAccepted}
                      onChange={(e) =>
                        setIndividual((p) => ({
                          ...p,
                          termsAccepted: e.target.checked,
                        }))
                      }
                      className={`h-4 w-4 ${
                        individualErrors.termsAccepted ? "accent-red-600" : ""
                      }`}
                    />
                    <span>
                      I agree with{" "}
                      <Link to={"/"} className="text-ads360yellow-100">
                        terms and conditions
                      </Link>
                    </span>
                  </label>
                  <FieldError message={individualErrors.termsAccepted} />
                </div>
                <div className="flex justify-center my-5">
                  <BlackButtons
                    text="Sign Up"
                    handleClick={signUp}
                    isPending={isPending}
                  />
                </div>

                <p className="text-center my-5">
                  Already have an account?{" "}
                  <Link to="/signin" className="text-ads360yellow-100">
                    {" "}
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export const Route = createFileRoute("/_access/signup/")({
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    if (hasAccessToken()) {
      throw redirect({
        to: getDashboardPathForAccountType(getAccountType()),
      });
    }
  },
  component: SignUp,
});

export default SignUp;
