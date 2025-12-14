import { useColorScheme } from "@/components/useColorScheme.web";
import type Colors from "@/constants/Colors";
import { useAuth } from "@/contexts/auth";
import { SimpleLineIcons } from "@expo/vector-icons";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Link, router, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useRef, useState } from "react";
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

export default function Login() {
  const colorScheme = useColorScheme();
  const [loading, setLoading] = useState(false);
  const { login: loginUser } = useAuth();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Preencha todos os campos!");
      return;
    }

    setLoading(true);
    const res = await loginUser(emailRef.current, passwordRef.current);
    setLoading(false);
    
    if (!res.sucess) {
      Alert.alert("Login", res.msg);
    } else {
      router.replace("/(tabs)");
    }
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
                onChangeText={(value) => (emailRef.current = value)}
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
                onChangeText={(value) => (passwordRef.current = value)}
                style={styles.input}
                secureTextEntry
              />
            </SafeAreaView>
            <View style={styles.buttonLogin}>
              {loading ? (
                <ActivityIndicator
                  size="large"
                  color="#00D09E"
                  style={styles.button}
                />
              ) : (
                <TouchableOpacity onPress={handleLogin} style={styles.button}>
                  <Text style={{ fontSize: 19 }}>Log in</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={{ marginTop: 1, padding: 12 }}
                onPress={() => router.replace("../recovery")}
                // onPress={() =>
                //   ToastAndroid.show(
                //     "Funcionalidade em breve",
                //     ToastAndroid.SHORT
                //   )
                // }
              >
                <Text>Esqueceu a sua senha?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.replace("../(auth)/register")}
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
                onPress={() => router.replace("../(auth)/register")}
              >
                <Text>crie agora</Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                marginLeft: "40%",
                marginBottom: 15,
                marginTop: 2,
                fontFamily: "monospace",
              }}
            >
              Ou entre com
            </Text>
            <TouchableOpacity
              style={{
                // backgroundColor: "red",
                width: "10%",
                marginHorizontal: "45%",
              }}
              onPress={() =>
                ToastAndroid.show(
                  "Não esta funcionando no momento",
                  ToastAndroid.SHORT
                )
              }
            >
              <SimpleLineIcons name="social-google" size={44} />
            </TouchableOpacity>
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
