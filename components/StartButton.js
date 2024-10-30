import React from "react";
import { Pressable, Text } from "react-native";

export default function StartButton({ onPress }) {
	return (
		<Pressable className="bg-green-500 p-4 rounded-full" onPress={onPress}>
			<Text className="text-white text-center text-lg font-bold">Start</Text>
		</Pressable>
	);
}
