import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable } from "react-native";

export default function BackButton({ onPress, icon }) {
  return (
    <Pressable className="bg-[#f9a826b3] p-2 rounded-full" onPress={onPress}>
      <Ionicons name={icon} size={32} color="white" />
    </Pressable>
  );
}
