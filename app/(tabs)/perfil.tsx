import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { Text } from "@/components/Themed";
import { router } from "expo-router";
import { useContext } from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "@/components/useColorScheme.web";
import { useAuth } from "@/contexts/auth";
import { signOut } from "firebase/auth";
import { auth } from "@/firebaseconfig";

export default function Perfil() {
  const { user } = useAuth();
  const colorScheme = useColorScheme();
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.replace("../login");
    } catch (error) {
      console.error("Erro ao sair:", error);
    } finally {
      <ActivityIndicator size="large" color="#0000ff" />;
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      {/* <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}> */}
      <View style={styles.profileImageContainer}>
        {user?.image ? (
          <Image source={{ uri: user.image }} style={styles.profileImage} />
        ) : (
          <View style={styles.profileImagePlaceholder}>
            <FontAwesome name="user" size={50} color="#666" />
          </View>
        )}
      </View>
      <Text style={styles.name}>{user?.name || "Nome não disponível"}</Text>
      <Text style={styles.email}>{user?.email || "Email não disponível"}</Text>

      <TouchableOpacity style={styles.button}>
        <FontAwesome name="edit" size={20} color="white" />
        <Text style={styles.buttonText}>Editar Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <FontAwesome name="shield" size={20} color="white" />
        <Text style={styles.buttonText}>Política de Privacidade</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <FontAwesome name="cog" size={20} color="white" />
        <Text style={styles.buttonText}>Configurações</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <FontAwesome name="sign-out" size={20} color="white" />
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
      {/* </ThemeProvider> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00D09E",
  },
  profileImageContainer: {
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    backgroundColor: "#cccccc",
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "white",
  },
  email: {
    fontSize: 16,
    marginBottom: 30,
    opacity: 0.7,
    color: "white",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "#490",
    borderRadius: 50,
    width: 250,
    height: 60,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 10,
  },
  buttonLogin: {
    width: "100%",
    paddingHorizontal: 10,
    gap: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    borderColor: "#d3d3d3",
    backgroundColor: "#d3d3d3",
    borderWidth: 1,
    width: 400,
    height: 40,
    textAlign: "center",
    borderRadius: 10,
    marginBottom: 90,
    paddingHorizontal: 10,
  },
  headerText: {
    backgroundColor: "red",
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
    marginBottom: 60,
    marginTop: 150,
  },
  subText: {
    fontSize: 15,
    fontWeight: "black",
    color: "black",
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  emailAndPasswordField: {
    marginHorizontal: 15,
    textAlign: "left",
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "#ededed",
    paddingVertical: "20%",
    marginTop: "30%",
    borderRadius: 30,
    alignItems: "center",
    width: "100%",
    height: "90%",
    justifyContent: "center",
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#00D09E",
    borderRadius: 5,
  },
  closeText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
