export function sortString(a: string, b: string) {
  return a.localeCompare(b);
}

export function sortDate(a: string, b: string) {
  return new Date(parseDate(a)).getTime() - new Date(parseDate(b)).getTime();
}

export function sortZipCode(a: string | number, b: string | number) {
  return +a - +b;
}

function parseDate(date: string) {
  const [day, month, year] = date.split("/");
  return `${month}/${day}/${year}`;
}
