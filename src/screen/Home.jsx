import React, { useState, useEffect } from "react";
import { ScrollView, Text, View, Dimensions, StyleSheet, SafeAreaView, Image, TouchableOpacity } from "react-native"
import Listbook from "../components/ListBook";
import BookHorizontal from "../components/BookHorizontal";
import Header from "../components/Header";
import axios from "axios";
import { Rating } from "react-native-ratings";

import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { NumericFormat } from "react-number-format";

import { useNavigation } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";
// import { getNewsProducts } from "../../../redux/features/product/newsProductsSlice";
import { getNewsProducts } from '../redux/slice/product/newsProductsSlice'
// import { getPopularProducts } from "../../../redux/features/product/popularProductsSlice";
import { getPopularProducts } from '../redux/slice/product/popularProductsSlice'
import { getRatedProducts } from '../redux/slice/product/ratedProductsSlice'
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const baseUrl = "http://192.168.0.110:5000";

const Home = () => {
  const navigation = useNavigation()
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
  const { products: popularProducts } = useSelector((state) => state.popularProducts);
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

    <ScrollView style={{ backgroundColor: '#CBF0F8', flex: 1, padding: 10, paddingTop: 0 }}>
      <SafeAreaView>
        <Header />
        {/* <Listbook onPress={addFavoriteHandler} /> */}
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 16 }}>Bán chạy nhất</Text>
          <View
            style={{
              marginTop: 5,
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
            }}
          />
        </View>
        <ScrollView horizontal={true} contentContainerStyle={{
          flexDirection: 'row', height: 250,
          justifyContent: 'space-between',
          marginVertical: 10
        }}>

          {
            products.map((product) => (
              <View
                key={product._id}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 10,
                  marginRight: 12,
                  marginTop: 3,
                  marginBottom: 3,
                  width: (windowWidth - 50) / 2,
                  padding: 12,
                  justifyContent: "center",
                  position: "relative",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.23,
                  shadowRadius: 2.62,
                  elevation: 4,
                }}
              >
                <TouchableOpacity
                  style={{ position: "absolute", left: 10, top: 10, zIndex: 2 }}
                >
                  <MaterialIcons name={'favorite-outline'} size={26} color={"#E8ABC3"} />
                </TouchableOpacity>
                <TouchableOpacity
                  // onPress={() => navigation.navigate("DetailBook", product)}
                  onPress={() => {
                    navigation.navigate('DetailBook', { id: product._id, product });
                  }}
                >
                  <View style={{ flexDirection: "row", justifyContent: "center" }}>
                    <Image
                      style={{
                        height: 100,
                        height: (windowWidth - 70) / 3,
                        width: (windowWidth - 70) / 3,
                      }}
                      resizeMode="contain"
                      source={{ uri: product.images[0].url }}
                      alt={product.name}
                    />
                  </View>
                  <View>
                    <Text
                      ellipsizeMode="tail"
                      numberOfLines={2}
                      style={{
                        width: "100%",
                        textAlign: "center",
                        fontSize: 14,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        lineHeight: 18,
                        marginTop: 10,
                      }}
                    >
                      {product.name}
                    </Text>
                  </View>
                </TouchableOpacity>

                <View style={{ alignItems: "center", marginTop: 6 }}>
                  <NumericFormat
                    value={product.price}
                    displayType={"text"}
                    // decimalSeparator={'.'}
                    thousandSeparator={true}
                    // thousandSeparator={"."}
                    suffix={" đ"}
                    renderText={(value) => (
                      <Text style={{ color: "#DA2424" }}>{value}</Text>
                    )}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 6,
                  }}
                >
                  <Text>
                    Đã bán: <Text>{product.Sold}</Text>
                  </Text>
                  <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                    <Text>

                      {Math.floor(product.ratings * 10) / 10}
                    </Text>
                    <Rating
                      imageSize={15}
                      ratingCount={1}
                      readonly={true}
                      startingValue={product.ratings}
                    />
                  </View>
                  {/* <Text>
                    {Math.floor(5.95)}
                    {Math.floor(product.ratings * 10) / 10}
                    {product.ratings}
                    <AntDesign name="star" size={16} color="#fedc00" />
                  </Text> */}
                </View>
              </View>
            ))
          }

        </ScrollView>


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
          {
            popularProducts.map((product) => (
              <View
                key={product._id}
                style={[
                  {
                    marginTop: 12,
                    backgroundColor: "#fff",
                    borderRadius: 10,
                    marginRight: 12,
                    width: "100%",
                    padding: 18,
                    position: "relative",
                    flexDirection: "row",
                  },
                  styles.shadowBorder,
                ]}
              >

                <TouchableOpacity
                  style={{ position: "absolute", left: 10, top: 10, zIndex: 2 }}
                >
                  <MaterialIcons name={'favorite-outline'} size={26} color={"#E8ABC3"} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("DetailBook", product)}
                  style={{ flexDirection: "row", justifyContent: "center", flex: 4 }}
                >
                  <Image
                    style={{
                      height: 100,
                      height: (windowWidth - 70) / 3,
                      width: (windowWidth - 70) / 3,
                    }}
                    resizeMode="contain"
                    source={{ uri: product.images[0].url }}
                    alt={product.name}
                  />
                </TouchableOpacity>
                <View
                  style={{ flex: 5, justifyContent: "center", alignItems: "stretch" }}
                >
                  <TouchableOpacity onPress={() => navigation.navigate("DetailBook", product)}>
                    <Text
                      ellipsizeMode="tail"
                      numberOfLines={2}
                      style={{
                        textAlign: "left",
                        fontSize: 14,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        lineHeight: 20,
                      }}
                    >
                      {product.name}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.navigate("DetailBook", product)} style={{ alignItems: "flex-start", marginTop: 6 }}>
                    <NumericFormat
                      value={product.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={" đ"}
                      renderText={(value) => (
                        <Text style={{ color: "#DA2424" }}>{value}</Text>
                      )}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 6,
                    }}
                  >
                    <Text>
                      Đã bán: <Text>{product.Sold}</Text>
                    </Text>
                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                      <Text>

                        {Math.floor(product.ratings * 10) / 10}
                      </Text>
                      <Rating
                        imageSize={15}
                        ratingCount={1}
                        readonly={true}
                        startingValue={product.ratings}
                      />
                    </View>
                    {/* <Text>
                      {product.ratings}
                      <AntDesign name="star" size={16} color="#fedc00" />
                    </Text> */}
                  </View>
                </View>

              </View>
            ))
          }

        </View>
      </SafeAreaView>
    </ScrollView >

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
