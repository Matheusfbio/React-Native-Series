import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "@/components/Themed";
import { router } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth";

export default function PerfilScreen() {
  const { user } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user?.name}</Text>
      <Text style={styles.title}>{user?.email}</Text>
      <Text style={styles.title}>{user?.status}</Text>
      <TouchableOpacity
        onPress={() => router.replace("/")}
        style={styles.button}
      >
        <Text>Sair</Text>
      </TouchableOpacity>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
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
