import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { ToastProvider } from "react-native-toast-notifications";
import { useState } from "react";

import Colors from "@/constants/Colors";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import nextScreenBasedAuth from "@/util/handler/nextScreenBasedAuth";
import { StatusBar } from "expo-status-bar";
import { getStorage } from "@/util/common";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MenuProvider } from "react-native-popup-menu";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  //Ensure that reloading on `modal` keeps a background component
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  const router = useRouter();
  const [initialized, setInitialized] = useState(false);

  const [loaded, error] = useFonts({
    bold: require("../assets/fonts/bold.ttf"),
    light: require("../assets/fonts/light.ttf"),
    normal: require("../assets/fonts/normal.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    async function initialize() {
      setInitialized(true);
    }

    initialize();
  }, []);

  useEffect(() => {
    if (initialized && loaded) {
      SplashScreen.hideAsync();
      // Ensure that initialization is complete before navigating
      handleNavigation();
    }
  }, [initialized, loaded]);

  const handleNavigation = async () => {
    const userLoggedIn = await getStorage();
    console.log(userLoggedIn);

    if (userLoggedIn.token) {
      nextScreenBasedAuth(userLoggedIn, router);
    } else {
      // User is not signed in, navigate to login screen
      router.navigate("/");
    }
  };

  if (!initialized) {
    // Initialization is in progress, return null or loading indicator
    return <View />;
  }

  return (
    <>
      <StatusBar style="light" backgroundColor={Colors.bgColor} />
      {/* <SafeAreaProvider
        style={{ backgroundColor: Colors.bgColor, paddingTop: 50 }}
      > */}
      <ToastProvider>
        <MenuProvider>
          <RootLayoutNav />
        </MenuProvider>
      </ToastProvider>
      {/* </SafeAreaProvider> */}
    </>
  );
}

function RootLayoutNav() {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerBackVisible: false,
          headerTitle: "Welcome to FPR Inkotanyi",
          headerTitleStyle: {
            color: Colors.textColor,
          },
          headerStyle: {
            backgroundColor: Colors.bgColor,
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="login/index"
        options={{
          headerBackVisible: false,
          headerTitle: "Welcome to FPR Inkotanyi",
          headerTitleStyle: {
            color: Colors.textColor,
          },
          headerStyle: {
            backgroundColor: Colors.bgColor,
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="register/index"
        options={{
          headerBackTitleVisible: false,
          headerTitle: "Create Account",
          headerStyle: {
            backgroundColor: Colors.bgColor,
          },
          headerTitleStyle: {
            color: Colors.textColor,
          },
          headerShadowVisible: false,
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons
                  name="close"
                  style={styles.iconClose}
                  color={Colors.textColor}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Stack.Screen
        name="address/[accountID]"
        options={{
          headerBackTitleVisible: false,
          headerTitle: "Tell us your address",
          headerStyle: {
            backgroundColor: Colors.bgColor,
          },
          headerTitleStyle: {
            color: Colors.textColor,
          },
          headerShadowVisible: false,
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons
                  name="close"
                  style={styles.iconClose}
                  color={Colors.textColor}
                />
              </TouchableOpacity>
            );
          },
        }}
      />

      <Stack.Screen
        name="nationality"
        options={{
          presentation: "modal",
          headerBackTitleVisible: false,
          headerTitle: "What is your nationality?",
          headerStyle: {
            backgroundColor: Colors.bgColor,
          },
          headerTitleStyle: {
            color: Colors.textColor,
          },
          headerShadowVisible: false,
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons
                  name="close"
                  style={styles.iconClose}
                  color={Colors.textColor}
                />
              </TouchableOpacity>
            );
          },
        }}
      />

      <Stack.Screen
        name="(modals)/country/index"
        options={{
          presentation: "modal",
          title: "Your Country",
          headerStyle: {
            backgroundColor: Colors.bgColor,
          },
          headerTitleStyle: {
            color: Colors.textColor,
          },
          headerShadowVisible: false,
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons
                  name="close"
                  style={styles.iconClose}
                  color={Colors.textColor}
                />
              </TouchableOpacity>
            );
          },
        }}
      />

      <Stack.Screen
        name="(modals)/country/city/[country]"
        options={{
          presentation: "modal",
          title: "Select City",
          headerStyle: {
            backgroundColor: Colors.bgColor,
          },
          headerTitleStyle: {
            color: Colors.textColor,
          },
          headerShadowVisible: false,
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons
                  name="close"
                  style={styles.iconClose}
                  color={Colors.textColor}
                />
              </TouchableOpacity>
            );
          },
        }}
      />

      <Stack.Screen
        name="(modals)/province/index"
        options={{
          presentation: "modal",
          title: "Select Province",
          headerStyle: {
            backgroundColor: Colors.bgColor,
          },
          headerTitleStyle: {
            color: Colors.textColor,
          },
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons
                  name="close"
                  style={styles.iconClose}
                  color={Colors.textColor}
                />
              </TouchableOpacity>
            );
          },
        }}
      />

      <Stack.Screen
        name="(modals)/province/district/[province]/index"
        options={{
          presentation: "modal",
          title: "Select District",
          headerStyle: {
            backgroundColor: Colors.bgColor,
          },
          headerTitleStyle: {
            color: Colors.textColor,
          },
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons
                  name="close"
                  style={styles.iconClose}
                  color={Colors.textColor}
                />
              </TouchableOpacity>
            );
          },
        }}
      />

      <Stack.Screen
        name="(modals)/province/district/[province]/sector/[district]/index"
        options={{
          presentation: "modal",
          title: "Select Sector",
          headerStyle: {
            backgroundColor: Colors.bgColor,
          },
          headerTitleStyle: {
            color: Colors.textColor,
          },
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons
                  name="close"
                  style={styles.iconClose}
                  color={Colors.textColor}
                />
              </TouchableOpacity>
            );
          },
        }}
      />

      <Stack.Screen
        name="(modals)/province/district/[province]/sector/[district]/cell/[sector]/index"
        options={{
          presentation: "modal",
          title: "Select Cell",
          headerStyle: {
            backgroundColor: Colors.bgColor,
          },
          headerTitleStyle: {
            color: Colors.textColor,
          },
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons
                  name="close"
                  style={styles.iconClose}
                  color={Colors.textColor}
                />
              </TouchableOpacity>
            );
          },
        }}
      />

      <Stack.Screen
        name="(modals)/province/district/[province]/sector/[district]/cell/[sector]/village/[cell]/index"
        options={{
          presentation: "modal",
          title: "Select Village",
          headerStyle: {
            backgroundColor: Colors.bgColor,
          },
          headerTitleStyle: {
            color: Colors.textColor,
          },
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons
                  name="close"
                  style={styles.iconClose}
                  color={Colors.textColor}
                />
              </TouchableOpacity>
            );
          },
        }}
      />

      <Stack.Screen
        name="(tabs)"
        options={{
          title: "FPR Inkotanyi",
          headerShown: false,
          headerStyle: {
            backgroundColor: Colors.bgColor,
          },
          headerTitleStyle: {
            color: Colors.textColor,
          },
        }}
      />

      <Stack.Screen
        name="story/[id]"
        options={{
          presentation: "modal",
          title: "",
          headerStyle: {
            backgroundColor: Colors.bgColor,
          },
          headerTitleStyle: {
            color: Colors.textColor,
          },
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons
                  name="close"
                  style={styles.iconClose}
                  color={Colors.textColor}
                />
              </TouchableOpacity>
            );
          },
        }}
      />

      <Stack.Screen
        name="story/createTextStory/index"
        options={{
          headerStyle: {
            backgroundColor: Colors.bgColor,
          },
          headerTitleStyle: {
            color: Colors.textColor,
          },
          title: "Create Story",
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons
                  name="close"
                  style={styles.iconClose}
                  color={Colors.textColor}
                />
              </TouchableOpacity>
            );
          },
        }}
      />

      <Stack.Screen
        name="community/list"
        options={{
          headerStyle: {
            backgroundColor: Colors.bgColor,
          },
          headerTitleStyle: {
            color: Colors.textColor,
          },
          title: "Communities",
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons
                  name="close"
                  style={styles.iconClose}
                  color={Colors.textColor}
                />
              </TouchableOpacity>
            );
          },
        }}
      />

      <Stack.Screen
        name="community/add"
        options={{
          headerStyle: {
            backgroundColor: Colors.bgColor,
          },
          headerTitleStyle: {
            color: Colors.textColor,
          },
          title: "Create Community",
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons
                  name="close"
                  style={styles.iconClose}
                  color={Colors.textColor}
                />
              </TouchableOpacity>
            );
          },
        }}
      />

      <Stack.Screen
        name="post/community/[id]/index"
        options={{
          headerStyle: {
            backgroundColor: Colors.bgColor,
          },
          headerTitleStyle: {
            color: Colors.textColor,
          },
          title: "",
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons
                  name="close"
                  style={styles.iconClose}
                  color={Colors.textColor}
                />
              </TouchableOpacity>
            );
          },
        }}
      />

      <Stack.Screen
        name="post/single/[id]"
        options={{
          headerStyle: {
            backgroundColor: Colors.bgColor,
          },
          headerTitleStyle: {
            color: Colors.textColor,
          },
          title: "",
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons
                  name="close"
                  style={styles.iconClose}
                  color={Colors.textColor}
                />
              </TouchableOpacity>
            );
          },
        }}
      />

      <Stack.Screen
        name="profile/edit/[id]"
        options={{
          headerStyle: {
            backgroundColor: Colors.bgColor,
          },
          headerTitleStyle: {
            color: Colors.textColor,
          },
          title: "Edit Profile",
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons
                  name="close"
                  style={styles.iconClose}
                  color={Colors.textColor}
                />
              </TouchableOpacity>
            );
          },
        }}
      />

      <Stack.Screen
        name="image/preview"
        options={{
          headerStyle: {
            backgroundColor: Colors.bgColor,
          },
          headerTitleStyle: {
            color: Colors.textColor,
          },
          title: "",
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons
                  name="close"
                  style={styles.iconClose}
                  color={Colors.textColor}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  iconClose: {
    fontSize: 24,
  },
});
