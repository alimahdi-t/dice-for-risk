export default {
  tabs: {
    game: "Classic",
    blitz: "Blitz",
    settings: "Settings",
  },
  game: {
    title: "Classic mood",
    attacker: "🔴 Attacker",
    defender: "🔵 Defender",
    troops: "troops",
    attackerDice: "🔴 Attacker Dice",
    defenderDice: "🔵 Defender Dice",
    roll: "Roll Dice",
    newBattle: "New Battle",
    attack: "🔴 Attack",
    defense: "🔵 Defense",
    defenderLoses: (n: number) =>
      `🔴 Defender loses ${n} troop${n > 1 ? "s" : ""}`,
    attackerLoses: (n: number) =>
      `🔵 Attacker loses ${n} troop${n > 1 ? "s" : ""}`,
    attackerWins: "🔴 Attacker Wins!",
    defenderWins: "🔵 Defender Wins!",
    vs: "VS",
    lang: "فارسی",
  },
  settings: {
    title: "Settings",

    game: "GAME",
    sound: "Sound Effects",
    soundDesc: "Dice rolling sounds",

    vibration: "Vibration",
    vibrationDesc: "Haptic feedback",

    appearance: "APPEARANCE",
    dark: "Dark",
    light: "Light",

    language: "LANGUAGE",
    english: "English",
    persian: "فارسی",

    about: "ABOUT",
    rules: "Rules",
    privacy: "Privacy Policy",
    contact: "Contact Developer",
    version: "Version",

    footer: "Dice for Risk",
  },

  rulesPage: {
    title: "Rules",
    content: [
      "Attacker may roll up to three dice.",
      "Defender may roll up to two dice.",
      "Compare highest dice first.",
      "Defender wins ties.",
    ],
  },

  privacyPage: {
    title: "Privacy Policy",
    content: [
      "This app does not collect any personal information.",
      "No account creation is required.",
      "Your settings are stored locally on your device.",
      "No data is shared with third parties.",
      "No analytics or tracking services are used.",
    ],
  },
  // en
  blitz: {
    title: "Blitz Mode",
    blitz: "BLITZ",
    attacker: "Attacker",
    defender: "Defender",
    troops: "Troops",
    rounds: "Rounds",
    attackerWins: "Attacker Wins!",
    defenderWins: "Defender Wins!",
    newBattle: "New Battle",
  },

  contact: {
    title: "Contact Developer",
    contact: "CONTACT",
    email: "Email",
    github: "GitHub",
    website: "Website",
    footer: "Thank you for using Dice for Risk ❤️",
  },
} as const;