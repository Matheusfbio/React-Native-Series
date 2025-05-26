import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, Stack, useNavigation } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import AuthProvider from "@/contexts/auth";
import { SQLiteProvider, type SQLiteDatabase } from "expo-sqlite";
import { Pressable, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { NotificationProvider } from "@/utils/context/NotificationContext";

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
    console.log("Inicializando o banco de dados...");
    try {
      // Cria a tabela 'users' se ela não existir
      await db.execAsync(
        `CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT NOT NULL
        );`
      );

      // Adiciona a coluna 'image' se ela não existir
      await db.execAsync("ALTER TABLE users ADD COLUMN image TEXT");
    } catch (err) {
      if (!`${err}`.includes("duplicate column")) {
        console.error("Erro ao inicializar o banco de dados:", err);
      }
    }
  };

  return (
    <SQLiteProvider databaseName="test.db" onInit={createDbIfNeeded}>
      <AuthProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <NotificationProvider>
            {/* <Slot /> */}
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="login" options={{ headerShown: false }} />
              <Stack.Screen name="tutorial" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="(top-tabs)" options={{ title: "Top Tabs" }} />
              <Stack.Screen
                name="(sign-up)/sign-up"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="perfil" options={{ presentation: "modal" }} />
              <Stack.Screen name="cart" options={{ presentation: "modal" }} />
            </Stack>
          </NotificationProvider>
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
