import { router } from "expo-router";
import { createContext, useState } from "react";
import { Alert } from "react-native";

interface AuthUser {
  email: string;
  name: string;
  status: string;
  password: string;
}
interface AuthContextType {
  user: AuthUser | null;
  signUp: (name: string, email: string, password: string) => void;
  signIn: (email: string, password: string) => void;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export default function AuthProvider({ children }: any) {
  const [user, setUser] = useState<AuthUser | null>(null);

  function signIn(email: string, password: string) {
    if (user && user.email === email && user.password === password) {
      Alert.alert(`Bem-vindo, ${user.name}!`);
      router.replace("/(tabs)");
    } else {
      Alert.alert("Credenciais inválidas!");
    }
  }

  function signUp(name: string, email: string, password: string) {
    if (!name || !email || !password) {
      Alert.alert("Todos os campos são obrigatórios!");
      return;
    }

    const newUser: AuthUser = {
      name,
      email,
      status: "Ativo",
      password,
    };

    setUser(newUser);
    Alert.alert("Cadastro realizado com sucesso!");
    router.replace("/"); // Redireciona para login
  }
  return (
    <AuthContext.Provider value={{ signUp, signIn, user }}>
      {children}
    </AuthContext.Provider>
  );
}
