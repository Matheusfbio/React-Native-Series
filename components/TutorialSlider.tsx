// src/components/TutorialSlider.tsx
import { router } from "expo-router";
import React, { useRef } from "react";
import {
  View,
  Text,
  Dimensions,
  FlatList,
  Animated,
  Button,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    title: "Bem-vindo!",
    description: "Este é o nosso app incrível!",
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

const TutorialSlider: React.FC = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const renderItem = ({ item }: any) => (
    <View style={{ width, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>{item.title}</Text>
      <Text style={{ fontSize: 16, marginTop: 10 }}>{item.description}</Text>
      {item.showButton && (
        <TouchableOpacity onPress={() => router.replace("/(sign-up)/sign-up")}>
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
            Login
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
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

      {/* Indicadores de página */}
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
    </SafeAreaView>
  );
};

export default TutorialSlider;
