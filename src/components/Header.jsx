import { Icon, Image, Input, View, Box, Pressable } from "native-base";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/logo.png";
import { FontAwesome } from "@expo/vector-icons";
// import { Pressable, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";


const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={{ backgroundColor: "#CBF0F8", flexDirection: "row", marginTop: 30 }}>
      <Pressable onPress={() => { navigation.navigate("Home"); }}
        // style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        flex={1} justifyContent="center" alignItems="center"
      >
        <Image
          source={require('../../assets/logo.png')}
          style={{ width: 50, height: 50, resizeMode: "stretch" }}
          alt='logo'
        ></Image>
      </Pressable>
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
      {/* <TouchableOpacity onPress={() => { navigation.navigate("OrderScreen"); }}> */}
      <Pressable
        onPress={() => { navigation.navigate("OrderScreen"); }}
        flex={1} justifyContent="center" alignItems="center" >
        <FontAwesome name="shopping-basket" size={24} color="#888" />
        <Box
          px={1}
          rounded='full'
          position='absolute'
          top={1}
          left={10}
          bg={'#E72A2A'}
          _text={{
            color: '#fff',
            fontSize: '11px'
          }}
        >5</Box>
      </Pressable>
      {/* </TouchableOpacity> */}

    </View >
  );
};

export default Header;
