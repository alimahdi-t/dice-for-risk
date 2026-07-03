import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { styled } from "react-native-css";
import TroopCard from "@/components/troop-card";
import DiceSelector from "@/components/dice-selector";
import ResultPanel from "@/components/result-panel";
import {
  type RollResult,
  playBattle,
  getMaxAttackerDice,
  getMaxDefenderDice,
  isBattleOver,
  getWinner,
  DEFAULT_BATTLE,
} from "@/utils/risk";
import { useSettings } from "@/context/settings-context";
import { getTranslations } from "@/i18n";

const SafeAreaView = styled(RNSafeAreaView);

export default function RiskDiceRoller() {
  const [attackerTroops, setAttackerTroops] = useState(
    DEFAULT_BATTLE.attackerTroops,
  );

  const [defenderTroops, setDefenderTroops] = useState(
    DEFAULT_BATTLE.defenderTroops,
  );

  const [attackerCount, setAttackerCount] = useState(
    DEFAULT_BATTLE.attackerDice,
  );

  const [defenderCount, setDefenderCount] = useState(
    DEFAULT_BATTLE.defenderDice,
  );
  const maxAttackerDice = getMaxAttackerDice(attackerTroops);
  const maxDefenderDice = getMaxDefenderDice(defenderTroops);

  const [result, setResult] = useState<RollResult | null>(null);
  const [battleOver, setBattleOver] = useState(false);

  const handleRoll = () => {
    if (battleOver) return;

    const battle = playBattle({
      attackerTroops,
      defenderTroops,
      attackerDiceCount: Math.min(attackerCount, maxAttackerDice),
      defenderDiceCount: Math.min(defenderCount, maxDefenderDice),
    });

    setAttackerTroops(battle.attackerTroops);
    setDefenderTroops(battle.defenderTroops);
    setResult(battle.result);

    setBattleOver(isBattleOver(battle.attackerTroops, battle.defenderTroops));
  };

  const handleReset = () => {
    setAttackerTroops(DEFAULT_BATTLE.attackerTroops);
    setDefenderTroops(DEFAULT_BATTLE.defenderTroops);
    setAttackerCount(DEFAULT_BATTLE.attackerDice);
    setDefenderCount(DEFAULT_BATTLE.defenderDice);
    setResult(null);
    setBattleOver(false);
  };

  // ---------------------
  const { language, theme } = useSettings();

  // Lang
  const t = getTranslations(language).game;
  const isRTL = language === "fa";

  // Theme
  const isDark = theme === "dark";

  const canRoll = !battleOver && attackerTroops > 1 && defenderTroops > 0;

  const textColor = isDark ? "text-white" : "text-black";

  return (
    <SafeAreaView
      className={`flex-1  mt-12 bg-white dark:bg-black`}
      edges={["left", "right", "top"]}
      style={{ paddingHorizontal: 20 }}
    >
      <ScrollView
        className="flex-1 w-full"
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text className={`text-5xl font-bold mt-8 mb-8 ${textColor}`}>
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

          {/*<Text*/}
          {/*  className={`text-[#e94560] text-lg font-bold ${*/}
          {/*    isRTL ? "text-right" : ""*/}
          {/*  }`}*/}
          {/*>*/}
          {/*  {t.vs}*/}
          {/*</Text>*/}

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
              {getWinner(attackerTroops, defenderTroops) === "attacker"
                ? t.attackerWins
                : t.defenderWins}
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
        <View className="w-full mb-16">
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}