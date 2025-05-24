import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { Text, View } from "@/components/Themed";
import { router } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "@/components/useColorScheme.web";

export default function Perfil() {
  const { user } = useContext(AuthContext);
  const { signOut } = useContext(AuthContext);
  const colorScheme = useColorScheme();
  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/");
    } catch (error) {
      console.error("Erro ao sair:", error);
    } finally {
      <ActivityIndicator size="large" color="#0000ff" />;
    }
  };
  return (
    <View style={styles.container}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Text style={styles.title}>{user?.name}</Text>
        <Text style={styles.title}>{user?.email}</Text>
        <Text style={styles.title}>{user?.status}</Text>
        <TouchableOpacity onPress={handleSignOut} style={styles.button}>
          <Text>Sair</Text>
        </TouchableOpacity>
        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      </ThemeProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    // marginTop: "-21%",
    paddingVertical: "1%",
    paddingHorizontal: "3%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d3d3d3",
    borderRadius: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
