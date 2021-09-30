import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import axios from "axios";

export default function App({ navigation }) {
  const [data, setData] = useState([]);
  const [search, setsearch] = useState("");
  useEffect(() => {
    axios
      .get(
        "https://api.stackexchange.com/2.3/questions?key=U4DMV*8nvpm3EOpvf69Rxw((&site=stackoverflow&page=1&pagesize=100&order=desc&sort=activity&filter=default"
      )
      .then(function (response) {
        console.log(response);
        setData(response.data.items);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const nextpage = (item) => {
    navigation.navigate("Questions", { item });
  };

  // for flatlist
  const Item = ({ title }) => (
    <TouchableOpacity onPress={() => nextpage(title)}>
      <View style={styles.item}>
        <Text style={styles.title}>{title.title}</Text>
      </View>
    </TouchableOpacity>
  );

  // this is for search
  const searchFilter = (text) => {
    if (text) {
      const newData = data.filter((item) => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setData(newData);
      setsearch(text);
    } else {
      setData();
      setsearch(text);
    }
  };

  const renderItem = ({ item }) => <Item title={item} />;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchView}>
        <TextInput
          style={styles.textInput}
          placeholder='search here'
          onChangeText={(text) => searchFilter(text)}
          value={search}
        />
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.question_id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  textInput: {
    margin: 1,
    backgroundColor: "white",
    borderRadius: 5,
    height: 40,
  },
  searchView: {
    backgroundColor: "pink",
    padding: 10,
  },
});
