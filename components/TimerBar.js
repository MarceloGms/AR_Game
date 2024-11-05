import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function TimerBar() {
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds countdown
  const [widthPercentage, setWidthPercentage] = useState(100); // Full width at start
  const navigation = useNavigation();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = Math.max(prevTime - 1, 0);
        setWidthPercentage((newTime / 30) * 100); // Calculate width based on newTime

        if (newTime === 0) {
          clearInterval(intervalId); // Stop the interval
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.bar, { width: `${widthPercentage}%` }]} />
      <Text style={styles.timerText}>{timeLeft} s</Text>

      {/* Show button when timer reaches 0 */}
      {timeLeft === 0 && (
        <View style={styles.buttonContainer}>
          <Button
            title="Return to Map"
            onPress={() => {
              closeModal();
              navigation.navigate("GameScreen", {
                monument: selectedMonument,
                name: selectedMonument.name,
                latitude: selectedMonument.latitude,
                longitude: selectedMonument.longitude,
              });
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FF0000',
    borderRadius: 10,
    marginTop: 20,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bar: {
    height: '100%',
    backgroundColor: '#4caf50', // green bar color
    position: 'absolute',
    left: 0,
    top: 0,
    borderRadius: 10,
  },
  timerText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: -50, // Position the button below the timer
    width: '80%',
    marginTop: 20,
  },
  
});