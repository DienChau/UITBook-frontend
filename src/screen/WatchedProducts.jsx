import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Button, ScrollView, Text, View } from "native-base";
import React, { useEffect, useState } from "react";
import { Pressable, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BookHorizontal from "../components/BookHorizontal";
import { clearWatchedProduct } from "../redux/slice/product/watchedProduct";
import * as SMS from "expo-sms";
const WatchedProducts = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const listProduct = useSelector((state) => state.productWatched.listProduct);
  console.log("listProduct", listProduct);
  const handleClear = () => {
    dispatch(clearWatchedProduct());
  };

  return (
    <>
      <View bg={"#d5f3f9"} flex={1}>
        <View
          alignItems={"center"}
          paddingTop={10}
          flexDirection="row"
          justifyContent="space-between"
          bg={"#d5f3f9"}
          paddingBottom={5}
        >
          <Pressable
            marginLeft={5}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <View
              marginLeft={2}
              background={"#ccc"}
              borderRadius={50}
              padding={0.5}
            >
              <Ionicons name="arrow-back-outline" size={24} color="#fff" />
            </View>
          </Pressable>
          <View>
            <Text color={"#777b80"} fontWeight={"900"} fontSize={20}>
              Sách Đã Xem
            </Text>
          </View>
          <View marginRight={5}>
            {/* <FontAwesome name="shopping-basket" size={24} color="#40494b" /> */}
          </View>
        </View>
        <View flex={1}>
          {listProduct?.length === 0 ? (
            <>
              <View>
                <Image
                  style={{ width: 400, height: 400 }}
                  source={require("../../assets/empty.gif")}
                />
              </View>
            </>
          ) : (
            <>
              <ScrollView>
                <View paddingLeft={1} paddingRight={1}>
                  {listProduct &&
                    listProduct?.map((item, index) => {
                      return (
                        // <>
                        <BookHorizontal key={index} product={item} />
                        // </>
                      );
                    })}
                </View>
                <View justifyContent={"center"} alignItems={"center"}>
                  <Button marginTop={10} marginBottom={10} w={"50%"} onPress={handleClear}>
                    Dọn dẹp
                  </Button>
                </View>
              </ScrollView>
            </>
          )}
        </View>
      </View>
    </>
  );
};

export default WatchedProducts;
