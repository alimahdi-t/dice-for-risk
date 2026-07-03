import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { Text, Switch, ScrollView } from "react-native";
import { styled } from "react-native-css";
import { useSettings } from "@/context/settings-context";
import SettingsSection from "@/components/settings/settings-sections";
import SettingsSegment from "@/components/settings/settings-segments";
import SettingsCard from "@/components/settings/settings-card";
import SettingsRow from "@/components/settings/settings-row";
import AboutRow from "@/components/settings/about-row";
import { getTranslations } from "@/i18n";
import { router } from "expo-router";

const SafeAreaView = styled(RNSafeAreaView);

export default function Settings() {
  const {
    sound,
    setSound,
    vibration,
    setVibration,
    language,
    setLanguage,
    theme,
    setTheme,
  } = useSettings();

  const t = getTranslations(language).settings;
  const isRTL = language === "fa";

  return (
    <SafeAreaView
      className={`flex-1  pt-12 bg-white dark:bg-black`}
      edges={["left", "right", "top"]}
      style={{ paddingHorizontal: 20 }}
    >
      <ScrollView
        className="pb-4"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-between",
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Text
          className={`text-4xl font-bold text-black dark:text-white ${
            isRTL ? "text-right" : ""
          }`}
        >
          {t.title}
        </Text>

        <SettingsSection title={t.game} isRTL={isRTL}>
          <SettingsCard>
            <SettingsRow
              title={t.sound}
              subtitle={t.soundDesc}
              border
              isRTL={isRTL}
              right={<Switch value={sound} onValueChange={setSound} />}
            />

            <SettingsRow
              title={t.vibration}
              subtitle={t.vibrationDesc}
              isRTL={isRTL}
              right={<Switch value={vibration} onValueChange={setVibration} />}
            />
          </SettingsCard>
        </SettingsSection>

        <SettingsSection title={t.appearance} isRTL={isRTL}>
          <SettingsSegment
            value={theme}
            onChange={setTheme}
            options={[
              {
                label: t.dark,
                value: "dark",
              },
              {
                label: t.light,
                value: "light",
              },
            ]}
          />
        </SettingsSection>

        <SettingsSection title={t.language} isRTL={isRTL}>
          <SettingsSegment
            value={language}
            onChange={setLanguage}
            options={[
              {
                label: t.english,
                value: "en",
              },
              {
                label: t.persian,
                value: "fa",
              },
            ]}
          />
        </SettingsSection>

        <SettingsSection title={t.about} isRTL={isRTL}>
          <SettingsCard>
            <AboutRow
              title={t.rules}
              border
              isRTL={isRTL}
              onPress={() => router.push("/rules")}
            />

            <AboutRow
              title={t.privacy}
              border
              isRTL={isRTL}
              onPress={() => router.push("/privacy")}
            />

            <AboutRow
              title={t.contact}
              border
              isRTL={isRTL}
              onPress={() => router.push("/contact")}
            />

            <AboutRow title={t.version} value="1.0.0" isRTL={isRTL} />
          </SettingsCard>
        </SettingsSection>

        {/* Footer */}
        <Text className="my-6 text-center text-sm text-zinc-600 dark:text-zinc-500">
          {t.footer}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}