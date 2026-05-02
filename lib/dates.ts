export function toDateKey(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

export function formatDisplayDate(dateKey: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long"
  }).format(new Date(`${dateKey}T12:00:00`));
}

export function getLastDays(count: number, from = new Date()): string[] {
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(from);
    date.setDate(from.getDate() - index);
    return toDateKey(date);
  }).reverse();
}

export function isSameDateKey(a: string, b: string): boolean {
  return a === b;
}
