import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import WelcomeScreen from './src/Screens/WelcomeScreen.jsx';
import SignUpScreen from './src/Screens/SignUpScreen.jsx';
import SignInScreen from './src/Screens/SignInScreen.jsx';
import Tab from './src/Screens/Tab.jsx';
import {useDispatch} from "react-redux"
import firebase from 'firebase';
import {setCurrentUser, clearCurrentUser} from "./src/store/userSlice"

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
    </Stack.Navigator>
    </NavigationContainer>
  );
};

const UserStack = () => {
  return (
<NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tab" component={Tab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Navigation = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  //const dispatch = useDispatch()

  // useEffect(() => {
  //   // Load the current user from storage on app start
  //   const loadCurrentUser = async () => {
  //     try {
  //       const user = await AsyncStorage.getItem('currentUser');
  //       console.log("stored user is:", user)
  //       if (user) {
  //         dispatch(setCurrentUser(JSON.parse(user)));
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   loadCurrentUser();
  // }, []);

  // useEffect(() => {
   
  //     const authSubscriber = firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       dispatch(setCurrentUser(user));
  //       AsyncStorage.setItem('currentUser', JSON.stringify(user));
  //     } else {
  //       dispatch(clearCurrentUser(null));
  //       AsyncStorage.removeItem('currentUser');

  //     }
  //   });

  //   // Unsubscribe from auth listener on unmount
  //   return authSubscriber;
  // }, []);

  return (
    <>
      {currentUser === null ? <AuthStack /> : <UserStack />}
    </>
  );
};

export default Navigation;
