import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "./components/SearchBar.jsx";
import { Alert } from "react-native";
import axios from "axios";
import cheerio from "react-native-cheerio";

import { COLORS } from "../constants/colors";
import ListItem from "./components/ListItem.jsx";
import { useDispatch, useSelector } from "react-redux";
import { addSearchData } from "../store/listDataSlice";
import { addSearchValue } from "../store/searchSlice";

const SearchScreen = ({ navigation }) => {
  const [value, setValue] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const dispatch = useDispatch();
  const { searchData } = useSelector((store) => store.listData);

  const onchangeText = (text) => {
    setValue(text);
  };

  async function handleSearch() {
    dispatch(addSearchValue(value));
    setIsloading(true);
    await axios
      .get(`https://www.zoopla.co.uk/to-rent/property/${value}/`)
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        const scriptContent = $(
          'script#__NEXT_DATA__[type="application/json"]'
        ).html();
        let data = JSON.parse(scriptContent);
        console.log("data is:", data);
        dispatch(addSearchData(data.props.pageProps.regularListingsFormatted));
        setValue("");
      })
      .catch((error) => {
        console.log(error);
      });
    setIsloading(false);
  }
  //console.log("searchData is", searchData.length);
console.log("value typed is:", value)
  const onPress = () => {
    if (value.trim() !== "") {
      handleSearch();
    } else {
      Alert.alert("Search field is empty", "Please enter a search term");
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.searchBarContainer}>
        <SearchBar value={value} onChange={onchangeText} onPress={onPress} />
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
      </View>
      <View style={styles.flatListContainer}>
        {searchData.length > 0 ? (
          <FlatList
            data={searchData}
            renderItem={({ item, index }) => (
              <ListItem item={item} index={index} navigation={navigation} />
            )}
            //keyExtractor={(item, index) => index}
            contentContainerStyle={{ paddingBottom: 50 }}
          />
        ) : (
          <View
            style={{
              width: "100%",
              height: "90%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.search}>
              Find your next house by searching through our catalog of beautiful
              houses
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  searchBarContainer: {
    width: "100%",
    alignItems: "center",
  },
  flatListContainer: {
    width: "100%",
  },
  search: {
    fontWeight: "bold",
    fontSize: 24,
    color: COLORS.primary,
    textAlign: "center",
    lineHeight: 35,
  },
});