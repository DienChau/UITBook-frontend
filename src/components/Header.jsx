import { Icon, Image, Input, Text, View } from "native-base";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/logo.png";
import { FontAwesome } from "@expo/vector-icons";
import { Pressable } from "react-native";

const Header = () => {
  return (
    <View style={{ backgroundColor: "#CBF0F8", flexDirection: "row" }}>
      <View flex={1} justifyContent="center" alignItems="center">
        <Image
          source={logo}
          style={{ width: 50, height: 50, resizeMode: "stretch" }}
        ></Image>
      </View>
      <View flex={3} justifyContent="center">
        <Input
          variant="rounded"
          placeholder=""
          borderColor="rgba(255,255,255, 0.5)"
          color="#fff"
          fontSize={14}
          bg="rgba(255,255,255, 0.7)"
          height={8}
          InputRightElement={
            <Pressable>
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
      <View flex={1} justifyContent="center" alignItems="center">
        <FontAwesome name="shopping-basket" size={24} color="#fff" />
      </View>
    </View>
  );
};

export default Header;
