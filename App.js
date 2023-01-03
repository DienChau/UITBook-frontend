import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

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
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Hello Nhi, let code the app UITBOOK</Text>
      <StatusBar style="auto" />
    </View>
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
