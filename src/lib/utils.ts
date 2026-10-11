export const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export function toBanglaNumber(num: number | string | undefined | null): string {
  if (num === undefined || num === null) return '০';
  return num
    .toString()
    .replace(/\d/g, (d) => banglaDigits[parseInt(d, 10)]);
}

export function parseBanglaOrEnglishNumber(str: string | number | undefined | null): number {
  if (typeof str === 'number') return str;
  if (!str) return 0;
  const englishStr = str
    .toString()
    .replace(/[০-৯]/g, (d) => banglaDigits.indexOf(d).toString())
    .replace(/,/g, '');
  return parseFloat(englishStr) || 0;
}

export function getBanglaDate(): string {
  const date = new Date();
  const months = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ];
  const day = toBanglaNumber(date.getDate());
  const month = months[date.getMonth()];
  const year = toBanglaNumber(date.getFullYear());
  return `${day} ${month}, ${year}`;
}
