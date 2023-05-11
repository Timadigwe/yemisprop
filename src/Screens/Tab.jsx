import React from "react";
import {View, Text} from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import HomeScreen from "./HomeScreen/HomeScreen.jsx";
import { COLORS } from "../constants/colors";
import SearchScreen from "./SearchScreen.jsx";
import SavedScreen from "./SavedScreen.jsx";
import ProfileScreen from "./ProfileScreen.jsx";
import MapScreen from "./MapScreen.jsx";

const TabNav = createBottomTabNavigator();

const Tab = () => {
  return (
   <><TabNav.Navigator screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarStyle: {
          paddingVertical: 10,
          position: "relative",
        },
        tabBarHideOnKeyboard: true,
      }}
      initialRouteName="HomeScreen" >
      <TabNav.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => (
            <Ionicon name="search" color={color} size={size} />
          ),
        }}
      />
       <TabNav.Screen
        name="SavedScreen"
        component={SavedScreen}
        options={{
          tabBarLabel: "Saved",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart" color={color} size={size} />
          ),
          tabBarIconStyle: {
            position: "absolute",
            width: 50,
            height: 50,
            backgroundColor: COLORS.blue,
            borderRadius: 10,
          },
        }}
      />
    <TabNav.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
       <TabNav.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          tabBarLabel: "Map",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="map-marker-alt" color={color} size={size} />
          ),
        }}
      />
      <TabNav.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicon name="person" color={color} size={size} />
          ),
        }}
      />
   </TabNav.Navigator></>
  );
};

export default Tab;