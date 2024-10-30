import React, { useEffect, useState, useRef } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import BackButton from "../components/BackButton";
import { useNavigation } from "@react-navigation/native";

export default function GameScreen({ route }) {
  const navigation = useNavigation();
  const monumentCoordinates = useRef({
    latitude: route.params.latitude,
    longitude: route.params.longitude,
  });

  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [checkpoints, setCheckpoints] = useState([]);

  let monumentName = route.params.name;
  monumentName = monumentName.replace(/\s/g, "").toLowerCase();
  console.log("MONUMENT NAME ", monumentName);

  useEffect(() => {
    let locationSubscription;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      const initialLocation = await Location.getCurrentPositionAsync({});
      setLocation(initialLocation.coords);
      setRegion({
        latitude: initialLocation.coords.latitude,
        longitude: initialLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

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
    const API_KEY = "5b3ce3597851110001cf6248b348401dfa20456aacf41374d55da08d";
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
      if (data.features && data.features.length > 0) {
        const coords = data.features[0].geometry.coordinates.map((coord) => ({
          latitude: coord[1],
          longitude: coord[0],
        }));
        setRouteCoordinates(coords);

        // Adiciona checkpoints com as letras do nome do monumento
        const checkpointPositions = distributeCheckpoints(coords, monumentName);
        setCheckpoints(checkpointPositions);
      } else {
        console.log("No routes found");
      }
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  // Função para distribuir os checkpoints
  const distributeCheckpoints = (coords, name) => {
    const numCheckpoints = name.length;
    const interval = Math.floor((coords.length - 2) / (numCheckpoints - 2));

    return name.split("").map((letter, index) => {
      if (index === 0) {
        // Primeiro checkpoint no início da rota
        return { coordinate: coords[0], label: letter };
      }
      if (index === numCheckpoints - 1) {
        // Último checkpoint no final da rota (destino)
        return { coordinate: coords[coords.length - 1], label: letter };
      }

      // Checkpoints intermediários
      return { coordinate: coords[index * interval], label: letter };
    });
  };

  return (
    <View style={styles.container}>
      {region && (
        <MapView
          style={styles.map}
          region={region}
          onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
          initialRegion={region}
        >
          {routeCoordinates.length > 0 && (
            <Polyline
              coordinates={routeCoordinates}
              strokeColor="#5c2f00"
              strokeWidth={6}
            />
          )}

          {/* Renderizar os checkpoints com letras */}
          {checkpoints.map((checkpoint, index) => (
            <Marker
              key={checkpoint.latitude}
              coordinate={checkpoint.coordinate}
              title={checkpoint.label}
              pinColor="#f4b400"
            />
          ))}
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
    ...StyleSheet.absoluteFillObject,
  },
});
