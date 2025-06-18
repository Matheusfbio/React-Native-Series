import { useColorScheme } from "@/components/useColorScheme.web";
import type Colors from "@/constants/Colors";
import { AuthContext } from "@/contexts/auth";
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
  BackHandler,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";

export default function ScreenDefault() {
  const colorScheme = useColorScheme();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { signIn } = useContext(AuthContext);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Preencha todos os campos!");
      return;
    }
    signIn(email, password);
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
          <Text style={styles.headerText}>Bem vindo</Text>
          <View
            style={{
              width: "100%",
              paddingVertical: 80,
              borderRadius: 60,
              height: "80%",
              backgroundColor: "#fff",
            }}
          >
            <SafeAreaView style={styles.emailAndPasswordField}>
              <Text style={{ fontSize: 16, fontWeight: "400", marginLeft: 12 }}>
                Email
              </Text>
              <TextInput
                placeholder="example@example.com"
                onChangeText={setEmail}
                value={email}
                style={{
                  borderColor: "#d3d3d3",
                  backgroundColor: "#d3d3d3",
                  borderWidth: 1,
                  width: 400,
                  height: 40,
                  textAlign: "center",
                  borderRadius: 10,
                  marginBottom: 10,
                }}
              />
              <Text style={{ fontSize: 16, fontWeight: "400", marginLeft: 12 }}>
                Senha
              </Text>
              <TextInput
                placeholder="********"
                onChangeText={setPassword}
                value={password}
                style={styles.input}
                secureTextEntry
              />
            </SafeAreaView>
            <View style={styles.buttonLogin}>
              <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={{ fontSize: 19 }}>Log in</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ marginTop: 1, padding: 12 }}
                onPress={() =>
                  ToastAndroid.show(
                    "Funcionalidade em breve",
                    ToastAndroid.SHORT
                  )
                }
              >
                <Text>Esqueceu a sua senha?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.replace("/(sign-up)/sign-up")}
                style={styles.button}
              >
                <Text
                  style={{
                    fontSize: 19,
                    alignItems: "center",
                    textAlign: "center",
                    justifyContent: "center",
                    paddingVertical: 10,
                    backgroundColor: "#d3d3d3",
                    borderRadius: 50,
                    width: 200,
                    height: 50,
                  }}
                >
                  Criar conta
                </Text>
              </TouchableOpacity>
            </View>
            {/* <TouchableOpacity
            onPress={() => router.replace("/(top-tabs)/")}
            style={styles.button}
            >
            <Text>top tab</Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity style={{ marginTop: 1, padding: 12 }}> */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 20,
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Text>Nâo tem conta, </Text>
              <TouchableOpacity
                onPress={() => router.replace("/(sign-up)/sign-up")}
              >
                <Text>crie agora</Text>
              </TouchableOpacity>
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
    width: "100%",
    textAlign: "center",
    fontSize: 35,
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
});
