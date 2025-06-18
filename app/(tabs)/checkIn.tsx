import { useColorScheme } from "@/components/useColorScheme.web";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";

export default function CheckIn() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <View style={styles.container}>
        <Text style={styles.title}>Check-in</Text>
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
});
