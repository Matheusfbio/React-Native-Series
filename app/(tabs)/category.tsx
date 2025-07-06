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

const categories = [
  { id: "1", name: "Food", icon: "cutlery" },
  { id: "2", name: "Transport", icon: "bus" },
  { id: "3", name: "Medicine", icon: "medkit" },
  // { id: "4", name: "Groceries", icon: "shopping-basket" },
  // { id: "5", name: "Rent", icon: "key" },
  // { id: "8", name: "Entertainment", icon: "ticket" },
  { id: "6", name: "Gifts", icon: "gift" },
  { id: "7", name: "Savings", icon: "bank" },
  { id: "9", name: "More", icon: "plus" },
] as const;

export default function Category() {
  const balance = 7783;
  const expense = -1187.4;
  const totalBudget = 20000;
  const percent = Math.abs(expense / totalBudget);

  const [activeCategoryId, setActiveCategoryId] = useState("1");
  const FoodScreen = () => {
    router.push("../food");
  };

  return (
    <View style={styles.container}>
      {/* Header financeiro */}
      <View style={styles.summary}>
        <ExpenseSummary balance={7783} expense={-1187.4} totalBudget={20000} />
      </View>

      {/* Container branco arredondado */}
      <View style={styles.whiteBox}>
        {/* Grade de categorias */}
        <View style={styles.grid}>
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id}
            numColumns={3}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            renderItem={({ item }) => {
              const isActive = item.id === activeCategoryId;
              return (
                <TouchableOpacity
                  onPress={() => {
                    setActiveCategoryId(item.id);
                    FoodScreen();
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
                      size={26}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#00D09E", // fundo verde
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    // height: "20%",
    marginTop: "25%",
    marginLeft: "14%",
    marginBottom: "-1%",
    margin: "11%",
    // backgroundColor: "red",
    // marginBottom: "20%",
    // padding: 20,
  },
  summaryBox: {
    alignItems: "flex-start",
  },
  label: {
    color: "white",
    marginTop: 4,
    fontSize: 12,
  },
  balance: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 6,
  },
  expense: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#62b6f7",
    marginTop: 6,
  },
  whiteBox: {
    marginTop: 20,
    backgroundColor: "#e6fff3",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // paddingHorizontal: 20,
  },
  progressBar: {
    height: 10,
    backgroundColor: "#d2f5ea",
    borderRadius: 5,
    width: "100%",
    marginBottom: 4,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#00b894",
    borderRadius: 5,
  },
  budgetText: {
    alignSelf: "flex-end",
    fontSize: 12,
    color: "#333",
  },
  feedback: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  grid: {
    height: "80%",
    marginTop: 30,
    padding: -12,
  },
  categoryItem: {
    width: "30%", // 3 por linha com espaço
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: 1, // mantém o quadrado
    borderRadius: 16,
    flex: 1,
  },

  iconCircle: {
    width: 60,
    height: 60,
    backgroundColor: "#d5f3ff",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  iconCircleActive: {
    backgroundColor: "#0066ff",
  },

  categoryLabel: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
});
