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
} from "react-native";

export default function SignIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const authContext = useContext(AuthContext);

  const { signUp } = authContext;

  const handleSubmit = () => {
    if (!name || !email || !password) {
      Alert.alert("Todos os campos são obrigatórios!");
      return;
    }
    signUp(name, email, password);
  };

   useEffect(() => {
      const backAction = () => {
        router.replace("/");
        return true; // Ensure the function returns a boolean
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
        <TextInput
          placeholder="Digite seu nome"
          onChangeText={setName}
          value={name}
          style={styles.input}
        />
        <TextInput
          placeholder="Digite seu email"
          onChangeText={setEmail}
          value={email}
          style={styles.input}
        />
        <TextInput
          placeholder="Digite sua senha"
          onChangeText={setPassword}
          value={password}
          style={styles.input}
          secureTextEntry
        />
        <>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />) :
          
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text>Criar</Text>
        </TouchableOpacity>
          } 
        </>
        <TouchableOpacity
          onPress={() => router.replace("/")}
          style={styles.button}
        >
          <Text>voltar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  button: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#d3d3d3",
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    width: 250,
    height: 40,
    borderColor: "#d3d3d3",
    backgroundColor: "#d3d3d3",
    borderRadius: 10,
    textShadowColor: "#d3d3d3",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
