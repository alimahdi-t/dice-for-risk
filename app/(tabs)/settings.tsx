import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import {View, Text, TouchableOpacity, Switch, ScrollView} from "react-native";
import { styled } from "react-native-css";
import { useState } from "react";

const SafeAreaView = styled(RNSafeAreaView);

export default function Settings() {
    const [sound, setSound] = useState(true);
    const [vibration, setVibration] = useState(true);
    const [language, setLanguage] = useState<"en" | "fa">("en");
    const [theme, setTheme] = useState<"dark" | "light">("dark");

    const isDark = theme === "dark";

    const bg = isDark ? "bg-black" : "bg-white";
    const card = isDark ? "bg-zinc-950" : "bg-zinc-100";
    const border = isDark ? "border-zinc-800" : "border-zinc-200";
    const text = isDark ? "text-white" : "text-black";
    const subtext = isDark ? "text-zinc-500" : "text-zinc-600";
    const chevron = isDark ? "text-zinc-600" : "text-zinc-400";

    return (
        <SafeAreaView className={`flex-1 p-5 ${bg}`}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <Text className={`mb-8 text-4xl font-bold ${text}`}>
                    Settings
                </Text>

                {/* GAME */}
                <View className="mb-6">
                    <Text className={`mb-3 text-xs uppercase tracking-[3px] ${subtext}`}>
                        GAME
                    </Text>

                    <View className={`overflow-hidden rounded-3xl border ${border} ${card}`}>
                        {/* Sound */}
                        <View className={`flex-row items-center justify-between border-b ${border} px-5 py-5`}>
                            <View>
                                <Text className={`text-lg font-semibold ${text}`}>
                                    Sound Effects
                                </Text>
                                <Text className={`mt-1 text-sm ${subtext}`}>
                                    Dice rolling sounds
                                </Text>
                            </View>

                            <Switch
                                value={sound}
                                onValueChange={setSound}
                            />
                        </View>

                        {/* Vibration */}
                        <View className="flex-row items-center justify-between px-5 py-5">
                            <View>
                                <Text className={`text-lg font-semibold ${text}`}>
                                    Vibration
                                </Text>
                                <Text className={`mt-1 text-sm ${subtext}`}>
                                    Haptic feedback
                                </Text>
                            </View>

                            <Switch
                                value={vibration}
                                onValueChange={setVibration}
                            />
                        </View>
                    </View>
                </View>

                {/* APPEARANCE */}
                <View className="mb-6">
                    <Text className={`mb-3 text-xs uppercase tracking-[3px] ${subtext}`}>
                        APPEARANCE
                    </Text>

                    <View className={`rounded-3xl border p-2 ${border} ${card}`}>
                        <View className={`flex-row rounded-2xl ${isDark ? "bg-black" : "bg-white"}`}>

                            {/* Dark */}
                            <TouchableOpacity
                                onPress={() => setTheme("dark")}
                                className={`flex-1 rounded-2xl py-4 ${
                                    theme === "dark"
                                        ? "bg-white"
                                        : "bg-transparent"
                                }`}
                            >
                                <Text
                                    className={`text-center font-semibold ${
                                        theme === "dark"
                                            ? "text-black"
                                            : text
                                    }`}
                                >
                                    Dark
                                </Text>
                            </TouchableOpacity>

                            {/* Light */}
                            <TouchableOpacity
                                onPress={() => setTheme("light")}
                                className={`flex-1 rounded-2xl py-4 ${
                                    theme === "light"
                                        ? "bg-black"
                                        : "bg-transparent"
                                }`}
                            >
                                <Text
                                    className={`text-center font-semibold ${
                                        theme === "light"
                                            ? "text-white"
                                            : text
                                    }`}
                                >
                                    Light
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>

                {/* LANGUAGE */}
                <View className="mb-6">
                    <Text className={`mb-3 text-xs uppercase tracking-[3px] ${subtext}`}>
                        LANGUAGE
                    </Text>

                    <View className={`rounded-3xl border p-2 ${border} ${card}`}>
                        <View className={`flex-row rounded-2xl ${isDark ? "bg-black" : "bg-white"}`}>

                            {/* English */}
                            <TouchableOpacity
                                onPress={() => setLanguage("en")}
                                className={`flex-1 rounded-2xl py-4 ${
                                    language === "en"
                                        ? isDark
                                            ? "bg-white"
                                            : "bg-black"
                                        : "bg-transparent"
                                }`}
                            >
                                <Text
                                    className={`text-center font-semibold ${
                                        language === "en"
                                            ? isDark
                                                ? "text-black"
                                                : "text-white"
                                            : text
                                    }`}
                                >
                                    English
                                </Text>
                            </TouchableOpacity>

                            {/* Persian */}
                            <TouchableOpacity
                                onPress={() => setLanguage("fa")}
                                className={`flex-1 rounded-2xl py-4 ${
                                    language === "fa"
                                        ? isDark
                                            ? "bg-white"
                                            : "bg-black"
                                        : "bg-transparent"
                                }`}
                            >
                                <Text
                                    className={`text-center font-semibold ${
                                        language === "fa"
                                            ? isDark
                                                ? "text-black"
                                                : "text-white"
                                            : text
                                    }`}
                                >
                                    فارسی
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>

                {/* ABOUT */}
                <View>
                    <Text className={`mb-3 text-xs uppercase tracking-[3px] ${subtext}`}>
                        ABOUT
                    </Text>

                    <View className={`overflow-hidden rounded-3xl border ${border} ${card}`}>

                        <TouchableOpacity className={`flex-row items-center justify-between border-b ${border} px-5 py-5`}>
                            <Text className={`text-lg ${text}`}>
                                Rules
                            </Text>

                            <Text className={`text-2xl ${chevron}`}>
                                ›
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity className={`flex-row items-center justify-between border-b ${border} px-5 py-5`}>
                            <Text className={`text-lg ${text}`}>
                                Privacy
                            </Text>

                            <Text className={`text-2xl ${chevron}`}>
                                ›
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity className="flex-row items-center justify-between px-5 py-5">
                            <Text className={`text-lg ${text}`}>
                                Version
                            </Text>

                            <Text className={subtext}>
                                1.0.0
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>

                {/* Footer */}
                <Text className={`my-6 text-center text-sm ${subtext}`}>
                    Risk Dice Roller
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}