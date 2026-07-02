import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { styled } from "react-native-css";
import { useTheme } from "@/context/theme-context";
import TroopCard from "@/components/troop-card";
import DiceSelector from "@/components/dice-selector";
import ResultPanel from "@/components/result-panel";
const SafeAreaView = styled(RNSafeAreaView);

const translations = {
  en: {
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
  fa: {
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
};

type Lang = "en" | "fa";
type RollResult = {
  attacker: number[];
  defender: number[];
  attackerLosses: number;
  defenderLosses: number;
};

const rollDice = (count: number): number[] =>
  Array.from({ length: count }, () => Math.floor(Math.random() * 6) + 1).sort(
    (a, b) => b - a,
  );

const compareRolls = (
  attackerDice: number[],
  defenderDice: number[],
): RollResult => {
  const pairs = Math.min(attackerDice.length, defenderDice.length);
  let attackerLosses = 0;
  let defenderLosses = 0;
  for (let i = 0; i < pairs; i++) {
    if (attackerDice[i] > defenderDice[i]) defenderLosses++;
    else attackerLosses++;
  }
  return {
    attacker: attackerDice,
    defender: defenderDice,
    attackerLosses,
    defenderLosses,
  };
};

const getDiceFace = (n: number) => ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"][n - 1];

export default function RiskDiceRoller() {
  const [lang, setLang] = useState<Lang>("en");

  // Troops
  const [attackerTroops, setAttackerTroops] = useState(10);
  const [defenderTroops, setDefenderTroops] = useState(10);
  const [attackerCount, setAttackerCount] = useState(3);
  const [defenderCount, setDefenderCount] = useState(2);
  const [result, setResult] = useState<RollResult | null>(null);
  const [battleOver, setBattleOver] = useState(false);

  const t = translations[lang];
  const isRTL = lang === "fa";

  const maxAttackerDice = Math.min(3, attackerTroops - 1);
  const maxDefenderDice = Math.min(2, defenderTroops);

  const handleRoll = () => {
    if (battleOver) return;
    const atkDice = Math.min(attackerCount, maxAttackerDice);
    const defDice = Math.min(defenderCount, maxDefenderDice);
    const attackerDice = rollDice(atkDice);
    const defenderDice = rollDice(defDice);
    const roll = compareRolls(attackerDice, defenderDice);
    const newAttackerTroops = attackerTroops - roll.attackerLosses;
    const newDefenderTroops = defenderTroops - roll.defenderLosses;
    setAttackerTroops(newAttackerTroops);
    setDefenderTroops(newDefenderTroops);
    setResult(roll);
    if (newDefenderTroops <= 0 || newAttackerTroops <= 1) setBattleOver(true);
  };

  const handleReset = () => {
    setAttackerTroops(10);
    setDefenderTroops(10);
    setAttackerCount(3);
    setDefenderCount(2);
    setResult(null);
    setBattleOver(false);
  };

  const { theme } = useTheme();

  const isDark = theme === "dark";

  const canRoll = !battleOver && attackerTroops > 1 && defenderTroops > 0;

  const bg = isDark ? "bg-black" : "bg-white";
  const textColor = isDark ? "text-white" : "text-black";
  const card = isDark ? "bg-zinc-200" : "bg-zinc-900";

  return (
    <SafeAreaView className={`flex-1 p-5 ${bg}`}>
      <ScrollView
        className="flex-1 w-full"
        contentContainerClassName="items-center pb-12"
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text
          className={`text-2xl font-bold ${textColor} mb-6 ${
            isRTL ? "text-right" : "text-center"
          }`}
        >
          {t.title}
        </Text>

        {/* Troop Counters */}
        <View
          className={`flex-row items-center w-full mb-7 gap-4 ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          {/* Attacker */}
          <TroopCard
            title={t.attacker}
            troops={attackerTroops}
            troopsLabel={t.troops}
            isRTL={isRTL}
            disabled={!!result}
            min={2}
            onDecrease={() => setAttackerTroops((n) => Math.max(2, n - 1))}
            onIncrease={() => setAttackerTroops((n) => n + 1)}
          />

          <Text
            className={`text-[#e94560] text-lg font-bold ${
              isRTL ? "text-right" : ""
            }`}
          >
            {t.vs}
          </Text>

          {/* Defender */}
          <TroopCard
            title={t.defender}
            troops={defenderTroops}
            troopsLabel={t.troops}
            isRTL={isRTL}
            disabled={!!result}
            min={1}
            onDecrease={() => setDefenderTroops((n) => Math.max(1, n - 1))}
            onIncrease={() => setDefenderTroops((n) => n + 1)}
          />
        </View>

        {/* Dice selectors */}
        {!battleOver && (
          <>
            <DiceSelector
              title={t.attackerDice}
              options={[1, 2, 3]}
              selected={attackerCount}
              max={maxAttackerDice}
              onSelect={setAttackerCount}
              isRTL={isRTL}
            />

            <DiceSelector
              title={t.defenderDice}
              options={[1, 2]}
              selected={defenderCount}
              max={maxDefenderDice}
              onSelect={setDefenderCount}
              isRTL={isRTL}
            />
          </>
        )}

        {/* Roll / Reset */}
        {battleOver ? (
          <View className="items-center gap-4 mt-2 w-full">
            <Text
              className={`text-white text-2xl font-bold ${
                isRTL ? "text-right" : ""
              }`}
            >
              {defenderTroops <= 0 ? t.attackerWins : t.defenderWins}
            </Text>
            <TouchableOpacity
              className="bg-[#2ecc71] w-full items-center py-4 rounded-full"
              onPress={handleReset}
            >
              <Text className="text-white text-xl font-bold">
                {t.newBattle}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            className={`w-full items-center py-4 rounded-full mt-2 ${
              canRoll ? "bg-[#e94560]" : "bg-[#555]"
            }`}
            onPress={handleRoll}
            disabled={!canRoll}
          >
            <Text className="text-white text-xl font-bold">{t.roll}</Text>
          </TouchableOpacity>
        )}

        {/* Results */}
        {result && (
          <ResultPanel
            result={result}
            attackLabel={t.attack}
            defenseLabel={t.defense}
            defenderLosesText={
              result.defenderLosses > 0
                ? t.defenderLoses(result.defenderLosses)
                : null
            }
            attackerLosesText={
              result.attackerLosses > 0
                ? t.attackerLoses(result.attackerLosses)
                : null
            }
            isRTL={isRTL}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}