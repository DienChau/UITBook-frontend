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

import { Foundation } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, ImageBackground, Keyboard, ToastAndroid } from "react-native";
import bgLogIn from "../../assets/bgLogIn2.png";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";

// import { launchCamera, launchImageLibrary } from "react-native-image-picker";

const SignUp = () => {
  const [image, setImage] = useState(
    "https://th.bing.com/th/id/R.d3ce2d1006f2f7aad45a5e0aa8decae6?rik=rA%2fIxpegVyj5BA&pid=ImgRaw&r=0"
  );
  const [show, setShow] = React.useState(false);
  const [show1, setShow1] = useState(false);
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
  // const options = {
  //   mediaType: "photo",
  //   includeBase64: false,
  //   maxHeight: 200,
  //   maxWidth: 200,
  // };
  // const handleAvatar = () => {
  //   console.log("hihi");
  //   launchImageLibrary(options, (reponse) => {
  //     console.log(reponse);
  //   });
  // };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ flex: 1 }}>
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
                  <Pressable onPress={() => setShow1(!show1)}>
                    <Icon
                      as={
                        <MaterialCommunityIcons
                          name={show1 ? "eye" : "eye-off-outline"}
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
              <FormControl.Label
                _text={{
                  color: "#fff",
                  fontSize: 15,
                  marginTop: 2,
                }}
              >
                Chọn ảnh đại diện
              </FormControl.Label>
              <View
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDirection={"row"}
              >
                <Pressable onPress={pickImage}>
                  <View
                    justifyContent={"center"}
                    height={55}
                    bg={"#bfe2fe"}
                    padding={3}
                    rounded={10}
                  >
                    <AntDesign name="folderopen" size={30} color="#fff" />
                  </View>
                </Pressable>

                <View>
                  {image && (
                    <Image
                      source={{ uri: image }}
                      style={{
                        width: 100,
                        height: 100,
                        resizeMode: "stretch",
                        borderRadius: 50,
                      }}
                    />
                  )}
                  {/* <Image
                    style={{
                      width: 100,
                      height: 100,
                      resizeMode: "stretch",
                      borderRadius: 50,
                    }}
                    source={{
                      uri: "https://th.bing.com/th/id/R.d3ce2d1006f2f7aad45a5e0aa8decae6?rik=rA%2fIxpegVyj5BA&pid=ImgRaw&r=0",
                    }}
                  /> */}
                </View>
              </View>
            </FormControl>

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
          </Box>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SignUp;
