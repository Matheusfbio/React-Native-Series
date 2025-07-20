import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import ExpenseSummary from "@/components/ExpenseSummary";
import { router } from "expo-router";

const screenWidth = Dimensions.get("window").width;

export default function Category() {
  const balance = 7783;
  const expense = -1187.4;
  const totalBudget = 20000;
  const percent = Math.abs(expense / totalBudget);

  const [activeCategoryId, setActiveCategoryId] = useState("1");
  const FoodScreen = () => {
    router.push("../food");
  };
  
const [categoriesList, setCategoriesList] = useState([
  { id: "1", name: "Food", icon: "cutlery" },
  { id: "2", name: "Transport", icon: "bus" },
  { id: "3", name: "Medicine", icon: "medkit" },
  { id: "4", name: "Groceries", icon: "shopping-basket" },
  { id: "5", name: "Rent", icon: "key" },
  { id: "6", name: "Gifts", icon: "gift" },
  { id: "7", name: "Savings", icon: "bank" },
  { id: "8", name: "Entertainment", icon: "ticket" },
  { id: "9", name: "More", icon: "plus" },
]);


  const addCategory = () => {
    const newCategory = {
      id: Date.now().toString(), // id único
      name: "New Category",
      icon: "star", // ou qualquer ícone válido do FontAwesome
    };

    setCategoriesList((prev) => [...prev, newCategory]);
  };


  return (
    <View style={styles.container}>
      {/* Header financeiro */}
      <View style={styles.summary}>
        <ExpenseSummary balance={7783} expense={-1187.4} totalBudget={20000} />
      </View>

      {/* Container branco arredondado */}
      <View style={styles.whiteBox}>
        {/* Lista de categorias com rolagem */}
        <FlatList
          data={categoriesList}
          keyExtractor={(item) => item.id}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: 24, // Espaço vertical entre linhas
          }}
          contentContainerStyle={{
            paddingBottom: 40,
            paddingTop: 10,
          }}
          renderItem={({ item }) => {
            const isActive = item.id === activeCategoryId;

            return (
              <TouchableOpacity
                onPress={() => {
                  setActiveCategoryId(item.id);
                  if (item.id === "1") router.push("/food");
                  else if (item.id === "2") router.push("/transport");
                  else if (item.id === "3") router.push("/medicine");
                  else if (item.id === "4") router.push("/groceries");
                  else if (item.id === "5") router.push("/rent");
                  else if (item.id === "6") router.push("/gifts");
                  else if (item.id === "7") router.push("/savings");
                  else if (item.id === "8") router.push("/entertainment");
                  else if (item.id === "9") router.push("/more");
                }}
                style={styles.categoryItem}
              >
                <View
                  style={[
                    styles.iconCircle,
                    isActive && styles.iconCircleActive,
                  ]}
                >
                  <FontAwesome
                    name={item.icon}
                    size={30}
                    color={isActive ? "#fff" : "#0066ff"}
                  />
                </View>
                <Text style={styles.categoryLabel}>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#00D09E",
  },
  grid: {
    maxHeight: 400, // ajuste conforme o necessário
  },

  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "25%",
    margin: "11%",
    width: "100%",
  },
  whiteBox: {
    flex: 1,
    backgroundColor: "#e6fff3",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  categoryItem: {
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  iconCircle: {
    width: 80,
    height: 80,
    backgroundColor: "#BEE8FF",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircleActive: {
    backgroundColor: "#0066ff", // azul escuro quando ativo
  },

  categoryLabel: {
    fontSize: 13,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
  },
});
