import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import { styled } from "react-native-css";
import { useState } from "react";

const SafeAreaView = styled(RNSafeAreaView);

export default function Settings() {
    const [sound, setSound] = useState(true);
    const [vibration, setVibration] = useState(true);

    return (
        <SafeAreaView className="flex-1 bg-black p-5">
            {/* Header */}
            <Text className="mb-8 text-4xl font-bold text-white">
                Settings
            </Text>

            {/* Game */}
            <View className="mb-6">
                <Text className="mb-3 text-xs uppercase tracking-[3px] text-zinc-500">
                    GAME
                </Text>

                <View className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950">
                    {/* Sound */}
                    <View className="flex-row items-center justify-between border-b border-zinc-800 px-5 py-5">
                        <View>
                            <Text className="text-lg font-semibold text-white">
                                Sound Effects
                            </Text>
                            <Text className="mt-1 text-sm text-zinc-500">
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
                            <Text className="text-lg font-semibold text-white">
                                Vibration
                            </Text>
                            <Text className="mt-1 text-sm text-zinc-500">
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

            {/* Appearance */}
            <View className="mb-6">
                <Text className="mb-3 text-xs uppercase tracking-[3px] text-zinc-500">
                    APPEARANCE
                </Text>

                <View className="rounded-3xl border border-zinc-800 bg-zinc-950">
                    <TouchableOpacity className="flex-row items-center justify-between px-5 py-5">
                        <View>
                            <Text className="text-lg font-semibold text-white">
                                Theme
                            </Text>
                            <Text className="mt-1 text-sm text-zinc-500">
                                Dark
                            </Text>
                        </View>

                        <Text className="text-2xl text-zinc-600">
                            ›
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* About */}
            <View>
                <Text className="mb-3 text-xs uppercase tracking-[3px] text-zinc-500">
                    ABOUT
                </Text>

                <View className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950">
                    <TouchableOpacity className="flex-row items-center justify-between border-b border-zinc-800 px-5 py-5">
                        <Text className="text-lg text-white">
                            Rules
                        </Text>

                        <Text className="text-2xl text-zinc-600">
                            ›
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="flex-row items-center justify-between border-b border-zinc-800 px-5 py-5">
                        <Text className="text-lg text-white">
                            Privacy
                        </Text>

                        <Text className="text-2xl text-zinc-600">
                            ›
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="flex-row items-center justify-between px-5 py-5">
                        <Text className="text-lg text-white">
                            Version
                        </Text>

                        <Text className="text-zinc-500">
                            1.0.0
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Footer */}
            <Text className="mt-auto mb-6 text-center text-sm text-zinc-600">
                Risk Dice Roller
            </Text>
        </SafeAreaView>
    );
}