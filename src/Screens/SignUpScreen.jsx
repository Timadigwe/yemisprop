import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CheckBox } from "@rneui/themed";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { COLORS } from "../constants/colors";

import { useDispatch } from 'react-redux';
import {setCurrentUser} from "../store/userSlice"
import {firebase} from "../config/firebase"
import { useNavigation } from "@react-navigation/native";

  


const SignUpScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [check1, setCheck1] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit() {
    if (value.email === "" || value.password === "") {
      Alert.alert("Error", "Please enter email and password");
      return;
    }
    setLoading(true);
    await firebase.auth().createUserWithEmailAndPassword(
      value.email,
      value.password
    ).then((userCredential) => {
      console.log("signing up")
      const user = userCredential.user;
       console.log(user)
      dispatch(setCurrentUser(user)); // set the user state in the Redux store
    });
    setLoading(false);
  }

  return (
    <SafeAreaView>
      <KeyboardAvoidingView style={styles.container}>
        <StatusBar />
        <View style={styles.header}>
          <Text style={styles.headerText}>SignUp</Text>
          <MaterialIcons
            name="cancel"
            size={24}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="email"
            value={value.email}
            onChangeText={(text) => {
              setValue({ ...value, email: text });
            }}
          />
          <TextInput
            style={styles.input}
            value={value.password}
            onChangeText={(text) => {
              setValue({ ...value, password: text });
            }}
            secureTextEntry={true}
            placeholder="password"
            keyboardType="numeric"
          />

          <CheckBox
            center
            title="By clicking here you hereby agree to these terms and conditions. Please do not continue to use the app if you do not agree with all of the terms and conditions stated on this page."
            checked={check1}
            onPress={() => setCheck1(!check1)}
            textStyle={{ color: "gray", fontWeight: "400", fontSize: 12 }}
          />

          <Pressable style={styles.button} onPress={handleSubmit}>
            {loading === true ? (
              <ActivityIndicator size={"small"} color={"white"} />
            ) : (
              <Text style={styles.buttonText}>SignUp</Text>
            )}
          </Pressable>
          <Text style={[styles.text, { fontSize: 18 }]}>OR</Text>
          <Pressable
            style={styles.button2}
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text style={[styles.buttonText, { color: "black" }]}>SignIn</Text>
          </Pressable>
          <Text style={[styles.text, { fontSize: 12 }]}>
            By registering you hereby agree to these terms and conditions.
            Please do not continue to use the app if you do not agree with all
            of the terms and conditions stated on this page.{" "}
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: "5%",
    paddingVertical: "5%",
    backgroundColor: "white",
    height: "100%",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  headerText: {
    color: COLORS.primary,
    fontFamily: "PlusJakartaSans_400Regular",
    fontWeight: "400",
    fontSize: 20,
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: "10%",
  },
  input: {
    height: "12%",
    width: "100%",
    margin: 12,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  error: {
    marginTop: 10,
    padding: 10,
    color: "#fff",
  },

  button: {
    marginTop: 10,
    width: "50%",
    height: "8%",
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontFamily: "PlusJakartaSans_400Regular",
    fontWeight: "400",
    fontSize: 16,
  },
  text: {
    marginTop: "5%",
    color: "gray",
    textAlign: "center",
  },
  button2: {
    marginTop: 10,
    width: "50%",
    height: "8%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2F80ED",
  },
});