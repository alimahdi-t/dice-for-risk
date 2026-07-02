import { View, Text, TouchableOpacity } from "react-native";

import { useSettings } from "@/context/settings-context";

type TroopCardProps = {
  title: string;
  troops: number;
  troopsLabel: string;
  isRTL?: boolean;
  disabled?: boolean;
  min: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

export default function TroopCard({
  title,
  troops,
  troopsLabel,
  isRTL = false,
  disabled = false,
  min,
  onIncrease,
  onDecrease,
}: TroopCardProps) {
  const { theme } = useSettings();

  const isDark = theme === "dark";

  const card = isDark
    ? "bg-zinc-950 border-zinc-800"
    : "bg-zinc-100 border-zinc-200";

  const text = isDark ? "text-white" : "text-black";

  const subtext = isDark ? "text-zinc-500" : "text-zinc-600";

  const button = isDark
    ? "bg-black border-zinc-800"
    : "bg-white border-zinc-200";

  return (
    <View className={`flex-1 items-center rounded-2xl border p-4 ${card}`}>
      {/* Title */}
      <Text className={`mb-1 text-sm ${subtext} ${isRTL ? "text-right" : ""}`}>
        {title}
      </Text>

      {/* Number */}
      <Text className={`text-5xl font-bold leading-tight ${text}`}>
        {troops}
      </Text>

      {/* Label */}
      <Text className={`mb-4 text-xs ${subtext} ${isRTL ? "text-right" : ""}`}>
        {troopsLabel}
      </Text>

      {/* Controls */}
      <View className="flex-row gap-2">
        <TouchableOpacity
          disabled={disabled}
          onPress={onDecrease}
          className={`h-10 w-10 items-center justify-center rounded-full border ${button}`}
        >
          <Text className={`text-xl ${text}`}>−</Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={disabled}
          onPress={onIncrease}
          className={`h-10 w-10 items-center justify-center rounded-full border ${button}`}
        >
          <Text className={`text-xl ${text}`}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}