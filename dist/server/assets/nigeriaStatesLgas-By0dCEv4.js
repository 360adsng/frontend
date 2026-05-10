//#region lib/nigeriaStatesLgas.ts
var NIGERIA_STATES_LGAS = [
	{
		id: "lagos",
		name: "Lagos",
		lgas: [
			"Ikeja",
			"Surulere",
			"Eti-Osa",
			"Kosofe"
		]
	},
	{
		id: "abuja",
		name: "FCT Abuja",
		lgas: [
			"Abaji",
			"Bwari",
			"Gwagwalada",
			"Municipal"
		]
	},
	{
		id: "rivers",
		name: "Rivers",
		lgas: [
			"Port Harcourt",
			"Obio-Akpor",
			"Eleme"
		]
	}
];
function getStateById(id) {
	return NIGERIA_STATES_LGAS.find((s) => s.id === id);
}
//#endregion
export { getStateById as n, NIGERIA_STATES_LGAS as t };
