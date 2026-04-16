import BlackButtons from "@components/buttons/BlackButton";
import BlackLogo from "@components/logo/BlackLogo";
import { Link, createFileRoute, useRouterState } from "@tanstack/react-router";
import { useState } from "react";

const EmailVerification = () => {
  const user = useRouterState({
    select: (s) => (s.location.state as any)?.user as
      | { email?: string; phone?: string; accountType?: string; id?: number }
      | undefined,
  });

  const [isResending, setIsResending] = useState(false);
  const email = user?.email ?? "your email";

  return (
    <section className="min-h-screen bg-ads360-hash">
      <div className="px-6 pt-10">
        <BlackLogo />
      </div>

      <div className="px-6 pb-16">
        <div className="max-w-xl mx-auto mt-10">
          <div className="bg-white/90 backdrop-blur rounded-2xl shadow-sm border border-black/5 p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold text-ads360black-100">
                  Verify your email
                </h1>
                <p className="text-gray-600 mt-2 leading-relaxed">
                  We sent a verification link to:
                </p>
                <div className="inline-flex items-center mt-3 px-3 py-1.5 rounded-full bg-ads360black-100 text-ads360light-100 text-sm">
                  {email}
                </div>
              </div>

              <div className="shrink-0 hidden md:block">
                <div className="h-12 w-12 rounded-2xl bg-ads360yellowBtn-100 flex items-center justify-center text-ads360black-100 font-bold">
                  @
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3 text-gray-700">
              <div className="flex gap-3">
                <div className="mt-0.5 h-6 w-6 rounded-full bg-ads360yellowBtn-100 text-ads360black-100 flex items-center justify-center text-sm font-semibold">
                  1
                </div>
                <p className="leading-relaxed">
                  Open your inbox and click the verification link.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="mt-0.5 h-6 w-6 rounded-full bg-ads360yellowBtn-100 text-ads360black-100 flex items-center justify-center text-sm font-semibold">
                  2
                </div>
                <p className="leading-relaxed">
                  If you don’t see it, check your Spam/Junk folder.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center gap-3">
              <BlackButtons
                handleClick={() => {
                  setIsResending(true);
                  setTimeout(() => setIsResending(false), 1200);
                }}
                isPending={isResending}
                text={isResending ? "Sending..." : "Resend Link"}
              />

              <p className="text-sm text-gray-600">
                Wrong email?{" "}
                <Link to="/signup" className="text-ads360yellow-100">
                  Go back
                </Link>
              </p>
            </div>
          </div>

          <p className="text-center text-xs text-gray-500 mt-6">
            If you still can’t verify your account, contact support.
          </p>
        </div>
      </div>
    </section>
  );
};

export const Route = createFileRoute("/_access/email-verification/")({
  component: EmailVerification,
});

export default EmailVerification;
