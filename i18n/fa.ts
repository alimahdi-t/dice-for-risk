export default {
  tabs: {
    game: "بازی",
    settings: "تنظیمات",
  },

  game: {
    title: "⚔️ تاس ریسک",
    attacker: "🔴 مهاجم",
    defender: "🔵 مدافع",
    troops: "سرباز",
    attackerDice: "🔴 تاس مهاجم",
    defenderDice: "🔵 تاس مدافع",
    roll: "پرتاب تاس",
    newBattle: "نبرد جدید",
    attack: "🔴 حمله",
    defense: "🔵 دفاع",
    defenderLoses: (n: number) => `🔴 مدافع ${n} سرباز از دست داد`,
    attackerLoses: (n: number) => `🔵 مهاجم ${n} سرباز از دست داد`,
    attackerWins: "🔴 مهاجم برنده شد!",
    defenderWins: "🔵 مدافع برنده شد!",
    vs: "در برابر",
    lang: "English",
  },
  settings: {
    title: "تنظیمات",

    game: "بازی",
    sound: "افکت صدا",
    soundDesc: "صدای پرتاب تاس",

    vibration: "لرزش",
    vibrationDesc: "بازخورد لمسی",

    appearance: "ظاهر",
    dark: "تاریک",
    light: "روشن",

    language: "زبان",
    english: "English",
    persian: "فارسی",

    about: "درباره",
    rules: "قوانین",
    privacy: "حریم خصوصی",
    version: "نسخه",

    footer: "تاس ریسک",
  },
} as const;