import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { StatusBar } from "expo-status-bar";
import { COLORS } from "../constants/colors";
import { Video } from "expo-av";

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />

      <Video
        style={styles.video}
        source={{
          uri: "https://veed.io/view/441e7f41-e1d3-4a8d-b87d-b57807083660",
        }}
        resizeMode="cover"
        shouldPlay={true}
        isLooping={true}
      />

      <View style={styles.image2Container}>
        <Image
          source={require("../../assets/icon.jpg")}
          style={styles.image2}
          resizeMode="contain"
        />

        <Text style={styles.text}>
          Find more homes than anywhere else all in one place
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    postion: "relative",
    //backgroundColor: "white",
  },
  video: {
    width: "100%",
    height: "100%",
    postion: "relative",
  },

  image2Container: {
    width: "100%",
    height: "40%",
    position: "absolute",
    top: "30%",
  },
  image2: {
    width: "100%",
    height: "50%",
  },
  text: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontWeight: "500",
    fontSize: 24,
    textAlign: "center",
    marginLeft: 20,
    top: "55%",
    position: "absolute",
    color: "white",
  },
  button: {
    width: "80%",
    height: "5%",
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "65%",
  },
  buttonText: {
    color: "white",
    fontFamily: "PlusJakartaSans_400Regular",
  },
});
