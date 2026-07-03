export default {
  tabs: {
    game: "کلاسیک",
    blitz: "بلیتز",
    settings: "تنظیمات",
  },

  game: {
    title: "حالت کلاسیک",
    attacker: "🔴 مهاجم",
    defender: "🔵 مدافع",
    troops: "نیرو",
    attackerDice: "🎲 تاس‌های مهاجم",
    defenderDice: "🎲 تاس‌های مدافع",
    roll: "ریختن تاس",
    newBattle: "نبرد جدید",
    attack: "🔴 حمله",
    defense: "🔵 دفاع",
    defenderLoses: (n: number) => `🔴 مدافع ${n} نیرو از دست داد`,
    attackerLoses: (n: number) => `🔵 مهاجم ${n} نیرو از دست داد`,
    attackerWins: "🔴 مهاجم پیروز شد!",
    defenderWins: "🔵 مدافع پیروز شد!",
    vs: "در برابر",
    lang: "English",
  },
  settings: {
    title: "تنظیمات",

    game: "بازی",
    sound: "افکت‌های صوتی",
    soundDesc: "صدای ریختن تاس",

    vibration: "لرزش",
    vibrationDesc: "بازخورد لمسی",

    appearance: "ظاهر",
    dark: "تیره",
    light: "روشن",

    language: "زبان",
    english: "English",
    persian: "فارسی",

    about: "درباره",
    rules: "قوانین",
    privacy: "حریم خصوصی",
    contact: "ارتباط با توسعه‌دهنده",
    version: "نسخه",

    footer: "Dice for Risk",
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
  blitz: {
    title: "حالت بلیتز",
    blitz: "بلیتز",
    attacker: "مهاجم",
    defender: "مدافع",
    troops: "نیرو",
    rounds: "دور",
    attackerWins: "مهاجم پیروز شد!",
    defenderWins: "مدافع پیروز شد!",
    newBattle: "نبرد جدید",
  },

  contact: {
    title: "ارتباط با توسعه‌دهنده",
    contact: "ارتباط",
    email: "ایمیل",
    github: "گیت‌هاب",
    website: "وب‌سایت",
    footer: "از استفاده از Dice for Risk متشکریم ❤️",
  },
} as const;