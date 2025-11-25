import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";

export default function Savings() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={router.back}>
          <FontAwesome name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Savings</Text>
        </View>
        <TouchableOpacity>
          <FontAwesome name="question-circle" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Balance Section */}
      <View style={styles.balanceSection}>
        <Text style={styles.balanceAmount}>$7,783.00</Text>
        <View style={styles.balanceRow}>
          <View style={styles.balanceItem}>
            <Text style={styles.balanceSubLabel}>2%</Text>
            <Text style={styles.balanceSubAmount}>$156.00</Text>
          </View>
          <View style={styles.balanceItem}>
            <Text style={styles.balanceSubLabel}>Last Deposit</Text>
            <Text style={styles.balanceSubAmount}>$156.00</Text>
          </View>
        </View>
        <Text style={styles.balanceNote}>
          30% of Your Expenses, Looks Good.
        </Text>
      </View>

      {/* White Container */}
      <View style={styles.whiteContainer}>
        {/* Category Icons */}
        <View style={styles.categorySection}>
          <View style={styles.categoryGrid}>
            <TouchableOpacity style={styles.categoryItem}>
              <View
                style={[styles.categoryIcon, { backgroundColor: "#4A90E2" }]}
              >
                <FontAwesome name="plane" size={24} color="white" />
              </View>
              <Text style={styles.categoryText}>Travel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.categoryItem}>
              <View
                style={[styles.categoryIcon, { backgroundColor: "#7ED321" }]}
              >
                <FontAwesome name="home" size={24} color="white" />
              </View>
              <Text style={styles.categoryText}>New House</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.categoryItem}>
              <View
                style={[styles.categoryIcon, { backgroundColor: "#F5A623" }]}
              >
                <FontAwesome name="car" size={24} color="white" />
              </View>
              <Text style={styles.categoryText}>Car</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.categoryItem}>
            <View style={[styles.categoryIcon, { backgroundColor: "#BD10E0" }]}>
              <FontAwesome name="heart" size={24} color="white" />
            </View>
            <Text style={styles.categoryText}>Wedding</Text>
          </TouchableOpacity>
        </View>

        {/* Add More Button */}
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add More</Text>
        </TouchableOpacity>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerCenter: {
    backgroundColor: "#FFD700",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  balanceSection: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  balanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  balanceItem: {
    alignItems: "center",
  },
  balanceSubLabel: {
    fontSize: 14,
    color: "white",
    opacity: 0.8,
  },
  balanceSubAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  balanceNote: {
    fontSize: 14,
    color: "white",
    opacity: 0.8,
    textAlign: "center",
  },
  whiteContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
  },
  categorySection: {
    paddingHorizontal: 20,
    alignItems: "center",
    flex: 1,
  },
  categoryGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 30,
  },
  categoryItem: {
    alignItems: "center",
    width: 80,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    color: "#333",
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#00C18C",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignSelf: "center",
    marginBottom: 40,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
