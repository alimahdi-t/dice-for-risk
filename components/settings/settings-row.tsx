import { View, Text } from "react-native";

type Props = {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  border?: boolean;
  isRTL?: boolean;
};

export default function SettingsRow({
  title,
  subtitle,
  right,
  border = false,
  isRTL,
}: Props) {
  return (
    <View
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
      <View>
        <Text
          className={`
            text-lg
            font-semibold
            text-black
            dark:text-white
            ${isRTL ? "text-right" : ""}
          `}
        >
          {title}
        </Text>

        {subtitle && (
          <Text
            className={`
              mt-1
              text-sm
              text-zinc-600
              dark:text-zinc-500
              ${isRTL ? "text-right" : ""}
            `}
          >
            {subtitle}
          </Text>
        )}
      </View>

      {right}
    </View>
  );
}