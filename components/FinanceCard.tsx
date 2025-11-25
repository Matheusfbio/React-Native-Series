// components/FinanceCard.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

export default function FinanceCard() {
  const size = 70;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = 0.75; // 75%
  const progressStroke = circumference * (1 - progress);

  return (
    <View style={styles.card}>
      {/* Left Column */}
      <View style={styles.leftSection}>
        <Svg width={size} height={size}>
          <Circle
            stroke="#E0E0E0"
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Circle
            stroke="#007BFF"
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={progressStroke}
            strokeLinecap="round"
            rotation="-90"
            origin={`${size / 2}, ${size / 2}`}
          />
        </Svg>
        <View style={styles.iconAbsolute}>
          <FontAwesome name="heart" size={24} color="#000" />
        </View>
        <Text style={styles.label}>Savings{"\n"}On Goals</Text>
      </View>

      <View style={styles.dividerHorizotal} />

      {/* Right Column */}
      <View style={styles.rightSection}>
        <View style={styles.row}>
          <MaterialIcons name="attach-money" size={24} color="#000" />
          <View style={styles.textGroup}>
            <Text style={styles.infoLabel}>Revenue Last Week</Text>
            <Text style={styles.amountPositive}>$4,000.00</Text>
          </View>
        </View>
        <View style={styles.dividerVertical} />
        <View style={styles.row}>
          <MaterialIcons name="restaurant" size={24} color="#000" />
          <View style={styles.textGroup}>
            <Text style={styles.infoLabel}>Food Last Week</Text>
            <Text style={styles.amountNegative}>- $100.00</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#1ddbb4",
    padding: 16,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftSection: {
    alignItems: "center",
    marginRight: -5,
    marginLeft: 15,
  },
  iconAbsolute: {
    position: "absolute",
    top: "22%",
    left: "33%",
  },
  label: {
    marginTop: 6,
    textAlign: "center",
    fontWeight: "600",
    fontSize: 12,
    color: "#000",
  },
  dividerHorizotal: {
    width: 1,
    height: "100%",
    backgroundColor: "#fff",
    marginHorizontal: "10%",
  },
  dividerVertical: {
    width: "90%",
    height: 1,
    backgroundColor: "#fff",
    marginHorizontal: "4%",
    marginBottom: "4.5%",
  },
  rightSection: {
    flex: 1,
    justifyContent: "space-evenly",
    marginLeft: "-6%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  textGroup: {
    marginLeft: 8,
  },
  infoLabel: {
    fontSize: 17,
    color: "#000",
  },
  amountPositive: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  amountNegative: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0047FF",
  },
});
