import React, { useContext, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, router, Tabs } from "expo-router";
import {
  Pressable,
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { StatusBar } from "expo-status-bar";
import { AuthContext } from "@/contexts/auth";
import { TabBar } from "@/components/TabBar";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { user } = useContext(AuthContext);
  const colorScheme = useColorScheme();
  const [isModalVisible, setModalVisible] = useState(false);

  const handleNavigateProfile = () => {
    setModalVisible(false);
    router.push("/perfil");
  };

  return (
    <>
      <StatusBar style="auto" />

      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalOptions}>
              <TouchableOpacity onPress={handleNavigateProfile}>
                <FontAwesome
                  name="user-circle-o"
                  size={40}
                  color={Colors[colorScheme ?? "light"].text}
                  style={{ marginRight: 15 }}
                />
              </TouchableOpacity>
              <Text>{user?.email}</Text>
              <Text>Status: {user?.status}</Text>
            </View>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Tabs
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: useClientOnlyValue(false, true),
        }}
      >
        <Tabs.Screen
          name="(top-tabs)"
          options={{
            title: "",
            headerTitle: "OrçaBox",
            headerTitleAlign: "center",
            // tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
            headerRight: () => (
              <Pressable onPress={() => setModalVisible(true)}>
                {({ pressed }) => (
                  <FontAwesome
                    name="cog"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            ),
          }}
        />
        <Tabs.Screen
          name="orders"
          options={{
            title: "",
            // tabBarIcon: ({ color }) => (
            //   <TabBarIcon name="plus-circle" color={color} />
            // ),
          }}
        />
        <Tabs.Screen
          name="checkIn"
          options={{
            title: "",
            // tabBarIcon: ({ color }) => (
            //   <TabBarIcon name="buysellads" color={color} />
            // ),
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    textAlign: "center",
    alignItems: "center",
    alignContent: "center",
  },
  modalContainer: {
    // backgroundColor: "red",
    backgroundColor: "white",
    textAlign: "center",
    marginTop: "145%",
    padding: 30,
    justifyContent: "center",
    borderRadius: 10,
    width: "90%",
    elevation: 10,
  },
  modalOptions: {
    // backgroundColor: "yellow",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
