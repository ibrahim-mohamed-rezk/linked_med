export const langs = [
    {
        label: "English",
        value: "en",
    },
    {
        label: "Arabic",
        value: "ar",
    },
] as const;

export type Lang = typeof langs[number];