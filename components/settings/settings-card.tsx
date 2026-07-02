import { View } from "react-native";

export default function SettingsCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <View className="overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950">
      {children}
    </View>
  );
}