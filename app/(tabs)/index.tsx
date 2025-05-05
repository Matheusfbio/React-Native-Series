import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { useState } from "react";
import { db } from "@/firebaseconfig"; // Importe o database inicializado
import { push, ref } from "firebase/database";
import { Stack } from "expo-router";

export default function BudgetScreen() {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const handleSave = () => {
    const budgetRef = ref(db, "budgets");
    push(budgetRef, {
      name,
      price,
    })
      .then(() => {
        console.log(`Data saved successfully!${name} - ${price}`);
        setName("");
        setPrice("");
      })
      .catch((error) => {
        console.error("Error saving data: ", error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen name="perfil" options={{ presentation: "modal" }} />
      <View>
        <TextInput
          placeholder="Nome"
          onChangeText={setName}
          value={name}
          style={styles.input}
        />
        <TextInput
          placeholder="valor"
          onChangeText={setPrice}
          value={price}
          style={styles.input}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text>Cadastrar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonLogin: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 20,
    gap: 10,
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  button: {
    alignItems: "center",
    // flexDirection:0 "row",
    // marginTop: 20,
    // margin: 16,
    textAlign: "center",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: "#d3d3d3",
    borderRadius: 10,
    width: 200,
    height: 50,
  },
  input: {
    // textAlign: "center",
    borderColor: "#d3d3d3",
    backgroundColor: "#d3d3d3",
    borderWidth: 1,
    width: 400,
    height: 40,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginBottom: 30,
    paddingHorizontal: 10,
  },
});
