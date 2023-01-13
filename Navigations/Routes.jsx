import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useSelector } from "react-redux";
import Book from "../src/components/Book";
import DetailBook from "../src/components/BookDetail/DetailBook";
import TabBottom from "../src/components/TabBottom";
import LogIn from "../src/screen/LogIn";
import OrderInforScreen from "../src/screen/OrderInforScreen";
import OrderScreen from "../src/screen/OrderScreen";
import SignUpScreen from "../src/screen/SignUpScreen";
import WelcomeSreen from "../src/screen/WelcomeSreen";

const Stack = createStackNavigator();
const Routes = () => {
  const { error, loading, isAuthenticated } = useSelector((state) => {
    return state.user;
  });
  console.log("Routes", isAuthenticated);
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
