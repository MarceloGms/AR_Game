import { Text, View, SafeAreaView, Image, ScrollView } from "react-native";
import BackButton from "../components/BackButton";
import { useNavigation } from "@react-navigation/native";

export default function MonumentInfoScreen({ route }) {
  const navigation = useNavigation();

  const { name, image, description } = route.params;

  return (
    <SafeAreaView className="bg-[#5c2f00] ">
      <ScrollView className="px-4 min-h-screen">
        <View className="w-full h-72 py-4">
          <Image
            source={image}
            className="w-full h-full rounded-lg shadow-lg"
            resizeMode="cover"
          />
        </View>

        <View className="mb-4">
          <Text className="text-4xl font-bold text-zinc-300 text-center">
            {name}
          </Text>
        </View>

        <View className="bg-[#9f611e2c] p-4 rounded-lg shadow-md">
          <Text className="text-base text-zinc-200 leading-relaxed">
            {description}
          </Text>
        </View>

        <View className="py-4 w-12 bottom-0">
          <BackButton
            className="block"
            onPress={() => navigation.goBack()}
            icon="arrow-back-outline"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
