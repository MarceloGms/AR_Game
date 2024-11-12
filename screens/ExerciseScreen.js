import React, { useEffect, useState } from "react";
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
  const [lastCheckpoint, setLastCheckpoint] = useState(false);
  const navigation = useNavigation();

  const startChallenge = () => {
    setChallengeStarted(true);
  };

  const handleCompleteExercise = () => {
    setIsCompleted(true);

    if (lastCheckpoint) {
      navigation.navigate("EndScreen", {
        name: route.params.monumentName,
      }); // Navigate to EndScreen if this is the last checkpoint
    } else {
      // Otherwise, navigate back to the GameScreen
      navigation.navigate("GameScreen", {
        name: route.params.monumentName, // Pass the monument name to the GameScreen
        latitude: route.params.latitude,
        longitude: route.params.longitude,
        isCompleted: true, // Pass isCompleted
      });
    }
  };

  // Check if it's the last checkpoint only after timer finishes
  useEffect(() => {
    if (timerFinished) {
      const completedCheckpoints = route.params.completedCheckpoints;
      const checkpoints = route.params.checkpoints;
      const nextCheckpointIndex = completedCheckpoints.length;

      if (nextCheckpointIndex === checkpoints.length - 1) {
        setLastCheckpoint(true);
      }
    }
  }, [
    route.params.completedCheckpoints,
    route.params.checkpoints,
    timerFinished,
  ]);

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

      {/* Conditional Rendering for Buttons after timer finishes */}
      {timerFinished &&
        (lastCheckpoint ? (
          <Button
            title="Finish Game"
            onPress={handleCompleteExercise}
            bgColor="#0aa812"
          />
        ) : (
          <Button
            title="Voltar ao Mapa"
            onPress={handleCompleteExercise}
            bgColor="#f9a826b3"
          />
        ))}

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
