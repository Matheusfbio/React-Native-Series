import {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import {
  DarkTheme,
  DefaultTheme,
  ParamListBase,
  TabNavigationState,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "@/components/useColorScheme.web";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <MaterialTopTabs>
        <MaterialTopTabs.Screen name="index" options={{ title: "Simples" }} />
        <MaterialTopTabs.Screen
          name="fixedCuston"
          options={{ title: "Personalizado" }}
        />
        <MaterialTopTabs.Screen name="budget" options={{ title: "planos" }} />
      </MaterialTopTabs>
    </ThemeProvider>
  );
}
