import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TimerBar({ onTimerEnd }) {
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds countdown
  const [widthPercentage, setWidthPercentage] = useState(100); // Full width at start

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = Math.max(prevTime - 1, 0);
        setWidthPercentage((newTime / 30) * 100); // Calculate width based on newTime

        if (newTime === 0) {
          clearInterval(intervalId); // Stop the interval
          if (onTimerEnd) onTimerEnd(); // Call onTimerEnd when the timer reaches zero
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [onTimerEnd]); // Dependency array includes onTimerEnd to avoid infinite loop

  return (
    <View className="w-4/5 h-8 bg-red-500 rounded-full mt-5 relative justify-center items-center">
      <View
        style={[{ width: `${widthPercentage}%` }]}
        className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
      />
      <Text className="text-white font-bold text-lg text-center">
        {timeLeft} s
      </Text>
    </View>
  );
}
