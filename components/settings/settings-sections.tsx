import { View, Text } from "react-native";

type Props = {
  title: string;
  isRTL?: boolean;
  children: React.ReactNode;
};

export default function SettingsSection({ title, isRTL, children }: Props) {
  return (
    <View className="mt-6">
      <Text
        className={`
          mb-3
          w-full
          text-xs
          uppercase
          tracking-[3px]
          text-zinc-600
          dark:text-zinc-500
          ${isRTL ? "text-right" : "text-left"}
        `}
      >
        {title}
      </Text>

      {children}
    </View>
  );
}