import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

export default function SignUp() {
  const route = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      <TouchableOpacity
        onPress={() => route.push("/sign")}
        style={styles.button}
      >
        <Text>Cadastro</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: -10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: "1%",
    paddingVertical: "1%",
    paddingHorizontal: "3%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d3d3d3",
    borderRadius: 20,
  },
  text: {
    color: "black",
    fontSize: 15,
    justifyContent: "center",
    marginTop: 6,
    alignItems: "center",
  },
  image: {
    width: 450,
    height: 950,
    marginTop: -50,
  },
});
