import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../store/favoritesSlice";
import { COLORS } from "../../constants/colors";

const selectIsFavorited = (listingId) => (state) =>
  state.favorites.some((item) => item.listingId === listingId);

const ListItem = ({ item, index, navigation }) => {
  //console.log("item is", item);
  const dispatch = useDispatch();
  const isFavoritedInRedux = useSelector(selectIsFavorited(item.listingId));
  const [isFavorited, setIsFavorited] = useState(isFavoritedInRedux);

  const toggleFavorite = () => {
    if (isFavorited) {
      dispatch(removeFromFavorites(item.listingId));
      setIsFavorited(false);
    } else {
      dispatch(addToFavorites(item));
      setIsFavorited(true);
    }
  };

  return (
    <View style={styles.container} key={index}>
      {item ? (<Image
        source={{ uri:  item.image?.src }}
        style={styles.image}
        resizeMode="cover"
      />): <Image
        source={{ uri: "https://cdn.pixabay.com/photo/2016/09/22/11/55/kitchen-1687121__340.jpg" }}
        style={styles.image}
        resizeMode="cover"
      />}

      <TouchableOpacity style={styles.favorite} onPress={toggleFavorite}>
        {isFavorited ? (
          <MaterialIcons name="favorite" size={40} color={"red"} />
        ) : (
          <MaterialIcons name="favorite-outline" size={40} color={"white"} />
        )}
      </TouchableOpacity>

      <View style={styles.descriptionContainer}>
        <Text style={styles.guidePrice}>
          {item.priceTitle ? item.priceTitle : "Guide price"}
        </Text>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.address}>{item.address}</Text>
        <Pressable
          style={{ marginVertical: 10 }}
          onPress={() => {
            navigation.navigate("Details", { item });
          }}
        >
          <Text style={styles.description}>{item.summaryDescription}<Text style={{ fontWeight: "bold", fontsize: 20}} >ReadMore</Text></Text>
          <Text style={styles.publishedOn}>
            {item.publishedOnLabel}
            <Text> {item.publishedOn}</Text>
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "90%",
    marginVertical: 20,
    marginHorizontal: 18,
    paddingBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 10,
    position: "relative",
  },
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  descriptionContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  guidePrice: {
    fontSize: 14,
    marginBottom: 8,
    color: "black",
    fontWeight: "300",
  },
  price: {
    fontSize: 24,
    fontWeight: "500",
    color: "black",
  },
  title: {
    fontSize: 18,
    fontWeight: "400",
    color: "black",
    marginVertical: 5,
  },
  address: {
    fontSize: 16,
    fontFamily: "PlusJakartaSans_300Light",
    fontWeight: "500",
    alignItems: "center",
    color: "gray",
  },
  description: {
    fontSize: 14,
    fontWeight: "300",
    color: "black",
    lineHeight: 24,
  },
  publishedOn: {
    fontSize: 16,
    fontWeight: "300",
    color: "black",
    marginTop: 5,
  },
  favorite: {
    position: "absolute",
    top: "5%",
    right: "5%",
  },
});