export type CountryOption = {
  /** ISO 3166-1 alpha-2 */
  iso2: string;
  /** Emoji flag (or any short flag code you prefer). */
  flag: string;
  /** Optional full name (kept for later if needed). */
  name?: string;
  /** Calling code without "+" */
  callingCode: string;
};

/**
 * Seed list (add more later).
 * Keep `iso2` uppercase to match libphonenumber-js country codes.
 */
export const COUNTRIES: CountryOption[] = [
  { iso2: "NG", flag: "🇳🇬", name: "Nigeria", callingCode: "234" },
  { iso2: "GH", flag: "🇬🇭", name: "Ghana", callingCode: "233" },
  { iso2: "US", flag: "🇺🇸", name: "United States", callingCode: "1" },
  { iso2: "GB", flag: "🇬🇧", name: "United Kingdom", callingCode: "44" },
];

