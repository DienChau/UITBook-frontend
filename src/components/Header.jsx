import { Icon, Image, Input, View, Box, Pressable } from "native-base";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/logo.png";
import { FontAwesome } from "@expo/vector-icons";
// import { Pressable, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const Header = () => {
  const navigation = useNavigation();
  const [keyword, setKeyword] = useState("");
  const handleSearch = () => {
    console.log("hihi");
    console.log(keyword);
    navigation.navigate("Category", keyword);
    setKeyword("");
  };
  const productCart = useSelector((state) => state.cart.cartItems);
  let quantity = productCart.length !== 0 ? productCart.length : 0;
  return (
    <View
      style={{
        backgroundColor: "#CBF0F8",
        flexDirection: "row",
        marginTop: 30,
      }}
    >
      <Pressable
        onPress={() => {
          navigation.navigate("Home");
        }}
        // style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        flex={1}
        justifyContent="center"
        alignItems="center"
      >
        <Image
          source={require("../../assets/logo.png")}
          style={{ width: 50, height: 50, resizeMode: "stretch" }}
          alt="logo"
        ></Image>
      </Pressable>
      <View flex={3} justifyContent="center">
        <Input
          value={keyword}
          onChangeText={setKeyword}
          variant="rounded"
          placeholder=""
          borderColor="rgba(255,255,255, 0.5)"
          color="#000"
          fontSize={14}
          bg="rgba(255,255,255, 0.7)"
          height={8}
          InputRightElement={
            <Pressable onPress={handleSearch}>
              <View>
                <Icon
                  as={<FontAwesome name="search" size={24} color="black" />}
                  size={5}
                  mr="2"
                  color="#E8ABC3"
                />
              </View>
            </Pressable>
          }
        />
      </View>
      {/* <TouchableOpacity onPress={() => { navigation.navigate("OrderScreen"); }}> */}
      <Pressable
        onPress={() => {
          navigation.navigate("OrderScreen");
        }}
        flex={1}
        justifyContent="center"
        alignItems="center"
      >
        <FontAwesome name="shopping-basket" size={24} color="#888" />
        {quantity == 0 ? (
          <></>
        ) : (
          <Box
            px={1}
            rounded="full"
            position="absolute"
            top={1}
            left={10}
            bg={"#E72A2A"}
            _text={{
              color: "#fff",
              fontSize: "11px",
            }}
          >
            {quantity}
          </Box>
        )}
      </Pressable>
      {/* </TouchableOpacity> */}
    </View>
  );
};

export default Header;
