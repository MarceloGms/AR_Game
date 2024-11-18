import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TimerBar({ onTimerEnd }) {
	const [timeLeft, setTimeLeft] = useState(10);
	const [widthPercentage, setWidthPercentage] = useState(100); // Full width at start

	useEffect(() => {
		if (timeLeft === 0) {
			onTimerEnd(); // Call onTimerEnd only when timeLeft reaches 0
			return;
		}

		const intervalId = setInterval(() => {
			setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
			setWidthPercentage(((timeLeft - 1) / 10) * 100); // Calculate width based on newTime
		}, 1000);

		return () => clearInterval(intervalId); // Clean up the interval on component unmount
	}, [timeLeft, onTimerEnd]); // Dependency array includes timeLeft

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
