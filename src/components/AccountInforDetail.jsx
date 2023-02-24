import React, { useState, useEffect } from "react";
import { Button, Divider, Icon, Input, ScrollView, View } from "native-base";
import {
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import { Foundation, Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ToastAndroid } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  clearUpdate,
  updateInfo,
  updatePassword,
} from "../redux/slice/profileUserSlice";
import Loading from "./Loading";
import { loadUser } from "../redux/slice/userSlice";
const AccountInforDetail = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { loading, isUpdated, error } = useSelector(
    (state) => state.userDetail
  );
  console.log("usser", user);

  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [imageAvatar, setImageAvatar] = useState(
    user?.avatar.url
      ? user?.avatar.url
      : "https://www.invert.vn/media/uploads/uploads/2022/9/17165757-39.jpeg"
  );
  const [show, setShow] = React.useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  // console.log("isUpdated", isUpdated);
  // useEffect(() => {
  //   dispatch(loadUser());
  // }, []);
  useEffect(() => {
    if (isUpdated) {
      ToastAndroid.show("Cập nhật thành công", ToastAndroid.LONG);
      dispatch(loadUser());
      dispatch(clearUpdate());
    }
    if (error) {
      // console.log("error", error);
      ToastAndroid.show(`${error}`, ToastAndroid.LONG);
      dispatch(clearErrors());
    }
    // dispatch(clearUpdate());
  }, [isUpdated, error]);
  // console.log("loading", loading);

  const handleUpdate = () => {
    if (oldPassword === "" || newPassword === "" || confirmPassword === "") {
      ToastAndroid.show("Vui lòng nhập đầy đủ thông tin", ToastAndroid.LONG);
      return;
    } else if (newPassword !== confirmPassword) {
      ToastAndroid.show(
        "Mật khẩu xác nhận không trùng khớp",
        ToastAndroid.LONG
      );
      return;
    } else {
      const changePassword = {
        oldPassword,
        newPassword,
        confirmPassword,
      };
      // console.log("User", changePassword);
      dispatch(updatePassword({ oldPassword, newPassword, confirmPassword }));
    }
  };

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setImageAvatar(result.uri);
    }
    if (hasGalleryPermission === false) {
      return <Text>No access to Internal Storage</Text>;
    }
  };
  const handleUploadImage = async (img) => {
    const cloudName = "dtu8kyhxq";
    const cloudURL = "https://api.cloudinary.com/v1_1/dtu8kyhxq/auto/upload";
    const uploadPreset = "uw_test";

    let image = {
      uri: img,
      type: `test/${img.split(".")[1]}`,
      name: `test.${img.split(".")[1]}`,
    };
    const formData = new FormData();
    if (image != undefined) {
      formData.append("file", image);
      formData.append("cloud_name", cloudName);
      formData.append("upload_preset", uploadPreset);

      await fetch(cloudURL, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          dispatch(
            updateInfo({
              name: userName,
              email: email,
              avatar: {
                public_id: data.public_id,
                url: data.url,
              },
            })
          );
        });
    }
  };
  const handleUpdateInfo = () => {
    // console.log("handleUpdateInfo");
    handleUploadImage(imageAvatar);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#CBF0F8" }}>
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <View style={{ position: "relative" }}>
            <Image
              style={{ height: 200, width: "100%" }}
              source={require("../../assets/infor-accoutn.png")}
              alt="avatar"
              resizeMethod={"auto"}
            />
            <Pressable
              style={{
                position: "absolute",
                top: 40,
                left: 20,
                // marginLeft: 10,
                backgroundColor: "#ccc",
                padding: 1,
                borderRadius: 100,
              }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Ionicons name="arrow-back-outline" size={25} color="#fff" />
            </Pressable>
            <View
              style={{
                position: "absolute",
                bottom: -30,
                left: 0,
                right: 0,
                zIndex: 99,
              }}
            >
              <View
                style={{
                  marginRight: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {imageAvatar && (
                  <Image
                    source={{ uri: imageAvatar }}
                    style={{
                      height: 120,
                      borderRadius: 100,
                      width: 120,
                      backgroundColor: "#00ffff",
                    }}
                  />
                )}
                <TouchableOpacity
                  style={{ position: "absolute", bottom: -10, right: 140 }}
                  onPress={() => pickImage()}
                >
                  <View
                    style={{
                      backgroundColor: "#E8ABC3",
                      borderRadius: 100,
                      padding: 6,
                    }}
                  >
                    <FontAwesome5 name="edit" size={20} color="#fff" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <ScrollView>
            <View style={{ marginTop: 60, marginHorizontal: 30 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <View
                  style={{
                    backgroundColor: "#ECD8F3",
                    borderRadius: 100,
                    padding: 8,
                  }}
                >
                  <MaterialCommunityIcons
                    name="account"
                    size={24}
                    color="#699BF7"
                  />
                </View>
                <TextInput
                  value={userName}
                  onChangeText={setUserName}
                  style={{
                    backgroundColor: "#fff",
                    width: "80%",
                    height: 40,
                    borderRadius: 20,
                    textAlign: "center",
                  }}
                  placeholderTextColor="#9a73ef"
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <View
                  style={{
                    backgroundColor: "#ECD8F3",
                    borderRadius: 100,
                    padding: 8,
                  }}
                >
                  <Entypo name="mail" size={24} color="#699BF7" />
                </View>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  style={{
                    backgroundColor: "#fff",
                    width: "80%",
                    height: 40,
                    borderRadius: 20,
                    textAlign: "center",
                  }}
                  placeholderTextColor="#9a73ef"
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <View
                  style={{
                    backgroundColor: "#ECD8F3",
                    borderRadius: 100,
                    padding: 8,
                  }}
                >
                  <FontAwesome name="phone" size={24} color="#699BF7" />
                </View>
                <TextInput
                  value="0123456789"
                  style={{
                    backgroundColor: "#fff",
                    width: "80%",
                    height: 40,
                    borderRadius: 20,
                    textAlign: "center",
                  }}
                  placeholderTextColor="#9a73ef"
                />
              </View>
              <View
                justifyContent={"center"}
                marginBottom={5}
                alignItems={"flex-end"}
              >
                <Pressable onPress={handleUpdateInfo}>
                  <View
                    paddingLeft={5}
                    paddingRight={5}
                    paddingTop={2}
                    paddingBottom={2}
                    alignItems={"center"}
                    rounded={30}
                    bg={"#ff5c93"}
                    width={"50%"}
                    flexDirection={"row"}
                  >
                    <Entypo name="save" size={24} color="#fff" />
                    <Text
                      style={{
                        marginLeft: 5,
                        color: "#fff",
                        fontWeight: "700",
                        fontSize: 16,
                      }}
                    >
                      Lưu
                    </Text>
                  </View>
                </Pressable>
              </View>
            </View>

            <View shadow={5} style={{ marginHorizontal: 30, marginBottom: 40 }}>
              <View
                style={{
                  paddingHorizontal: 20,
                  backgroundColor: "#fff",
                  paddingVertical: 10,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{ color: "#55b3d9", fontWeight: "800", fontSize: 16 }}
                >
                  Thay đổi mật khẩu
                </Text>
                <Divider
                  my="3"
                  _light={{
                    bg: "#699BF7",
                  }}
                />
                <View style={{ marginBottom: 20 }}>
                  <Text style={{ marginBottom: 5 }}>Mật khẩu cũ</Text>
                  <Input
                    value={oldPassword}
                    onChangeText={setOldPassword}
                    variant="rounded"
                    size={12}
                    bg={"#d5f3f9"}
                    borderColor={"#d5f3f9"}
                    paddingTop={2}
                    paddingBottom={2}
                    height={36}
                    InputLeftElement={
                      <Icon
                        as={<Foundation name="key" size={26} color="#a4a4a4" />}
                        size={7}
                        ml="2"
                        color="#a4a4a4"
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
                          color="#a4a4a4"
                        />
                      </Pressable>
                    }
                    placeholder="Old Password"
                  />
                  {/* <TextInput
                value={oldPassword}
                onChangeText={setOldPassword}
                secureTextEntry={true}
                placeholder="123"
                style={{
                  backgroundColor: "#d5f3f9",
                  borderRadius: 10,
                  height: 35,
                  paddingLeft: 20,
                }}
              /> */}
                </View>

                <View style={{ marginBottom: 20 }}>
                  <Text style={{ marginBottom: 5 }}>Mật khẩu mới</Text>
                  <Input
                    value={newPassword}
                    onChangeText={setNewPassword}
                    variant="rounded"
                    size={12}
                    bg={"#d5f3f9"}
                    borderColor={"#d5f3f9"}
                    paddingTop={2}
                    paddingBottom={2}
                    height={36}
                    InputLeftElement={
                      <Icon
                        as={<Foundation name="key" size={26} color="#a4a4a4" />}
                        size={7}
                        ml="2"
                        color="#a4a4a4"
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
                          color="#a4a4a4"
                        />
                      </Pressable>
                    }
                    placeholder="New Password"
                  />
                  {/* <TextInput
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={true}
                style={{
                  backgroundColor: "#d5f3f9",
                  borderRadius: 10,
                  height: 35,
                  paddingLeft: 20,
                }}
              /> */}
                </View>
                <View>
                  <Text style={{ marginBottom: 5 }}>Xác nhận mật khẩu</Text>
                  <Input
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    variant="rounded"
                    size={12}
                    bg={"#d5f3f9"}
                    borderColor={"#d5f3f9"}
                    paddingTop={2}
                    paddingBottom={2}
                    height={36}
                    InputLeftElement={
                      <Icon
                        as={<Foundation name="key" size={26} color="#a4a4a4" />}
                        size={7}
                        ml="2"
                        color="#a4a4a4"
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
                          color="#a4a4a4"
                        />
                      </Pressable>
                    }
                    placeholder="Confirm Password"
                  />
                  {/* <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={true}
                style={{
                  backgroundColor: "#d5f3f9",
                  borderRadius: 10,
                  height: 35,
                  paddingLeft: 20,
                }}
              /> */}
                </View>

                <Pressable
                  onPress={handleUpdate}
                  style={{
                    justifyContent: "center",
                    alignItems: "flex-end",
                    marginTop: 20,
                  }}
                >
                  <View
                    paddingLeft={5}
                    paddingRight={5}
                    paddingTop={2}
                    paddingBottom={2}
                    style={{
                      backgroundColor: "#ff5c93",

                      justifyContent: "center",
                      alignItems: "center",
                      // paddingHorizontal: 20,

                      borderRadius: 30,

                      flexDirection: "row",
                    }}
                  >
                    <MaterialIcons
                      name="system-update-alt"
                      size={24}
                      color="#fff"
                    />
                    <Text
                      style={{
                        color: "#fff",
                        fontWeight: "bold",
                        marginLeft: 5,
                      }}
                    >
                      Cập nhật
                    </Text>
                  </View>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

export default AccountInforDetail;
