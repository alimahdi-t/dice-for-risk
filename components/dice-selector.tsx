import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "@/context/theme-context";

type DiceSelectorProps = {
  title: string;
  options: number[];
  selected: number;
  max: number;
  onSelect: (value: number) => void;
  isRTL?: boolean;
};

export default function DiceSelector({
  title,
  options,
  selected,
  max,
  onSelect,
  isRTL = false,
}: DiceSelectorProps) {
  const { theme } = useTheme();

  const isDark = theme === "dark";

  const text = isDark ? "text-white" : "text-black";

  const subtext = isDark ? "text-zinc-500" : "text-zinc-600";

  const border = isDark ? "border-zinc-800" : "border-zinc-300";

  const selectedBg = isDark ? "bg-white border-white" : "bg-black border-black";

  const selectedText = isDark ? "text-black" : "text-white";

  return (
    <View className="mb-6 items-center w-full">
      <Text
        className={`mb-3 text-base ${subtext} ${isRTL ? "text-right" : ""}`}
      >
        {title}
      </Text>

      <View className="flex-row gap-3">
        {options
          .filter((n) => n <= max)
          .map((n) => {
            const active = selected === n;

            return (
              <TouchableOpacity
                key={n}
                onPress={() => onSelect(n)}
                className={`
                  h-12 w-12
                  items-center
                  justify-center
                  rounded-full
                  border-2
                  ${active ? selectedBg : border}
                `}
              >
                <Text
                  className={`
                    text-lg
                    font-bold
                    ${active ? selectedText : text}
                  `}
                >
                  {n}
                </Text>
              </TouchableOpacity>
            );
          })}
      </View>
    </View>
  );
}