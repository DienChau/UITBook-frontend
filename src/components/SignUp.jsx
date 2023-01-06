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
import { ImageBackground } from "react-native";
import bgLogIn from "../../assets/bgLogIn2.png";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const SignUp = () => {
  const [show, setShow] = React.useState(false);
  const navigation = useNavigation();
  const handleBack = () => {
    navigation.navigate("LogIn");
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
                fontSize: 18,
                fontWeight: "800",
                color: "#fff",
              }}
            >
              Đăng kí
            </Text>
            <FormControl isInvalid>
              <FormControl.Label
                _text={{
                  color: "#fff",
                  fontSize: 14,
                  marginTop: 3,
                }}
              >
                Tên đăng nhập
              </FormControl.Label>

              <Input
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
            <FormControl isInvalid>
              <FormControl.Label
                _text={{
                  color: "#fff",
                  fontSize: 14,
                  marginTop: 2,
                }}
              >
                Email
              </FormControl.Label>

              <Input
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
            <FormControl isInvalid>
              <FormControl.Label
                _text={{
                  color: "#fff",
                  fontSize: 14,
                  marginTop: 2,
                }}
              >
                Mật khẩu
              </FormControl.Label>
              <Input
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
            <FormControl isInvalid>
              <FormControl.Label
                _text={{
                  color: "#fff",
                  fontSize: 14,
                  marginTop: 2,
                }}
              >
                Xác nhận mật khẩu
              </FormControl.Label>
              <Input
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
