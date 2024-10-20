import { Pressable, Text } from "react-native";

export default function Button({ onPress, title }) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-[#f9a826b3] w-3/4 mx-auto p-4 rounded-full flex justify-center items-center "
    >
      <Text className=" text-zinc-100 text-lg font-bold">{title}</Text>
    </Pressable>
  );
}
