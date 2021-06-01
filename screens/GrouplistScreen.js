import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  ScrollView
} from "react-native";


const SERVER_URL = "https://gmat-vocab-server.herokuapp.com/";
const Tabs = (props) => {
  const [words, setWords] = useState([]);
  function getData(grpNum){
    let URL=`${SERVER_URL}group/${grpNum}`
    if(grpNum==0){
      URL=`${SERVER_URL}allgroup`
    }
    fetch(URL) //"https://cors-anywhere.herokuapp.com/https://pselookup.vrymel.com/api/stocks"
      .then((response) => response.json())
      .then((json) => {
        //setList(json["stocks"]);
        const WORDS = json.map((word) => word["WORD"]);
        //console.log(WORDS)
        setWords(WORDS);
        //return WORDS
      })
      .catch((error) => console.log(error));
  
  }
  getData(props.num)

  return (
    <View>
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          props.navigation.navigate("Vocablist", {
            words: words,
          })
        }
      >
        <Text style={styles.title}>{props.num==0?"All":`GROUP ${props.num}`}</Text>
      </TouchableOpacity>
    </View>
  );
};

const GrouplistScreen = ({ navigation, route }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    startLoading()
    fetch(`${SERVER_URL}distinctgrp`) //"https://cors-anywhere.herokuapp.com/https://pselookup.vrymel.com/api/stocks"
      .then((response) => response.json())
      .then((json) => {
        //setList(json["stocks"]);
        const SORTED_ARR = json[0]["distinctGroup"].sort((a, b) => a - b);
        SORTED_ARR.unshift(0)
        setList(SORTED_ARR);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {loading ? (
          <ActivityIndicator
            //visibility of Overlay Loading Spinner
            visible={loading}
            size="large" color="#00ff00"
          />
        ) : (
          <>
            <FlatList
              data={list}
              keyExtractor={(item) => item}
              renderItem={({ item }) => {
                return <Tabs num={item} navigation={navigation} />;
              }}
              contentContainerStyle={styles.list}
            ></FlatList>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    height: 400,
    maxHeight: 500,
  },
  item: {
    backgroundColor: "#7bf1a8",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    width: 160,
  },
  list: {
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  title: {
    fontSize: 25,
  },
});

export default GrouplistScreen;
