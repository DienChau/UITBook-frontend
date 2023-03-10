import React, { useEffect, useRef } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ToastAndroid,
  Image,
} from "react-native";
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
import { getPopularProducts } from "../redux/slice/product/popularProductsSlice";
import { getRatedProducts } from "../redux/slice/product/ratedProductsSlice";
import { addItemsToFavourite } from "../redux/slice/favorites/favouriteSlice";
import Book from "../components/Book";

const Home = () => {
  const navigation = useNavigation();
  const [allProducts, setProducts] = React.useState([]);
  const [popularBooks, setPopularBooks] = React.useState([]);
  const scrollViewRef = useRef();
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

  //Handle add to favorites
  // const [favorite, setFavorite] = useState(false)
  function handleAddFavorite(productItem) {
    dispatch(addItemsToFavourite(productItem));
    ToastAndroid.show("Th??m v??o y??u th??ch th??nh c??ng", ToastAndroid.SHORT);
    // favorite = true
    // console.log('Th??m v??o y??u th??ch th??nh c??ng')
    // setFavorite(true)
    // console.log('heart: ', heart)
    console.log("productItem: ", productItem);
  }
  return (
    <>
      <View style={{ flex: 1, backgroundColor: "#CBF0F8" }}>
        <SafeAreaView>
          <Header />
          <ScrollView
            style={{
              backgroundColor: "#CBF0F8",

              padding: 10,
              paddingTop: 0,
            }}
            ref={scrollViewRef}
            // onContentSizeChange={() => scrollViewRef.current.scrollTo({ x: 0, y: 400, animated: true })}
          >
            <Image
              source={require("../../assets/home-banner-2.png")}
              style={{ height: 100, width: "100%", marginTop: 10 }}
            />

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
                  Ph??? bi???n
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
            <View style={{ flexDirection: "row" }}>
              <Image
                source={require("../../assets/voucher-1.png")}
                style={{ height: 60, width: "33%" }}
              />
              <Image
                source={require("../../assets/voucher-2.png")}
                style={{ height: 60, width: "33%" }}
              />
              <Image
                source={require("../../assets/voucher-3.png")}
                style={{ height: 60, width: "33%" }}
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
              {products &&
                products.map((product, index) => (
                  // <>
                  <Book
                    key={index}
                    handleAddFavorite={handleAddFavorite}
                    product={product}
                  />
                  // </>
                ))}
            </ScrollView>

            <Image
              source={require("../../assets/home-banner-1.png")}
              style={{ height: 100, width: "100%", marginTop: 10 }}
            />

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
                  B??n ch???y nh???t
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
              {popularProducts &&
                popularProducts.map((product, index) => (
                  // <>
                  <BookHorizontal
                    key={index}
                    handleAddFavorite={handleAddFavorite}
                    product={product}
                  />
                  // </>
                ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </>
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
