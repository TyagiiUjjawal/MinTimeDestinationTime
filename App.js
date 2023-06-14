import React from "react";
import { View, useState, useEffect } from "react-native";
import ShortestDistance from "./Components/ShortestDistance";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MapPage from "./Components/MapPage";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MapPage"
          component={MapPage}
          options={{ title: "Map" }}
        />
        <Stack.Screen
          name="ShortestDistancePage"
          component={ShortestDistance}
          options={{ title: "Shortest Distance" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
