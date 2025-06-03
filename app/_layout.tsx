import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import AuthProvider from "@/contexts/auth";
import { SQLiteProvider, type SQLiteDatabase } from "expo-sqlite";
import { Pressable, StyleSheet } from "react-native";
import { NotificationProvider } from "@/utils/context/NotificationContext";
import Tutorial from ".";
import AsyncStorage from "@react-native-async-storage/async-storage";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "tutorial",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const [isFirstTime, setIsFirstTime] = useState<boolean | null>(null);

  const createDbIfNeeded = async (db: SQLiteDatabase) => {
    console.log("Inicializando o banco de dados...");
    try {
      await db.execAsync(
        `CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT NOT NULL
        );`
      );
      await db.execAsync("ALTER TABLE users ADD COLUMN image TEXT");
    } catch (err) {
      if (!`${err}`.includes("duplicate column")) {
        console.error("Erro ao inicializar o banco de dados:", err);
      }
    }
  };

  useEffect(() => {
    const checkFirstTime = async () => {
      const seen = await AsyncStorage.getItem("hasSeenTutorial");
      setIsFirstTime(seen === null);
    };
    checkFirstTime();
  }, []);

  // Ainda carregando
  if (isFirstTime === null) return null;

  // Primeira vez: mostra o tutorial
  if (isFirstTime) return <Tutorial />;

  // Já viu o tutorial: carrega as rotas normais
  return (
    <SQLiteProvider databaseName="test.db" onInit={createDbIfNeeded}>
      <AuthProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <NotificationProvider>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="login" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="(top-tabs)"
                options={{ headerShown: false }}
              />
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
