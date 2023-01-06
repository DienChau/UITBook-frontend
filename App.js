import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";

import { StyleSheet, Text, View } from "react-native";
import Home from "./src/screen/Home";
import LogIn from "./src/screen/LogIn";
import { NativeBaseProvider } from "native-base";
import SignIn from "./src/components/SignIn";
import SignUpScreen from "./src/screen/SignUpScreen";
import WelcomeSreen from "./src/screen/WelcomeSreen";

const Stack = createStackNavigator();
export default function App() {
  console.log("Hi");
  const getMoviesFromApiAsync = async () => {
    try {
      const response = await fetch("https://reactnative.dev/movies.json");
      const json = await response.json();
      console.log("API:", json.movies);
      return json.movies;
    } catch (error) {
      console.error(error);
    }
  };
  getMoviesFromApiAsync();
  return (
    <NativeBaseProvider>
      <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen name="Welcom" component={WelcomeSreen} /> */}
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
