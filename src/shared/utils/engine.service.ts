export const weightFormatter = (weight: number, maxGerm = 1000, locale = 'en'): string => {
  return weight > maxGerm ? intlNumber(locale, weight / 1000) + ' Kg' : intlNumber(locale, weight) + ' gr';
};

export const intlNumber = (locale: string, number: number): string => {
  return new Intl.NumberFormat(locale).format(number);
};

export const intlCurrency = (locale: string, iso3: string, price: number): string => {
  return new Intl.NumberFormat(locale, { style: 'currency', currency: iso3 }).format(price);
};

export const intlDate = (locale: string, date: Date): string => {
  return new Intl.DateTimeFormat(locale).format(date);
};

export const scrollToTop = (): void => {
  window.scrollTo(0, 0);
};
