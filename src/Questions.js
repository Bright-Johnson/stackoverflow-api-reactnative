import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

export default function App({ navigation, route }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://api.stackexchange.com/2.3/questions/${route.params.item.question_id}/answers?key=U4DMV*8nvpm3EOpvf69Rxw((&site=stackoverflow&order=desc&sort=activity&filter=default`
      )
      .then(function (response) {
        console.log(response);
        setData(response.data.items);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const Item = ({ title }) => (
    <TouchableOpacity>
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
  const renderItem = ({ item }) => <Item title={item.title} />;
  return (
    <SafeAreaView style={styles.container}>
      <Text>{route.params.item.title}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
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
});
