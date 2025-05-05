import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import AuthProvider from "@/contexts/auth";
import { SQLiteProvider, type SQLiteDatabase } from "expo-sqlite";

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
      // Create a table
      const response = await db.execAsync(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT)"
      );
      console.log("Database created", response);
    } catch (error) {
      console.error("Error creating database:", error);
    }
  };

  return (
    <SQLiteProvider databaseName="test.db" onInit={createDbIfNeeded}>
      <AuthProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            {/* <Stack.Screen
              name="(tabs)/orders"
              options={{ presentation: "card" }}
            /> */}
            <Stack.Screen
              name="(sign-up)/sign-up"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="perfil" options={{ presentation: "modal" }} />
            <Stack.Screen name="cart" options={{ headerShown: true }} />
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
