import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";

export default function BackButton({ onPress, icon }) {
  const navigation = useNavigation();

  return (
    <Pressable
      className="flex justify-center items-center bg-[#f9a826b3] max-w-fit-content mx-auto p-2 rounded-full"
      onPress={onPress}
    >
      <Ionicons name={icon} size={32} color="white" />
    </Pressable>
  );
}
