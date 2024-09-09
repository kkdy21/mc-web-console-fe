export function formatDate(
  date: Date | string,
  format: string = 'yyyy-MM-dd HH:mm:ss',
): string {
  const d = new Date(date);

  const map: { [key: string]: string } = {
    yyyy: d.getFullYear().toString(),
    MM: String(d.getMonth() + 1).padStart(2, '0'),
    dd: String(d.getDate()).padStart(2, '0'),
    HH: String(d.getHours()).padStart(2, '0'),
    mm: String(d.getMinutes()).padStart(2, '0'),
    ss: String(d.getSeconds()).padStart(2, '0'),
  };

  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, matched => map[matched]);
}
