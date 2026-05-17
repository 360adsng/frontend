import { parsePhoneNumberFromString } from "libphonenumber-js";
import type { CountryCode } from "libphonenumber-js";
import { COUNTRIES } from "./countries";

export const PHONE_NUMBER_HINT =
  "Enter phone number without the leading 0.";

export const defaultCountryIso2 = COUNTRIES[0]?.iso2 ?? "NG";

export type PhoneFields = {
  countryIso2: string;
  nationalNumber: string;
};

export function parsePhoneToE164(
  countryIso2: string,
  nationalNumber: string,
): string | null {
  const parsed = parsePhoneNumberFromString(
    nationalNumber.replace(/[\s-]/g, ""),
    countryIso2.toUpperCase() as CountryCode,
  );
  if (!parsed?.isValid()) return null;
  return parsed.format("E.164");
}

export function parseE164ToPhoneFields(e164: string): PhoneFields {
  const parsed = parsePhoneNumberFromString(e164);
  if (parsed?.isValid()) {
    return {
      countryIso2: parsed.country ?? defaultCountryIso2,
      nationalNumber: String(parsed.nationalNumber),
    };
  }
  return {
    countryIso2: defaultCountryIso2,
    nationalNumber: e164.replace(/\D/g, ""),
  };
}
