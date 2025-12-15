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
import AuthProvider, { useAuth } from "@/contexts/auth";
import { SQLiteProvider, type SQLiteDatabase } from "expo-sqlite";
import {
  Animated,
  Dimensions,
  Easing,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Tutorial from "./(auth)/tutorial";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "@/constants/Colors";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayout() {
  const colorScheme = useColorScheme();
  const [modalVisible, setModalVisible] = useState(false);
  const screenHeight = Dimensions.get("window").height;
  const [animation] = useState(new Animated.Value(screenHeight));

  const openModal = () => {
    setModalVisible(true);
    Animated.timing(animation, {
      toValue: 0,
      duration: 400,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(animation, {
      toValue: screenHeight,
      duration: 300,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
    });
  };

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          {modalVisible && (
            <Modal transparent animationType="none" visible={modalVisible}>
              <View style={styles.modalOverlay}>
                <Animated.View
                  style={[
                    styles.modalContent,
                    { transform: [{ translateY: animation }] },
                  ]}
                >
                  <Text style={styles.modalTitle}>Este é o conteúdo do modal!</Text>
                  <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                    <Text style={styles.closeButtonText}>Fechar</Text>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            </Modal>
          )}
          <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
              <Stack.Screen name="(auth)/register" options={{ headerShown: false }} />
              <Stack.Screen name="(auth)/tutorial" options={{ headerShown: false }} />
              <Stack.Screen name="recovery" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="saving" options={{ headerShown: false }} />
              <Stack.Screen
                name="food"
                options={{
                  title: "",
                  headerShown: true,
                  headerTransparent: false,
                  headerStyle: { backgroundColor: "#00D09E" },
                  headerTintColor: "#ffffff",
                  headerTitle: () => (
                    <Text style={{ color: "white", fontSize: 22 }}>Food</Text>
                  ),
                  headerTitleAlign: "left",
                  headerTitleStyle: {
                    fontWeight: "bold",
                    fontSize: 20,
                  },
                  headerRight: () => (
                    <Pressable
                      onPress={openModal}
                      style={({ pressed }) => [
                        { marginRight: 2, opacity: pressed ? 0.5 : 1 },
                      ]}
                    >
                      <View
                        style={{
                          backgroundColor: "#fff",
                          borderRadius: 40,
                          padding: 7,
                        }}
                      >
                        <FontAwesome
                          name="bell-o"
                          style={{ color: "black" }}
                          size={25}
                          color="#000"
                        />
                      </View>
                    </Pressable>
                  ),
                }}
              />
              <Stack.Screen
                name="expenses"
                options={{
                  title: "",
                  headerShown: true,
                  headerTransparent: false,
                  headerStyle: { backgroundColor: "#00D09E" },
                  headerTintColor: "#ffffff",
                  headerTitle: () => (
                    <Text style={{ color: "white", fontSize: 22 }}>Expenses</Text>
                  ),
                  headerTitleAlign: "left",
                  headerTitleStyle: {
                    fontWeight: "bold",
                    fontSize: 20,
                  },
                  headerRight: () => (
                    <Pressable
                      onPress={openModal}
                      style={({ pressed }) => [
                        { marginRight: 2, opacity: pressed ? 0.5 : 1 },
                      ]}
                    >
                      <View
                        style={{
                          backgroundColor: "#fff",
                          borderRadius: 40,
                          padding: 7,
                        }}
                      >
                        <FontAwesome
                          name="bell-o"
                          style={{ color: "black" }}
                          size={25}
                          color="#000"
                        />
                      </View>
                    </Pressable>
                  ),
                }}
              />

              <Stack.Screen name="cart" options={{ presentation: "modal" }} />
          </Stack>
    </ThemeProvider>
  );
}

export default function RootLayoutNav() {
  return (
    <SQLiteProvider databaseName="test.db" onInit={async (db) => {
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
    }}>
      <AuthProvider>
        <RootLayout />
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
  modalOverlay: {
    textAlign: "center",
    alignItems: "center",
    alignContent: "center",
  },
  modalContainer: {
    // backgroundColor: "red",
    backgroundColor: "white",
    textAlign: "center",
    marginTop: "145%",
    padding: 30,
    justifyContent: "center",
    borderRadius: 10,
    width: "90%",
    elevation: 10,
  },

  modalContent: {
    backgroundColor: "#ededed",
    paddingVertical: "20%",
    marginTop: "30%",
    borderRadius: 30,
    alignItems: "center",
    width: "100%",
    height: "90%",
    justifyContent: "center",
  },
  modalOptions: {
    // backgroundColor: "yellow",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#00D09E",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
