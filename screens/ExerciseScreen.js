import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, View } from "react-native";
import { Video } from "expo-av";
import { useNavigation } from "@react-navigation/native";
import TimerBar from "../components/TimerBar"; // Keep the TimerBar component
import ex1 from "../assets/ex1.mp4";
import ex2 from "../assets/ex2.mp4";
import Button from "../components/Button";

const exercises = [
  {
    name: "Jumping Jack",
    duration: 10,
    video: ex1,
  },
  {
    name: "Squat",
    duration: 10,
    video: ex2,
  },
];

export default function ExerciseScreen({ route }) {
  const [challengeStarted, setChallengeStarted] = useState(false);
  const [timerFinished, setTimerFinished] = useState(false); // Track if timer is finished
  const [isCompleted, setIsCompleted] = useState(false);
  const [lastCheckpoint, setLastCheckpoint] = useState(false);
  const navigation = useNavigation();

  //select a random exercise
  const randomExercise =
    exercises[Math.floor(Math.random() * exercises.length)];

  const startChallenge = () => {
    setChallengeStarted(true);
  };

  const handleCompleteExercise = () => {
    setIsCompleted(true);

    if (lastCheckpoint) {
      navigation.navigate("FindWordScreen", {
        checkpoints: route.params.checkpoints,
        monumentName: route.params.monumentName,
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
        {randomExercise.name} - {randomExercise.duration}s
      </Text>

      {/* Video Player */}
      <View className="w-full h-72 mb-6 rounded-lg overflow-hidden ">
        {/* display a random video  */}
        <Video
          source={randomExercise.video}
          resizeMode="contain"
          shouldPlay={true}
          isLooping={true}
          style={{ width: "100%", height: "100%" }}
        />
        {/* <Video
					source={jumpingJack}
					resizeMode="contain"
					shouldPlay={true}
					isLooping={true}
					style={{ width: "100%", height: "100%" }}
				/> */}
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
            title="Collect letter"
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
