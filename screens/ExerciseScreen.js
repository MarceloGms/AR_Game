import React, { useState } from "react";
import { Text, SafeAreaView, View } from "react-native";
import { Video } from "expo-av";
import { useNavigation } from "@react-navigation/native";
import TimerBar from "../components/TimerBar"; // Keep the TimerBar component
import jumpingJack from "../assets/jumping_jack.mp4";
import Button from "../components/Button";

export default function ExerciseScreen({ route }) {
  const [challengeStarted, setChallengeStarted] = useState(false);
  const [timerFinished, setTimerFinished] = useState(false); // Track if timer is finished
  const [isCompleted, setIsCompleted] = useState(false);
  const navigation = useNavigation();

  const startChallenge = () => {
    setChallengeStarted(true);
  };

  const handleCompleteExercise = () => {
    setIsCompleted(true);
    // Go back to the GameScreen and pass data to mark the checkpoint as completed
    // Navigate back to the GameScreen after the challenge is done
    navigation.navigate("GameScreen", {
      name: route.params.monumentName, // Pass the monument name to the GameScreen
      latitude: route.params.latitude,
      longitude: route.params.longitude,
      isCompleted: true, // Pass isCompleted
    });
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white p-6">
      <Text className="text-3xl font-bold text-center text-gray-800 mb-6">
        Jumping Jack - 30s
      </Text>

      {/* Video Player */}
      <View className="w-full h-72 mb-6 rounded-lg overflow-hidden ">
        <Video
          source={jumpingJack}
          resizeMode="contain"
          shouldPlay={true}
          isLooping={true}
          style={{ width: "100%", height: "100%" }}
        />
      </View>

      {challengeStarted && !timerFinished ? (
        <TimerBar
          onTimerEnd={() => {
            setTimerFinished(true); // Set timer finished state to true when timer ends
          }}
        />
      ) : null}

      {/* Show "Voltar ao Mapa" button when the timer is finished */}
      {timerFinished && (
        <Button
          title="Voltar ao Mapa"
          onPress={handleCompleteExercise}
          bgColor="#f9a826b3"
        />
      )}

      {/* Show Start Challenge button if challenge isn't started */}
      {!challengeStarted && (
        <Button
          title="Start Challenge"
          onPress={startChallenge}
          bgColor="#0aa812"
        />
      )}
    </SafeAreaView>
  );
}
