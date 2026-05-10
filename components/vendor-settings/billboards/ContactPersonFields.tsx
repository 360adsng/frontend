"use client";

export function ContactPersonFields({
  inputBase,
  contactName,
  onContactName,
  contactPhoneCountryIso2,
  contactPhoneNationalNumber,
  onContactPhoneCountryIso2,
  onContactPhoneNationalNumber,
  contactPersonEmail,
  onContactPersonEmail,
  contactPersonPosition,
  onContactPersonPosition,
  countries,
  errorAltPhone,
}: {
  inputBase: string;
  contactName: string;
  onContactName: (v: string) => void;
  contactPhoneCountryIso2: string;
  contactPhoneNationalNumber: string;
  onContactPhoneCountryIso2: (v: string) => void;
  onContactPhoneNationalNumber: (v: string) => void;
  contactPersonEmail: string;
  onContactPersonEmail: (v: string) => void;
  contactPersonPosition: string;
  onContactPersonPosition: (v: string) => void;
  countries: Array<{ iso2: string; flag: string; callingCode: string }>;
  errorAltPhone?: string;
}) {
  return (
    <div>
      <div className="font-medium text-stone-900">Contact person</div>
      <div className="text-xs text-stone-500 mb-2">
        These details will be used when brands need to reach you.
      </div>

      <div className="md:flex justify-evenly">
        <div className="md:w-[40%] px-3">
          <div className="my-3">
            <label>Contact name</label>
            <input
              className={inputBase}
              value={contactName}
              onChange={(e) => onContactName(e.target.value)}
            />
          </div>

          <div className="my-3">
            <label>Contact email</label>
            <input
              className={inputBase}
              value={contactPersonEmail}
              onChange={(e) => onContactPersonEmail(e.target.value)}
              placeholder="name@company.com"
              inputMode="email"
            />
          </div>
        </div>

        <div className="md:w-[40%] px-3">
          <div className="my-3">
            <label>Contact phone</label>
            <div className="flex gap-2">
              <select
                value={contactPhoneCountryIso2}
                onChange={(e) => onContactPhoneCountryIso2(e.target.value)}
                className={inputBase}
              >
                {countries.map((c) => (
                  <option key={c.iso2} value={c.iso2}>
                    {c.flag} +{c.callingCode}
                  </option>
                ))}
              </select>
              <input
                value={contactPhoneNationalNumber}
                onChange={(e) => onContactPhoneNationalNumber(e.target.value)}
                className={inputBase}
                placeholder="8012345678"
                inputMode="tel"
              />
            </div>
            {errorAltPhone ? (
              <p className="text-sm text-red-600 mt-1">{errorAltPhone}</p>
            ) : null}
          </div>

          <div className="my-3">
            <label>Position</label>
            <input
              className={inputBase}
              value={contactPersonPosition}
              onChange={(e) => onContactPersonPosition(e.target.value)}
              placeholder="Operations manager"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

