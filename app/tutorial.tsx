// src/components/TutorialSlider.tsx
import { useColorScheme } from "@/components/useColorScheme.web";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { router } from "expo-router";
import React, { useRef } from "react";
import {
  View,
  Text,
  Dimensions,
  FlatList,
  Animated,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    title: "Bem-vindo!",
    description: "Este é o nosso app incrível!",
    image: require("../assets/images/icon.png"),
  },
  {
    id: "2",
    title: "Navegação fácil",
    description: "Explore tudo com apenas alguns toques!",
  },
  {
    id: "3",
    title: "Vamos começar!",
    description: "Aproveite a experiência!",
    showButton: true,
  },
];

export default function Tutorial() {
  const colorScheme = useColorScheme();
  const scrollX = useRef(new Animated.Value(0)).current;

  const renderItem = ({ item }: any) => (
    <View
      style={{
        width,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      {item.image && (
        <Image
          source={item.image}
          style={{
            width: 200,
            height: 200,
            marginBottom: 20,
          }}
          resizeMode="contain"
        />
      )}
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 10,
          color: "black",
        }}
      >
        {item.title}
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 20, color: "black" }}>
        {item.description}
      </Text>

      {item.showButton && (
        <TouchableOpacity onPress={() => router.replace("/login")}>
          <Text
            style={{
              fontSize: 16,
              marginTop: 10,
              paddingHorizontal: 42,
              paddingVertical: 12,
              borderRadius: 22,
              backgroundColor: "lightblue",
            }}
          >
            Continuar
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Animated.FlatList
          data={slides}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          {slides.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [8, 16, 8],
              extrapolate: "clamp",
            });

            return (
              <Animated.View
                key={i}
                style={{
                  height: 8,
                  width: dotWidth,
                  borderRadius: 4,
                  backgroundColor: "#333",
                  margin: 4,
                }}
              />
            );
          })}
        </View>
      </ThemeProvider>
    </SafeAreaView>
  );
}
