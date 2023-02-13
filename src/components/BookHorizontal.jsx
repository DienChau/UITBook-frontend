import React, { useState } from "react";
import {
  View,
  Pressable,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { NumericFormat } from "react-number-format";
import { AntDesign } from "@expo/vector-icons";
import { Rating } from "react-native-ratings";
import { useNavigation } from "@react-navigation/native";
const windowWidth = Dimensions.get("window").width;

const BookHorizontal = ({ product, handleAddFavorite }) => {
  console.log('product: ', product)
  // const [favoriteIcon, setFavoriteIcon] = useState("favorite-outline");
  // const addFavoriteHandler = () => {
  //   if (favoriteIcon == "favorite-outline") {
  //     setFavoriteIcon("favorite");
  //   } else {
  //     setFavoriteIcon("favorite-outline");
  //   }
  // };
  const navigation = useNavigation();

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
          {/* <TouchableOpacity
        onPress={() => handleAddFavoriteBook(product._id)}
        style={{ position: "absolute", left: 10, top: 10, zIndex: 2 }}
      >
        <MaterialIcons name='favorite-outline' size={26} color={"#E8ABC3"} />
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
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("DetailBook", { id: product._id, product });
            }}
            style={{ flexDirection: "row", justifyContent: "center", flex: 4 }}
          >
            <Image
              style={{
                height: 100,
                height: (windowWidth - 70) / 3,
                width: (windowWidth - 70) / 3,
              }}
              alt="book"
              resizeMode="contain"
              source={{ uri: product.images[0].url }}
            />
          </TouchableOpacity>
          <View
            style={{ flex: 5, justifyContent: "center", alignItems: "stretch" }}
          >
            <TouchableOpacity>
              <Text
                ellipsizeMode="tail"
                numberOfLines={2}
                style={{
                  textAlign: "left",
                  fontSize: 16,
                  fontWeight: "700",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  lineHeight: 20,
                  color: "#0f64b1",
                  // marginTop: 10,
                }}
              >
                {product.name}
                {/* Thiên Tài Bên Trái , Kẻ Điên Bên Phải (Tái Bản) */}
              </Text>
              <Text>{product.author}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: "flex-start", marginTop: 6 }}>
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
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 6,
              }}
            >
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: 100,
                }}
              >
                Đã bán: <Text>{product.Sold}</Text>
              </Text>
              <Text style={{ alignItems: 'center' }}>
                {Math.floor(product.ratings * 10) / 10}
                <Rating
                  imageSize={15}
                  ratingCount={5}
                  readonly={true}
                  startingValue={product.ratings}
                />
              </Text>
            </View>
          </View>
        </View>
      ) : (<></>)}
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

export default BookHorizontal;
