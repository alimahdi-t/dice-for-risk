import { View, Text } from "react-native";

type RollResult = {
  attacker: number[];
  defender: number[];
  attackerLosses: number;
  defenderLosses: number;
};

type Props = {
  result: RollResult;
  attackLabel: string;
  defenseLabel: string;
  attackerLosesText: string | null;
  defenderLosesText: string | null;
  isRTL?: boolean;
};

export default function ResultPanel({
  result,
  attackLabel,
  defenseLabel,
  attackerLosesText,
  defenderLosesText,
  isRTL = false,
}: Props) {
  return (
    <View className="mt-6 w-full rounded-3xl border border-zinc-200 bg-zinc-100 p-5 dark:border-zinc-800 dark:bg-zinc-950">
      {/* Dice */}
      <View
        className={`flex-row justify-around ${isRTL ? "flex-row-reverse" : ""}`}
      >
        {/* Attacker */}
        <View className="items-center">
          <Text className="mb-2 text-base text-zinc-600 dark:text-zinc-500">
            {attackLabel}
          </Text>

          <View className="flex-row gap-1">
            {result.attacker.map((d, i) => (
              <View
                key={i}
                className="h-14 w-14 items-center justify-center rounded-2xl border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-900"
              >
                <Text className="text-2xl font-bold text-black dark:text-white">
                  {d}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Defender */}
        <View className="items-center">
          <Text className="mb-2 text-base text-zinc-600 dark:text-zinc-500">
            {defenseLabel}
          </Text>

          <View className="flex-row gap-1">
            {result.defender.map((d, i) => (
              <View
                key={i}
                className="h-14 w-14 items-center justify-center rounded-2xl border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-900"
              >
                <Text className="text-2xl font-bold text-black dark:text-white">
                  {d}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Losses */}
      <View className="mt-5 items-center gap-2">
        {defenderLosesText && (
          <Text className="text-base font-semibold text-black dark:text-white">
            {defenderLosesText}
          </Text>
        )}

        {attackerLosesText && (
          <Text className="text-base font-semibold text-black dark:text-white">
            {attackerLosesText}
          </Text>
        )}
      </View>
    </View>
  );
}