import { Link, createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import BlackButtons from "@components/buttons/BlackButton";
import { useResetPassword } from "@endpoint/auth/useAuth";
import { getAccountType } from "@endpoint/baseFetch";
import { hasAccessToken } from "../../../lib/auth";
import { getDashboardPathForAccountType } from "../../../lib/accountDashboard";

const MIN_PASSWORD_LENGTH = 8;

const girl = "/images/adsgirlblank.png";
const CloseAside = "/icons/closeAside.svg";

const schema = z
  .object({
    password: z
      .string()
      .trim()
      .min(
        MIN_PASSWORD_LENGTH,
        `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
      ),
    confirmPassword: z.string().trim().min(1, "Confirm your password."),
  })
  .refine((d) => d.password === d.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

type Form = z.infer<typeof schema>;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-sm text-red-600 mt-1">{message}</p>;
}

const baseInputClass =
  "bg-[#E4E4E4] focus:outline-none px-2 w-full rounded h-[38px] md:h-[45px] border";

function inputClass(hasError: boolean) {
  return `${baseInputClass} ${hasError ? "border-red-500" : "border-transparent"}`;
}

function ResetPasswordPage() {
  const navigate = useNavigate();
  const { token } = Route.useSearch();
  const { mutate: reset, isPending } = useResetPassword();

  const [form, setForm] = useState<Form>({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>(
    {},
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const submit = () => {
    if (!token?.trim()) {
      return;
    }
    setErrors({});
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const next: Partial<Record<keyof Form, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Form;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    reset(
      { token: token.trim(), password: parsed.data.password },
      {
        onSuccess: () => {
          void navigate({ to: "/signin" });
        },
      },
    );
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    submit();
  };

  const missingToken = !token?.trim();

  return (
    <section className="bg-ads360light-100 min-h-screen">
      <div className="hidden md:w-1/2 bg-ads360black-100 md:flex justify-end pt-36 h-full fixed">
        <div className="w-4/5">
          <img src={girl} alt="" />
        </div>
      </div>

      <div className="flex justify-end">
        <div className="w-full md:w-1/2 bg-ads360light-100 min-h-screen">
          <div className="flex justify-end">
            <Link to="/">
              <img src={CloseAside} alt="Close" />
            </Link>
          </div>
          <div className="w-[80%] mx-auto pb-12">
            <div className="text-center mb-10">
              <h3 className="text-2xl lg:text-4xl mb-2">Reset password</h3>
              <h5 className="text-ads360yellow-100">
                Choose a new password for your account.
              </h5>
            </div>

            {missingToken ? (
              <div className="rounded-lg border border-amber-200 bg-amber-50/80 p-4 text-gray-800">
                <p className="font-medium">This link is missing a token.</p>
                <p className="mt-2 text-sm text-gray-700">
                  Open the link from your email, or request a new reset link.
                </p>
                <p className="mt-4 text-center">
                  <Link
                    to="/forgot-password"
                    className="text-ads360yellow-100 font-medium"
                  >
                    Forgot password
                  </Link>
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit}>
                <div className="my-3">
                  <label htmlFor="reset-password">New password</label>
                  <br />
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="reset-password"
                      autoComplete="new-password"
                      value={form.password}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, password: e.target.value }))
                      }
                      className={inputClass(!!errors.password)}
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-700"
                      onClick={() => setShowPassword((s) => !s)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  <FieldError message={errors.password} />
                </div>

                <div className="my-3">
                  <label htmlFor="reset-confirm">Confirm new password</label>
                  <br />
                  <div className="relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      id="reset-confirm"
                      autoComplete="new-password"
                      value={form.confirmPassword}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          confirmPassword: e.target.value,
                        }))
                      }
                      className={inputClass(!!errors.confirmPassword)}
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-700"
                      onClick={() => setShowConfirm((s) => !s)}
                    >
                      {showConfirm ? "Hide" : "Show"}
                    </button>
                  </div>
                  <FieldError message={errors.confirmPassword} />
                </div>

                <div className="flex justify-center my-6">
                  <BlackButtons
                    text={isPending ? "Updating..." : "Update password"}
                    handleClick={submit}
                    isPending={isPending}
                  />
                </div>
              </form>
            )}

            <p className="text-center mt-6">
              <Link to="/signin" className="text-ads360yellow-100">
                Back to sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export const Route = createFileRoute("/_access/reset-password/")({
  validateSearch: (raw: Record<string, unknown>) => ({
    token: typeof raw.token === "string" ? raw.token : "",
  }),
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    if (hasAccessToken()) {
      throw redirect({
        to: getDashboardPathForAccountType(getAccountType()),
      });
    }
  },
  component: ResetPasswordPage,
});

