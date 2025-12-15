import * as React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import Slider from "@react-native-community/slider";
import { ref, set, onValue } from "firebase/database";
import { db } from "@/firebaseconfig";
import { useAuth } from "@/contexts/auth";

interface SavingModalProps {
  visible: boolean;
  onClose: () => void;
}

const SavingModal: React.FC<SavingModalProps> = ({ visible, onClose }) => {
  const [totalBudget, setTotalBudget] = React.useState(0);
  const [balance, setBalance] = React.useState(0);
  const [expense, setExpense] = React.useState(0);
  const { user } = useAuth();

  React.useEffect(() => {
    if (!user?.uid || !visible) return;

    const budgetRef = ref(db, `budget/${user.uid}`);
    onValue(budgetRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setTotalBudget(data.totalBudget || 0);
        setBalance(data.balance || 0);
        setExpense(data.expense || 0);
      }
    });
  }, [user?.uid, visible]);

  const handleSave = async () => {
    if (!user?.uid) return;

    try {
      await set(ref(db, `budget/${user.uid}`), {
        totalBudget,
        balance,
        expense,
        timestamp: Date.now(),
      });
      onClose();
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  };

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
          
          <Text style={styles.label}>Total Budget</Text>
          <TextInput
            style={styles.input}
            value={totalBudget.toString()}
            onChangeText={(text) => setTotalBudget(parseFloat(text) || 0)}
            keyboardType="decimal-pad"
            placeholder="0.00"
          />

          <Text style={styles.label}>Total Balance</Text>
          <TextInput
            style={styles.input}
            value={balance.toString()}
            onChangeText={(text) => setBalance(parseFloat(text) || 0)}
            keyboardType="decimal-pad"
            placeholder="0.00"
          />

          <Text style={styles.label}>Total Expense</Text>
          <TextInput
            style={styles.input}
            value={expense.toString()}
            onChangeText={(text) => setExpense(parseFloat(text) || 0)}
            keyboardType="decimal-pad"
            placeholder="0.00"
          />

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
    borderRadius: 12,
    width: "80%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    fontSize: 18,
    color: "#00D09E",
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  buttonCancel: {
    flex: 1,
    backgroundColor: "#d3d3d3",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonSave: {
    flex: 1,
    backgroundColor: "#00D09E",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default SavingModal;
