import { router, useRouter } from "expo-router";
import React, { createContext, useState, useEffect } from "react";
import { ActivityIndicator, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, firestore } from "@/firebaseconfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import type { AuthContextType, UserType } from "@/constants/types/types";

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: any) {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        updateUserData(firebaseUser.uid).finally(() => setLoading(false));
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  async function login(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { sucess: true };
    } catch (error: any) {
      let msg = error.message;
      console.log("error message", msg);
      if (msg.includes("(auth/invalid-credential)"))
        msg = "Email ou senha são invalidas";
      if (msg.includes("(auth/invalid-email)")) msg = "Email invalidas";
      return { sucess: false, msg };
    }
  }

  async function register(name: string, email: string, password: string) {
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
      });
      return { sucess: true };
    } catch (error: any) {
      let msg = error.message;
      console.log("error message", msg);
      if (msg.includes("(auth/email=already-in-use)"))
        msg = "Esse email esta sendo usado";
      if (msg.includes("(auth/invalid-email)")) msg = "Email invalida";
      return { sucess: false, msg };
    }
  }

  const updateUserData = async (uid: string) => {
    try {
      const docRef = doc(firestore, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const userData: UserType = {
          uid: data?.uid,
          email: data.email || null,
          name: data.name || null,
          image: data.image || null,
        };
        setUser({ ...userData });
      }
    } catch (error: any) {
      let msg = error.message;
      return { sucess: false, msg };
    }
  };

  async function logout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Erro ao sair", error);
    }
  }

  const contextValue: AuthContextType = {
    user,
    setUser,
    loading,
    register,
    login,
    updateUserData: updateUserData as (userId: string) => Promise<void>,
    signOut: logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
