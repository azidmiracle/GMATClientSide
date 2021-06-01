import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import { Transition, Transitioning } from "react-native-reanimated";
import Modal from "react-native-modal";


const Sentence = (props) => {


  return (
          <View style={i}>
            {data.map((result, index) => {
              return (
                <View style={styles.details}>
                  <Text style={styles.definition}>{result.definition}</Text>
                </View>
              );
            })}
               
          </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#7bf1a8",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },

  details: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 5,
    fontSize: 15,
  },


});

export default Sentence;
