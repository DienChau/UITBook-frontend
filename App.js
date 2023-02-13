import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import axios from "axios";

import { StyleSheet, Text, View } from "react-native";
import Home from "./src/screen/Home";
import LogIn from "./src/screen/LogIn";
import { NativeBaseProvider } from "native-base";
import SignUpScreen from "./src/screen/SignUpScreen";
import WelcomeSreen from "./src/screen/WelcomeSreen";
// import BookDetail from "./src/components/BookDetail";
import Books from "./src/components/Books";
import BooksScreen from "./src/screen/BooksScreen";
import OrderInforScreen from "./src/screen/OrderInforScreen";
import OrderScreen from "./src/screen/OrderScreen";
import DetailBook from "./src/components/BookDetail/DetailBook";

// const baseUrl = "http://192.168.0.108:5000";

import TabBottom from "./src/components/TabBottom";
import { Provider, useSelector } from "react-redux";
import { persistor, store } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Routes from "./Navigations/Routes";

const Stack = createStackNavigator();
// axios.defaults.baseURL = "http://192.168.43.184:5000";
// axios.defaults.baseURL = "http://192.168.0.110:5000";
axios.defaults.baseURL = "http://172.17.9.78:5000";
export default function App() {
  // console.log("Hi");
  // const getMoviesFromApiAsync = async () => {
  //   try {
  //     const response = await fetch(
  //       "http://192.168.1.4:5000/api/v2/books/popular"
  //     );
  //     const json = await response.json();
  //     console.log("API: ", json);
  //     return json;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // getMoviesFromApiAsync();
  // React.useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const request = await axios.get(`${baseUrl}/api/v2/books`);
  //       console.log(request.data);
  //     } catch (error) {
  //       console.log("error");
  //     }
  //   }
  //   fetchData();
  // }, []);
  // console.log("Hi");
  // const getMoviesFromApiAsync = async () => {
  //   try {
  //     const response = await fetch("https://reactnative.dev/movies.json");
  //     const json = await response.json();
  //     console.log("API:", json.movies);
  //     return json.movies;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // getMoviesFromApiAsync();

  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <NativeBaseProvider>
          <Routes />
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
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
