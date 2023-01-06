import React from "react";
import { View, Text } from "react-native";
import { Box, Button, Image } from "native-base";
import logo from "../../assets/logo.png";
import welcom from "../../assets/Welcome3.png";

const Welcome = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#CBF0F8",
      }}
    >
      <Box
        justifyContent="center"
        flex={1}
        marginTop={10}
        alignItems="center"
        width="90%"
        bg="#ECD8F3"
        p="4"
        _text={{
          fontSize: "md",
          fontWeight: "bold",
          color: "white",
        }}
        rounded="xl"
      >
        <Image source={logo} />
      </Box>
      <Box width="90%" flex={1}>
        <Image
          source={welcom}
          marginTop={10}
          style={{ width: 250, resizeMode: "stretch", height: 100 }}
        />
        <View style={{ marginTop: 20 }}>
          <Button size="lg" _text={{ fontWeight: 900, fontSize: 18 }}>
            ĐĂNG KÝ
          </Button>
          <Button
            w="100%"
            style={{ marginTop: 20 }}
            size="lg"
            _text={{ fontWeight: 900, fontSize: 18 }}
          >
            ĐĂNG NHẬP
          </Button>
        </View>
      </Box>
    </View>
  );
};

export default Welcome;
