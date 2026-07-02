import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import {SafeAreaView as RNSafeAreaView} from "react-native-safe-area-context";
import {styled} from "react-native-css";
const SafeAreaView = styled(RNSafeAreaView);

const translations = {
  en: {
    title: '⚔️ Risk Dice Roller',
    attacker: '🔴 Attacker',
    defender: '🔵 Defender',
    troops: 'troops',
    attackerDice: '🔴 Attacker Dice',
    defenderDice: '🔵 Defender Dice',
    roll: 'Roll Dice',
    newBattle: 'New Battle',
    attack: '🔴 Attack',
    defense: '🔵 Defense',
    defenderLoses: (n: number) => `🔴 Defender loses ${n} troop${n > 1 ? 's' : ''}`,
    attackerLoses: (n: number) => `🔵 Attacker loses ${n} troop${n > 1 ? 's' : ''}`,
    attackerWins: '🔴 Attacker Wins!',
    defenderWins: '🔵 Defender Wins!',
    vs: 'VS',
    lang: 'فارسی',
  },
  fa: {
    title: '⚔️ تاس ریسک',
    attacker: '🔴 مهاجم',
    defender: '🔵 مدافع',
    troops: 'سرباز',
    attackerDice: '🔴 تاس مهاجم',
    defenderDice: '🔵 تاس مدافع',
    roll: 'پرتاب تاس',
    newBattle: 'نبرد جدید',
    attack: '🔴 حمله',
    defense: '🔵 دفاع',
    defenderLoses: (n: number) => `🔴 مدافع ${n} سرباز از دست داد`,
    attackerLoses: (n: number) => `🔵 مهاجم ${n} سرباز از دست داد`,
    attackerWins: '🔴 مهاجم برنده شد!',
    defenderWins: '🔵 مدافع برنده شد!',
    vs: 'در برابر',
    lang: 'English',
  },
};

type Lang = 'en' | 'fa';
type RollResult = { attacker: number[]; defender: number[]; attackerLosses: number; defenderLosses: number };

const rollDice = (count: number): number[] =>
    Array.from({ length: count }, () => Math.floor(Math.random() * 6) + 1).sort((a, b) => b - a);

const compareRolls = (attackerDice: number[], defenderDice: number[]): RollResult => {
  const pairs = Math.min(attackerDice.length, defenderDice.length);
  let attackerLosses = 0;
  let defenderLosses = 0;
  for (let i = 0; i < pairs; i++) {
    if (attackerDice[i] > defenderDice[i]) defenderLosses++;
    else attackerLosses++;
  }
  return { attacker: attackerDice, defender: defenderDice, attackerLosses, defenderLosses };
};

const getDiceFace = (n: number) => ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'][n - 1];

export default function RiskDiceRoller() {
  const [lang, setLang] = useState<Lang>('en');

  // Troops
  const [attackerTroops, setAttackerTroops] = useState(10);
  const [defenderTroops, setDefenderTroops] = useState(10);
  const [attackerCount, setAttackerCount] = useState(3);
  const [defenderCount, setDefenderCount] = useState(2);
  const [result, setResult] = useState<RollResult | null>(null);
  const [battleOver, setBattleOver] = useState(false);

  const t = translations[lang];
  const isRTL = lang === 'fa';

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

  const toggleLang = () => setLang(l => l === 'en' ? 'fa' : 'en');
  const canRoll = !battleOver && attackerTroops > 1 && defenderTroops > 0;

  return (
      <SafeAreaView className="flex-1 p-5">

        {/* Language toggle */}
        <TouchableOpacity
            className="right-5 z-10 bg-[#2a2a4a]  py-2 rounded-full border border-[#444]"
            onPress={toggleLang}
        >
          <Text className="text-white text-sm font-semibold">{t.lang}</Text>
        </TouchableOpacity>

        <ScrollView
            className="flex-1 w-full"
            contentContainerClassName="items-center pb-12"
            showsVerticalScrollIndicator={false}
        >
          {/* Title */}
          <Text className={`text-2xl font-bold text-white mb-6 ${isRTL ? 'text-right' : 'text-center'}`}>
            {t.title}
          </Text>

          {/* Troop Counters */}
          <View className={`flex-row items-center w-full mb-7 gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {/* Attacker */}
            <View className="flex-1 items-center bg-[#16213e] rounded-2xl p-4">
              <Text className={`text-[#aaa] text-sm mb-1 ${isRTL ? 'text-right' : ''}`}>{t.attacker}</Text>
              <Text className="text-white text-5xl font-bold leading-tight">{attackerTroops}</Text>
              <Text className={`text-[#666] text-xs mb-3 ${isRTL ? 'text-right' : ''}`}>{t.troops}</Text>
              <View className="flex-row gap-2">
                <TouchableOpacity
                    className="w-9 h-9 rounded-full bg-[#2a2a4a] items-center justify-center"
                    onPress={() => setAttackerTroops(n => Math.max(2, n - 1))}
                    disabled={!!result}
                >
                  <Text className="text-white text-xl leading-6">−</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="w-9 h-9 rounded-full bg-[#2a2a4a] items-center justify-center"
                    onPress={() => setAttackerTroops(n => n + 1)}
                    disabled={!!result}
                >
                  <Text className="text-white text-xl leading-6">+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text className={`text-[#e94560] text-lg font-bold ${isRTL ? 'text-right' : ''}`}>{t.vs}</Text>

            {/* Defender */}
            <View className="flex-1 items-center bg-[#16213e] rounded-2xl p-4">
              <Text className={`text-[#aaa] text-sm mb-1 ${isRTL ? 'text-right' : ''}`}>{t.defender}</Text>
              <Text className="text-white text-5xl font-bold leading-tight">{defenderTroops}</Text>
              <Text className={`text-[#666] text-xs mb-3 ${isRTL ? 'text-right' : ''}`}>{t.troops}</Text>
              <View className="flex-row gap-2">
                <TouchableOpacity
                    className="w-9 h-9 rounded-full bg-[#2a2a4a] items-center justify-center"
                    onPress={() => setDefenderTroops(n => Math.max(1, n - 1))}
                    disabled={!!result}
                >
                  <Text className="text-white text-xl leading-6">−</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="w-9 h-9 rounded-full bg-[#2a2a4a] items-center justify-center"
                    onPress={() => setDefenderTroops(n => n + 1)}
                    disabled={!!result}
                >
                  <Text className="text-white text-xl leading-6">+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Dice selectors */}
          {!battleOver && (
              <>
                <View className="mb-4 items-center w-full">
                  <Text className={`text-[#aaa] text-base mb-2 ${isRTL ? 'text-right' : ''}`}>{t.attackerDice}</Text>
                  <View className="flex-row gap-3">
                    {[1, 2, 3].filter(n => n <= maxAttackerDice).map(n => (
                        <TouchableOpacity
                            key={n}
                            className={`w-12 h-12 rounded-full border-2 items-center justify-center ${
                                attackerCount === n
                                    ? 'border-[#e94560] bg-[#e9456022]'
                                    : 'border-[#444]'
                            }`}
                            onPress={() => setAttackerCount(n)}
                        >
                          <Text className="text-white text-lg font-bold">{n}</Text>
                        </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View className="mb-4 items-center w-full">
                  <Text className={`text-[#aaa] text-base mb-2 ${isRTL ? 'text-right' : ''}`}>{t.defenderDice}</Text>
                  <View className="flex-row gap-3">
                    {[1, 2].filter(n => n <= maxDefenderDice).map(n => (
                        <TouchableOpacity
                            key={n}
                            className={`w-12 h-12 rounded-full border-2 items-center justify-center ${
                                defenderCount === n
                                    ? 'border-[#4ecdc4] bg-[#4ecdc422]'
                                    : 'border-[#444]'
                            }`}
                            onPress={() => setDefenderCount(n)}
                        >
                          <Text className="text-white text-lg font-bold">{n}</Text>
                        </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </>
          )}

          {/* Roll / Reset */}
          {battleOver ? (
              <View className="items-center gap-4 mt-2 w-full">
                <Text className={`text-white text-2xl font-bold ${isRTL ? 'text-right' : ''}`}>
                  {defenderTroops <= 0 ? t.attackerWins : t.defenderWins}
                </Text>
                <TouchableOpacity
                    className="bg-[#2ecc71] w-full items-center py-4 rounded-full"
                    onPress={handleReset}
                >
                  <Text className="text-white text-xl font-bold">{t.newBattle}</Text>
                </TouchableOpacity>
              </View>
          ) : (
              <TouchableOpacity
                  className={`w-full items-center py-4 rounded-full mt-2 ${canRoll ? 'bg-[#e94560]' : 'bg-[#555]'}`}
                  onPress={handleRoll}
                  disabled={!canRoll}
              >
                <Text className="text-white text-xl font-bold">{t.roll}</Text>
              </TouchableOpacity>
          )}

          {/* Results */}
          {result && (
              <View className="mt-6 items-center w-full">
                <View className={`flex-row justify-around w-full mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <View className="items-center gap-1">
                    <Text className={`text-[#aaa] text-base ${isRTL ? 'text-right' : ''}`}>{t.attack}</Text>
                    {result.attacker.map((d, i) => (
                        <Text key={i} className="text-5xl">{getDiceFace(d)}</Text>
                    ))}
                  </View>
                  <View className="items-center gap-1">
                    <Text className={`text-[#aaa] text-base ${isRTL ? 'text-right' : ''}`}>{t.defense}</Text>
                    {result.defender.map((d, i) => (
                        <Text key={i} className="text-5xl">{getDiceFace(d)}</Text>
                    ))}
                  </View>
                </View>

                <View className="gap-2 items-center">
                  {result.defenderLosses > 0 && (
                      <Text className={`text-[#ff6b6b] text-base font-bold ${isRTL ? 'text-right' : ''}`}>
                        {t.defenderLoses(result.defenderLosses)}
                      </Text>
                  )}
                  {result.attackerLosses > 0 && (
                      <Text className={`text-[#4ecdc4] text-base font-bold ${isRTL ? 'text-right' : ''}`}>
                        {t.attackerLoses(result.attackerLosses)}
                      </Text>
                  )}
                </View>
              </View>
          )}
        </ScrollView>
      </SafeAreaView>
  );
}