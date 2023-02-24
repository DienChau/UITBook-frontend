import React from "react";
import { View, Text, Image } from "react-native";
import { Box, Button } from "native-base";
import logo from "../../assets/logo.png";
import welcom from "../../assets/Welcome3.png";
import { useNavigation } from "@react-navigation/native";

const Welcome = () => {
  const navigation = useNavigation();
  const handleToSignIn = () => {
    navigation.navigate("SignUp");
  };
  const handleToSignUp = () => {
    navigation.navigate("LogIn");
  };
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
        <Image style={{ width: 200, height: 200 }} source={logo} />
      </Box>
      <Box width="90%" flex={1}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={welcom}
            marginTop={10}
            style={{ width: 250, height: 100 }}
          />
        </View>

        <View
          style={{
            marginTop: 30,
            position: "absolute",
            bottom: 20,
            width: "100%",
          }}
        >
          <Button
            onPress={handleToSignIn}
            size="lg"
            bg="#E8ABC3"
            _text={{ fontWeight: 900, fontSize: 18 }}
          >
            ĐĂNG KÝ
          </Button>
          <Button
            onPress={handleToSignUp}
            bg="#49D9E2"
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
