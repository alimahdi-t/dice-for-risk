import React from "react";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useSettings } from "@/context/settings-context";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const { language, theme } = useSettings();

  // Lang
  // const t = translations[language];
  const isRTL = language === "fa";

  // Theme
  const isDark = theme === "dark";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarButton: HapticTab,

        tabBarActiveTintColor: isDark ? "#ffffff" : "#000000",

        tabBarInactiveTintColor: isDark ? "#71717a" : "#9ca3af",

        tabBarStyle: {
          backgroundColor: isDark ? "#000" : "#fff",
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
        },

        sceneStyle: {
          backgroundColor: isDark ? "#000000" : "#ffffff",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",

          tabBarIcon: ({ color }) => (
            <IconSymbol size={24} name="house.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",

          tabBarIcon: ({ color }) => (
            <IconSymbol size={24} name="gearshape.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}