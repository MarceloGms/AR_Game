import React, { useEffect, useState } from "react";
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
import bgImg from "../assets/bgImg.jpg";
import monumentsData from "../components/MonumentsData";

export default function MonumentInfoScreen({ route }) {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setName(route.params.name);
    setImage(route.params.image);
    setDescription(route.params.description);

    if (!name || !image || !description) {
      const formattedName = route.params.name.toLowerCase().replace(/\s+/g, ""); // format the received name

      const monumentData = monumentsData
        .flat()
        .find(
          (monument) =>
            monument.name.toLowerCase().replace(/\s+/g, "") === formattedName
        );

      if (monumentData) {
        setName(monumentData.name);
        setImage(monumentData.image);
        setDescription(monumentData.description);
      }
    }
  }, [route.params.name, route.params.image, route.params.description]);

  return (
    <ImageBackground
      source={bgImg}
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
      }}
      resizeMode="cover"
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
                fontSize: 36,
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
                fontSize: 20,
                color: "#e5e7eb",
                lineHeight: 24,
              }}
            >
              {description}
            </Text>
          </View>

          <View style={{ paddingVertical: 16, alignSelf: "flex-start" }}>
            <BackButton
              onPress={() => navigation.navigate("MyMonuments")}
              icon="arrow-back-outline"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
