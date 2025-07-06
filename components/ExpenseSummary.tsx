import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ExpenseSummaryProps {
  balance: number;
  expense: number;
  totalBudget: number;
}

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({
  balance,
  expense,
  totalBudget,
}) => {
  const percentage = Math.min(Math.abs(expense) / totalBudget, 1);

  return (
    <View style={styles.container}>
      {/* Header com saldo e gasto */}
      <View style={styles.header}>
        <View style={styles.box}>
          <Text style={styles.label}>Total Balance</Text>
          <Text style={styles.balance}>${balance.toFixed(2)}</Text>
        </View>
        <View
          style={{
            backgroundColor: "white",
            width: 2,
            marginRight: 7,
            height: "100%",
          }}
        ></View>
        <View style={styles.box}>
          <Text style={styles.label}>Total Expense</Text>
          <Text style={styles.expense}>-${Math.abs(expense).toFixed(2)}</Text>
        </View>
      </View>

      {/* Barra de Progresso */}
      <View style={styles.progressContainer}>
        <Text style={styles.percentageLabel}>
          {Math.round(percentage * 100)}%
        </Text>
        <View style={styles.progressBarBackground}>
          <View
            style={[styles.progressBarFill, { width: `${percentage * 100}%` }]}
          />
        </View>
        <Text style={styles.totalLabel}>${totalBudget.toFixed(2)}</Text>
      </View>

      {/* Mensagem */}
      <Text style={styles.message}>
        ✅ {Math.round(percentage * 100)}% of your expenses, looks good.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00D09E", // Cyan-500
    padding: 16,
    borderRadius: 12,
    margin: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  box: {
    flex: 1,
  },
  label: {
    color: "white",
    fontSize: 14,
  },
  balance: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  expense: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#bfdbfe", // light blue
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 10,
  },
  percentageLabel: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 6,
  },
  progressBarBackground: {
    flex: 1,
    height: 8,
    backgroundColor: "#e5e7eb",
    borderRadius: 8,
    overflow: "hidden",
  },
  progressBarFill: {
    height: 8,
    backgroundColor: "#4f46e5",
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 6,
  },
  message: {
    color: "white",
    fontSize: 14,
    marginTop: 4,
  },
});

export default ExpenseSummary;
