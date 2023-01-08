import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ItemProduct from "../components/ItemProduct";

const Home = () => {
  return (
    <SafeAreaView>
      <View>
        <ItemProduct />
      </View>
    </SafeAreaView>
  );
};

export default Home;
