import {
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import BackButton from "../components/BackButton";
import monumentsData from "../components/MonumentsData";

const { width, height } = Dimensions.get("window");

export default function MyMonuments() {
  const navigation = useNavigation();

  return (
    <ScrollView className="flex-1 bg-[#5c2f00] min-w-full">
      <View>
        <SafeAreaView className="flex-1 justify-between min-h-screen items-start">
          <View className="gap-y-5 min-w-full">
            <View className="flex justify-center items-center">
              <Text className="text-3xl text-center text-zinc-100 font-bold">
                My Monuments
              </Text>
            </View>

            {monumentsData.map((card) => (
              <View
                key={card[0].id}
                className="flex flex-row justify-around items-center "
              >
                {card.map((monument) => (
                  <Pressable
                    key={monument.id}
                    onPress={() => {
                      navigation.navigate("MonumentInfoScreen", {
                        name: monument.name,
                        image: monument.image,
                        description: monument.description,
                      });
                    }}
                    className="flex-1"
                  >
                    <View className="flex flex-col items-center">
                      <Image
                        className="rounded-lg border-4 border-zinc-100 shadow-[5px_2px_28px_21px_#c9c9c9]"
                        source={monument.image}
                        style={{ width: width / 2.2, height: height / 5 }}
                      />
                    </View>
                  </Pressable>
                ))}
              </View>
            ))}
          </View>
          <View className="px-4">
            <BackButton
              onPress={() => navigation.goBack()}
              icon="arrow-back-outline"
            />
          </View>
        </SafeAreaView>
      </View>
    </ScrollView>
  );
}
