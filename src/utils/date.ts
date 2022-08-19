export const persianToEnglish = (text: string) =>
  text.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

type irDateT = string;

export function useDateToString(date: string) {
  const enDate = new Date(date);
  const irDate: irDateT[] = enDate.toLocaleDateString("fa-ir").split("/");
  return {
    year: persianToEnglish(irDate[0]),
    month: months[persianToEnglish(irDate[1])],
    day: persianToEnglish(irDate[2]),
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
