import * as React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { ref, set, onValue } from "firebase/database";
import { db } from "@/firebaseconfig";
import { useAuth } from "@/contexts/auth";

interface SavingModalProps {
  visible: boolean;
  onClose: () => void;
}

const SavingModal: React.FC<SavingModalProps> = ({ visible, onClose }) => {
  const [totalBudget, setTotalBudget] = React.useState("");
  const [balance, setBalance] = React.useState("");
  const [expense, setExpense] = React.useState("");
  const { user } = useAuth();

  React.useEffect(() => {
    if (!user?.uid || !visible) return;

    const budgetRef = ref(db, `budget/${user.uid}`);
    const unsubscribe = onValue(
      budgetRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setTotalBudget(formatDisplay(data.totalBudget || 0));
          setBalance(formatDisplay(data.balance || 0));
          setExpense(formatDisplay(data.expense || 0));
        }
      },
      { onlyOnce: true }
    );

    return () => unsubscribe();
  }, [user?.uid, visible]);

  const formatDisplay = React.useCallback((value: number) => {
    return value.toFixed(2).replace(".", ",");
  }, []);

  const formatInput = React.useCallback((text: string) => {
    const numbers = text.replace(/[^0-9]/g, "");
    if (!numbers) return "0,00";
    const value = parseInt(numbers) / 100;
    return value.toFixed(2).replace(".", ",");
  }, []);

  const parseValue = React.useCallback((text: string) => {
    return parseFloat(text.replace(",", ".")) || 0;
  }, []);

  const handleSave = React.useCallback(async () => {
    if (!user?.uid) return;

    try {
      await set(ref(db, `budget/${user.uid}`), {
        totalBudget: parseValue(totalBudget),
        balance: parseValue(balance),
        expense: parseValue(expense),
        timestamp: Date.now(),
      });
      onClose();
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  }, [user?.uid, totalBudget, balance, expense, onClose, parseValue]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Configurar Orçamento</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.label}>Orçamento Total</Text>
            <TextInput
              style={styles.input}
              value={totalBudget}
              onChangeText={(text) => setTotalBudget(formatInput(text))}
              keyboardType="numeric"
              placeholder="0,00"
              placeholderTextColor="#999"
            />

            <Text style={styles.label}>Saldo Total</Text>
            <TextInput
              style={styles.input}
              value={balance}
              onChangeText={(text) => setBalance(formatInput(text))}
              keyboardType="numeric"
              placeholder="0,00"
              placeholderTextColor="#999"
            />

            <Text style={styles.label}>Despesa Total</Text>
            <TextInput
              style={styles.input}
              value={expense}
              onChangeText={(text) => setExpense(formatInput(text))}
              keyboardType="numeric"
              placeholder="0,00"
              placeholderTextColor="#999"
            />
          </ScrollView>

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.buttonCancel} onPress={onClose}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSave} onPress={handleSave}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 16,
    width: "85%",
    maxHeight: "70%",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    marginBottom: 6,
    marginTop: 8,
  },
  input: {
    fontSize: 18,
    color: "#00D09E",
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#f9f9f9",
  },
  buttons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },
  buttonCancel: {
    flex: 1,
    backgroundColor: "#dc0000ff",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonSave: {
    flex: 1,
    backgroundColor: "#00D09E",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default SavingModal;
