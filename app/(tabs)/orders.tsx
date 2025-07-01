import { router, Stack, useFocusEffect } from "expo-router";
import React, { useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useSQLiteContext } from "expo-sqlite";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "@/components/useColorScheme.web";

export default function Orders() {
  const colorScheme = useColorScheme();
  const [data, setData] = React.useState<
    { id: number; name: string; email: string }[]
  >([]);

  const database = useSQLiteContext();

  const handleDelete = async (id: number) => {
    try {
      const response = await database.runAsync(
        `DELETE FROM users WHERE id = ?`,
        [id]
      );
      console.log("Item deleted successfully:", response?.changes!);
      loadData(); // Refresh the data after deletion
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  useFocusEffect(
    useCallback(() => {
      loadData(); // Fetch data when the screen is focused
    }, [])
  );
  const loadData = async () => {
    const result = await database.getAllAsync<{
      id: number;
      name: string;
      email: string;
    }>("SELECT * FROM users");
    setData(result);
  };

  const headerRight = () => (
    <TouchableOpacity
      onPress={() => router.push("../cart")}
      style={{ marginRight: 10 }}
    >
      <FontAwesome name="plus-circle" size={28} color="blue" />
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack.Screen options={{ headerRight }} />
        <View>
          <FlatList
            data={data}
            renderItem={({
              item,
            }: {
              item: { id: number; name: string; email: string };
            }) => (
              <View style={{ padding: 10 }}>
                <View
                  style={{
                    borderRadius: 10,
                    padding: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        color: colorScheme === "dark" ? "#fff" : "#fff",
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        color: colorScheme === "dark" ? "#fff" : "#fff",
                      }}
                    >
                      {item.email}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      router.push(`/cart?id=${item.id}`);
                    }}
                    style={styles.EditButton}
                  >
                    <Text style={styles.buttonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      handleDelete(item.id);
                    }}
                    style={styles.DeleteButton}
                  >
                    <Text style={styles.buttonText}>delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </ThemeProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  EditButton: {
    height: 30,
    width: 70,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "20%",
    borderRadius: 5,
    backgroundColor: "blue",
  },
  DeleteButton: {
    height: 30,
    width: 70,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "blue",
    alignContent: "flex-end",
  },
  buttonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
  },
});
