import firestore from '@react-native-firebase/firestore';
import { SafeAreaView, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { useState, useEffect } from "react";

export default function BudgetScreen() {

  const [posts, setPosts] = useState<Array<any>>([]);

  useEffect(() => {
    const subListener = firestore()
      .collection('blogs')
      .onSnapshot((snapshot) => {
        if (snapshot) {
          setPosts(snapshot.docs);
        }
      });
    return () => subListener();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Orçamentos</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </SafeAreaView>
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
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

