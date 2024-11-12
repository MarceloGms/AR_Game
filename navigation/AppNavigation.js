import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyMonuments from "../screens/MyMonumentsScreen";
import MonumentInfoScreen from "../screens/MonumentInfoScreen";
import StarterScreen from "../screens/StarterScreen";
import GameScreen from "../screens/GameScreen";
import ExerciseScreen from "../screens/ExerciseScreen";
import EndScreen from "../screens/EndScreen";
import FindWordScreen from "../screens/FindWordScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
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
        <Stack.Screen
          name="StarterScreen"
          options={{ headerShown: false }}
          component={StarterScreen}
        />
        <Stack.Screen
          name="GameScreen"
          options={{ headerShown: false }}
          component={GameScreen}
        />
        <Stack.Screen
          name="ExerciseScreen"
          options={{ headerShown: false }}
          component={ExerciseScreen}
        />
        <Stack.Screen
          name="EndScreen"
          options={{ headerShown: false }}
          component={EndScreen}
        />
        <Stack.Screen
          name="FindWordScreen"
          options={{ headerShown: false }}
          component={FindWordScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
