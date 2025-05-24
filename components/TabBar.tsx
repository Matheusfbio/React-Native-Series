import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import { Text } from "@react-navigation/elements";
import { type BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import type { ReactNode } from "react";
import type { LabelPosition } from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import type BudgetScreen from "./budget/BudgetScreen";
import type TabLayout from "@/app/(tabs)/_layout";
import type CheckIn from "@/app/(tabs)/checkIn";

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors } = useTheme();
  // const { buildHref } = useLinkBuilder();

  const icon = {
    "(top-tabs)": (props: any) => <Feather name="home" size={40} {...props} />,
    orders: (props: any) => <Feather name="plus-circle" size={40} {...props} />,
    checkIn: (props: any) => (
      <Feather name="shopping-bag" size={40} {...props} />
    ),
  };

  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const renderLabel = (): ReactNode => {
          if (typeof label === "function") {
            return label({
              focused: isFocused,
              color: isFocused ? colors.primary : colors.text,
              position: "below-icon" as LabelPosition,
              children: route.name,
            });
          }

          return (
            <Text style={{ color: isFocused ? colors.primary : colors.text }}>
              {(icon as Record<string, (props: any) => ReactNode>)[
                route.name
              ]?.({
                color: isFocused ? "blue" : "#222",
              })}
              {label}
            </Text>
          );
        };

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabbarItem}
          >
            {/* <Feather
              name="home"
              size={30}
              color={isFocused ? colors.primary : "#444"}
            /> */}
            {renderLabel()}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 110,
    marginVertical: -20,
    paddingVertical: 15,
    borderRadius: 35,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  tabbarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
