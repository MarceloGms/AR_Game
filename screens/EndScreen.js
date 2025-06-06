import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button"; // Custom Button component
import ConfettiCannon from "react-native-confetti-cannon"; // Import confetti cannon

export default function EndScreen({ route }) {
  const navigation = useNavigation();
  const { name, guesses } = route.params;

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-[#f9a826b3] p-6">
      {/* Confetti Cannon Triggered on Load */}
      <ConfettiCannon
        count={300}
        explosionSpeed={1000}
        fallSpeed={5000}
        origin={{ x: 0, y: 0 }}
        fadeOut={true}
      />

      <View className="w-full min-h-screen flex justify-around items-center p-4">
        <View />
        <View>
          <Text className="text-3xl font-bold text-center text-gray-800 mb-4">
            🎉 Congratulations! 🎉
          </Text>
          <Text className="text-2xl font-semibold text-center text-gray-700 mb-3">
              You completed the game in {guesses} attempts!
          </Text>
        </View>

        <Button
          title="Check the Monument"
          onPress={() =>
            navigation.navigate("MonumentInfoScreen", {
              name: route.params.name,
            })
          }
          bgColor="#0aa812"
        />
      </View>
    </SafeAreaView>
  );
}
