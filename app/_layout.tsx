import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  DrawerActions,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useNavigation } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import AuthProvider from "@/contexts/auth";
import { SQLiteProvider, type SQLiteDatabase } from "expo-sqlite";
import { Pressable, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const createDbIfNeeded = async (db: SQLiteDatabase) => {
    //
    console.log("Creating database");
    try {
      await db.execAsync("ALTER TABLE users ADD COLUMN image TEXT");
    } catch (err) {
      if (!`${err}`.includes("duplicate column")) {
        console.error("Erro ao adicionar coluna image:", err);
      }
    }
  };

  // const toggleMenu = () => navigation.dispatch(DrawerActions.toggleDrawer());
  // const navigation = useNavigation();

  return (
    <SQLiteProvider databaseName="test.db" onInit={createDbIfNeeded}>
      <AuthProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          {/* <Pressable onPress={toggleMenu} style={styles.menu}>
            <Entypo name="menu" color="#FFF" size={32} />
          </Pressable> */}
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
            {/* <Stack.Screen
              name="(tabs)/orders"
              options={{ presentation: "card" }}
            /> */}
            <Stack.Screen
              name="(sign-up)/sign-up"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="perfil" options={{ presentation: "modal" }} />
            <Stack.Screen name="cart" options={{ presentation: "modal" }} />
            {/* <Stack.Screen
            name="modal"
            options={{
              presentation: "modal",
            }}
            /> */}
          </Stack>
        </ThemeProvider>
      </AuthProvider>
    </SQLiteProvider>
  );
}

const styles = StyleSheet.create({
  menu: {
    position: "absolute",
    right: 32,
    top: 32,
    zIndex: 1,
  },
});
