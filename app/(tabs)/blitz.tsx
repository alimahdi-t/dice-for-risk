import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { styled } from "react-native-css";

import TroopCard from "@/components/troop-card";
import { useSettings } from "@/context/settings-context";
import { getTranslations } from "@/i18n";
import {
  playBattle,
  getMaxAttackerDice,
  getMaxDefenderDice,
  isBattleOver,
  getWinner,
  DEFAULT_BATTLE,
} from "@/utils/risk";

const SafeAreaView = styled(RNSafeAreaView);

export default function BlitzScreen() {
  const [attackerTroops, setAttackerTroops] = useState(
    DEFAULT_BATTLE.attackerTroops,
  );

  const [defenderTroops, setDefenderTroops] = useState(
    DEFAULT_BATTLE.defenderTroops,
  );

  const [winner, setWinner] = useState<"attacker" | "defender" | null>(null);
  const [rounds, setRounds] = useState(0);

  const { language, theme } = useSettings();

  const t = getTranslations(language).blitz;
  const isRTL = language === "fa";
  const isDark = theme === "dark";

  const text = isDark ? "text-white" : "text-black";

  const handleBlitz = () => {
    let attackers = attackerTroops;
    let defenders = defenderTroops;
    let count = 0;

    while (!isBattleOver(attackers, defenders)) {
      const battle = playBattle({
        attackerTroops: attackers,
        defenderTroops: defenders,
        attackerDiceCount: getMaxAttackerDice(attackers),
        defenderDiceCount: getMaxDefenderDice(defenders),
      });

      attackers = battle.attackerTroops;
      defenders = battle.defenderTroops;
      count++;
    }

    setAttackerTroops(attackers);
    setDefenderTroops(defenders);
    setRounds(count);
    setWinner(getWinner(attackers, defenders));
  };

  const handleReset = () => {
    setAttackerTroops(DEFAULT_BATTLE.attackerTroops);
    setDefenderTroops(DEFAULT_BATTLE.defenderTroops);
    setWinner(null);
    setRounds(0);
  };

  return (
    <SafeAreaView
      className="flex-1 mt-12 bg-white dark:bg-black"
      edges={["top", "left", "right"]}
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
        <Text
          className={`text-5xl font-bold mt-8 mb-8 ${
            isRTL ? "text-right" : "text-center"
          } ${text}`}
        >
          {t.title}
        </Text>

        {/* Troop counters */}
        <View
          className={`flex-row w-full gap-4 mb-8 ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          <TroopCard
            title={t.attacker}
            troops={attackerTroops}
            troopsLabel={t.troops}
            min={2}
            disabled={winner !== null}
            isRTL={isRTL}
            onDecrease={() => setAttackerTroops((n) => Math.max(2, n - 1))}
            onIncrease={() => setAttackerTroops((n) => n + 1)}
          />

          <TroopCard
            title={t.defender}
            troops={defenderTroops}
            troopsLabel={t.troops}
            min={1}
            disabled={winner !== null}
            isRTL={isRTL}
            onDecrease={() => setDefenderTroops((n) => Math.max(1, n - 1))}
            onIncrease={() => setDefenderTroops((n) => n + 1)}
          />
        </View>

        {/* Blitz button */}
        {!winner ? (
          <TouchableOpacity
            className="bg-[#e94560] w-full rounded-full py-4 items-center"
            onPress={handleBlitz}
          >
            <Text className="text-white text-xl font-bold">⚡ {t.blitz}</Text>
          </TouchableOpacity>
        ) : (
          <View className="w-full items-center gap-4">
            <Text className={`text-3xl font-bold ${text}`}>
              {winner === "attacker" ? t.attackerWins : t.defenderWins}
            </Text>

            <Text className={`text-lg ${text}`}>
              {t.rounds}: {rounds}
            </Text>

            <Text className={`text-lg ${text}`}>
              {t.attacker}: {attackerTroops}
            </Text>

            <Text className={`text-lg ${text}`}>
              {t.defender}: {defenderTroops}
            </Text>

            <TouchableOpacity
              className="bg-[#2ecc71] w-full rounded-full py-4 items-center mt-4"
              onPress={handleReset}
            >
              <Text className="text-white text-xl font-bold">
                {t.newBattle}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}