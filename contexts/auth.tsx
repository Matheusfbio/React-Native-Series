import { router, useRouter } from "expo-router";
import React, { createContext, useState, useEffect } from "react";
import { ActivityIndicator, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "@/firebaseconfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import type { AuthContextType, UserType } from "@/constants/types/types";

// interface AuthUser {
//   email: string;
//   name: string;
//   status: string;
//   password: string;
// }

// interface AuthContextType {
//   user: AuthUser | null;
//   signUp: (name: string, email: string, password: string) => Promise<void>;
//   login: (email: string, password: string) => Promise<void>;
//   signOut: () => Promise<void>;
// }


 const AuthContext = createContext<AuthContextType| null>(null);

export default function AuthProvider({ children }: any){
  const [user, setUser] = useState<UserType | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth,(firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          image: firebaseUser.photoURL,
        })
        router.replace("/(tabs)")
      }else{
        setUser(null)
        router.replace("/")
      }
    })
  }, []);

  // useEffect(() => {
  //   AsyncStorage.getAllKeys().then((keys) =>
  //     console.log("Chaves armazenadas:", keys)
  //   );
  //   AsyncStorage.getItem("@react-native-learn:AuthUsers").then((data) =>
  //     console.log("Usuários armazenados:", data)
  //   );
  // }, []);

  // async function loadUser() {
  //   try {
  //     const storedUser = await AsyncStorage.getItem(
  //       "@react-native-learn:AuthUser"
  //     );
  //     const isAuthenticated = await AsyncStorage.getItem(
  //       "@react-native-learn:IsAuthenticated"
  //     );

  //     // Verifica se o usuário está autenticado antes de redirecionar
  //     if (storedUser && isAuthenticated === "true") {
  //       const parsedUser: AuthUser = JSON.parse(storedUser);
  //       setUser(parsedUser);
  //       router.replace("/(tabs)"); // Redireciona para a tela principal
  //     } else {
  //       setUser(null); // Garante que o estado do usuário seja limpo
  //     }
  //   } catch (error) {
  //     console.error("Erro ao carregar usuário do armazenamento local", error);
  //   }
  // }

  async function login(email: string, password: string) {
    //Login with @AsyncStorage
    // try {
    //   const storedUsers = await AsyncStorage.getItem(
    //     "@react-native-learn:AuthUsers"
    //   );
    //   const users = storedUsers ? JSON.parse(storedUsers) : [];

    //   // Procura o usuário com o e-mail e senha fornecidos
    //   const foundUser = users.find(
    //     (user: AuthUser) => user.email === email && user.password === password
    //   );

    //   if (foundUser) {
    //     setUser(foundUser);

    //     await AsyncStorage.setItem(
    //       "@react-native-learn:AuthUser",
    //       JSON.stringify(foundUser)
    //     );
    //     await AsyncStorage.setItem(
    //       "@react-native-learn:IsAuthenticated",
    //       "true"
    //     );

    //     // Alert.alert(`Bem-vindo, ${foundUser.name}!`);
    //     router.replace("/(tabs)");
    //     return;
    //   }

    //   Alert.alert("Credenciais inválidas!");
    // } catch (error) {
    //   console.error("Erro ao fazer login", error);
    // }

    //Login with firebase
    try {
      await signInWithEmailAndPassword(auth,email,password);
      return{sucess: true}
    } catch (error: any) {
      let msg = error.message;
      console.log("error message", msg);
      if (msg.includes("(auth/invalid-credential)")) msg = "Email ou senha são invalidas" 
      if (msg.includes("(auth/invalid-email)")) msg = "Email invalidas" 
      return{sucess: false, msg}
    }
  }

  async function register(name: string, email: string, password: string) {
    // Register with @AsyncStorage
    // if (!name || !email || !password) {
    //   Alert.alert("Todos os campos são obrigatórios!");
    //   return;
    // }

    // const newUser: AuthUser = { name, email, status: "Ativo", password };

    // try {
    //   const storedUsers = await AsyncStorage.getItem(
    //     "@react-native-learn:AuthUsers"
    //   );
    //   const users = storedUsers ? JSON.parse(storedUsers) : [];

    //   // Verifica se o e-mail já está cadastrado
    //   if (users.some((user: AuthUser) => user.email === email)) {
    //     Alert.alert("E-mail já cadastrado!");
    //     return;
    //   }

    //   // Adiciona o novo usuário à lista
    //   users.push(newUser);
    //   await AsyncStorage.setItem(
    //     "@react-native-learn:AuthUsers",
    //     JSON.stringify(users)
    //   );

    //   Alert.alert("Cadastro realizado com sucesso!");
    //   setUser(newUser);
    //   await AsyncStorage.setItem(
    //     "@react-native-learn:AuthUser",
    //     JSON.stringify(newUser)
    //   );
    //   await AsyncStorage.setItem("@react-native-learn:IsAuthenticated", "true");
    //   router.replace("/(tabs)");
    // } catch (error) {
    //   console.error("Erro ao salvar usuário", error);
    // }
    try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await setDoc(doc(firestore, "users", response.user?.uid), {
      name,
      email,
      uid: response?.user?.uid,
      password,
    });
      return {sucess: true}
    } catch (error: any) {
      let msg = error.message;
      console.log("error message", msg);
      if (msg.includes("(auth/email=already-in-use)")) msg = "Esse email esta sendo usado" 
      if (msg.includes("(auth/invalid-email)")) msg = "Email invalida" 
      return{sucess: false, msg}
    }
  }

  const updateUserData = async (uid: string)  => {
    try {
      const docRef = doc(firestore, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const userData: UserType = {
          uid: data?.uid,
          email: data.email|| null,
          name: data.name || null,
          image: data.image|| null,
        };
        setUser({...userData});
      }
    } catch (error:any) {
      let msg = error.message;
      return{sucess: false, msg}
    }
  }

  // async function signOut() {
  //   try {
  //     // Remove o estado de autenticação e os dados do usuário
  //     await AsyncStorage.removeItem("@react-native-learn:IsAuthenticated");
  //     await AsyncStorage.removeItem("@react-native-learn:AuthUser");
  //     setUser(null);

  //     // Redireciona para a tela principal (login)
  //     router.replace("../");
  //     // Alert.alert("Você saiu com sucesso!");
  //   } catch (error) {
  //     console.error("Erro ao sair", error);
  //   }
  // }

  const contextValue: AuthContextType = {
    user,
    setUser,
    register,
    login,
    updateUserData: updateUserData as (userId: string) => Promise<void>,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}


export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;

}