// import React from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { NumericFormat } from "react-number-format";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

// import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrorsDetails,
  getProductDetails,
} from '../redux/slice/product/productDetailsSlice'
import {
  clearErrorsReview,
  newReview,
  resetStateReview,
} from '../redux/slice/product/newReviewSlice'
const windowWidth = Dimensions.get("window").width;

const Book = ({ route }) => {
  // const navigation = useNavigation()
  const { id, product } = route.params;
  // console.log('id:', id)
  // console.log('product:', product)
  const dispatch = useDispatch();
  const { loading, error, product: productBook } = useSelector(
    (state) => state.productDetails
  );
  console.log('productBook:', productBook)

  return (
    <View
      style={{
        flex: 1,
        // margin: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        marginRight: 12,
        marginTop: 3,
        marginBottom: 3,
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
      <TouchableOpacity
        // onPress={props.addFavoriteHandler}
        style={{ position: "absolute", left: 10, top: 10, zIndex: 2 }}
      >
        <MaterialIcons name={"favorite-outline"} size={26} color={"#E8ABC3"} />
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Image
            style={{
              height: 100,
              height: (windowWidth - 70) / 3,
              width: (windowWidth - 70) / 3,
            }}
            alt='book'
            resizeMode="contain"
            source={require("../../assets/book1.png")}
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
            Thiên Tài Bên Trái, Kẻ Điên Bên Phải (Tái Bản)
          </Text>
        </View>
      </TouchableOpacity>

      <View style={{ alignItems: "center", marginTop: 6 }}>
        <NumericFormat
          value={2456981}
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
          Đã bán: <Text>100</Text>
        </Text>
        <Text>
          5
          <AntDesign name="star" size={16} color="#fedc00" />
        </Text>
      </View>
    </View>
  );
};

export default Book;