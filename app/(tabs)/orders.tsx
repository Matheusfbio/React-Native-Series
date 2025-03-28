import { SafeAreaView, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import React from "react";

export default function OrdersScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Carrinho</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </SafeAreaView>
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
