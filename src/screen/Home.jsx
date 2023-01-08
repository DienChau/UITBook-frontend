import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native"
// import TabBottom from "../components/TabBottom";
import Listbook from "../components/ListBook";
import BookHorizontal from "../components/BookHorizontal";

const Home = () => {
  const [favoriteIcon, setFavoriteIcon] = useState('favorite-outline')
  const addFavoriteHandler = () => {
    if (favoriteIcon == 'favorite-outline') {
      setFavoriteIcon('favorite')
    } else {
      setFavoriteIcon('favorite-outline')

    }
  };
  return (
    <ScrollView style={{ backgroundColor: '#CBF0F8', flex: 1, padding: 10 }}>
      <Text>This is home</Text>
      <Listbook onPress={addFavoriteHandler} />
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontSize: 16 }}>Phổ biến</Text>
        <View
          style={{
            marginTop: 5,
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
          }}
        />
      </View>
      <View style={{ marginBottom: 24 }}>
        <BookHorizontal bookName={'Thiên Tài Bên Trái , Kẻ Điên Bên Phải (Tái Bản)'} />
        <BookHorizontal bookName={'Thiên Tài Bên Trái , Kẻ Điên Bên Phải (Tái Bản)'} />
        <BookHorizontal bookName={'Thiên Tài Bên Trái , Kẻ Điên Bên Phải (Tái Bản)'} />
      </View>
    </ScrollView >
  );
};

export default Home;
