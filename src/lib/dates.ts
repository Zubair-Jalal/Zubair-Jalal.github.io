const MONTHS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

/** Parses loose date strings like "January 2026" or "2025" into a sortable value. */
export function parseApproxDate(value: string): number {
  const parts = value.trim().toLowerCase().split(/\s+/);
  const yearPart = parts[parts.length - 1];
  const year = Number.parseInt(yearPart, 10);
  if (Number.isNaN(year)) return 0;

  let month = 0;
  if (parts.length > 1) {
    const monthIndex = MONTHS.indexOf(parts[0]);
    if (monthIndex >= 0) month = monthIndex;
  }

  return new Date(year, month, 1).getTime();
}

export function isPast(value: string): boolean {
  return parseApproxDate(value) < Date.now();
}
