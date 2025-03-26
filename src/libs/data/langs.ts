export const langs = [
  {
    label: "English",
    value: "en",
  },
  {
    label: "العربية",
    value: "ar",
  },
  {
    label: "русский язык",
    value: "ru",
  },
  {
    label: "Deutsch",
    value: "de",
  },
] as const;

export type Lang = (typeof langs)[number];
