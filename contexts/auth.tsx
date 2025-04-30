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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    try {
      const storedUser = await AsyncStorage.getItem("@react-native-learn:AuthUser");
      const isAuthenticated = await AsyncStorage.getItem("@react-native-learn:IsAuthenticated");

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
      const storedUser = await AsyncStorage.getItem("@react-native-learn:AuthUser");
      if (storedUser) {
        const parsedUser: AuthUser = JSON.parse(storedUser);
        if (parsedUser.email === email && parsedUser.password === password) {
          setUser(parsedUser);

          // Salva o estado de autenticação
          await AsyncStorage.setItem("@react-native-learn:IsAuthenticated", "true");

          Alert.alert(`Bem-vindo, ${parsedUser.name}!`);
          router.replace("/(tabs)"); // Redireciona para a tela principal
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
      // Exibe o indicador de carregamento
      setIsLoading(true);

      // Simula um tempo de processamento (exemplo: 2 segundos)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Salva o usuário no AsyncStorage
      await AsyncStorage.setItem(
        "@react-native-learn:AuthUser",
        JSON.stringify(newUser)
      );

      // Atualiza o estado do usuário e exibe a mensagem de sucesso
      setUser(newUser);
      Alert.alert("Cadastro realizado com sucesso!");
      router.replace("/(tabs)/orders"); // Redireciona para a tela principal
    } catch (error) {
      console.error("Erro ao salvar usuário", error);
      Alert.alert("Erro ao realizar o cadastro. Tente novamente.");
    } finally {
      // Oculta o indicador de carregamento
      setIsLoading(false);
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
      Alert.alert("Você saiu com sucesso!");
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
