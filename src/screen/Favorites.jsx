import React from "react";
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
import Header from "../components/Header";
import { MaterialIcons } from "@expo/vector-icons";
import { NumericFormat } from "react-number-format";
import { AntDesign } from "@expo/vector-icons";
const windowWidth = Dimensions.get("window").width;

const Favorites = () => {
  return (
    // <SafeAreaView>
    <ScrollView
      style={{
        backgroundColor: "#CBF0F8",
        flex: 1,
        // paddingVertical: 20,
        // marginVertical: 12,
      }}
    >
      <Text>This is Favorites</Text>
      <Header />
      <Image
        style={{
          width: "100%",
        }}
        resizeMode="cover"
        source={require("../../assets/like-banner1.png")}
      />
      <View style={{
        marginBottom: 10
      }}>
        <View
          style={[
            {
              marginTop: 16,
              marginHorizontal: 10,
              backgroundColor: "#fff",
              borderRadius: 10,
              marginRight: 12,
              // width: "100%",
              padding: 18,
              position: "relative",
              flexDirection: "row",
            },
            styles.shadowBorder,
          ]}
        >
          <TouchableOpacity
            // onPress={addFavoriteHandler}
            style={{ position: "absolute", right: 20, top: 20, zIndex: 2 }}
          >
            <MaterialIcons name={"favorite"} size={26} color={"#E8ABC3"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: "row", justifyContent: "center", flex: 2 }}
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
            style={{
              flex: 5,
              justifyContent: "center",
              alignItems: "stretch",
              marginLeft: 10,
            }}
          >
            <TouchableOpacity style={{ marginRight: 20 }}>
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
                  paddingRight: 10,
                  // marginTop: 10,
                }}
              >
                {/* {props.bookName} */}
                Thiên Tài Bên Trái , Kẻ Điên Bên aa Phải (Tái Bản)
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
        <View
          style={[
            {
              marginTop: 16,
              marginHorizontal: 10,
              backgroundColor: "#fff",
              borderRadius: 10,
              marginRight: 12,
              // width: "100%",
              padding: 18,
              position: "relative",
              flexDirection: "row",
            },
            styles.shadowBorder,
          ]}
        >
          <TouchableOpacity
            // onPress={addFavoriteHandler}
            style={{ position: "absolute", right: 20, top: 20, zIndex: 2 }}
          >
            <MaterialIcons name={"favorite"} size={26} color={"#E8ABC3"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: "row", justifyContent: "center", flex: 2 }}
          >
            <Image
              style={{
                height: 100,
                height: (windowWidth - 70) / 3,
                width: (windowWidth - 70) / 3,
              }}
              resizeMode="contain"
              source={require("../../assets/book3.png")}
            />
          </TouchableOpacity>
          <View
            style={{
              flex: 5,
              justifyContent: "center",
              alignItems: "stretch",
              marginLeft: 10,
            }}
          >
            <TouchableOpacity style={{ marginRight: 20 }}>
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
                  paddingRight: 10,
                  // marginTop: 10,
                }}
              >
                {/* {props.bookName} */}
                Không Ai Có Thể Làm Bạn Tổn Thương Trừ Khi Bạn Cho Phép
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
        <View
          style={[
            {
              marginTop: 16,
              marginHorizontal: 10,
              backgroundColor: "#fff",
              borderRadius: 10,
              marginRight: 12,
              // width: "100%",
              padding: 18,
              position: "relative",
              flexDirection: "row",
            },
            styles.shadowBorder,
          ]}
        >
          <TouchableOpacity
            // onPress={addFavoriteHandler}
            style={{ position: "absolute", right: 20, top: 20, zIndex: 2 }}
          >
            <MaterialIcons name={"favorite"} size={26} color={"#E8ABC3"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: "row", justifyContent: "center", flex: 2 }}
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
            style={{
              flex: 5,
              justifyContent: "center",
              alignItems: "stretch",
              marginLeft: 10,
            }}
          >
            <TouchableOpacity style={{ marginRight: 20 }}>
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
                  paddingRight: 10,
                  // marginTop: 10,
                }}
              >
                {/* {props.bookName} */}
                Thiên Tài Bên Trái
                {/* , Kẻ Điên Bên aa Phải (Tái Bản) */}
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
        <View
          style={[
            {
              marginTop: 16,
              marginHorizontal: 10,
              backgroundColor: "#fff",
              borderRadius: 10,
              marginRight: 12,
              // width: "100%",
              padding: 18,
              position: "relative",
              flexDirection: "row",
            },
            styles.shadowBorder,
          ]}
        >
          <TouchableOpacity
            // onPress={addFavoriteHandler}
            style={{ position: "absolute", right: 20, top: 20, zIndex: 2 }}
          >
            <MaterialIcons name={"favorite"} size={26} color={"#E8ABC3"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: "row", justifyContent: "center", flex: 2 }}
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
            style={{
              flex: 5,
              justifyContent: "center",
              alignItems: "stretch",
              marginLeft: 10,
            }}
          >
            <TouchableOpacity style={{ marginRight: 20 }}>
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
                  paddingRight: 10,
                  // marginTop: 10,
                }}
              >
                {/* {props.bookName} */}
                Thiên Tài Bên Trái
                {/* , Kẻ Điên Bên aa Phải (Tái Bản) */}
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
      </View>

    </ScrollView>
    // </SafeAreaView>
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

export default Favorites;
