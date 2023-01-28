import React from "react";
import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { NumericFormat } from "react-number-format";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Rating } from "react-native-ratings";

const windowWidth = Dimensions.get("window").width;

const Book = ({ product }) => {
  const navigation = useNavigation();

  // const { id, product } = route.params;
  // console.log('id:', id)
  // console.log('product:', product)
  return (
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
      <TouchableOpacity
        // onPress={props.addFavoriteHandler}
        style={{ position: "absolute", left: 10, top: 10, zIndex: 2 }}
      >
        <MaterialIcons name={"favorite-outline"} size={26} color={"#E8ABC3"} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("DetailBook", { id: product._id, product });
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
  );
};

export default Book;
