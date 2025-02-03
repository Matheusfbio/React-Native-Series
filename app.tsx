import { Slot } from "expo-router";
import { NavigationContainer } from "@react-navigation/native";
import AuthProvider from "./contexts/auth";

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Slot />
      </NavigationContainer>
    </AuthProvider>
  );
}
