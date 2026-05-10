//#region lib/countries.ts
/**
* Seed list (add more later).
* Keep `iso2` uppercase to match libphonenumber-js country codes.
*/
var COUNTRIES = [
	{
		iso2: "NG",
		flag: "🇳🇬",
		name: "Nigeria",
		callingCode: "234"
	},
	{
		iso2: "GH",
		flag: "🇬🇭",
		name: "Ghana",
		callingCode: "233"
	},
	{
		iso2: "US",
		flag: "🇺🇸",
		name: "United States",
		callingCode: "1"
	},
	{
		iso2: "GB",
		flag: "🇬🇧",
		name: "United Kingdom",
		callingCode: "44"
	}
];
//#endregion
export { COUNTRIES as t };
