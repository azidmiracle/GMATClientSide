import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";

import VocabDetails from "../components/VocabDetails";
const VocabListScreen = ({ navigation, route }) => {
  //const SERVER_URL = "https://gmat-vocab-server.herokuapp.com/";
  //const [list, setList] = useState([]);
  //const GROUPNUM = route.params.num
  /*  let URL=`${SERVER_URL}group/${GROUPNUM}`
  if(GROUPNUM==0){
    URL=`${SERVER_URL}allgroup`
  }
 */
  const [loading, setLoading] = useState(false);
  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

    useEffect(() => {
      startLoading();
  }, []);  
  



  const list = route.params.words;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {loading ? (
          <ActivityIndicator
            //visibility of Overlay Loading Spinner
            visible={loading}
            size="large"
            color="#00ff00"
          />
        ) : (
          <>
            {list.map((result, index) => {
              return (
                <VocabDetails
                  title={result}
                  navigation={navigation}
                  index={index}
                  key={index}
                />
              );
            })}
          </>
        )}
        {/* 
       <FlatList

        data={list}
        keyExtractor={(item, index) => item}
      
         renderItem={({ item,index }) => {
          return <VocabDetails title={item} navigation={navigation} index={index} key={index}/>;
        }} 
        contentContainerStyle={styles.list}
      ></FlatList>  */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
    //height: 400,
    maxHeight: 500,
    textAlign: "center",
  },

  list: {
    justifyContent: "center",
    flexDirection: "column",
    //flexWrap: "wrap",
  },
});

export default VocabListScreen;
