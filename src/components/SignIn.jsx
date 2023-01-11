import {
  Box,
  Button,
  FormControl,
  Icon,
  Input,
  NativeBaseProvider,
  Pressable,
  Stack,
  Text,
  View,
} from "native-base";
// import { NativeBaseConfigProvider } from "native-base/lib/typescript/core/NativeBaseContext";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useValidation } from "react-native-form-validator";
import { Foundation } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ImageBackground, Keyboard, ToastAndroid } from "react-native";
import bgLogIn from "../../assets/bgLogIn2.png";
import { useNavigation } from "@react-navigation/native";

const SignIn = () => {
  const [show, setShow] = React.useState(false);
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
    useValidation({
      state: { name, newPassword },
    });
  const handlePress = () => {
    Keyboard.dismiss();
    if (name === "" || password === "") {
      ToastAndroid.show("Vui lòng nhập đầy đủ thông tin", ToastAndroid.SHORT);
    }
    navigation.navigate("TabBottom");
  };

  const _onPressButton = () => {
    console.log("name:", name);
    validate({
      name: { minlength: 3, maxlength: 7, required: true },
      newPassword: { required: true, minlength: 6 },
    });
    const a = getErrorsInField("newPassword");
    console.log(a);
  };
  const handleToSignUp = () => {
    navigation.navigate("SignUp");
  };
  return (
    <NativeBaseProvider>
      <ImageBackground source={bgLogIn} resizeMode="cover" style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box bg="rgba(8,5,5,0.5)" p="5" rounded="xl">
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "800",
                color: "#fff",
              }}
            >
              Đăng nhập
            </Text>
            <FormControl isInvalid>
              <FormControl.Label
                _text={{
                  color: "#fff",
                  fontSize: 15,
                  marginTop: 3,
                }}
              >
                Tên đăng nhập
              </FormControl.Label>

              <Input
                color="#fff"
                size={12}
                value={name}
                onChangeText={setName}
                isRequired
                w={{
                  base: "75%",
                  md: "25%",
                }}
                InputLeftElement={
                  <Icon
                    as={<AntDesign name="user" size={24} color="black" />}
                    size={5}
                    ml="2"
                    color="#fff"
                  />
                }
                placeholder="Name"
              />
            </FormControl>
            <FormControl isInvalid>
              <FormControl.Label
                _text={{
                  color: "#fff",
                  fontSize: 15,
                }}
              >
                Mật khẩu
              </FormControl.Label>
              <Input
                color="#fff"
                size={12}
                onChangeText={setNewPassword}
                value={newPassword}
                InputLeftElement={
                  <Icon
                    as={<Foundation name="key" size={24} color="white" />}
                    size={5}
                    ml="2"
                    color="#fff"
                  />
                }
                w={{
                  base: "75%",
                  md: "25%",
                }}
                type={show ? "text" : "password"}
                InputRightElement={
                  <Pressable onPress={() => setShow(!show)}>
                    <Icon
                      as={
                        <MaterialCommunityIcons
                          name={show ? "eye" : "eye-off-outline"}
                        />
                      }
                      size={5}
                      mr="2"
                      color="#fff"
                    />
                  </Pressable>
                }
                placeholder="Password"
              />

              <Pressable onPress={handleToSignUp}>
                <Text style={{ color: "#fff", fontSize: 14 }}>
                  Chưa có tài khoản ?
                </Text>
              </Pressable>
              <Button
                style={{ marginTop: 10 }}
                onPress={handlePress}
                size="sm"
                bg="#E8ABC3"
                _text={{ fontSize: 18, fontWeight: "900" }}
                _pressed={{ bg: "#ff9b8a" }}
              >
                TIẾP TỤC
              </Button>
            </FormControl>
          </Box>
        </View>
      </ImageBackground>
    </NativeBaseProvider>
  );
};

export default SignIn;
