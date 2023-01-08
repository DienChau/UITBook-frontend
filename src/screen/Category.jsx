import React from "react";
import { Text, View, ScrollView } from "react-native";
import Books from "../components/Books";
const Category = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#CBF0F8" }}>
      {/* <Text>This is Category</Text> */}

      <Books />


    </ScrollView>
  );
};

export default Category;
