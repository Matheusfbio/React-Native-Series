import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Tutorial() {
  const router = useRouter();

  const finishTutorial = async () => {
    await AsyncStorage.setItem("hasSeenTutorial", "true");
    router.replace("/tutorial");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Tutorial!</Text>
      <Text style={styles.text}>
        Aqui você aprende a usar o app com um tutorial simples.
      </Text>

      <TouchableOpacity style={styles.button} onPress={finishTutorial}>
        <Text style={styles.buttonText}>Começar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  text: { fontSize: 18, marginBottom: 40, textAlign: "center" },
  button: {
    backgroundColor: "#4f46e5",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 18 },
});
