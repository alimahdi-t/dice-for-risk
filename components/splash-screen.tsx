import { useEffect, useRef } from "react";
import { Animated, StyleSheet, ImageBackground } from "react-native";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export function AnimatedSplash({ onFinish }: { onFinish: () => void }) {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    SplashScreen.hideAsync();

    Animated.sequence([
      Animated.delay(3000), // show splash for 3 seconds
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => onFinish());
  });

  return (
    <Animated.View
      style={[StyleSheet.absoluteFillObject, { opacity, zIndex: 999 }]}
    >
      <ImageBackground
        source={require("@/assets/images/splash.png")}
        style={{
          width: "100%",
          height: "100%",
        }}
        resizeMode="cover"
      />
    </Animated.View>
  );
}