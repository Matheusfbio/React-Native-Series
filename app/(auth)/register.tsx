import { useColorScheme } from "@/components/useColorScheme.web";
import { useAuth } from "@/contexts/auth";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const colorScheme = useColorScheme();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const nameRef = useRef("");
  const { register: registerUser } = useAuth();

  const handleSubmit = async () => {
    const name = nameRef.current.trim();
    const email = emailRef.current.trim();
    const password = passwordRef.current;

    if (!name || !email || !password) {
      Alert.alert("Preencha todos os campos!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Email inválido!");
      return;
    }

    setIsLoading(true);

    const res = await registerUser(name, email, password);

    setIsLoading(false);

    console.log("register result ", res);
    if (!res.sucess) {
      Alert.alert("Sign up", res.msg);
    }
  };

  useEffect(() => {
    const backAction = () => {
      router.replace("/");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <>
      <StatusBar style="auto" />
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.headerText}>Criar conta</Text>
          <View
            style={{
              width: "100%",
              paddingVertical: 80,
              borderRadius: 60,
              height: "80%",
              backgroundColor: "#fff",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "400", marginLeft: 28 }}>
              Nome completo
            </Text>
            <TextInput
              placeholder="João da Silva"
              onChangeText={(value) => (nameRef.current = value)}
              style={styles.input}
            />
            <Text style={{ fontSize: 16, fontWeight: "400", marginLeft: 28 }}>
              Email
            </Text>
            <TextInput
              placeholder="exemplo@email.com"
              onChangeText={(value) => (emailRef.current = value)}
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <Text style={{ fontSize: 16, fontWeight: "400", marginLeft: 28 }}>
              Senha
            </Text>
            <TextInput
              placeholder="********"
              onChangeText={(value) => (passwordRef.current = value)}
              style={styles.input}
              secureTextEntry
            />
            <>
              {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                  <Text style={{ fontSize: 19 }}>Criar</Text>
                </TouchableOpacity>
              )}
            </>
            <TouchableOpacity
              onPress={() => router.navigate("/")}
              style={styles.button}
            >
              <Text style={{ fontSize: 19 }}>voltar</Text>
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
  button: {
    alignItems: "center",
    marginHorizontal: 120,
    marginVertical: 10,
    textAlign: "center",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: "#490",
    borderRadius: 50,
    width: 200,
    height: 50,
  },
  input: {
    borderColor: "#d3d3d3",
    backgroundColor: "#d3d3d3",
    borderWidth: 1,
    alignSelf: "center",
    width: 400,
    height: 40,
    textAlign: "center",
    borderRadius: 10,
    marginBottom: 10,
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
    textAlign: "left",
  },
});
