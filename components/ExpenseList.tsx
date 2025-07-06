// components/ExpenseList.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  type ToastAndroid,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

type ExpenseItem = {
  id: string;
  title: string;
  time: string;
  date: string;
  amount: string;
  icon?: string;
};

type ExpenseSection = {
  month: string;
  data: ExpenseItem[];
};

type Props = {
  expensesByMonth: ExpenseSection[];
  onAddExpense: () => void;
};

const ExpenseList = ({ expensesByMonth, onAddExpense }: Props) => {
  return (
    <View style={styles.container}>
      {expensesByMonth.map((section) => (
        <View key={section.month} style={styles.section}>
          <View style={styles.monthHeader}>
            <Text style={styles.monthText}>{section.month}</Text>
            <FontAwesome name="calendar" size={18} color="#00C18C" />
          </View>

          {section.data.map((item) => (
            <View key={item.id} style={styles.expenseItem}>
              <View style={styles.iconCircle}>
                <FontAwesome
                  name={item.icon || "cutlery"}
                  size={20}
                  color="#fff"
                />
              </View>
              <View style={styles.expenseDetails}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>
                  {item.time} - {item.date}
                </Text>
              </View>
              <Text style={styles.amount}>{item.amount}</Text>
            </View>
          ))}
        </View>
      ))}

      <TouchableOpacity style={styles.button} onPress={onAddExpense}>
        <Text style={styles.buttonText}>Add Expenses</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ExpenseList;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    // height: "100%",
    // width: "100%",
    // // marginTop: "150%",
  },
  section: {
    marginBottom: 24,
  },
  monthHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    alignItems: "center",
  },
  monthText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  expenseItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#00C18C",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  expenseDetails: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 13,
    color: "#666",
  },
  amount: {
    color: "#0066ff",
    fontWeight: "bold",
    fontSize: 15,
  },
  button: {
    backgroundColor: "#00C18C",
    padding: 12,
    borderRadius: 24,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
