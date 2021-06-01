import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Button,TouchableOpacity } from 'react-native';

const Tabs=(props)=>{
  return (
    <View  style={styles.btn_container} >     
       <TouchableOpacity
         style={[styles.btn,{backgroundColor:props.bkcolor}]}       
         onPress={() => props.navigation.navigate('Grouplist')}
      >
        <Text style={styles.text}>{props.title}</Text>

      </TouchableOpacity>

    </View>
  )
}

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Tabs title="LEARN" bkcolor="#fec5bb" navigation={navigation}/>
      <Tabs title="PRACTICE" bkcolor="#4cc9f0" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  btn_container:{
    marginVertical: 20,
  },
  text:{
    color:'white',
    //fontFamily:'Roboto',
    fontSize:50,
    padding:50,
  },
  btn: {
    alignItems: "center",
    height:200,
    margin:30,
    borderRadius:10,
  },

});
