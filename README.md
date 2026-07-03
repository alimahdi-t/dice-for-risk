<div align="center">
  <h1>⚔️ Dice for Risk</h1>
  <p>A mobile dice roller for the <strong>Risk</strong> board game, built with Expo & React Native.</p>

  <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" />
  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/NativeWind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
</div>

---

## 📸 Screenshots

<!-- Add your screenshots to assets/images/ and update filenames below -->

[//]: # (<div align="center">)

[//]: # (  <img src="assets/images/1.jpg" width="220" />)

[//]: # (  <img src="assets/images/screenshot-roll.png" width="220" />)

[//]: # (  <img src="assets/images/screenshot-fa.png" width="220" />)

[//]: # (</div>)

---

## ✨ Features

- 🎲 Roll up to **3 attacker** and **2 defender** dice following official Risk rules
- ⚖️ Automatic dice comparison — highest dice paired first, ties go to the defender
- 🪖 **Troop counters** for both sides that decrease after every roll
- 🏆 Battle-over detection with winner announcement and new battle reset
- 🌐 **Bilingual** — English and Persian (فارسی) with full RTL layout
- 📱 Scrollable full-width layout optimized for mobile

---

## 🛠 Tech Stack

| Tool | Purpose |
|---|---|
| [Expo](https://expo.dev) + [Expo Router](https://expo.github.io/router) | Framework & file-based routing |
| React Native + TypeScript | UI & type safety |
| [NativeWind](https://www.nativewind.dev) | Tailwind CSS for React Native |
| pnpm | Package manager |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm
- Expo Go app on your phone (or iOS/Android simulator)

### Installation

```bash
git clone https://github.com/alimahdi-t/dice-for-risk.git
cd dice-for-risk
pnpm install
pnpm expo start
```

Scan the QR code with **Expo Go**, or press:
- `i` → iOS Simulator
- `a` → Android Emulator

---

## 🎮 How It Works

1. Set the number of troops for both attacker and defender
2. Choose how many dice each side rolls (attacker: 1–3, defender: 1–2)
3. Hit **Roll Dice** — dice are sorted highest-first and compared pair by pair
4. Troops decrease automatically based on losses
5. Battle ends when the defender hits 0 troops or the attacker is left with 1

> Ties always go to the **defender**, following the official Risk rules.

---

## 📁 Project Structure