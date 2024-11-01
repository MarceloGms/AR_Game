import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import BackButton from "../components/BackButton";
import { useNavigation } from "@react-navigation/native";
import bgImg from "../assets/bgImg.jpg"; // Fixed import: No need for curly braces

export default function MonumentInfoScreen({ route }) {
  const navigation = useNavigation();

  const { name, image, description } = route.params;

  return (
    <ImageBackground
      source={bgImg}
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
      }}
      resizeMode="cover"
      className="flex-1 justify-center items-center
    min-h-screen
    "
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1 }}
        >
          <View style={{ width: "100%", height: 288, paddingVertical: 16 }}>
            <Image
              source={image}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 12,
                shadowColor: "#000",
                shadowOpacity: 0.3,
                shadowRadius: 6,
                shadowOffset: { width: 0, height: 2 },
              }}
              resizeMode="cover"
            />
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text
              style={{
                fontSize: 32,
                fontWeight: "bold",
                textAlign: "center",
                color: "#d1d5db",
              }}
            >
              {name}
            </Text>
          </View>

          <View
            style={{
              backgroundColor: "rgba(159, 97, 30, 0.17)",
              padding: 16,
              borderRadius: 12,
              shadowColor: "#000",
              shadowOpacity: 0.3,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 2 },
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#e5e7eb",
                lineHeight: 24,
              }}
            >
              {description}
            </Text>
          </View>

          <View style={{ paddingVertical: 16, alignSelf: "flex-start" }}>
            <BackButton
              onPress={() => navigation.goBack()}
              icon="arrow-back-outline"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
