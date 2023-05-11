import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { COLORS } from "../../../constants/colors";
import { useWindowDimensions } from "react-native";

const Details = ({ route, navigation }) => {
  const { width } = useWindowDimensions();
  const altRoute = useRoute();
  const data = route?.params?.meeting || altRoute?.params || {};
  //console.log("data: ", data);
  const latitude = data.item.location.coordinates.latitude;
  const longitude = data.item.location.coordinates.longitude;
  const title = data.item.title;
  const price = data.item.price;
  // console.log(latitude, longitude, title);

  return (
    <SafeAreaView style={styles.container}>
     <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: data.item.image?.src }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.guidePrice}>{data.item.priceTitle}</Text>
          <Text style={styles.price}>{data.item.price}</Text>
          <Text style={styles.title}>{data.item.title}</Text>
          <Text style={styles.address}>{data.item.address}</Text>

          <View style={{ marginTop: 20 }}>
            <Text style={styles.description}>
              Category: {data.item.summaryDescription}
            </Text>
            <Text style={styles.publishedOn}>
              {data.item.publishedOnLabel}: {data.item.publishedOn}
            </Text>
            {data.item.features.map((item) => ( <View style={styles.features} ><Text style={styles.text2} >{item.iconId}:<Text>{item.content}</Text></Text></View> ))}
            <Text style={styles.text2}>
              branch name:
              <Text style={[styles.price, { fontSize: 16 }]}>
                {" "}
                {data.item.branch.name}
              </Text>
            </Text>
            <Text style={styles.text2}>
              branchId: {data.item.branch.branchId}
            </Text>
            <Text style={styles.text2}>phone no: {data.item.branch.phone}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button1}
              onPress={() =>
                navigation.navigate("Map", { longitude, latitude, title })
              }
            >
              <Text style={{ color: "white" }}>View on map</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2} onPress={() =>
                navigation.navigate("PayNow", { title, price })
              } >
              <Text style={{ color: COLORS.primary }}>Pay now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Details;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  scrollView: {
    marginBottom: 20,
  },
  imageContainer: {
    width: "100%",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  descriptionContainer: {
    flex: 1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
    width: "100%",
    backgroundColor: "white",
    position: "relative",
    top: -20,
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
    fontSize: 20,
    fontWeight: "400",
    color: "black",
    marginVertical: 5,
  },
  address: {
    fontSize: 18,
    fontFamily: "PlusJakartaSans_300Light",
    fontWeight: "500",
    alignItems: "center",
    color: "gray",
  },
  headText: {
    fontSize: 24,
    fontWeight: "700",
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 10,
    paddingVertical: 15,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
    alignItems: "center",
  },
  text2: {
    fontSize: 15,
    lineHeight: 28,
    fontWeight: "300",
    marginTop: 10,
    color: "black",
  },
  description: {
    fontSize: 16,
    fontWeight: "300",
    color: "black",
    lineHeight: 24,
  },
  publishedOn: {
    fontSize: 16,
    fontWeight: "300",
    color: "black",
    marginTop: 5,
    marginBottom: 20,
  },

  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  button1: {
    width: "45%",
    padding: 16,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    marginRight: 30,
    alignItems: "center",
  },
  button2: {
    padding: 16,
    borderRadius: 16,
    width: "40%",
    alignItems: "center",
  },
  features: {
    flexContainer: "row",
  }
});