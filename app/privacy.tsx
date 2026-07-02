import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { useSettings } from "@/context/settings-context";
import { translations } from "@/i18n";
import { router } from "expo-router";
import { styled } from "react-native-css";

const SafeAreaView = styled(RNSafeAreaView);

export default function Privacy() {
  const { language } = useSettings();

  const t = translations[language];
  const isRTL = language === "fa";

  return (
    <SafeAreaView
      className="flex-1 bg-white dark:bg-black"
      edges={["left", "right", "top"]}
      style={{ paddingHorizontal: 20 }}
    >
      {/* Header */}
      <View
        className={`mb-6 flex-row items-center ${
          isRTL ? "flex-row-reverse" : ""
        }`}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          className="mr-4 rounded-full p-2"
        >
          <Text className="text-3xl text-black dark:text-white">
            {isRTL ? "›" : "‹"}
          </Text>
        </TouchableOpacity>

        <Text
          className={`text-3xl font-bold text-black dark:text-white ${
            isRTL ? "text-right" : ""
          }`}
        >
          {t.privacyPage.title}
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {t.privacyPage.content.map((item, index) => (
          <Text
            key={index}
            className={`mb-4 text-base text-black dark:text-white ${
              isRTL ? "text-right" : ""
            }`}
          >
            • {item}
          </Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}