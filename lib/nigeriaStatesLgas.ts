/**
 * Nigeria states and LGAs for vendor coverage pickers.
 * Expand this list over time — only a few samples are included for now.
 */

export type StateOption = {
  /** Stable key, e.g. "lagos" */
  id: string;
  /** Display name */
  name: string;
  lgas: string[];
};

export const NIGERIA_STATES_LGAS: StateOption[] = [
  {
    id: "lagos",
    name: "Lagos",
    lgas: ["Ikeja", "Surulere", "Eti-Osa", "Kosofe"],
  },
  {
    id: "abuja",
    name: "FCT Abuja",
    lgas: ["Abaji", "Bwari", "Gwagwalada", "Municipal"],
  },
  {
    id: "rivers",
    name: "Rivers",
    lgas: ["Port Harcourt", "Obio-Akpor", "Eleme"],
  },
];

export function getStateById(id: string): StateOption | undefined {
  return NIGERIA_STATES_LGAS.find((s) => s.id === id);
}

/** Map stored coverage state (id or display name) to a stable state id. */
export function resolveStateId(stored: string): string {
  if (!stored) return "";
  const byId = getStateById(stored);
  if (byId) return byId.id;
  const lower = stored.toLowerCase();
  const match = NIGERIA_STATES_LGAS.find(
    (s) => s.id === lower || s.name.toLowerCase() === lower,
  );
  return match?.id ?? "";
}
