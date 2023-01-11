import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabBottom from "../src/components/TabBottom";
import Home from "../src/screen/Home";
import OrderScreen from "../src/screen/OrderScreen";
import DetailBook from "../src/components/BookDetail/DetailBook";
import OrderInforScreen from "../src/screen/OrderInforScreen";
import { View } from "react-native";

const Stack = createNativeStackNavigator();

function StackNav() {
  return (
    <View>
      <Text>StackNav</Text>
    </View>
    // <Stack.Navigator
    //   initialRouteName="Home"
    //   screenOptions={{
    //     headerShown: false,
    //   }}
    // >
    //   <Stack.Screen name="Home" component={Home} />
    //   <Stack.Screen name="OrderScreen" component={OrderScreen} />
    //   <Stack.Screen name="DetailBook" component={DetailBook} />
    //   <Stack.Screen name="OrderInforScreen" component={OrderInforScreen} />
    // </Stack.Navigator>
  );
}

export default StackNav;
