import React, { useRef } from "react";
import { Text, View, ScrollView, SafeAreaView } from "react-native";
import Books from "../components/Books";
import Header from "../components/Header";
const Category = () => {
  const button = useRef();
  return (
    <View style={{ flex: 1, backgroundColor: "#CBF0F8" }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#CBF0F8" }}>
        <Header />
        <ScrollView
          ref={button}
          onContentSizeChange={() => {
            button.current.scrollTo({
              x: 0, // Required
              y: 0, // Required
              animated: true,
            });
          }}
          style={{ flex: 1, backgroundColor: "#CBF0F8" }}
        >
          {/* <Text>This is Category</Text> */}
          <Books />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Category;
