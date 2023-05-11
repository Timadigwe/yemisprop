import React from "react"
import {StyleSheet, Text, Image, Platform} from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Feed from "./components/Feed.jsx";
import Details from "./components/Details.jsx";
import Map from "./components/Map.jsx";
import PayNow from "./components/PayNow.jsx"
import Fontisto from "react-native-vector-icons/Fontisto";



const Stack = createNativeStackNavigator();

const HomeScreen = () => {

  return (
<Stack.Navigator initialRouteName="Feed">
      <Stack.Screen
      name="Feed"        
        component={Feed}
        options={{
          headerLeft: () => (<Image
        source={require("../../../assets/icon.jpg")}
        style={styles.headerlogo}
        resizeMode="contain"
      />),
      headerRight: () => (<Fontisto name="person" size={25} color="gray" />)
        }} 
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          title: "Details",
        }}
      />
      <Stack.Screen name="Map" component={Map} options={{ title: "Map" }} />
      <Stack.Screen name="PayNow" component={PayNow} options={{ title: "Pay" }} />
    </Stack.Navigator>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
    alignItems: "center",
    backgroundColor: "red"
  },
  headerlogo: {
     ...Platform.select({
       android: {
         marginRight: "20%",
         width: 35,
    height: 35,
    borderRadius: 5,
       },
       default: { width: 35,
    height: 35,
    borderRadius: 5,}
     })
  },
  headerText: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontWeight: "500",
    fontSize: 16,
    textAlign: "center",
    // alignItems: "center",
    // justifyContent: "center"
    
  },
 
});