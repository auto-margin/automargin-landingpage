/**
 * Vehicle makes offered by the demo's brand picker.
 *
 * This list drives suggestions only. The previous demo matched a hard-coded
 * 35-brand list against the free-text box and refused to run when it did not
 * hit — which silently blocked every make outside the list (Alfa Romeo,
 * Polestar, DS, Chevrolet, …). Brand is now its own field, and anything the
 * picker does not know is still accepted verbatim, so the list can never turn
 * into a gate again.
 */
export const VEHICLE_BRANDS = [
  "Abarth",
  "Alfa Romeo",
  "Alpine",
  "Aston Martin",
  "Audi",
  "Bentley",
  "BMW",
  "BYD",
  "Chevrolet",
  "Chrysler",
  "Citroën",
  "Cupra",
  "Dacia",
  "DS",
  "Ferrari",
  "Fiat",
  "Ford",
  "Genesis",
  "GWM",
  "Honda",
  "Hyundai",
  "Infiniti",
  "Isuzu",
  "Iveco",
  "Jaguar",
  "Jeep",
  "Kia",
  "Lamborghini",
  "Lancia",
  "Land Rover",
  "Leapmotor",
  "Lexus",
  "Lotus",
  "Maserati",
  "Maxus",
  "Mazda",
  "McLaren",
  "Mercedes-Benz",
  "MG",
  "Mini",
  "Mitsubishi",
  "Nissan",
  "Omoda",
  "Opel",
  "Peugeot",
  "Polestar",
  "Porsche",
  "Renault",
  "Rolls-Royce",
  "Seat",
  "Škoda",
  "Smart",
  "SsangYong",
  "Subaru",
  "Suzuki",
  "Tesla",
  "Toyota",
  "Volkswagen",
  "Volvo",
  "Xpeng",
] as const;

export type VehicleBrand = (typeof VEHICLE_BRANDS)[number];

const COMBINING_MARKS = new RegExp("[\u0300-\u036f]", "g");

/** Strips diacritics so "skoda" matches "Škoda" and "citroen" matches "Citroën". */
function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(COMBINING_MARKS, "")
    .toLowerCase()
    .trim();
}

const BY_NORMALIZED = new Map<string, string>(
  VEHICLE_BRANDS.map((brand) => [normalize(brand), brand]),
);

/** Common shorthands dealers type instead of the registered make. */
const ALIASES: Record<string, string> = {
  vw: "Volkswagen",
  merc: "Mercedes-Benz",
  mercedes: "Mercedes-Benz",
  benz: "Mercedes-Benz",
  "mercedes benz": "Mercedes-Benz",
  "range rover": "Land Rover",
  landrover: "Land Rover",
  alfa: "Alfa Romeo",
  vauxhall: "Opel",
  skoda: "Škoda",
};

/** Resolves free text to a known make, or returns the trimmed input unchanged. */
export function resolveBrand(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  const key = normalize(trimmed);
  return ALIASES[key] ?? BY_NORMALIZED.get(key) ?? trimmed;
}

export function isKnownBrand(value: string) {
  const key = normalize(value);
  return BY_NORMALIZED.has(key) || key in ALIASES;
}

/**
 * Ranked suggestions for the combobox: prefix matches first, then substring
 * matches, so typing "au" surfaces Audi before Renault.
 */
export function searchBrands(query: string, limit = 8) {
  const key = normalize(query);
  if (!key) return VEHICLE_BRANDS.slice(0, limit) as readonly string[];

  const prefix: string[] = [];
  const contains: string[] = [];
  for (const brand of VEHICLE_BRANDS) {
    const normalized = normalize(brand);
    if (normalized.startsWith(key)) prefix.push(brand);
    else if (normalized.includes(key)) contains.push(brand);
    if (prefix.length >= limit) break;
  }

  const aliasHit = ALIASES[key];
  if (aliasHit && !prefix.includes(aliasHit) && !contains.includes(aliasHit)) {
    prefix.unshift(aliasHit);
  }

  return [...prefix, ...contains].slice(0, limit);
}
