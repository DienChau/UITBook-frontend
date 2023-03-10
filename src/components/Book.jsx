import React from "react";
import { View, Text, Image, Dimensions, TouchableOpacity, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { NumericFormat } from "react-number-format";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Rating } from "react-native-ratings";

// import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrorsDetails,
  getProductDetails,
} from "../redux/slice/product/productDetailsSlice";
import {
  clearErrorsReview,
  newReview,
  resetStateReview,
} from "../redux/slice/product/newReviewSlice";
import { addWatchedProduct } from "../redux/slice/product/watchedProduct";
import { useState } from "react";

const windowWidth = Dimensions.get("window").width;

const Book = ({ product, handleAddFavorite }) => {

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleClick = () => {
    dispatch(
      addWatchedProduct({
        ...product,
      })
    );
    navigation.navigate("DetailBook", { id: product._id, product });
  };
  // const { id, product } = route.params;
  // console.log('id:', id)
  // console.log('product:', product)

  const [favorite, setFavorite] = useState(false)
  const handleAddFavoriteBook = (product) => {
    handleAddFavorite(product);
    setFavorite(!favorite)
    console.log('Has favorite: ', favorite)
  }
  return (
    <>
      {product ? (
        <View
          style={{
            // flex: 1,
            // margin: 20,
            backgroundColor: "#fff",
            borderRadius: 10,
            marginRight: 5,
            marginTop: 3,
            marginBottom: 5,
            // width: 150,
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
          {/* <TouchableOpacity
            onPress={() => handleAddFavoriteBook(product._id)}
            style={{ position: "absolute", left: 10, top: 10, zIndex: 2 }}
          >
            <MaterialIcons name={"favorite-outline"} size={26} color={"#E8ABC3"} />
          </TouchableOpacity> */}

          <Pressable
            onPress={() => handleAddFavoriteBook(product._id)}
          >
            {favorite ? (
              <AntDesign name="heart" size={24} color="#E8ABC3" />
            ) : (
              <AntDesign
                name="hearto"
                size={24}
                color="#E8ABC3"
              />
            )}
          </Pressable>

          <TouchableOpacity onPress={handleClick}>
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
              suffix={" ??"}
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
              ???? b??n: <Text>{product.Sold}</Text>
            </Text>
            <View style={{ alignItems: "center", flexDirection: "row" }}>
              <Text>{Math.floor(product.ratings * 10) / 10}</Text>
              <Rating
                imageSize={15}
                ratingCount={1}
                readonly={true}
                startingValue={product.ratings}
              />
            </View>
          </View>
        </View>
      ) : (<></>)}
    </>
  );
};

export default Book;
