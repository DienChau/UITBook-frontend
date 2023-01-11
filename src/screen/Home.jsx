import React, { useState } from "react";
import { ScrollView, Text, View, Dimensions, StyleSheet, SafeAreaView, Image, TouchableOpacity } from "react-native"
import Listbook from "../components/ListBook";
import BookHorizontal from "../components/BookHorizontal";
import Header from "../components/Header";

import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { NumericFormat } from "react-number-format";
const windowWidth = Dimensions.get("window").width;

import products from '../data/Product'
import { useNavigation } from "@react-navigation/native";

const windowHeight = Dimensions.get("window").height;

const Home = () => {
  const navigation = useNavigation()
  const [isFavorite, setFavoriteIcon] = useState(false)
  const addFavoriteHandler = (id) => {
    const match = products.find((product) => product._id === id);
    console.log(match)
    if (match) {
      setFavoriteIcon(!isFavorite)
    }

    // if (favoriteIcon == 'favorite-outline') {
    //   setFavoriteIcon('favorite')
    // } else {
    //   setFavoriteIcon('favorite-outline')

    // }
  };
  return (

    <ScrollView style={{ backgroundColor: '#CBF0F8', flex: 1, padding: 10, paddingTop: 0 }}>
      {/* <Text>This is home</Text> */}
      <SafeAreaView>
        <Header />

        {/* <Listbook onPress={addFavoriteHandler} /> */}
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
                  onPress={() => { addFavoriteHandler(product._id) }}
                  style={{ position: "absolute", left: 10, top: 10, zIndex: 2 }}
                >
                  <MaterialIcons name={isFavorite ? 'favorite' : 'favorite-outline'} size={26} color={"#E8ABC3"} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("DetailBook", product)}
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
                  <Text>
                    {product.ratings}
                    <AntDesign name="star" size={16} color="#fedc00" />
                  </Text>
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
            products.map((product) => (
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
                  onPress={addFavoriteHandler}
                  style={{ position: "absolute", left: 10, top: 10, zIndex: 2 }}
                >
                  <MaterialIcons name={isFavorite ? 'favorite' : 'favorite-outline'} size={26} color={"#E8ABC3"} />
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
                    <Text>
                      {product.ratings}
                      <AntDesign name="star" size={16} color="#fedc00" />
                    </Text>
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
