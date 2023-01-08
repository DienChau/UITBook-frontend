import React, { useState } from "react";
import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
    Image,
    Dimensions,
    ScrollView,
    LogBox,
    TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
// import NumberFormat from 'react-number-format';
// import NumberFormat from 'react-number-format';
import { NumericFormat } from "react-number-format";
import { AntDesign } from "@expo/vector-icons";
const windowWidth = Dimensions.get("window").width;

const BookHorizontal = (props) => {
    const [favoriteIcon, setFavoriteIcon] = useState('favorite-outline')
    const addFavoriteHandler = () => {
        if (favoriteIcon == 'favorite-outline') {
            setFavoriteIcon('favorite')
        } else {
            setFavoriteIcon('favorite-outline')

        }
    };

    return (
        <View
            style={[
                {
                    marginTop: 12,
                    backgroundColor: "#fff",
                    borderRadius: 10,
                    marginRight: 12,
                    width: "100%",
                    padding: 18,
                    position: "relative",
                    flexDirection: "row",
                },
                styles.shadowBorder,
            ]}
        >
            <TouchableOpacity
                onPress={addFavoriteHandler}
                style={{ position: "absolute", left: 10, top: 10, zIndex: 2 }}
            >
                <MaterialIcons name={favoriteIcon} size={26} color={"#E8ABC3"} />
            </TouchableOpacity>
            <TouchableOpacity
                style={{ flexDirection: "row", justifyContent: "center", flex: 4 }}
            >
                <Image
                    style={{
                        height: 100,
                        height: (windowWidth - 70) / 3,
                        width: (windowWidth - 70) / 3,
                    }}
                    resizeMode="contain"
                    source={require("../../assets/book1.png")}
                />
            </TouchableOpacity>
            <View
                style={{ flex: 5, justifyContent: "center", alignItems: "stretch" }}
            >
                <TouchableOpacity>
                    <Text
                        ellipsizeMode="tail"
                        numberOfLines={2}
                        style={{
                            textAlign: "left",
                            fontSize: 14,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            lineHeight: 20,
                            // marginTop: 10,
                        }}
                    >
                        {props.bookName}
                        {/* Thiên Tài Bên Trái , Kẻ Điên Bên Phải (Tái Bản) */}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: "flex-start", marginTop: 6 }}>
                    <NumericFormat
                        value={2456981}
                        displayType={"text"}
                        // decimalSeparator={'.'}
                        thousandSeparator={true}
                        // thousandSeparator={"."}
                        suffix={" đ"}
                        renderText={(value) => (
                            <Text style={{ color: "#DA2424" }}>{value}</Text>
                        )}
                    />
                </TouchableOpacity>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 6,
                    }}
                >
                    <Text>
                        Đã bán: <Text>100</Text>
                    </Text>
                    <Text>
                        5
                        <AntDesign name="star" size={16} color="#fedc00" />
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    shadowBorder: {
        shadowColor: "red",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
});

export default BookHorizontal;
