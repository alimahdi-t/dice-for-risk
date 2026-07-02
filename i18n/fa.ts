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

  rulesPage: {
    title: "قوانین",
    content: [
      "مهاجم می‌تواند حداکثر سه تاس بیندازد.",
      "مدافع می‌تواند حداکثر دو تاس بیندازد.",
      "بالاترین تاس‌ها با هم مقایسه می‌شوند.",
      "در تساوی، مدافع برنده است.",
    ],
  },

  privacyPage: {
    title: "حریم خصوصی",
    content: [
      "این برنامه هیچ اطلاعات شخصی جمع‌آوری نمی‌کند.",
      "برای استفاده از برنامه نیازی به ایجاد حساب کاربری نیست.",
      "تنظیمات شما فقط روی دستگاه شما ذخیره می‌شوند.",
      "هیچ اطلاعاتی با شخص ثالث به اشتراک گذاشته نمی‌شود.",
      "از هیچ سرویس رهگیری یا تحلیل داده استفاده نمی‌شود.",
    ],
  },
} as const;