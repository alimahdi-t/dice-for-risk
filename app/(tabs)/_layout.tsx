import React from "react";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useSettings } from "@/context/settings-context";
import { getTranslations } from "@/i18n";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const { language, theme } = useSettings();

  const t = getTranslations(language).tabs;
  const isDark = theme === "dark";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarButton: HapticTab,

        tabBarActiveTintColor: isDark ? "#ffffff" : "#000000",

        tabBarInactiveTintColor: isDark ? "#71717a" : "#9ca3af",

        tabBarStyle: {
          backgroundColor: isDark ? "#000000" : "#ffffff",
          borderTopColor: isDark ? "#27272a" : "#e5e7eb",
          borderTopWidth: 1,

          height: 60 + insets.bottom,
          paddingTop: 8,
          paddingBottom: Math.max(8, insets.bottom),

          elevation: 0,
          shadowOpacity: 0,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginBottom: 4,
        },

        sceneStyle: {
          backgroundColor: isDark ? "#000000" : "#ffffff",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t.game,
          tabBarIcon: ({ color }) => (
            <IconSymbol name="dice.fill" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="blitz"
        options={{
          title: t.blitz,
          tabBarIcon: ({ color }) => (
            <IconSymbol name="bolt.fill" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: t.settings,
          tabBarIcon: ({ color }) => (
            <IconSymbol name="gearshape.fill" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}