import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

import { COLORS } from "../constants/colors";
import CardItem from "./components/CardItem.jsx";

const SavedScreen = ({ navigation }) => {
  const favorites = useSelector((state) => state.favorites);
  console.log("favorites:", favorites.length);

  return (
    <SafeAreaView>
      <Text style={styles.headerText}>Favorites</Text>

      <View style={styles.flatListContainer}>
        {favorites.length > 0 ? (
          <FlatList
            data={favorites}
            renderItem={({ item, index }) => (
              <CardItem item={item} index={index} navigation={navigation} />
            )}
            //keyExtractor={(item, index) => index}
            contentContainerStyle={{ paddingBottom: 60 }}
            numColumns={2}
          />
        ) : (
          <View style={styles.notfound}>
            <Text style={styles.notfoundtext}>
              You dont have any favorites , Click on the heart icon to add to
              favorite
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SavedScreen;
const styles = StyleSheet.create({
  headerText: { fontSize: 24, marginLeft: 20, fontWeight: "bold" },
  flatListContainer: {
    width: "100%",
  },
  notfound: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
  },
  notfoundtext: {
    color: COLORS.primary,
    fontSize: 20,
    textAlign: "center",
    lineHeight: 35,
  },
});