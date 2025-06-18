import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkTutorial = async () => {
      const hasSeen = await AsyncStorage.getItem("hasSeenTutorial");

      if (hasSeen === "true") {
        router.replace("/login");
      } else {
        router.replace("/tutorial"); // 👈 redireciona para o tutorial
      }

      setLoading(false);
    };

    checkTutorial();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return null;
}
