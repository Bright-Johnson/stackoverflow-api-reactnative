import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/Home";
import Questions from "./src/Questions";

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={Home}
          options={{ title: "StackOverflow" }}
        />

        <Stack.Screen
          name='Questions'
          component={Questions}
          options={{ title: "Question and Aswers" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
