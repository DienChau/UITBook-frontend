import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Books from "../components/Books";

const BooksScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Books />
    </SafeAreaView>
  );
};

export default BooksScreen;
