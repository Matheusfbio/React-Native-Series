import { AuthContext } from "@/contexts/auth";
import { router } from "expo-router";
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
  TouchableOpacity,
  View,
} from "react-native";

export default function Login() {
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
      return true; // Intercepta o botão de voltar
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // Remove o listener ao desmontar o componente
  }, []);

  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Bem vindo ao OrçaBox</Text>
        <Text style={styles.text}>Faça o seu login</Text>
        <TextInput
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
          style={styles.input}
        />
        <TextInput
          placeholder="Senha"
          onChangeText={setPassword}
          value={password}
          style={styles.input}
          secureTextEntry
        />
        <View style={styles.buttonLogin}>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.replace("/(sign-up)/sign-up")}
            style={styles.button}
          >
            <Text>Criar conta</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonLogin: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 20,
    gap: 10,
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  button: {
    alignItems: "center",
    // flexDirection:0 "row",
    // marginTop: 20,
    // margin: 16,
    textAlign: "center",
    justifyContent: "center",
    paddingVertical: 10,
    // backgroundColor: "#d3d3d3",
    borderRadius: 10,
    width: 200,
    height: 50,
  },
  input: {
    // textAlign: "center",
    // borderColor: "#d3d3d3",
    // backgroundColor: "#d3d3d3",
    borderWidth: 1,
    width: 400,
    height: 40,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginBottom: 30,
    paddingHorizontal: 10,
  },
});
