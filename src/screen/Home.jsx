import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import Listbook from "../components/ListBook";
import BookHorizontal from "../components/BookHorizontal";
import Header from "../components/Header";
import axios from "axios";
import { Rating } from "react-native-ratings";

import {
  MaterialIcons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { NumericFormat } from "react-number-format";

import { useNavigation } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";
// import { getNewsProducts } from "../../../redux/features/product/newsProductsSlice";
import { getNewsProducts } from "../redux/slice/product/newsProductsSlice";
// import { getPopularProducts } from "../../../redux/features/product/popularProductsSlice";
import { getPopularProducts } from "../redux/slice/product/popularProductsSlice";
import { getRatedProducts } from "../redux/slice/product/ratedProductsSlice";
import Book from "../components/Book";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const baseUrl = "http://192.168.0.110:5000";

const Home = () => {
  const navigation = useNavigation();
  const [allProducts, setProducts] = React.useState([]);
  const [popularBooks, setPopularBooks] = React.useState([]);

  //Call API from redux
  //get allBook
  const { error, products } = useSelector((state) => state.ratedProducts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRatedProducts());
  }, [dispatch]);

  //get book popular
  const { products: popularProducts } = useSelector(
    (state) => state.popularProducts
  );
  useEffect(() => {
    dispatch(getPopularProducts());
  }, [dispatch]);
  //Call API
  // React.useEffect(() => {
  //   // console.log('hello')
  //   async function fetchData() {
  //     try {
  //       const request = await axios.get('/api/v2/books');
  //       setProducts(request.data.books);
  //       return request.data.books;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchData();
  // }, []);
  // React.useEffect(() => {
  //   // console.log('hello')
  //   async function fetchDataPopularBooks() {
  //     try {
  //       const request = await axios.get('/api/v2/books/popular');
  //       setPopularBooks(request.data.books);
  //       return request.data.books;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchDataPopularBooks();
  // }, []);
  return (
    <ScrollView
      style={{
        backgroundColor: "#CBF0F8",
        flex: 1,
        padding: 10,
        paddingTop: 0,
      }}
    >
      <SafeAreaView>
        <Header />
        {/* <Listbook onPress={addFavoriteHandler} /> */}
        <View style={{ marginTop: 10 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons name="menu-book" size={28} color="#ff9b8a" />
            <Text
              style={{
                fontSize: 18,
                color: "#1890ff",
                fontWeight: "800",
                marginLeft: 3,
              }}
            >
              Phổ biến
            </Text>
          </View>

          <View
            style={{
              marginTop: 5,
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
            }}
          />
        </View>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{
            flexDirection: "row",
            height: 250,
            justifyContent: "space-between",
            marginVertical: 10,
          }}
        >
          {products.map((product) => (
            <>
              <Book product={product} />
            </>
          ))}
        </ScrollView>

        <View style={{ marginTop: 10 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="book-open-page-variant"
              size={28}
              color="#ff9b8a"
            />
            <Text
              style={{
                fontSize: 18,
                color: "#1890ff",
                fontWeight: "800",
                marginLeft: 3,
              }}
            >
              Bán chạy nhất
            </Text>
          </View>
          <View
            style={{
              marginTop: 5,
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
            }}
          />
        </View>
        <View style={{ marginBottom: 24 }}>
          {popularProducts.map((product) => (
            <>
              <BookHorizontal product={product} />
            </>
          ))}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  shadowBorder: {
    shadowColor: "red",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
export default Home;
