import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";

import { StyleSheet, Text, View } from "react-native";
import Home from "./src/screen/Home";
import LogIn from "./src/screen/LogIn";
import { NativeBaseProvider } from "native-base";
import SignUpScreen from "./src/screen/SignUpScreen";
import WelcomeSreen from "./src/screen/WelcomeSreen";
import Books from "./src/components/Books";
import BooksScreen from "./src/screen/BooksScreen";

const Stack = createStackNavigator();

export default function App() {
  console.log("Hi");
  const getMoviesFromApiAsync = async () => {
    try {
      const response = await fetch(
        "http://192.168.1.4:5000/api/v2/books/popular"
      );
      const json = await response.json();
      console.log("API: ", json);
      return json;
    } catch (error) {
      console.error(error);
    }
  };
  getMoviesFromApiAsync();
  return (
    <NativeBaseProvider>
      <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcom" component={WelcomeSreen} />
          <Stack.Screen name="LogIn" component={LogIn} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d592ff",
    alignItems: "center",
    justifyContent: "center",
  },
});
