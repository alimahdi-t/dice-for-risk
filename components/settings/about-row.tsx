import { Text, TouchableOpacity } from "react-native";

type Props = {
  title: string;
  value?: string;
  border?: boolean;
  isRTL?: boolean;
  onPress?: () => void;
};

export default function AboutRow({
  title,
  value,
  border = false,
  isRTL = false,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      className={`
        flex-row
        items-center
        justify-between
        px-5
        py-5
        ${border ? "border-b border-zinc-200 dark:border-zinc-800" : ""}
        ${isRTL ? "flex-row-reverse" : ""}
      `}
    >
      <Text className="text-lg text-black dark:text-white">{title}</Text>

      {value ? (
        <Text className="text-zinc-600 dark:text-zinc-500">{value}</Text>
      ) : (
        <Text className="text-2xl text-zinc-400 dark:text-zinc-600">
          {isRTL ? "‹" : "›"}
        </Text>
      )}
    </TouchableOpacity>
  );
}