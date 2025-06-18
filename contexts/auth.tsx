import { router } from "expo-router";
import { createContext, useState, useEffect } from "react";
import { ActivityIndicator, Alert } from "react-native";
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

  useEffect(() => {
    AsyncStorage.getAllKeys().then((keys) =>
      console.log("Chaves armazenadas:", keys)
    );
    AsyncStorage.getItem("@react-native-learn:AuthUsers").then((data) =>
      console.log("Usuários armazenados:", data)
    );
  }, []);

  async function loadUser() {
    try {
      const storedUser = await AsyncStorage.getItem(
        "@react-native-learn:AuthUser"
      );
      const isAuthenticated = await AsyncStorage.getItem(
        "@react-native-learn:IsAuthenticated"
      );

      // Verifica se o usuário está autenticado antes de redirecionar
      if (storedUser && isAuthenticated === "true") {
        const parsedUser: AuthUser = JSON.parse(storedUser);
        setUser(parsedUser);
        router.replace("/(tabs)"); // Redireciona para a tela principal
      } else {
        setUser(null); // Garante que o estado do usuário seja limpo
      }
    } catch (error) {
      console.error("Erro ao carregar usuário do armazenamento local", error);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const storedUsers = await AsyncStorage.getItem(
        "@react-native-learn:AuthUsers"
      );
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      // Procura o usuário com o e-mail e senha fornecidos
      const foundUser = users.find(
        (user: AuthUser) => user.email === email && user.password === password
      );

      if (foundUser) {
        setUser(foundUser);

        await AsyncStorage.setItem(
          "@react-native-learn:AuthUser",
          JSON.stringify(foundUser)
        );
        await AsyncStorage.setItem(
          "@react-native-learn:IsAuthenticated",
          "true"
        );

        // Alert.alert(`Bem-vindo, ${foundUser.name}!`);
        router.replace("/(tabs)");
        return;
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
      const storedUsers = await AsyncStorage.getItem(
        "@react-native-learn:AuthUsers"
      );
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      // Verifica se o e-mail já está cadastrado
      if (users.some((user: AuthUser) => user.email === email)) {
        Alert.alert("E-mail já cadastrado!");
        return;
      }

      // Adiciona o novo usuário à lista
      users.push(newUser);
      await AsyncStorage.setItem(
        "@react-native-learn:AuthUsers",
        JSON.stringify(users)
      );

      Alert.alert("Cadastro realizado com sucesso!");
      setUser(newUser);
      await AsyncStorage.setItem(
        "@react-native-learn:AuthUser",
        JSON.stringify(newUser)
      );
      await AsyncStorage.setItem("@react-native-learn:IsAuthenticated", "true");
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Erro ao salvar usuário", error);
    }
  }

  async function signOut() {
    try {
      // Remove o estado de autenticação e os dados do usuário
      await AsyncStorage.removeItem("@react-native-learn:IsAuthenticated");
      await AsyncStorage.removeItem("@react-native-learn:AuthUser");
      setUser(null);

      // Redireciona para a tela principal (login)
      router.replace("/");
      // Alert.alert("Você saiu com sucesso!");
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
