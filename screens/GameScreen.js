import React, { useEffect, useState, useRef } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import Svg, { Circle, Text } from "react-native-svg"; // Importação do SVG
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
  const [completedCheckpoints, setCompletedCheckpoints] = useState([]);

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

        // Add checkpoints with letters from the monument name
        const checkpointPositions = distributeCheckpoints(coords, monumentName);
        setCheckpoints(checkpointPositions);
      } else {
        console.log("No routes found");
      }
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  // Função para distribuir os checkpoints com letras aleatórias
  const distributeCheckpoints = (coords, name) => {
    const numCheckpoints = name.length;
    const interval = Math.floor((coords.length - 2) / (numCheckpoints - 2));

    // Embaralhar a ordem das letras
    const shuffledIndices = Array.from(
      { length: numCheckpoints },
      (_, i) => i
    ).sort(() => Math.random() - 0.5);

    return shuffledIndices.map((index, i) => {
      const letter = name[index];

      if (i === 0) {
        // Primeiro checkpoint no início da rota
        return { coordinate: coords[0], label: letter, completed: false };
      }
      if (i === numCheckpoints - 1) {
        // Último checkpoint no final da rota (destino)
        return {
          coordinate: coords[coords.length - 1],
          label: letter,
          completed: false,
        };
      }

      // Checkpoints intermediários em posições aleatórias
      return {
        coordinate: coords[i * interval],
        label: letter,
        completed: false,
      };
    });
  };

  // Function to mark a checkpoint as completed
  const markCheckpointAsCompleted = (checkpoint) => {
    console.log("Checkpoint completed:", completedCheckpoints);
    //verify if its the next checkpoint after the last completed
    const nextCheckpointIndex = completedCheckpoints.length;
    if (checkpoints[nextCheckpointIndex]?.label === checkpoint.label) {
      setCompletedCheckpoints((prevCompleted) => [
        ...prevCompleted,
        checkpoint,
      ]);
    }
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

          {/* Render checkpoints with letters */}
          {checkpoints.map((checkpoint, index) => {
            const isCompleted = completedCheckpoints.some(
              (completedCheckpoint) =>
                completedCheckpoint.coordinate.latitude ===
                  checkpoint.coordinate.latitude &&
                completedCheckpoint.coordinate.longitude ===
                  checkpoint.coordinate.longitude
            );

            const isNextCheckpoint =
              completedCheckpoints.length ===
              checkpoints.findIndex((cp) => cp.label === checkpoint.label);

            return (
              <Marker
                key={`${checkpoint.coordinate.latitude}-${checkpoint.coordinate.longitude}`}
                coordinate={checkpoint.coordinate}
                onPress={() => {
                  if (!isCompleted && isNextCheckpoint) {
                    markCheckpointAsCompleted(checkpoint);
                    navigation.navigate("ExerciseScreen", {
                      checkpointCoordinate: checkpoint.coordinate,
                      monumentName,
                      completedCheckpoints,
                      checkpoints,
                      checkpointIndex: checkpoint.label, // Pass checkpoint label to identify which one
                    });
                  }
                }}
              >
                <Svg height="50" width="50">
                  <Circle
                    cx="25"
                    cy="25"
                    r="20"
                    fill={isCompleted ? "#4caf50" : "#f4b400"} // Green if completed, Yellow if not
                  />
                  <Text
                    x="25"
                    y="30"
                    textAnchor="middle"
                    fontSize="16"
                    fontWeight="bold"
                    fill="white"
                  >
                    {checkpoint.label.toUpperCase()}
                  </Text>
                </Svg>
              </Marker>
            );
          })}
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
