import { AuthContext } from "@/contexts/auth";
import { Link, router } from "expo-router";
import { useContext, useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
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

  return (
    <SafeAreaView style={styles.container}>
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
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.replace("/perfil")}
        style={styles.button}
      >
        <Text>Perfil</Text>
      </TouchableOpacity>
      <SafeAreaView>
        <Link href={"/sign-up"}>
          <Text>Criar um novo registro</Text>
        </Link>
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
