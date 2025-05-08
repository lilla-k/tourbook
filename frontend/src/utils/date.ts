export function toISODateString(date: Date) {
  return date.toISOString().substring(0, 10);
}

export function toDateObject(date: string) {
  return new Date(date);
}
