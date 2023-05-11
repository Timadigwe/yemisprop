import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";

export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const CardItem = ({ item, index, navigation }) => {
  // console.log("Item", item);

  return (
    <TouchableOpacity
      style={styles.container}
      key={index}
      onPress={() => {
        navigation.navigate("Details", { item });
      }}
    >
      <Image source={{ uri: item.image?.src }} style={styles.image} />
      <View style={{ marginHorizontal: 10 }}>
        <Text style={styles.guidePrice}>
          {item.priceTitle ? item.priceTitle : "Guide price"}
        </Text>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardItem;
const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 230,
    marginHorizontal: 15,
    marginVertical: 10,
    backgroundColor: "white",
    borderRadius: 20,
    position: "relative",
  },
  image: {
    width: 150,
    height: 120,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  guidePrice: {
    fontSize: 14,
    marginTop: 5,
    marginBottom: 8,
    color: "black",
    fontWeight: "300",
  },

  price: {
    fontSize: 20,
    fontWeight: "500",
    color: "black",
  },
  title: {
    fontSize: 14,
    fontWeight: "400",
    color: "black",
    marginVertical: 5,
  },
});