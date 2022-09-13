type irDateT = string;

export function useDateToString(date: string) {
  const enDate = new Date(date);
  const irDate: irDateT[] = enDate
    .toLocaleDateString("fa-IR-u-nu-latn")
    .split("/");
  return {
    year: irDate[0],
    month: months[irDate[1]],
    month_number: parseInt(irDate[1]) < 10 ? "0" + irDate[1] : irDate[1],
    day: parseInt(irDate[2]) < 10 ? "0" + irDate[2] : irDate[2],
    hours: enDate.getHours(),
    minute: enDate.getMinutes(),
  };
}

const months = {
  1: "فروردین",
  2: "اردیبهشت",
  3: "خرداد",
  4: "تیر",
  5: "مرداد",
  6: "شهریور",
  7: "مهر",
  8: "آبان",
  9: "آذر",
  10: "دی",
  11: "بهمن",
  12: "اسفند",
};
