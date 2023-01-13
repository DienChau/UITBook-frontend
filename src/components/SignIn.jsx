import {
  Box,
  Button,
  FormControl,
  Icon,
  Input,
  NativeBaseProvider,
  Pressable,
  Text,
  View,
} from "native-base";
// import { NativeBaseConfigProvider } from "native-base/lib/typescript/core/NativeBaseContext";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ImageBackground, Keyboard, ToastAndroid } from "react-native";
import bgLogIn from "../../assets/bgLogIn2.png";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../redux/slice/userSlice";
import Loading from "./Loading";

const SignIn = () => {
  const [show, setShow] = React.useState(false);
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated } = useSelector((state) => {
    return state.user;
  });
  const user = useSelector((state) => state.user);
  // console.log("user", user);
  useEffect(() => {
    if (error) {
      ToastAndroid.show(`${error}`, ToastAndroid.SHORT);
      // dispatch(clear());
    }
    if (user.name) {
      navigation.navigate("TabBottom");
    }
  }, [dispatch, error]);

  const handlePress = () => {
    Keyboard.dismiss();
    if (email === "" || password === "") {
      ToastAndroid.show("Vui lòng nhập đầy đủ thông tin", ToastAndroid.SHORT);
    } else if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      ToastAndroid.show("Email không tồn tại", ToastAndroid.SHORT);
    } else {
      dispatch(
        loginRequest({
          email,
          password,
        })
      );
    }
    // navigation.navigate("TabBottom");
  };

  const handleToSignUp = () => {
    navigation.navigate("SignUp");
  };
  return (
    <>
      {/* {loading ? (
        <Loading />
      ) : ( */}
      <View flex={1}>
        <ImageBackground
          source={bgLogIn}
          resizeMode="cover"
          style={{ flex: 1 }}
        >
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
              <FormControl>
                <FormControl.Label
                  _text={{
                    color: "#fff",
                    fontSize: 15,
                    marginTop: 3,
                  }}
                >
                  Email
                </FormControl.Label>

                <Input
                  w={{
                    base: "75%",
                    md: "25%",
                  }}
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
              </FormControl>
              <FormControl>
                <FormControl.Label
                  _text={{
                    color: "#fff",
                    fontSize: 15,
                  }}
                >
                  Mật khẩu
                </FormControl.Label>
                <Input
                  value={password}
                  onChangeText={setPassword}
                  color="#fff"
                  size={12}
                  w={{
                    base: "75%",
                    md: "25%",
                  }}
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
                <Pressable onPress={handleToSignUp}>
                  <Text
                    marginTop={3}
                    style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}
                  >
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
      </View>
      {/* )} */}
    </>
  );
};

export default SignIn;
