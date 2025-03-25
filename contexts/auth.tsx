import { router } from "expo-router";
import { createContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthUser {
  email: string;
  name: string;
  status: string;
  password: string;
}

interface AuthContextType {
  user: AuthUser | null;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export default function AuthProvider({ children }: any) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    try {
      const storedUser = await AsyncStorage.getItem(
        "@react-native-learn:AuthUser"
      );
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Erro ao carregar usuário do armazenamento local", error);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const storedUser = await AsyncStorage.getItem(
        "@react-native-learn:AuthUser"
      );
      if (storedUser) {
        const parsedUser: AuthUser = JSON.parse(storedUser);
        if (parsedUser.email === email && parsedUser.password === password) {
          setUser(parsedUser);
          Alert.alert(`Bem-vindo, ${parsedUser.name}!`);
          router.replace("/(tabs)");
          return;
        }
      }
      Alert.alert("Credenciais inválidas!");
    } catch (error) {
      console.error("Erro ao fazer login", error);
    }
  }

  async function signUp(name: string, email: string, password: string) {
    if (!name || !email || !password) {
      Alert.alert("Todos os campos são obrigatórios!");
      return;
    }

    const newUser: AuthUser = { name, email, status: "Ativo", password };

    try {
      await AsyncStorage.setItem(
        "@react-native-learn:AuthUser",
        JSON.stringify(newUser)
      );
      setUser(newUser);
      Alert.alert("Cadastro realizado com sucesso!");
      router.replace("/"); // Redireciona para login
    } catch (error) {
      console.error("Erro ao salvar usuário", error);
    }
  }

  async function signOut() {
    try {
      await AsyncStorage.removeItem("@react-native-learn:AuthUser");
      setUser(null);
      router.replace("/");
    } catch (error) {
      console.error("Erro ao sair", error);
    }
  }

  return (
    <AuthContext.Provider value={{ signUp, signIn, signOut, user }}>
      {children}
    </AuthContext.Provider>
  );
}
