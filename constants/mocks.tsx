import { View } from "@/components/Themed";
import { FlatList, SafeAreaView, Text } from "react-native";

export default function MocksData() {
  const mocks = [
    {
      id: 1,
      first_name: "Nealon",
      last_name: "Upshall",
      product: "Instant Pot",
      price: 89.99,
      category: "Kitchen",
    },
    {
      id: 2,
      first_name: "Burnaby",
      last_name: "Poge",
      product: "Strawberry Banana Smoothie Pack",
      price: 4.99,
      category: "Food - Frozen",
    },
    {
      id: 3,
      first_name: "Anneliese",
      last_name: "Chirm",
      product: "Teriyaki Tofu Stir-Fry",
      price: 7.49,
      category: "Food - Prepared Meals",
    },
    {
      id: 4,
      first_name: "Flory",
      last_name: "Schowenburg",
      product: "Coconut Cashew Yogurt",
      price: 1.99,
      category: "Food - Dairy Alternatives",
    },
    {
      id: 5,
      first_name: "Welbie",
      last_name: "Boner",
      product: "Smart Plant Monitor",
      price: 24.99,
      category: "Garden",
    },
    {
      id: 6,
      first_name: "Ermina",
      last_name: "Coil",
      product: "Sliced Avocado",
      price: 2.79,
      category: "Food - Produce",
    },
    {
      id: 7,
      first_name: "Roman",
      last_name: "Airds",
      product: "Fitness Smartwatch",
      price: 99.99,
      category: "Wearable Tech",
    },
    {
      id: 8,
      first_name: "Kizzie",
      last_name: "Bert",
      product: "Puzzle",
      price: 27.99,
      category: "Toys",
    },
    {
      id: 9,
      first_name: "Erma",
      last_name: "Harrigan",
      product: "Coconut Almond Granola",
      price: 4.99,
      category: "Food - Breakfast",
    },
    {
      id: 10,
      first_name: "Missie",
      last_name: "Silburn",
      product: "Coconut Curry Lentils",
      price: 5.79,
      category: "Food - Canned Goods",
    },
  ];

  return (
    <SafeAreaView>
      <FlatList
        data={mocks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ alignItems: "center" }}>
            <Text>{item.product}</Text>
            <Text>{item.category}</Text>
            <Text>{item.price}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
