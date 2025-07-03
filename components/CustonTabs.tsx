import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

type Tab = "Daily" | "Weekly" | "Monthly";

interface Props {
  onTabChange?: (tab: Tab) => void;
}

interface Transaction {
  id: string;
  title: string;
  time: string;
  category: string;
  amount: number;
  type: "income" | "expense";
  icon: keyof typeof FontAwesome.glyphMap;
  frequency: Tab;
}

const transactions: Transaction[] = [
  {
    id: "1",
    title: "Salary",
    time: "18:27 - April 30",
    category: "Monthly",
    amount: 4000,
    type: "income",
    icon: "money",
    frequency: "Monthly",
  },
  {
    id: "2",
    title: "Groceries",
    time: "17:00 - April 24",
    category: "Pantry",
    amount: -100,
    type: "expense",
    icon: "shopping-cart",
    frequency: "Monthly",
  },
  {
    id: "3",
    title: "Rent",
    time: "8:30 - April 15",
    category: "Rent",
    amount: -674.4,
    type: "expense",
    icon: "home",
    frequency: "Monthly",
  },
  {
    id: "4",
    title: "Coffee",
    time: "9:00 - July 3",
    category: "Food",
    amount: -10,
    type: "expense",
    icon: "coffee",
    frequency: "Daily",
  },
  {
    id: "5",
    title: "Gym",
    time: "12:00 - June 30",
    category: "Health",
    amount: -45,
    type: "expense",
    icon: "heartbeat",
    frequency: "Weekly",
  },
];

export default function CustomTabs({ onTabChange }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("Monthly");

  const handleTabPress = (tab: Tab) => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  const filtered = transactions.filter((t) => t.frequency === activeTab);

  return (
    <View>
      {/* Tabs */}
      <View style={styles.tabContainer}>
        {(["Daily", "Weekly", "Monthly"] as Tab[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => handleTabPress(tab)}
            style={[styles.tabItem, activeTab === tab && styles.activeTabItem]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <View style={styles.iconWrapper}>
              <FontAwesome name={item.icon} size={20} color="#fff" />
            </View>

            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemSubtitle}>{item.time}</Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.itemCategory}>
              <Text>{item.category}</Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.itemAmount}>
              <Text
                style={{
                  color: item.amount < 0 ? "#0094ff" : "#00c690",
                  fontWeight: "bold",
                }}
              >
                {item.amount < 0
                  ? `-R$${Math.abs(item.amount).toFixed(2)}`
                  : `R$${item.amount.toFixed(2)}`}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#EAFBEF",
    borderRadius: 30,
    padding: 4,
    margin: 20,
    justifyContent: "space-between",
  },
  dividerHorizotal: {
    width: 1,
    height: "30%",
    backgroundColor: "#000",
    marginHorizontal: "10%",
  },
  tabItem: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  tabText: {
    color: "#333",
    fontWeight: "500",
  },
  activeTabItem: {
    backgroundColor: "#16d89e",
  },
  activeTabText: {
    color: "white",
    fontWeight: "bold",
  },

  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0fdf9",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  iconWrapper: {
    backgroundColor: "#0094ff",
    padding: 10,
    borderRadius: 50,
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  itemSubtitle: {
    color: "#666",
    fontSize: 12,
  },
  itemCategory: {
    flex: 1,
    alignItems: "center",
  },
  itemAmount: {
    flex: 1,
    alignItems: "flex-end",
  },
  separator: {
    width: 1,
    height: "100%",
    backgroundColor: "#16d89e", // cor da linha
    marginHorizontal: 8,
  },
});
