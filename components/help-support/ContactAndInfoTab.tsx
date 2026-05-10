"use client";

export function ContactAndInfoTab() {
  return (
    <div className="max-w-xl space-y-6 text-stone-700">
      <div>
        <h3 className="font-serif text-lg text-stone-900">Contact us</h3>
        <p className="mt-2 text-sm leading-relaxed">
          Our team usually replies within one business day. For urgent billing
          or payment issues, mark your ticket priority as <strong>High</strong>.
        </p>
      </div>
      <dl className="space-y-4 rounded-2xl border border-stone-200 bg-white p-5 text-sm">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-stone-500">
            Support email
          </dt>
          <dd className="mt-1">
            <a
              className="font-medium text-ads360yellow-100 hover:underline"
              href="mailto:support@360ads.example"
            >
              support@360ads.example
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-stone-500">
            Business & partnerships
          </dt>
          <dd className="mt-1">
            <a
              className="font-medium text-ads360yellow-100 hover:underline"
              href="mailto:partners@360ads.example"
            >
              partners@360ads.example
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-stone-500">
            Phone (NG)
          </dt>
          <dd className="mt-1">+234 (0) 800 000 3600 — Mon–Fri, 9:00–17:00 WAT</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-stone-500">
            Office
          </dt>
          <dd className="mt-1 leading-relaxed">
            360 Ads HQ (dummy address)
            <br />
            Lagos, Nigeria
          </dd>
        </div>
      </dl>
      <p className="text-xs text-stone-500">
        This page uses placeholder contact details for UI preview only.
      </p>
    </div>
  );
}
