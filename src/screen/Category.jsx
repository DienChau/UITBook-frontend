import React from "react";
import { Text, View, ScrollView, SafeAreaView } from "react-native";
import Books from "../components/Books";
const Category = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#CBF0F8" }}>
      <ScrollView style={{ flex: 1, backgroundColor: "#CBF0F8" }}>
        {/* <Text>This is Category</Text> */}
        <Books />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Category;
