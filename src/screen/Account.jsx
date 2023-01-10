import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    SafeAreaView,
    Text,
    View,
    TouchableOpacity,
    Image,
    Button,
    ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import AvatarImage from "../../assets/avatar.jpg";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
// import { FontAwesome5 } from '@expo/vector-icons';

import Header from "../components/Header";
import { Center } from "native-base";
// import { Button } from "native-base";

const Account = () => {
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
            return <Tex>No access to Internal Storage</Tex>;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* <Header /> */}
            <View
                style={{
                    marginTop: 30,
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    marginRight: 30,
                }}
            >
                <FontAwesome name="shopping-basket" size={24} color="#000" />
            </View>
            <ScrollView>
                <View style={{ flex: 3 }}>
                    <View
                        style={{
                            backgroundColor: "#fff",
                            borderRadius: 10,
                            marginTop: 6,
                            marginBottom: 10,
                            height: 120,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <View
                            style={{
                                marginRight: 20,
                                alignItems: "center",
                                justifyContent: "center",
                                position: "relative",
                            }}
                        >
                            {imageAvatar && (
                                <Image
                                    source={{ uri: imageAvatar }}
                                    style={{
                                        height: 100,
                                        borderRadius: 100,
                                        width: 100,
                                        backgroundColor: "#00ffff",
                                    }}
                                />
                            )}
                            <TouchableOpacity
                                style={{ position: "absolute", right: -6, bottom: -2 }}
                                onPress={() => pickImage()}
                            >
                                <View
                                    style={{
                                        backgroundColor: "#E8ABC3",
                                        borderRadius: 100,
                                        padding: 6,
                                    }}
                                >
                                    <FontAwesome5
                                        name="edit"
                                        size={20}
                                        color="#fff"
                                    />
                                    {/* <Feather name="check-square" size={24} color="#E8ABC3" /> */}
                                </View>
                                {/* <View>
                                    <FontAwesome name="edit" size={30} color="#1DBBD6" />
                                    
                                </View> */}
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: "center" }}>
                            <Text style={{}}>nguoihamdocsach21</Text>
                            <View
                                style={{
                                    marginTop: 10,
                                    paddingHorizontal: 10,
                                    paddingVertical: 5,
                                    borderRadius: 20,
                                    backgroundColor: "#ECD8F3",
                                }}
                            >
                                <Text style={{ alignItems: "center" }}>
                                    <FontAwesome5 name="crown" size={20} color="#FFD233" />
                                    Thành viên
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ height: 140, backgroundColor: "#fff", padding: 10 }}>
                        <View
                            style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 10 }}
                        >
                            <Text style={{ fontSize: 16 }}>Đơn hàng của tôi</Text>
                            <Text
                                style={{
                                    color: "#1DBBD6",
                                    textDecorationLine: "underline",
                                    fontStyle: "italic",
                                }}
                            >
                                Xem lịch sử
                            </Text>
                        </View>
                        <View
                            style={{ flexDirection: "row", justifyContent: "space-around" }}
                        >
                            <View
                                style={{
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: 20,
                                }}
                            >
                                <View
                                    style={{
                                        backgroundColor: "#CBF0F8",
                                        borderRadius: 100,
                                        padding: 10,
                                    }}
                                >
                                    <FontAwesome
                                        name="calendar-check-o"
                                        size={24}
                                        color="#E8ABC3"
                                    />
                                    {/* <Feather name="check-square" size={24} color="#E8ABC3" /> */}
                                </View>
                                <Text style={{ marginTop: 8 }}>Đang xử lý</Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: 20,
                                }}
                            >
                                <View
                                    style={{
                                        backgroundColor: "#CBF0F8",
                                        borderRadius: 100,
                                        padding: 10,
                                    }}
                                >
                                    <FontAwesome5
                                        name="shipping-fast"
                                        size={24}
                                        color="#E8ABC3"
                                    />
                                    {/* <Feather name="check-square" size={24} color="#E8ABC3" /> */}
                                </View>
                                <Text style={{ marginTop: 8 }}>Đang vận chuyển</Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: 20,
                                }}
                            >
                                <View
                                    style={{
                                        backgroundColor: "#CBF0F8",
                                        borderRadius: 100,
                                        padding: 10,
                                    }}
                                >
                                    <Feather name="check-square" size={24} color="#E8ABC3" />
                                </View>
                                <Text style={{ marginTop: 8 }}>Đã giao</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <View
                            style={{
                                flexDirection: "row",
                                backgroundColor: "#fff",
                                alignItems: "center",
                                paddingLeft: 20,
                                marginBottom: 10,
                                paddingVertical: 6,
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor: "#E8ABC3",
                                    borderRadius: 50,
                                    padding: 8,
                                }}
                            >
                                <MaterialCommunityIcons
                                    name="account-outline"
                                    size={24}
                                    color="#fff"
                                />
                            </View>
                            <Text style={{ marginLeft: 10, fontSize: 16 }}>
                                Thông tin tài khoản
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                backgroundColor: "#fff",
                                alignItems: "center",
                                paddingLeft: 20,
                                marginBottom: 10,
                                paddingVertical: 6,
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor: "#E8ABC3",
                                    borderRadius: 50,
                                    padding: 8,
                                }}
                            >
                                <MaterialCommunityIcons
                                    name="help-circle-outline"
                                    size={24}
                                    color="#fff"
                                />
                            </View>
                            <Text style={{ marginLeft: 10, fontSize: 16 }}>
                                Trung tâm trợ giúp
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                backgroundColor: "#fff",
                                alignItems: "center",
                                paddingLeft: 20,
                                marginBottom: 10,
                                paddingVertical: 6,
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor: "#E8ABC3",
                                    borderRadius: 50,
                                    padding: 8,
                                }}
                            >
                                <MaterialCommunityIcons
                                    name="clock-outline"
                                    size={24}
                                    color="#fff"
                                />
                            </View>
                            <Text style={{ marginLeft: 10, fontSize: 16 }}>
                                Đã xem gần đây
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                backgroundColor: "#fff",
                                alignItems: "center",
                                paddingLeft: 20,
                                marginBottom: 10,
                                paddingVertical: 6,
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor: "#E8ABC3",
                                    borderRadius: 50,
                                    padding: 8,
                                }}
                            >
                                <Ionicons name="md-settings-outline" size={24} color="#fff" />
                            </View>
                            <Text style={{ marginLeft: 10, fontSize: 16 }}>Cài đặt</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                backgroundColor: "#fff",
                                alignItems: "center",
                                paddingLeft: 20,
                                marginBottom: 10,
                                paddingVertical: 6,
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor: "#E8ABC3",
                                    borderRadius: 50,
                                    padding: 8,
                                }}
                            >
                                <MaterialCommunityIcons
                                    name="crown-outline"
                                    size={24}
                                    color="#fff"
                                />
                            </View>
                            <Text style={{ marginLeft: 10, fontSize: 16 }}>
                                Thông tin thành viên
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                backgroundColor: "#fff",
                                alignItems: "center",
                                paddingLeft: 20,
                                marginBottom: 10,
                                paddingVertical: 6,
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor: "#E8ABC3",
                                    borderRadius: 50,
                                    padding: 8,
                                }}
                            >
                                <FontAwesome name="sign-out" size={24} color="#fff" />
                            </View>
                            <Text style={{ marginLeft: 10, fontSize: 16 }}>Đăng xuất</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#CBF0F8",
    },
    text: {
        fontSize: 25,
        fontWeight: "500",
    },
});
export default Account;
