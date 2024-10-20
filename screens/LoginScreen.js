import {
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import Button from "../components/Button";
import logo from "../assets/logo.png";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function LoginScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-[#5c2f00]">
      <SafeAreaView className="flex-1 justify-around">
        <View className="flex justify-center items-center ">
          <Image
            source={logo}
            alt="Logo"
            style={{
              width: width * 0.8,
              height: width * 0.8,
            }}
          />
        </View>

        <View>
          <Button onPress={() => navigation.navigate("Home")} title="Login" />
        </View>
      </SafeAreaView>
    </View>
  );
}
