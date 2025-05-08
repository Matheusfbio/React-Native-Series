import {
  Text,
  Pressable,
  PressableProps,
  StyleSheet,
  View,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

export type IconNameType = keyof typeof Entypo.glyphMap;

interface TabBarButtonProps extends PressableProps {
  title?: string;
  isFocused?: boolean;
  iconName: IconNameType;
}

export function DrawerButton({
  title = "",
  iconName,
  isFocused = false,
  ...rest
}: TabBarButtonProps) {
  return (
    <Pressable style={[styles.button, isFocused && styles.focused]} {...rest}>
      <View style={styles.content}>
        <Entypo name={iconName} size={32} color="#423532" />
        <Text style={styles.title}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 20,
    alignItems: "flex-start",
    gap: 12,
  },
  focused: {},
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 7,
    color: "#423532",
  },
});
