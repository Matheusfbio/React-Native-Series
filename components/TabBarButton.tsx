import { View, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useEffect } from "react";
import { AnimatedText } from "react-native-reanimated/lib/typescript/component/Text";
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
  routeName: IconKeys;
  color: string;
  label: string;
}) {
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused,
      { duration: 350 }
    );
  }, [isFocused, scale]);

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);
    return { opacity };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);
    const top = interpolate(scale.value, [0, 1], [0, 9]);
    return { transform: [{ scale: scaleValue }], top };
  });

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabbarItem}
    >
      <Animated.View style={animatedIconStyle}>
        {icon[routeName]({
          color: isFocused ? "white" : "black",
        })}

        <Animated.Text
          style={[
            {
              color: isFocused ? "blue" : "black",
              fontSize: 12,
              textAlign: "center",
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
  // tabbar: {

  // position: "absolute",

  // bottom: 50,

  // flexDirection: "row",

  // justifyContent: "space-between",

  // alignItems: "center",

  // backgroundColor: "#fff",

  // marginHorizontal: 110,

  // marginVertical: 40,

  // paddingVertical: 15,

  // borderRadius: 35,

  // shadowColor: "#000",

  // shadowOffset: { width: 0, height: 10 },

  // shadowRadius: 10,

  // shadowOpacity: 0.1,

  // },

  tabbarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
