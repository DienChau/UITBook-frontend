import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useSelector } from "react-redux";
import Book from "../src/components/Book";
import DetailBook from "../src/components/BookDetail/DetailBook";
import TabBottom from "../src/components/TabBottom";
import AudioBook from "../src/screen/AudioBook";

import FinalOrderScreen from "../src/screen/FinalOrderScreen";
import LogIn from "../src/screen/LogIn";
import OrderInforScreen from "../src/screen/OrderInforScreen";
import OrderScreen from "../src/screen/OrderScreen";
import ProcessingOrder from "../src/screen/ProcessingOrder";
import SignUpScreen from "../src/screen/SignUpScreen";
import WatchedProducts from "../src/screen/WatchedProducts";
import WelcomeSreen from "../src/screen/WelcomeSreen";
import AccountInfor from "../src/screen/AccountInfor";
import TestAudio from "../src/components/TestAudio";

const Stack = createStackNavigator();
const Routes = () => {
  const { error, loading, isAuthenticated } = useSelector((state) => {
    return state.user;
  });

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="TabBottom" component={TabBottom} />
            <Stack.Screen name="DetailBook" component={DetailBook} />
            <Stack.Screen name="Booktest" component={Book} />
            <Stack.Screen name="OrderScreen" component={OrderScreen} />
            <Stack.Screen
              name="OrderInforScreen"
              component={OrderInforScreen}
            />
            <Stack.Screen
              name="finalOrderScreen"
              component={FinalOrderScreen}
            />
            <Stack.Screen name="WatchedProduct" component={WatchedProducts} />
            <Stack.Screen name="AccountInfor" component={AccountInfor} />
            <Stack.Screen name="ProcessingOrder" component={ProcessingOrder} />
            <Stack.Screen name="AudioBook" component={AudioBook} />
            <Stack.Screen name="TestAudio" component={TestAudio} />
          </>
        ) : (
          <>
            <Stack.Screen name="Welcome" component={WelcomeSreen} />
            <Stack.Screen name="LogIn" component={LogIn} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
