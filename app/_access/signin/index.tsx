import { Link, createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import BlackButtons from "@components/buttons/BlackButton";
import { useLogin } from "@endpoint/auth/useAuth";
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
  password: z.string().trim().min(1, "Password is required."),
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

const SignIn = () => {
  const router = useRouter();
  const { mutate: login, isPending } = useLogin();

  const [form, setForm] = useState<Form>({ email: "", password: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [showPassword, setShowPassword] = useState(false);

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

    login(parsed.data, {
      onSuccess: (data) => {
        router.navigate({
          to: getDashboardPathForAccountType(data.accountType),
        });
      },
    });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    submit();
  };

  return (
    <section className="bg-ads360light-100 h-screen">
      <div className="hidden md:w-1/2 bg-ads360black-100 md:flex justify-end pt-36 h-full fixed">
        <div className="w-4/5">
          <img src={girl} alt="..." />
        </div>
      </div>

      <div className="flex justify-end">
        <div className="w-full md:w-1/2 bg-ads360light-100">
          <div className="flex justify-end">
            <Link to="/">
              <img src={CloseAside} alt="..." />
            </Link>
          </div>
          <div className="w-[80%] mx-auto">
            <div className="text-center mb-10">
              <h3 className="text-2xl lg:text-4xl mb-2">Welcome Back</h3>
              <h5 className="text-ads360yellow-100">
                Lets get right to it! Log into your account
              </h5>
            </div>

            <form onSubmit={onSubmit}>
              <div className="my-3">
                <label htmlFor="email">Email</label>
                <br />
                <input
                  type="email"
                  id="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: e.target.value }))
                  }
                  className={inputClass(!!errors.email)}
                />
                <FieldError message={errors.email} />
              </div>

              <div className="my-3">
                <label htmlFor="password">Password</label>
                <br />
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={form.password}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, password: e.target.value }))
                    }
                    className={inputClass(!!errors.password)}
                    autoComplete="current-password"
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

              <div className="flex justify-between my-3">
                <div />
                <div>
                  <Link to="/" className="text-ads360yellow-100">
                    Forget Password
                  </Link>
                </div>
              </div>

              <div className="flex justify-center my-3">
                <BlackButtons
                  text={isPending ? "Signing in..." : "Sign In"}
                  handleClick={submit}
                  isPending={isPending}
                />
              </div>
            </form>

            <p className="text-center mt-3 mb-20">
              Dont have an account yet?{" "}
              <Link to="/signup" className="text-ads360yellow-100">
                {" "}
                Sign Up
              </Link>
            </p>
            <p className="text-center mt-3 mb-5">
              <Link to="/">Term of use. Privacy policy</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Route = createFileRoute("/_access/signin/")({
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    if (hasAccessToken()) {
      throw redirect({
        to: getDashboardPathForAccountType(getAccountType()),
      });
    }
  },
  component: SignIn,
});

export default SignIn;
