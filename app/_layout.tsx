import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "./global.css";
import { SettingsProvider, useSettings } from "@/context/settings-context";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

function ThemeSync() {
  const { theme } = useSettings();
  const { colorScheme, setColorScheme } = useColorScheme();

  useEffect(() => {
    // console.log("syncing", theme);
    if (colorScheme !== theme) {
      setColorScheme(theme);
    }
  }, [theme, colorScheme]);
  // console.log("nativewind:", colorScheme);

  return null;
}

function AppLayout() {
  const { theme } = useSettings();

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="rules" options={{ headerShown: false }} />
        <Stack.Screen name="privacy" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{
            presentation: "modal",
            title: "Modal",
          }}
        />
      </Stack>

      <StatusBar style={theme === "dark" ? "light" : "dark"} />
    </>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SettingsProvider>
        <ThemeSync />
        <AppLayout />
      </SettingsProvider>
    </SafeAreaProvider>
  );
}