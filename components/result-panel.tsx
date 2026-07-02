import { View, Text } from "react-native";
import { useTheme } from "@/context/theme-context";

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

const getDiceFace = (n: number) => ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"][n - 1];

export default function ResultPanel({
  result,
  attackLabel,
  defenseLabel,
  attackerLosesText,
  defenderLosesText,
  isRTL = false,
}: Props) {
  const { theme } = useTheme();

  const isDark = theme === "dark";

  const card = isDark
    ? "bg-zinc-950 border-zinc-800"
    : "bg-zinc-100 border-zinc-200";

  const text = isDark ? "text-white" : "text-black";

  const subtext = isDark ? "text-zinc-500" : "text-zinc-600";

  return (
    <View className={`mt-6 w-full rounded-3xl border p-5 ${card}`}>
      {/* Dice */}
      <View
        className={`flex-row justify-around ${isRTL ? "flex-row-reverse" : ""}`}
      >
        {/* Attacker */}
        <View className="items-center">
          <Text className={`mb-2 text-base ${subtext}`}>{attackLabel}</Text>

          <View className="flex-row gap-1">
            {result.attacker.map((d, i) => (
              <View
                key={i}
                className={`
    h-14
    w-14
    items-center
    justify-center
    rounded-2xl
    border
    ${isDark ? "border-zinc-700 bg-zinc-900" : "border-zinc-300 bg-white"}
  `}
              >
                <Text
                  className={`
      text-2xl
      font-bold
      ${isDark ? "text-white" : "text-black"}
    `}
                >
                  {d}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Defender */}
        <View className="items-center">
          <Text className={`mb-2 text-base ${subtext}`}>{defenseLabel}</Text>

          <View className="flex-row gap-1">
            {result.defender.map((d, i) => (
              <View
                key={i}
                className={`
    h-14
    w-14
    items-center
    justify-center
    rounded-2xl
    border
    ${isDark ? "border-zinc-700 bg-zinc-900" : "border-zinc-300 bg-white"}
  `}
              >
                <Text
                  className={`
      text-2xl
      font-bold
      ${isDark ? "text-white" : "text-black"}
    `}
                >
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
          <Text className={`text-base font-semibold ${text}`}>
            {defenderLosesText}
          </Text>
        )}

        {attackerLosesText && (
          <Text className={`text-base font-semibold ${text}`}>
            {attackerLosesText}
          </Text>
        )}
      </View>
    </View>
  );
}