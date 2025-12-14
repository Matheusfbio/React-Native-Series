import { Slot } from "expo-router";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  ThemeProvider,
} from "@react-navigation/native";
import AuthProvider from "./contexts/auth";
import { useColorScheme } from "./components/useColorScheme.web";

export default function App() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <NavigationContainer>
          <Slot />
        </NavigationContainer>
      </AuthProvider>
    </ThemeProvider>
  );
}
