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
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

const SignUp = () => {
  const [show, setShow] = React.useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigation = useNavigation();
  const handleBack = () => {
    navigation.navigate("LogIn");
  };
  const handlePress = () => {
    Keyboard.dismiss();
    if (userName === "" || password === "" || email === "" || confirm === "") {
      ToastAndroid.show("Vui lòng nhập đầy đủ thông tin", ToastAndroid.SHORT);
      // Toast.show({
      //   type: "success",
      //   text1: "Vui lòng nhập đầy đủ thông tin",
      //   visibilityTime: 3000,
      // });
      Toast.show({
        type: "success",
        text1: "Vui lòng nhập đầy đủ thông tin",
        visibilityTime: 3000,
      });
    } else if (password != confirm) {
      ToastAndroid.show(
        "Mật khẩu xác nhận không trùng khớp",
        ToastAndroid.SHORT
      );
    } else if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      ToastAndroid.show("Email không tồn tại", ToastAndroid.SHORT);
    }

    const userNew = {
      userName,
      email,
      password,
      confirm,
    };
    console.log("user", userNew);
  };
  async function fetchData() {
    Keyboard.dismiss();
    if (
      Username === "" ||
      Password === "" ||
      Phonenumber === "" ||
      ConPassword === ""
    ) {
      ToastAndroid.show("Vui lòng nhập đầy đủ thông tin", ToastAndroid.SHORT);
    } else if (Password != ConPassword) {
      ToastAndroid.show(
        "Mật khẩu xác nhận không trùng khớp",
        ToastAndroid.SHORT
      );
    } else if (isNaN(Phonenumber)) {
      ToastAndroid.show("Số điện thoại không hợp lệ", ToastAndroid.SHORT);
    }
    const request = await axios.post("http://192.168.1.8:3000/signup", {
      username: Username,
      phonenumber: Phonenumber,
      password: Password,
      name: Name,
    });
    if (request.data.status === "Existed") {
      ToastAndroid.show("Tài khoản đã tồn tại", ToastAndroid.SHORT);
      setUsername("");
      setConPassword("");
      setPassword("");
      setPhoneNumber("");
      setName("");
    } else {
      console.log(request.data);
      ToastAndroid.show("Đăng ký tài khoản thành công", ToastAndroid.SHORT);
      setUsername("");
      setConPassword("");
      setPassword("");
      setPhoneNumber("");
      setName("");
      navigation.navigate("TabScreen", {
        username: request.data.user_session.username,
      });
    }
    console.log(request.data);
  }

  return (
    <View style={{ flex: 1 }}>
      <Toast />
      <ImageBackground source={bgLogIn} resizeMode="cover" style={{ flex: 1 }}>
        <View style={{ position: "absolute", top: 30, left: 20 }}>
          <Pressable onPress={handleBack}>
            <Ionicons
              name="arrow-back-circle-sharp"
              size={30}
              color="#e18aaa"
            />
          </Pressable>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box bg="rgba(8,5,5,0.5)" p="5" rounded="xl" width="85%">
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "800",
                color: "#fff",
              }}
            >
              Đăng kí
            </Text>
            <FormControl>
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
                value={userName}
                onChangeText={setUserName}
                color="#fff"
                size={12}
                isRequired
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

              {/* <FormControl.ErrorMessage>
              {isFieldInError("name") && <Text>Is required</Text>}
            </FormControl.ErrorMessage> */}
            </FormControl>
            <FormControl>
              <FormControl.Label
                _text={{
                  color: "#fff",
                  fontSize: 15,
                  marginTop: 2,
                }}
              >
                Email
              </FormControl.Label>

              <Input
                value={email}
                onChangeText={setEmail}
                color="#fff"
                size={12}
                isRequired
                InputLeftElement={
                  <Icon
                    as={<FontAwesome name="envelope" color="black" />}
                    size={5}
                    ml="2"
                    color="#fff"
                  />
                }
                placeholder="Email"
              />

              {/* <FormControl.ErrorMessage>
              {isFieldInError("name") && <Text>Is required</Text>}
            </FormControl.ErrorMessage> */}
            </FormControl>
            <FormControl>
              <FormControl.Label
                _text={{
                  color: "#fff",
                  fontSize: 15,
                  marginTop: 2,
                }}
              >
                Mật khẩu
              </FormControl.Label>
              <Input
                value={password}
                onChangeText={setPassword}
                color="#fff"
                size={12}
                InputLeftElement={
                  <Icon
                    as={<Foundation name="key" size={24} color="white" />}
                    size={5}
                    ml="2"
                    color="#fff"
                  />
                }
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
              {/* <FormControl.ErrorMessage>
              {isFieldInError("newPassword") && <Text>Is required</Text>}
            </FormControl.ErrorMessage> */}
            </FormControl>
            <FormControl>
              <FormControl.Label
                _text={{
                  color: "#fff",
                  fontSize: 15,
                  marginTop: 2,
                }}
              >
                Xác nhận mật khẩu
              </FormControl.Label>
              <Input
                value={confirm}
                onChangeText={setConfirm}
                color="#fff"
                size={12}
                InputLeftElement={
                  <Icon
                    as={<Foundation name="key" size={24} color="white" />}
                    size={5}
                    ml="2"
                    color="#fff"
                  />
                }
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
                placeholder="Confirm password"
              />
              {/* <FormControl.ErrorMessage>
              {isFieldInError("newPassword") && <Text>Is required</Text>}
            </FormControl.ErrorMessage> */}

              <Button
                onPress={handlePress}
                style={{ marginTop: 20 }}
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
    </View>
  );
};

export default SignUp;
