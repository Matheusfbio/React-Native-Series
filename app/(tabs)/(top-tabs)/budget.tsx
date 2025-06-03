import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { Stack } from "expo-router";
import { useColorScheme } from "@/components/useColorScheme.web";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

export default function BudgetScreen() {
  const mockBudgets = [
    { id: "1", cliente: "João Silva", valor: 1500, data: "2025-05-01" },
    { id: "2", cliente: "Maria Oliveira", valor: 2200, data: "2025-05-03" },
    { id: "3", cliente: "Carlos Lima", valor: 890, data: "2025-05-05" },
    { id: "4", cliente: "Ana Souza", valor: 1340, data: "2025-05-07" },
  ];

  const mockPlans = [
    {
      id: "basic",
      nome: "Básico",
      preco: 35,
      beneficios: ["Suporte full time"],
    },
    {
      id: "premium",
      nome: "Premium",
      preco: 60,
      beneficios: ["Suporte full time", "Preview de serviços novos"],
    },
    {
      id: "plus",
      nome: "Plus",
      preco: 80,
      beneficios: ["Suporte full time", "Preview de serviços novos"],
    },
  ];
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={{ padding: 16 }}>
      {/* Planos */}
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Text style={styles.title}>Planos</Text>
        <FlatList
          data={mockPlans}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.planCard}>
              <Text style={styles.cliente}>{item.nome}</Text>
              <Text style={styles.valor}>R$ {item.preco.toFixed(2)}</Text>
              <View style={styles.benefitsContainer}>
                {item.beneficios.map((beneficio, index) => (
                  <Text key={index} style={styles.benefit}>
                    • {beneficio}
                  </Text>
                ))}
              </View>
            </View>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 24 }}
        />
      </ThemeProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 12,
  },
  planCard: {
    backgroundColor: "#e2e8f0",
    padding: 16,
    marginRight: 12,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
    minWidth: 160,
    alignItems: "flex-start",
  },
  cliente: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0f172a",
  },
  valor: {
    fontSize: 16,
    color: "#2563eb",
    marginTop: 4,
  },
  benefitsContainer: {
    backgroundColor: "#e2e8f0",
    marginTop: 8,
  },
  benefit: {
    fontSize: 14,
    color: "#334155",
    marginTop: 2,
  },
});
