export function AddHours(date: Date, h: number): Date {
  date.setTime(date.getTime() + (h*60*60*1000));

  return date;
}