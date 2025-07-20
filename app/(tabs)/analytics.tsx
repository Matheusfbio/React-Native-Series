import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { BarChart } from "react-native-chart-kit";
import ExpenseSummary from "@/components/ExpenseSummary";
import CustomTabsChart from "@/components/CustonTabsChart";

const screenWidth = Dimensions.get("window").width;

export default function Analysis() {
  const [selectedTab, setSelectedTab] = useState<
    "Daily" | "Weekly" | "Monthly" | "Year"
  >("Daily");

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [5000, 3000, 2000, 7000, 10000, 1500, 800],
        color: () => "#00b894",
      },
      {
        data: [2000, 1000, 500, 3000, 4000, 800, 200],
        color: () => "#0066ff",
      },
    ],
  };

  const getDateLabel = () => {
    switch (selectedTab) {
      case "Daily":
        return "July 8, 2025";
      case "Weekly":
        return "Week 27, 2025";
      case "Monthly":
        return "July 2025";
      case "Year":
        return "Year: 2025";
      default:
        return "";
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ExpenseSummary balance={7783} expense={-1187.4} totalBudget={20000} />
      </View>

      <View style={styles.whiteBox}>
        {/* Tabs de controle */}
        <CustomTabsChart onTabChange={setSelectedTab} />

        {/* Título da seção */}
        <Text style={styles.sectionTitle}>Income & Expenses</Text>

        {/* Gráfico de barras */}
        <BarChart
          data={data}
          width={screenWidth - 40}
          height={220}
          fromZero
          showValuesOnTopOfBars
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 0,
            color: () => "#333",
            labelColor: () => "#333",
            propsForBackgroundLines: {
              strokeDasharray: "",
            },
            barPercentage: 0.5,
          }}
          style={styles.chart}
        />

        {/* Data atual conforme aba */}
        <Text style={styles.dateLabel}>{getDateLabel()}</Text>

        {/* Income e Expense abaixo */}
        <View style={styles.summaryBottom}>
          <View style={styles.summaryBox}>
            <FontAwesome name="arrow-up" size={20} color="#00b894" />
            <Text style={styles.incomeLabel}>Income</Text>
            <Text style={styles.incomeValue}>$4,120.00</Text>
          </View>

          <View style={styles.summaryBox}>
            <FontAwesome name="arrow-down" size={20} color="#0066ff" />
            <Text style={styles.expenseLabel}>Expense</Text>
            <Text style={styles.expenseValue}>$1,187.40</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00D09E",
  },
  header: {
    marginTop: 60,
    paddingHorizontal: 20,
  },
  whiteBox: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#e6fff3",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 10,
    marginBottom: 6,
    color: "#333",
    textAlign: "center",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    alignSelf: "center",
  },
  dateLabel: {
    textAlign: "center",
    color: "#666",
    fontSize: 14,
    marginTop: 8,
    fontStyle: "italic",
  },
  summaryBottom: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
  summaryBox: {
    alignItems: "center",
  },
  incomeLabel: {
    marginTop: 4,
    color: "#00b894",
  },
  expenseLabel: {
    marginTop: 4,
    color: "#0066ff",
  },
  incomeValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00b894",
  },
  expenseValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0066ff",
  },
});
