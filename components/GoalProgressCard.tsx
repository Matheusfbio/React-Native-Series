// components/GoalProgressCard.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

interface GoalProgressCardProps {
  progress: number; // de 0 a 1
  iconName?: string;
  label: string;
}

const GoalProgressCard = ({ progress, label }: GoalProgressCardProps) => {
  const size = 90;
  const strokeWidth = 7;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressStroke = circumference * (1 - progress);

  return (
    <View style={styles.container}>
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

      <View style={styles.iconContainer}>
        <Ionicons name={"heart"} size={50} color="black" />
      </View>

      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginRight: "50%",
    marginTop: "8%",
  },
  iconContainer: {
    position: "absolute",
    top: "20%",
    left: "37%",
  },
  label: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
  },
});

export default GoalProgressCard;
