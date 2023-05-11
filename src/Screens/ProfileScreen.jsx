import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { useDispatch, useSelector } from "react-redux";
import { persistConfig } from "../store/store";
import Fontisto from "react-native-vector-icons/Fontisto";
import { TouchableOpacity } from "react-native";
import { COLORS } from "../constants/colors";
import {firebase} from "../config/firebase"
import {setCurrentUser} from "../store/userSlice"
import { purgeStoredState } from "redux-persist";



const ProfileScreen = () => {
  const { currentUser } = useSelector((store) => store.user);
  const { searchValues } = useSelector((store) => store.search);
  const dispatch = useDispatch();
  async function handleSignOut() {
    firebase.auth().signOut().then(() => {
      dispatch(setCurrentUser(null));
      purgeStoredState(persistConfig); // clear all persisted data
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {currentUser && (
            <Text style={styles.headerText}>
              Welcome {currentUser.email.slice(0, 5)}
            </Text>
          )}
           <Fontisto name="person" size={25} color="gray" />
        </View>
     {searchValues.length > 0 ? (
          <View>
            <Text style={styles.header2}>This are your recent searches</Text>
            {searchValues.map((item) => (
              <Text style={styles.item}>{item}</Text>
            ))}
          </View>
        ) : (
          <View
            style={{
              width: "100%",
              marginVertical: "20%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.header2}>
              You dont have any recent searches
            </Text>
          </View>
        )}   
        <TouchableOpacity style={styles.button} onPress={handleSignOut}>
          <Text style={{ color: "white", fontSize: 16, fontWeight: "400" }}>
            Sign out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    height: "100%",
  },
  headerText: {
    fontSize: 20,
    marginVertical: 20,
    fontWeight: "bold",
  },
  header2: { fontSize: 16, marginVertical: 10, fontWeight: "400" },
  item: {
    width: "100%",
    height: 40,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 0.5,
    borderTopColor: "gray",
    borderBottomColor: "gray",
  },
  button: {
    width: "80%",
    backgroundColor: COLORS.primary,
    marginTop: 20,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 30,
  },
  
});
