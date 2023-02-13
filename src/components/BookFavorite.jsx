import React from "react";
import { View, Text, Image, Dimensions, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { NumericFormat } from "react-number-format";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const windowWidth = Dimensions.get("window").width;
const BookFavorite = ({ product, handleClearItemsFromFavorite }) => {
  const navigation = useNavigation();
  const handleClick = () => {
    navigation.navigate("DetailBook", { id: product.book, product });
  };
  // console.log('props: ', handleClearItemsFromFavorite)
  return (
    <View
      style={[
        {
          marginTop: 16,
          marginHorizontal: 10,
          backgroundColor: "#fff",
          borderRadius: 10,
          marginRight: 12,
          // width: "100%",
          padding: 18,
          position: "relative",
          flexDirection: "row",
        },
        styles.shadowBorder,
      ]}
    >
      <TouchableOpacity
        onPress={() => handleClearItemsFromFavorite(product)}
        style={{ position: "absolute", right: 20, top: 20, zIndex: 2 }}
      >
        <MaterialIcons name={"favorite"} size={26} color={"#E8ABC3"} />
      </TouchableOpacity>
      <TouchableOpacity
        // onPress={() => navigation.navigate("DetailBook", product)}
        onPress={handleClick}
        style={{ flexDirection: "row", justifyContent: "center", flex: 2 }}
      >
        <Image
          style={{
            height: 100,
            height: (windowWidth - 70) / 3,
            width: (windowWidth - 70) / 3,
          }}
          resizeMode="contain"
          source={{ uri: product.image }}
          alt={product.name}
        />
      </TouchableOpacity>
      <View
        style={{
          flex: 5,
          justifyContent: "center",
          alignItems: "stretch",
          marginLeft: 10,
        }}
      >
        <TouchableOpacity
          onPress={handleClick}
          // onPress={() => navigation.navigate("DetailBook", product)} 
          style={{ marginRight: 20 }}>
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
              paddingRight: 10,
              // marginTop: 10,
            }}
          >
            {/* {props.bookName} */}
            {product.name}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          // onPress={() => navigation.navigate("DetailBook", product)} 
          onPress={handleClick}
          style={{ alignItems: "flex-start", marginTop: 6 }}>
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
          <Text>
            Tồn kho: <Text>{product.stock}</Text>
          </Text>
          <Text>
            {product.ratings}
            <AntDesign name="star" size={16} color="#fedc00" />
          </Text>
        </View>
      </View>
    </View>
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

export default BookFavorite;
