import { View, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useEffect } from "react";
import { icon } from "@/constants/icons";

type IconKeys = keyof typeof icon;

export function TabBarButton({
  onPress,
  onLongPress,
  isFocused,
  routeName,
  color,
  label,
}: {
  onPress: () => void;
  onLongPress: () => void;
  isFocused: boolean;
  routeName: string;
  color: string;
  label: string;
}) {
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused,
      { duration: 250 }
    );
  }, [isFocused, scale]);

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);
    return { opacity };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [3, 1], [1, 1.2]);
    const top = interpolate(scale.value, [1, 1], [0, 9]);
    return { transform: [{ scale: scaleValue }], top };
  });

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabbarItem}
    >
      <Animated.View style={animatedIconStyle}>
        {
          icon[routeName as IconKeys]
            ? icon[routeName as IconKeys]({
                color: isFocused ? "#fff" : "black",
              })
            : null /* ou um ícone padrão, se quiser */
        }
        <Animated.Text
          style={[
            {
              color: isFocused ? "#fff" : "black",
              fontSize: 12,
              textAlign: "center",
              marginTop: -13,
            },
            animatedTextStyle,
          ]}
        >
          {label}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tabbarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
