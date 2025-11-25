import ExpenseList from "@/components/ExpenseList";
import ExpenseSummary from "@/components/ExpenseSummary";
import { router } from "expo-router";
import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";

export default function Food() {
  const mockExpenses = [
    {
      month: "April",
      data: [
        {
          id: "1",
          title: "Dinner",
          time: "18:27",
          date: "April 30",
          amount: "-$26,00",
          icon: "cutlery",
        },
        {
          id: "2",
          title: "Delivery Pizza",
          time: "15:00",
          date: "April 24",
          amount: "-$18,35",
          icon: "cutlery",
        },
        {
          id: "3",
          title: "Lunch",
          time: "12:30",
          date: "April 15",
          amount: "-$15,40",
          icon: "cutlery",
        },
        {
          id: "4",
          title: "Brunch",
          time: "9:30",
          date: "April 08",
          amount: "-$12,13",
          icon: "cutlery",
        },
      ],
    },
    {
      month: "March",
      data: [
        {
          id: "5",
          title: "Dinner",
          time: "20:50",
          date: "March 31",
          amount: "-$27,20",
          icon: "cutlery",
        },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <ExpenseSummary balance={7783} expense={-1187.4} totalBudget={20000} />
        <ExpenseList expensesByMonth={mockExpenses} />
      </View>
      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => {
          router.push("./expenses");
          }}
          >
          <Text style={styles.buttonText}>Add Expenses</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00D09E",
    flex: 1,
  },
  info: {
    width: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: "2%",
  },
});
