import React, { useState, useEffect } from "react";
import { Button, Divider } from "native-base";
import {
  View,
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const AccountInforDetail = () => {
  const navigation = useNavigation();
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [imageAvatar, setImageAvatar] = useState(
    "https://www.invert.vn/media/uploads/uploads/2022/9/17165757-39.jpeg"
  );

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

    console.log(result);

    if (!result.canceled) {
      setImageAvatar(result.uri);
    }
    if (hasGalleryPermission === false) {
      return <Text>No access to Internal Storage</Text>;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#CBF0F8" }}>

      <View style={{ position: "relative" }}>

        <Image
          style={{ height: 200, width: "100%" }}
          source={require("../../assets/infor-accoutn.png")}
          alt="avatar"
          resizeMethod={"auto"}
        />
        <Pressable
          style={{
            position: 'absolute',
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
          <Ionicons
            name="arrow-back-outline"
            size={28}
            color="#fff"
          />
        </Pressable>
        <View
          style={{
            position: "absolute",
            bottom: -30,
            left: 0,
            right: 0,
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
            <MaterialCommunityIcons name="account" size={24} color="#699BF7" />
          </View>
          <TextInput
            value="Bùi Thị Diễn Châu"
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
            value="DienChau@gmail.com"
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
      </View>

      <View style={{ marginHorizontal: 30 }}>
        <View
          style={{
            paddingHorizontal: 20,
            backgroundColor: "#fff",
            paddingVertical: 10,
            borderRadius: 10,
          }}
        >
          <Text>Thay đổi mật khẩu</Text>
          <Divider
            my="3"
            _light={{
              bg: "#699BF7",
            }}
          />
          <View style={{ marginBottom: 20 }}>
            <Text style={{ marginBottom: 5 }}>Mật khẩu cũ</Text>
            <TextInput
              value="123456789"
              secureTextEntry={true}
              placeholder="123"
              style={{
                backgroundColor: "#d5f3f9",
                borderRadius: 10,
                height: 35,
                paddingLeft: 20,
              }}
            />
          </View>

          <View>
            <Text style={{ marginBottom: 5 }}>Mật khẩu mới</Text>
            <TextInput
              secureTextEntry={true}
              style={{
                backgroundColor: "#d5f3f9",
                borderRadius: 10,
                height: 35,
                paddingLeft: 20,
              }}
            />
          </View>

          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "flex-end",
              marginTop: 20,

            }}
          >
            <View style={{
              backgroundColor: "#e8abc3",
              width: 100,
              justifyContent: 'center',
              alignItems: 'center',
              // paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 10
            }}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}> Cập nhật</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AccountInforDetail;
