import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import React from "react";
import Ionicon from "react-native-vector-icons/Ionicons";

const SearchBar = ({ value, onChange, onPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Pressable onPress={onPress}>
          <Ionicon name="search" size={20} color="gray" />
        </Pressable>
        <TextInput
          placeholder="eg.. Oxfordshire"
          clearButtonMode="always"
          style={styles.input}
          value={value}
          onChangeText={onChange}
        />
      </View>
      
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    marginVertical: "3%",
    width: "80%",
    height: 40,
    borderWidth: 2,
    borderColor: "lightgray",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
    flexDirection: "row",
    backgroundColor: "white",
  },
  inputContainer: { flexDirection: "row", justifyContent: "space-around" },
  input: {
    marginLeft: 8,
    width: "90%",
    clearTextOnFocus: false,
    textAlign: "center"
  },
});