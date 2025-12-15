import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "@/contexts/auth";

export default function Index() {
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (authLoading) return;

      if (user) {
        router.replace("/(tabs)");
      } else {
        const hasSeen = await AsyncStorage.getItem("hasSeenTutorial");
        if (hasSeen === "true") {
          router.replace("/(auth)/login");
        } else {
          router.replace("/(auth)/tutorial");
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [user, authLoading]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return null;
}
