import {
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
  Pressable,
} from "react-native";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import monument1 from "../assets/monument1.jpg";
import Ionicons from "@expo/vector-icons/Ionicons";
import BackButton from "../components/BackButton";

const { width, height } = Dimensions.get("window");

export default function MyMonuments() {
  const navigation = useNavigation();

  const cards = [
    [
      {
        id: 1,
        name: "Torre de Belem",
        image: monument1,
      },
      {
        id: 2,
        name: "Taj Mahal",
        image: monument1,
      },
    ],
    [
      {
        id: 3,
        name: "Eiffel Tower",
        image: monument1,
      },
      {
        id: 4,
        name: "Colosseum",
        image: monument1,
      },
    ],
  ];

  return (
    <ScrollView className="flex-1 bg-[#5c2f00] min-w-full">
      <View>
        <SafeAreaView className="flex-1 justify-between min-h-screen items-start">
          <View className="flex-1 items-center gap-y-5 min-w-full">
            <View className="flex justify-center items-center">
              <Text className="text-3xl text-center text-zinc-100 font-bold">
                My Monuments
              </Text>
            </View>

            {cards.map((card) => (
              <View
                key={card.id}
                className="flex flex-row justify-around gap-x-4"
              >
                <Image
                  className="rounded-lg border-4 border-zinc-100 shadow-[5px_2px_28px_21px_#c9c9c9]"
                  source={monument1}
                  alt="monument1"
                  style={{
                    width: width * 0.45,
                    height: width * 0.45,
                  }}
                />

                <Image
                  className="rounded-lg border-4 border-zinc-100 shadow-[5px_2px_28px_21px_#c9c9c9]"
                  source={monument1}
                  alt="monument1"
                  style={{
                    width: width * 0.45,
                    height: width * 0.45,
                  }}
                />
              </View>
            ))}
          </View>

          <View className="block left-4">
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
