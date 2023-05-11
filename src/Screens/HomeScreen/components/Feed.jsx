import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import cheerio from "react-native-cheerio";
import { useDispatch, useSelector } from "react-redux";
import ListItem from "../../components/ListItem.jsx";
import { COLORS } from "../../../constants/colors";
import { addsaleData } from "../../../store/listDataSlice";

const Feed = ({ navigation }) => {
  const { saleData } = useSelector((store) => store.listData);
  const [isLoading, setIsloading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("https://www.zoopla.co.uk/for-sale/property/oxfordshire/")
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        const scriptContent = $(
          'script#__NEXT_DATA__[type="application/json"]'
        ).html();
        let data = JSON.parse(scriptContent);
        dispatch(addsaleData(data.props.pageProps.regularListingsFormatted));
        setIsloading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsloading(false);
      });
  }, []);

  return (
    <SafeAreaView>
 {isLoading && (
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 20,
          }}
        />
      )}
      <ScrollView>
        {saleData.length > 0 && (
          <View style={styles.flatListContainer}>
            <Text style={styles.forSale}>For Sale</Text>

            <FlatList
              data={saleData}
              renderItem={({ item, index }) => (
                <ListItem item={item} index={index} navigation={navigation} />
              )}
              //keyExtractor={(item, index) => index}
              contentContainerStyle={{ paddingBottom: 50 }}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Feed;



const styles = StyleSheet.create({
  
  forSale: {
    fontSize: 24,
    marginLeft: 20,
    fontWeight: "bold",
  },

  searchBarContainer: {
    width: "100%",
    alignItems: "center",
  },
  flatListContainer: {
    width: "100%",
  },
  flatListContainer2: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});