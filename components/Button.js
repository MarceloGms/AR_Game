import { Pressable, Text } from "react-native";

export default function Button({ onPress, title, bgColor }) {
  return (
    <Pressable
      onPress={onPress}
      style={{ backgroundColor: bgColor }}
      className="w-3/4 mx-auto p-4 rounded-full flex justify-center items-center "
    >
      <Text className=" text-zinc-100 text-lg font-bold">{title}</Text>
    </Pressable>
  );
}
