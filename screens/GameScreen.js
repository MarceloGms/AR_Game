import React, { useEffect, useState, useRef } from "react";
import { View, Dimensions } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import { StyleSheet } from "react-native";
import BackButton from "../components/BackButton";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function GameScreen({ route }) {
  const navigation = useNavigation();

  // Use useRef para armazenar monument_coordinates
  const monumentCoordinates = useRef({
    latitude: route.params.latitude,
    longitude: route.params.longitude,
  });

  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]); // Para armazenar as coordenadas da rota

  useEffect(() => {
    let locationSubscription;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      // Obter posição inicial e definir como região do mapa
      const initialLocation = await Location.getCurrentPositionAsync({});
      setLocation(initialLocation.coords);
      setRegion({
        latitude: initialLocation.coords.latitude,
        longitude: initialLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      // Obter a rota
      await fetchRoute(initialLocation.coords, monumentCoordinates.current);
      locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 1,
        },
        (newLocation) => {
          setLocation(newLocation.coords);
        }
      );
    })();

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, []);

  const fetchRoute = async (start, end) => {
    console.log("START params", start);
    console.log("END params", end);

    const API_KEY = "5b3ce3597851110001cf6248b348401dfa20456aacf41374d55da08d"; // Insira sua chave de API aqui
    const url = `https://api.openrouteservice.org/v2/directions/driving-car?start=${start.longitude},${start.latitude}&end=${end.longitude},${end.latitude}`;

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: API_KEY,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error Response:", errorData);
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("API Response Data:", data);

      // Extrair coordenadas da rota
      if (data.features && data.features.length > 0) {
        const coords = data.features[0].geometry.coordinates.map((coord) => ({
          latitude: coord[1],
          longitude: coord[0],
        }));
        setRouteCoordinates(coords); // Atualizar as coordenadas da rota
      } else {
        console.log("No routes found");
      }
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  return (
    <View style={styles.container}>
      {region && (
        <MapView
          style={styles.map}
          region={region}
          onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
        >
          {location && (
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="Minha Localização"
              description="Estou aqui"
            />
          )}

          {/* Marker do monumento */}
          <Marker
            coordinate={monumentCoordinates.current}
            title="Monumento"
            description="Destino"
          />

          {/* Adicionar a Polyline*/}
          {routeCoordinates.length > 0 && (
            <Polyline
              coordinates={routeCoordinates}
              strokeColor="#5c2f00"
              strokeWidth={6}
            />
          )}
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
