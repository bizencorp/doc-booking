import { ClerkProvider, SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { SafeAreaView, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import Login from "./Login";

import { StatusBar } from "expo-status-bar";
import { Colors } from "@/constants/Colors";
import { TamaguiProvider } from "tamagui";

import tamaguiConfig from "../tamagui.config";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    InterLight: require("@tamagui/font-inter/otf/Inter-Light.otf"),
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterRegular: require("@tamagui/font-inter/otf/Inter-Regular.otf"),
    InterSemiBold: require("@tamagui/font-inter/otf/Inter-SemiBold.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  if (!publishableKey) {
    throw new Error(
      "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
    );
  }

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      <TamaguiProvider config={tamaguiConfig}>
        <SafeAreaView style={styles.container}>
          <SignedIn>
            <Stack
              screenOptions={{
                animation: "ios",
                headerShown: false,
              }}
            >
              <Stack.Screen name="(tabs)" />
              <Stack.Screen
                name="HospitalDoctorList"
                options={{
                  contentStyle: { backgroundColor: Colors.border },
                }}
              />
              <Stack.Screen
                name="HospitalDetail"
                options={{
                  contentStyle: { backgroundColor: Colors.background },
                }}
              />
              <Stack.Screen
                name="DoctorDetail"
                options={{
                  contentStyle: { backgroundColor: Colors.background },
                }}
              />
              <Stack.Screen
                name="BookAppointment"
                options={{
                  contentStyle: { backgroundColor: Colors.border },
                }}
              />
              <Stack.Screen
                name="ProfileEdit"
                options={{
                  contentStyle: { backgroundColor: Colors.background },
                }}
              />
              <Stack.Screen
                name="HospitalsDocs"
                options={{
                  contentStyle: { backgroundColor: Colors.background },
                }}
              />
              <Stack.Screen
                name="EditBooking"
                options={{
                  contentStyle: { backgroundColor: Colors.border },
                }}
              />
            </Stack>
          </SignedIn>
          <SignedOut>
            <Login />
          </SignedOut>
          <StatusBar style="dark" />
        </SafeAreaView>
      </TamaguiProvider>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
