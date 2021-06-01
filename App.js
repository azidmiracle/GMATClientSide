import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet,  } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import GrouplistScreen from "./screens/GrouplistScreen";
import VocabListScreen from "./screens/VocabListScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: "#1A1717" },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign:"center"
        }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}        
      />
       <Stack.Screen name="Grouplist" component={GrouplistScreen} 
        />
      <Stack.Screen name="Vocablist" component={VocabListScreen} 
      options={({ route }) => ({ num: route.params.num })}
        />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});
