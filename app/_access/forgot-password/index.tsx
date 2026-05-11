import { Link, createFileRoute, redirect } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import BlackButtons from "@components/buttons/BlackButton";
import { useForgotPassword } from "@endpoint/auth/useAuth";
import { getAccountType } from "@endpoint/baseFetch";
import { hasAccessToken } from "../../../lib/auth";
import { getDashboardPathForAccountType } from "../../../lib/accountDashboard";

const girl = "/images/adsgirlblank.png";
const CloseAside = "/icons/closeAside.svg";

const schema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Enter a valid email."),
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

const ForgotPassword = () => {
  const { mutate: requestReset, isPending } = useForgotPassword();

  const [form, setForm] = useState<Form>({ email: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>(
    {},
  );

  const submit = () => {
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

    requestReset({ email: parsed.data.email });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    submit();
  };

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
              <h3 className="text-2xl lg:text-4xl mb-2">Forgot password</h3>
              <h5 className="text-ads360yellow-100">
                Enter your email and we&apos;ll send a reset link if an account
                exists.
              </h5>
            </div>

            <form onSubmit={onSubmit}>
              <div className="my-3">
                <label htmlFor="forgot-email">Email</label>
                <br />
                <input
                  type="email"
                  id="forgot-email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: e.target.value }))
                  }
                  className={inputClass(!!errors.email)}
                />
                <FieldError message={errors.email} />
              </div>

              <div className="flex justify-center my-6">
                <BlackButtons
                  text={isPending ? "Sending..." : "Send reset link"}
                  handleClick={submit}
                  isPending={isPending}
                />
              </div>
            </form>

            <p className="text-center mt-3">
              Remember your password?{" "}
              <Link to="/signin" className="text-ads360yellow-100">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Route = createFileRoute("/_access/forgot-password/")({
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    if (hasAccessToken()) {
      throw redirect({
        to: getDashboardPathForAccountType(getAccountType()),
      });
    }
  },
  component: ForgotPassword,
});

