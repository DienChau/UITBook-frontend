import React from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  Dimensions,
  ScrollView,
  LogBox,
  TouchableOpacity,
} from "react-native";
import Header from "../components/Header";
import { MaterialIcons } from "@expo/vector-icons";
import { NumericFormat } from "react-number-format";
import { AntDesign } from "@expo/vector-icons";
import products from "../data/Product";
const windowWidth = Dimensions.get("window").width;
import { useNavigation } from "@react-navigation/native";

const Favorites = () => {
  const navigation = useNavigation()

  return (
    // <SafeAreaView>
    <ScrollView
      style={{
        backgroundColor: "#CBF0F8",
        flex: 1,
      }}
    >
      <SafeAreaView>
        <Header />
        <Image
          style={{
            width: "100%",
            marginTop: 10
          }}
          alt='banner'
          resizeMode="cover"
          source={require("../../assets/like-banner1.png")}
        />
        <View style={{
          marginBottom: 10
        }}>
          {
            products.map((product) => (
              <View
                key={product._id}
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
                  // onPress={addFavoriteHandler}
                  style={{ position: "absolute", right: 20, top: 20, zIndex: 2 }}
                >
                  <MaterialIcons name={"favorite"} size={26} color={"#E8ABC3"} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("DetailBook", product)}
                  style={{ flexDirection: "row", justifyContent: "center", flex: 2 }}
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
                  style={{
                    flex: 5,
                    justifyContent: "center",
                    alignItems: "stretch",
                    marginLeft: 10,
                  }}
                >
                  <TouchableOpacity onPress={() => navigation.navigate("DetailBook", product)} style={{ marginRight: 20 }}>
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
                  <TouchableOpacity onPress={() => navigation.navigate("DetailBook", product)} style={{ alignItems: "flex-start", marginTop: 6 }}>
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
    </ScrollView>
    // </SafeAreaView>
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

export default Favorites;
