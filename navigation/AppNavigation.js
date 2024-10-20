import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyMonuments from "../screens/MyMonumentsScreen";
import MonumentInfoScreen from "../screens/MonumentInfoScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="MyMonuments"
          options={{ headerShown: false }}
          component={MyMonuments}
        />
        <Stack.Screen
          name="MonumentInfoScreen"
          options={{ headerShown: false }}
          component={MonumentInfoScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
