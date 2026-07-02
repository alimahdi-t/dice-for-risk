// context/settings-context.tsx

import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type Theme = "light" | "dark";
export type Language = "en" | "fa";

export type Settings = {
  theme: Theme;
  language: Language;
  sound: boolean;
  vibration: boolean;
};

type SettingsContextType = Settings & {
  loading: boolean;

  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;
  setSound: (sound: boolean) => void;
  setVibration: (vibration: boolean) => void;

  resetSettings: () => void;
};

const STORAGE_KEY = "app_settings";

const DEFAULT_SETTINGS: Settings = {
  theme: "dark",
  language: "en",
  sound: true,
  vibration: true,
};

const SettingsContext = createContext<SettingsContextType>(
  {} as SettingsContextType,
);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  const [loading, setLoading] = useState(true);

  /**
   * Load saved settings
   */
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY);

      if (json) {
        const saved = JSON.parse(json);

        setSettings({
          theme: saved.theme ?? DEFAULT_SETTINGS.theme,
          language: saved.language ?? DEFAULT_SETTINGS.language,
          sound: saved.sound ?? DEFAULT_SETTINGS.sound,
          vibration: saved.vibration ?? DEFAULT_SETTINGS.vibration,
        });
      }
    } catch (error) {
      console.log("Failed to load settings", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Automatically save whenever settings change
   */
  useEffect(() => {
    if (loading) return;

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settings)).catch(
      console.error,
    );
  }, [settings, loading]);

  /**
   * Individual setters
   */
  const setTheme = (theme: Theme) =>
    setSettings((prev) => ({
      ...prev,
      theme,
    }));

  const setLanguage = (language: Language) =>
    setSettings((prev) => ({
      ...prev,
      language,
    }));

  const setSound = (sound: boolean) =>
    setSettings((prev) => ({
      ...prev,
      sound,
    }));

  const setVibration = (vibration: boolean) =>
    setSettings((prev) => ({
      ...prev,
      vibration,
    }));

  /**
   * Reset all settings
   */
  const resetSettings = () => setSettings(DEFAULT_SETTINGS);

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        loading,

        setTheme,
        setLanguage,
        setSound,
        setVibration,

        resetSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);