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
  ScrollView,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { StatusBar } from "expo-status-bar";
import { TabBar } from "@/components/TabBar";
import { useAuth } from "@/contexts/auth";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { user } = useAuth();
  const colorScheme = useColorScheme();
  const [modalVisible, setModalVisible] = useState(false);
  const screenHeight = Dimensions.get("window").height;
  const [animation] = useState(new Animated.Value(screenHeight));

  // const handleNavigateProfile = () => {
  //   setModalVisible(false);
  //   router.push("/perfil");
  // };

  const openModal = () => {
    setModalVisible(true);
    Animated.timing(animation, {
      toValue: 0,
      duration: 400,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(animation, {
      toValue: screenHeight,
      duration: 300,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
    });
  };

  return (
    <>
      <StatusBar style="auto" />
      <Tabs
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: useClientOnlyValue(false, true),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "",
            headerShown: true,
            headerTransparent: true,
            headerStyle: { backgroundColor: "#00D09E" },
            headerTitle: () => (
              <>
                <View>
                  <Text style={{ color: "white", fontSize: 22 }}>
                    Olá, Bem Vindo
                  </Text>
                  <Text style={{ color: "white", fontFamily: "monospace" }}>
                    Bom dia
                  </Text>
                </View>
                {modalVisible && (
                  <Modal
                    transparent
                    animationType="none"
                    visible={modalVisible}
                  >
                    <View style={styles.modalOverlay}>
                      <Animated.View
                        style={[
                          styles.modalContent,
                          {
                            transform: [{ translateY: animation }],
                          },
                        ]}
                      >
                        <Text style={styles.modalTitle}>
                          Este é o conteúdo do modal!
                        </Text>

                        <TouchableOpacity
                          style={styles.closeButton}
                          onPress={closeModal}
                        >
                          <Text style={styles.closeButtonText}>Fechar</Text>
                        </TouchableOpacity>
                      </Animated.View>
                    </View>
                  </Modal>
                )}
              </>
            ),
            headerTitleAlign: "left",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
            // tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
            headerRight: () => (
              <Pressable
                onPress={openModal}
                style={({ pressed }) => [
                  { marginRight: 15, opacity: pressed ? 0.5 : 1 },
                ]}
              >
                <View
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 40,
                    padding: 7,
                  }}
                >
                  <FontAwesome
                    name="bell-o"
                    style={{ color: "black" }}
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                  />
                </View>
              </Pressable>
            ),
          }}
        />
        {/* <Tabs.Screen
          name="analytics"
          options={{
            title: "",
            headerTitle: "Criar Orçamento",
            headerTitleAlign: "center",
          }}
        /> */}
        <Tabs.Screen
          name="analytics"
          options={{
            headerShown: true,
            headerTransparent: true,
            title: "",
            headerStyle: { backgroundColor: "#00D09E" },
            headerTitle: () => (
              <>
                <View>
                  <Text style={{ color: "white", fontSize: 22 }}>
                    Olá, Bem Vindo
                  </Text>
                  <Text style={{ color: "white", fontFamily: "monospace" }}>
                    Bom dia
                  </Text>
                </View>
                {modalVisible && (
                  <Modal
                    transparent
                    animationType="none"
                    visible={modalVisible}
                  >
                    <View style={styles.modalOverlay}>
                      <Animated.View
                        style={[
                          styles.modalContent,
                          {
                            transform: [{ translateY: animation }],
                          },
                        ]}
                      >
                        <Text style={styles.modalTitle}>
                          Este é o conteúdo do modal!
                        </Text>

                        <TouchableOpacity
                          style={styles.closeButton}
                          onPress={closeModal}
                        >
                          <Text style={styles.closeButtonText}>Fechar</Text>
                        </TouchableOpacity>
                      </Animated.View>
                    </View>
                  </Modal>
                )}
              </>
            ),
            headerTitleAlign: "left",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
            headerRight: () => (
              <Pressable
                onPress={openModal}
                style={({ pressed }) => [
                  { marginRight: 15, opacity: pressed ? 0.5 : 1 },
                ]}
              >
                <View
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 40,
                    padding: 7,
                  }}
                >
                  <FontAwesome
                    name="bell-o"
                    style={{ color: "black" }}
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                  />
                </View>
              </Pressable>
            ),
          }}
        />
        <Tabs.Screen
          name="category"
          options={{
            headerShown: true,
            headerTransparent: true,
            title: "",
            headerStyle: { backgroundColor: "#00D09E" },
            headerTitle: () => (
              <>
                <View>
                  <Text style={{ color: "white", fontSize: 22 }}>
                    Olá, Bem Vindo
                  </Text>
                  <Text style={{ color: "white", fontFamily: "monospace" }}>
                    Bom dia
                  </Text>
                </View>
                {modalVisible && (
                  <Modal
                    transparent
                    animationType="none"
                    visible={modalVisible}
                  >
                    <View style={styles.modalOverlay}>
                      <Animated.View
                        style={[
                          styles.modalContent,
                          {
                            transform: [{ translateY: animation }],
                          },
                        ]}
                      >
                        <Text style={styles.modalTitle}>
                          Este é o conteúdo do modal!
                        </Text>

                        <TouchableOpacity
                          style={styles.closeButton}
                          onPress={closeModal}
                        >
                          <Text style={styles.closeButtonText}>Fechar</Text>
                        </TouchableOpacity>
                      </Animated.View>
                    </View>
                  </Modal>
                )}
              </>
            ),
            headerTitleAlign: "left",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
            headerRight: () => (
              <Pressable
                onPress={openModal}
                style={({ pressed }) => [
                  { marginRight: 15, opacity: pressed ? 0.5 : 1 },
                ]}
              >
                <View
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 40,
                    padding: 7,
                  }}
                >
                  <FontAwesome
                    name="bell-o"
                    style={{ color: "black" }}
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                  />
                </View>
              </Pressable>
            ),
          }}
        />
        <Tabs.Screen
          name="perfil"
          options={{
            headerShown: false,
            title: "",
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

  modalContent: {
    backgroundColor: "#ededed",
    paddingVertical: "20%",
    marginTop: "30%",
    borderRadius: 30,
    alignItems: "center",
    width: "100%",
    height: "90%",
    justifyContent: "center",
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
    marginTop: 10,
    padding: 10,
    backgroundColor: "#00D09E",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
