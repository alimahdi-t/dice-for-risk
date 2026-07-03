import {
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { styled } from "react-native-css";

import { useSettings } from "@/context/settings-context";
import { getTranslations } from "@/i18n";

import SettingsSection from "@/components/settings/settings-sections";
import SettingsCard from "@/components/settings/settings-card";
import AboutRow from "@/components/settings/about-row";
import { router } from "expo-router";

const SafeAreaView = styled(RNSafeAreaView);

export default function ContactScreen() {
  const { language } = useSettings();

  const t = getTranslations(language).contact;
  const isRTL = language === "fa";

  const openEmail = () => {
    Linking.openURL("seyyedalimehdi@gmail.com");
  };

  const openGithub = () => {
    Linking.openURL("https://github.com/alimahdi-t");
  };

  const openPortfolio = () => {
    Linking.openURL("https://your-website.com");
  };

  return (
    <SafeAreaView
      className="flex-1 pt-4 bg-white dark:bg-black"
      edges={["left", "right", "top"]}
      style={{ paddingHorizontal: 20 }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        {/* Header */}
        <View
          className={`mb-8 flex-row items-center ${
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
            {t.title}
          </Text>
        </View>

        {/* Contact */}
        <SettingsSection title={t.contact} isRTL={isRTL}>
          <SettingsCard>
            <AboutRow
              title={t.email}
              value="your-email@example.com"
              border
              isRTL={isRTL}
              onPress={openEmail}
            />

            <AboutRow
              title={t.github}
              value="alimahdi-t"
              border
              isRTL={isRTL}
              onPress={openGithub}
            />

            <AboutRow
              title={t.website}
              value="https://alimahdi-portfolio.vercel.app/"
              isRTL={isRTL}
              onPress={openPortfolio}
            />
          </SettingsCard>
        </SettingsSection>

        {/* Footer */}
        <Text className="my-8 text-center text-sm text-zinc-600 dark:text-zinc-500">
          {t.footer}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}