import {
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  Pressable,
  ImageBackground,
} from "react-native";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import logo from "../assets/logo.png";
const { width, height } = Dimensions.get("window");
import bgImg from "../assets/bgImg.jpg";

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={bgImg}
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
      }}
      resizeMode="cover"
      className="flex-1 justify-center items-center
      min-h-screen
      "
    >
      <View className="flex-1 min-h-screen min-w-full">
        <SafeAreaView className="flex-1 justify-around">
          <View className="flex justify-center items-center ">
            <Image
              source={logo}
              alt="Google Logo"
              style={{
                width: width * 0.8,
                height: width * 0.5,
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
    </ImageBackground>
  );
}
