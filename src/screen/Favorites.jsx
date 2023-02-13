import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import Header from "../components/Header";
import BookFavorite from "../components/BookFavorite";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFavorite,
  removeItemsFromFavorite,
} from "../redux/slice/favorites/favouriteSlice";

const Favorites = () => {
  let { favouriteItems } = useSelector((state) => state.favourite);
  // console.log("favouriteItems:", favouriteItems);

  const dispatch = useDispatch();

  const handleClearFavorite = () => {
    dispatch(clearFavorite());
  };

  const handleClearItemsFromFavorite = (item) => {
    console.log("item clear: ", item);
    dispatch(removeItemsFromFavorite(item.book));
  };

  return (
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
            marginTop: 10,
          }}
          alt="banner"
          resizeMode="cover"
          source={require("../../assets/like-banner1.png")}
        />
        {favouriteItems.length === 0 ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Image
              source={{
                uri: "https://drive.google.com/uc?id=1k2nXiRoCsJ2gKuRmL9FoFwkTgSpW_4n_",
              }}
              style={{ marginTop: 10, width: 400, height: 400 }}
            />
            <Text style={{ marginTop: 10 }}>
              Không có cuốn sách nào trong mục này
            </Text>
          </View>
        ) : (
          <View>
            {favouriteItems.map((product, index) => {
              return (
                <BookFavorite
                  handleClearItemsFromFavorite={handleClearItemsFromFavorite}
                  product={product}
                  key={index}
                />
              );
            })}
            <View
              style={{
                flex: 1,
                alignItems: "center",
              }}
            >
              <Pressable
                style={{
                  marginTop: 10,
                  backgroundColor: "#fecbde",
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: 20,
                  paddingVertical: 15,

                  borderRadius: 10,
                }}
                onPress={() => handleClearFavorite()}
              >
                <Text>Clear Favorite</Text>
              </Pressable>
            </View>
          </View>
        )}
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

export default Favorites;
