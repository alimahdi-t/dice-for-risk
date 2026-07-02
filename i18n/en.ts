export default {
  tabs: {
    game: "Game",
    settings: "Settings",
  },
  game: {
    title: "⚔️ Risk Dice Roller",
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
    privacy: "Privacy",
    version: "Version",

    footer: "Risk Dice Roller",
  },
} as const;