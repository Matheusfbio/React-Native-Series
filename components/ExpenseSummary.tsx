import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import SavingModal from "./SavingModal";
import { ref, onValue } from "firebase/database";
import { db } from "@/firebaseconfig";
import { useAuth } from "@/contexts/auth";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

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
  const [modalVisible, setModalVisible] = useState(false);
  const [savedBudget, setSavedBudget] = useState(totalBudget);
  const [savedBalance, setSavedBalance] = useState(balance);
  const [savedExpense, setSavedExpense] = useState(expense);
  const [notificationId, setNotificationId] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permissão necessária",
          "Ative as notificações para receber alertas."
        );
      }
    };
    requestPermissions();
  }, []);

  useEffect(() => {
    if (!user?.uid) return;

    const budgetRef = ref(db, `budget/${user.uid}`);
    const unsubscribe = onValue(budgetRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setSavedBudget(data.totalBudget || totalBudget);
        setSavedBalance(data.balance || balance);
        setSavedExpense(data.expense || expense);
      }
    });

    return () => unsubscribe();
  }, [user?.uid]);

  const percentage = Math.min(Math.abs(savedExpense) / savedBudget, 1);

  useEffect(() => {
    const manageNotification = async () => {
      if (notificationId) {
        await Notifications.cancelScheduledNotificationAsync(notificationId);
      }

      if (percentage >= 0.8) {
        const id = await Notifications.scheduleNotificationAsync({
          content: {
            title: "⚠️ Atenção!",
            body: `Suas despesas estão em ${Math.round(
              percentage * 100
            )}% do orçamento. Reduza seus gastos.`,
            sound: true,
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
            seconds: 1800,
            repeats: true,
          },
        });
        setNotificationId(id);
      }
    };
    manageNotification();

    return () => {
      if (notificationId) {
        Notifications.cancelScheduledNotificationAsync(notificationId);
      }
    };
  }, [percentage]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.box}>
          <Text style={styles.label}>Saldo total</Text>
          <Text style={styles.balance}>${savedBalance.toFixed(2)}</Text>
        </View>
        <View
          style={{
            backgroundColor: "white",
            width: 2,
            marginRight: 7,
            height: "100%",
          }}
        />
        <View style={styles.box}>
          <Text style={styles.label}>Despesa Total</Text>
          <Text style={styles.expense}>
            -${Math.abs(savedExpense).toFixed(2)}
          </Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.progressContainer}>
          <Text style={styles.percentageLabel}>
            {Math.round(percentage * 100)}%
          </Text>
          <View style={styles.progressBarBackground}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${percentage * 100}%` },
              ]}
            />
          </View>
          <Text style={styles.totalLabel}>${savedBudget.toFixed(2)}</Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.message}>
        {percentage >= 0.8
          ? `⚠️ ${Math.round(
              percentage * 100
            )}% das despesas! Reduza seus gastos.`
          : `✅ ${Math.round(percentage * 100)}% de suas despesas, parece bom.`}
      </Text>

      <SavingModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00D09E",
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
    color: "#bfdbfe",
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
