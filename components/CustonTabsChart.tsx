import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type ChartTab = "Daily" | "Weekly" | "Monthly" | "Year";

interface Props {
  onTabChange?: (tab: ChartTab) => void;
}

export default function CustomTabsChart({ onTabChange }: Props) {
  const [activeTab, setActiveTab] = useState<ChartTab>("Daily");

  const handleTabPress = (tab: ChartTab) => {
    setActiveTab(tab);
    onTabChange?.(tab); // só chama se for informado
  };

  return (
    <View style={styles.tabContainer}>
      {(["Daily", "Weekly", "Monthly", "Year"] as ChartTab[]).map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() => handleTabPress(tab)}
          style={[styles.tabItem, activeTab === tab && styles.activeTabItem]}
        >
          <Text
            style={[styles.tabText, activeTab === tab && styles.activeTabText]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#EAFBEF",
    borderRadius: 30,
    padding: 4,
    marginHorizontal: 20,
    marginVertical: 16,
    justifyContent: "space-between",
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
});
