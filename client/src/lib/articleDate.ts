const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

/** Catalog dates are DD.MON.YYYY; keep machine and visible forms separate. */
export function articleDateISO(value: string): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const [day, month, year] = value.split(".");
  const index = MONTHS.indexOf(month?.toUpperCase());
  if (!day || index < 0 || !year) return value;
  return `${year}-${String(index + 1).padStart(2, "0")}-${day.padStart(2, "0")}`;
}

export function articleDateLabel(value: string): string {
  const iso = articleDateISO(value);
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return value;
  const month = MONTHS[Number(match[2]) - 1];
  if (!month) return value;
  return `${match[3]} ${month[0]}${month.slice(1).toLowerCase()} ${match[1]}`;
}
