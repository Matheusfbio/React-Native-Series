import CustomTabs from "@/components/CustonTabs";
import ExpenseSummary from "@/components/ExpenseSummary";
import FinanceCard from "@/components/FinanceCard";
import GoalProgressCard from "@/components/GoalProgressCard";
import { useColorScheme } from "@/components/useColorScheme.web";
import type Colors from "@/constants/Colors";
import MocksData from "@/constants/mocks";
import { useAuth } from "@/contexts/auth";
import { FontAwesome } from "@expo/vector-icons";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  BackHandler,
  Button,
  Dimensions,
  Easing,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  const colorScheme = useColorScheme();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const screenHeight = Dimensions.get("window").height;
  const [animation] = useState(new Animated.Value(screenHeight));

  const handleTabChange = (tab: "Daily" | "Weekly" | "Monthly") => {
    console.log("Tab selecionada:", tab);
    // Atualize o estado com dados diferentes se quiser
  };

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

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Preencha todos os campos!");
      return;
    }
    login(email, password);
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Sair do aplicativo", "Você tem certeza que deseja sair?", [
        { text: "Cancelar", style: "cancel" },
        { text: "Sair", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // Remove o listener ao desmontar o componente
  }, []);

  return (
    <>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <StatusBar style="inverted" />
        <SafeAreaView style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 1,
              height: "6%",
              width: "90%",
            }}
          ></View>
          <ExpenseSummary
            balance={7783}
            expense={-1187.4}
            totalBudget={20000}
          />
          {modalVisible && (
            <Modal transparent animationType="none" visible={modalVisible}>
              <View style={styles.modalOverlay}>
                <Animated.View
                  style={[
                    styles.modalContent,
                    {
                      transform: [{ translateY: animation }],
                    },
                  ]}
                >
                  <Text style={{ marginBottom: 20 }}>
                    Este é o conteúdo do modal!
                  </Text>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={closeModal}
                  >
                    <Text style={styles.closeText}>Fechar</Text>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            </Modal>
          )}

          <View
            style={{
              width: "100%",
              borderRadius: 60,
              marginBottom: -80,
              height: "70%",
              backgroundColor: "#fff",
            }}
          >
            <View
              style={{
                flex: 1,
                width: "85%",
                marginTop: 30,
                marginLeft: "8%",
              }}
            >
              <FinanceCard />
              <CustomTabs onTabChange={handleTabChange} />
            </View>
          </View>
        </SafeAreaView>
      </ThemeProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00D09E",
  },
  buttonLogin: {
    width: "100%",
    paddingHorizontal: 10,
    gap: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: "#490",
    borderRadius: 50,
    width: 200,
    height: 50,
  },
  input: {
    // textAlign: "center",
    borderColor: "#d3d3d3",
    backgroundColor: "#d3d3d3",
    borderWidth: 1,
    width: 400,
    height: 40,
    textAlign: "center",
    borderRadius: 10,
    marginBottom: 90,
    paddingHorizontal: 10,
  },
  headerText: {
    backgroundColor: "red",
    // width: "10%",
    // textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
    marginBottom: 60,
    marginTop: 150,
  },
  subText: {
    fontSize: 15,
    fontWeight: "black",
    color: "black",
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  emailAndPasswordField: {
    marginHorizontal: 15,
    // backgroundColor: "red",
    textAlign: "left",
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
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
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#00D09E",
    borderRadius: 5,
  },
  closeText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
