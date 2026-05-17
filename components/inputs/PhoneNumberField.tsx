import { COUNTRIES } from "../../lib/countries";
import {
  PHONE_NUMBER_HINT,
  type PhoneFields,
} from "../../lib/phoneInput";

type PhoneNumberFieldProps = {
  id: string;
  label?: string;
  value: PhoneFields;
  onChange: (next: PhoneFields) => void;
  inputClass: (hasError?: boolean) => string;
  error?: string | null;
  showHint?: boolean;
};

export default function PhoneNumberField({
  id,
  label = "Phone Number",
  value,
  onChange,
  inputClass,
  error,
  showHint = true,
}: PhoneNumberFieldProps) {
  return (
    <div className="my-3">
      <label htmlFor={id}>{label}</label>
      {showHint ? (
        <p className="text-sm text-gray-600 mt-1 mb-1.5 leading-snug">
          {PHONE_NUMBER_HINT}
        </p>
      ) : null}
      <div className="flex gap-2">
        <div className="basis-1/3">
          <select
            value={value.countryIso2}
            onChange={(e) =>
              onChange({ ...value, countryIso2: e.target.value })
            }
            className={inputClass(Boolean(error))}
            aria-label={`${label} country`}
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
            type="tel"
            inputMode="tel"
            id={id}
            placeholder="8012345678"
            autoComplete="tel-national"
            className={inputClass(Boolean(error))}
            value={value.nationalNumber}
            onChange={(e) =>
              onChange({ ...value, nationalNumber: e.target.value })
            }
          />
        </div>
      </div>
      {error ? <p className="text-sm text-red-600 mt-1">{error}</p> : null}
    </div>
  );
}
