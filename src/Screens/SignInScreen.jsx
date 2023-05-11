import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  Pressable,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { COLORS } from "../constants/colors";
import { useDispatch } from "react-redux";
import {firebase} from "../config/firebase"
import {setCurrentUser} from "../store/userSlice"

const SignInScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState({
    email: "",
    password: "",
    error: "",
  });

  async function handleSubmit() {
    if (value.email === "" || value.password === "") {
      Alert.alert("Error", "Please enter email and password");
      return;
    }
    setLoading(true);
    await firebase.auth().signInWithEmailAndPassword( value.email, value.password).then(
      (userCredential) => {
        console.log("signing in");
        const user = userCredential.user;
        console.log(user)
       dispatch(setCurrentUser(user)); // set the user state in the Redux store
      }
    );
    setLoading(false);
  }

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <StatusBar />
        <View style={styles.header}>
          <Text style={styles.headerText}>SignIn</Text>
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

          <Pressable style={styles.button} onPress={handleSubmit}>
            {loading === true ? (
              <ActivityIndicator size={"small"} color={"white"} />
            ) : (
              <Text style={styles.buttonText}>SignIn</Text>
            )}
          </Pressable>
          <Text style={[styles.text, { fontSize: 18 }]}>OR</Text>
          <Pressable
            style={styles.button2}
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={[styles.buttonText, { color: "black" }]}>SignUp</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "5%",
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
    height: "14%",
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
    height: "10%",
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
    height: "10%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2F80ED",
  },
});