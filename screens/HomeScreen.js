import {
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import logo from "../assets/logo.png";
const { width, height } = Dimensions.get("window");

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-[#5c2f00]">
      <SafeAreaView className="flex-1 justify-around">
        <View className="flex justify-center items-center ">
          <Image
            source={logo}
            alt="Google Logo"
            style={{
              width: width * 0.8,
              height: width * 0.8,
            }}
          />
        </View>

        <View className="flex space-y-4 ">
          <View className="min-w-full ">
            <Button
              onPress={() => navigation.navigate("StarterScreen")}
              title="Start Game"
            />
          </View>
          <View className="min-w-full">
            <Button
              onPress={() => navigation.navigate("MyMonuments")}
              title="My Monuments"
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
