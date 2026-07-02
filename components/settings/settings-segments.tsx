import { View, Text, TouchableOpacity } from "react-native";

type Option = {
  label: string;
  value: string;
};

type Props = {
  value: string;
  options: Option[];
  onChange: (value: any) => void;
};

export default function SettingsSegment({ value, options, onChange }: Props) {
  return (
    <View className="rounded-3xl border border-zinc-200 bg-zinc-100 p-2 dark:border-zinc-800 dark:bg-zinc-950">
      <View className="flex-row rounded-2xl bg-white dark:bg-black">
        {options.map((option) => {
          const active = value === option.value;

          return (
            <TouchableOpacity
              key={option.value}
              onPress={() => onChange(option.value)}
              className={`flex-1 rounded-2xl py-4 ${
                active ? "bg-black dark:bg-white" : "bg-transparent"
              }`}
            >
              <Text
                className={`text-center font-semibold ${
                  active
                    ? "text-white dark:text-black"
                    : "text-black dark:text-white"
                }`}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}