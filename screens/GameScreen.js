import React, { useEffect, useState } from "react";
import { View, Dimensions, SafeAreaView } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { StyleSheet } from "react-native";
import BackButton from "../components/BackButton";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function GameScreen() {
  const navigation = useNavigation();

  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Minha Localização"
            description="Estou aqui"
          />
        </MapView>
      )}

      <View className="px-4 absolute bottom-8">
        <BackButton
          onPress={() => navigation.goBack()}
          icon="arrow-back-outline"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
