import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import MapView, { Marker } from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { COLORS } from "../constants/colors";

const MapScreen = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    setCurrentLocation({ latitude, longitude });
    let addressInfo = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });
    let name = addressInfo[0].name;

    console.log(name);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Your Location on the map</Text>
      {currentLocation ? (
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            title="My Location"
          />
        </MapView>
      ) : (
        <ActivityIndicator size={"large"} color={COLORS.primary} />
      )}
    </SafeAreaView>
  );
};

export default MapScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  headerText: { fontSize: 24, marginLeft: 20, fontWeight: "bold", padding: 20 },
});