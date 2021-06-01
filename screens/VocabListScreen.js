import "react-native-gesture-handler";
import React,{useEffect} from "react";
import {
  StyleSheet,
  View,
  SafeAreaView ,
  FlatList,
  SectionList
} from "react-native";


import VocabDetails from '../components/VocabDetails'
const VocabListScreen = ({navigation,route}) => {
  //const SERVER_URL = "https://gmat-vocab-server.herokuapp.com/";
  //const [list, setList] = useState([]);
  //const GROUPNUM = route.params.num
 /*  let URL=`${SERVER_URL}group/${GROUPNUM}`
  if(GROUPNUM==0){
    URL=`${SERVER_URL}allgroup`
  }
 */
 /*  useEffect(() => {
    console.log(route.params.words)
  }, []);  */
 
const list = route.params.words
  return (
    <SafeAreaView  
   
    style={styles.container}>
       <FlatList

        data={list}
        keyExtractor={(item, index) => item}
      
         renderItem={({ item,index }) => {
          return <VocabDetails title={item} navigation={navigation} index={index} key={index}/>;
        }} 
        contentContainerStyle={styles.list}
      ></FlatList> 
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
    textAlign:'center'
  },

  list: {
    justifyContent: "center",
    flexDirection: "column",
    //flexWrap: "wrap",
  },
 
});

export default VocabListScreen;
