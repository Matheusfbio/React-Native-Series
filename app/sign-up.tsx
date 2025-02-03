// import { AuthContext } from "@/contexts/auth";
// import { useContext, useState } from "react";
// import {
//   Alert,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
// } from "react-native";

// export default function SignUp() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { signIn } = useContext(AuthContext);

//   const handleSubmit = () => {
//     if (!email || !password) {
//       Alert.alert("Todos os campos são obrigatórios!");
//       return;
//     }
//     signIn(email, password);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <TextInput
//         placeholder="Digite seu email"
//         onChangeText={setEmail}
//         value={email}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Digite sua senha"
//         onChangeText={setPassword}
//         value={password}
//         style={styles.input}
//         secureTextEntry
//       />
//       <TouchableOpacity onPress={handleSubmit} style={styles.button}>
//         <Text>Cadastrar</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", alignItems: "center" },
//   button: {
//     marginTop: 10,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     backgroundColor: "#d3d3d3",
//     borderRadius: 10,
//   },
//   input: {
//     borderWidth: 1,
//     width: 250,
//     height: 40,
//     borderRadius: 10,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//   },
// });

import { AuthContext } from "@/contexts/auth";
import { useContext, useState } from "react";
import {
  Alert,
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

  const authContext = useContext(AuthContext);

  const { signUp } = authContext;

  const handleSubmit = () => {
    if (!name || !email || !password) {
      Alert.alert("Todos os campos são obrigatórios!");
      return;
    }
    signUp(name, email, password);
  };

  return (
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
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text>Entrar</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
