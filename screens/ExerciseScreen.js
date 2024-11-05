import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  Button,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import TimerBar from "../components/TimerBar";
import jumpingJackImg from "../assets/jumpingJack1.jpg";

export default function ExerciseScreen() {
  const [challengeStarted, setChallengeStarted] = useState(false);

  const startChallenge = () => {
    setChallengeStarted(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Jumping Jack - 30s</Text>

      <Image source={jumpingJackImg} style={styles.image} />

      {challengeStarted ? (
        <TimerBar />
      ) : (
        <Button title="Start Challenge" onPress={startChallenge} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#ffffff",
    paddingTop: 50, // Optional padding for spacing from the top
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginBottom: 30,
  },
});
