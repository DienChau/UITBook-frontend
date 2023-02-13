import { Divider, Text, View } from "native-base";
import React from "react";
import { Image } from "react-native";
import { NumericFormat } from "react-number-format";
import { FontAwesome5 } from "@expo/vector-icons";

const ProcessOrder = ({ order }) => {
  console.log("order", order);
  return (
    <View
      marginBottom={5}
      bg={"#fff"}
      padding={3}
      rounded={10}
      marginLeft={3}
      marginRight={3}
    >
      <View>
        {order?.orderItems.map((item) => {
          return (
            <>
              <View marginBottom={2} flexDirection={"row"}>
                <Image
                  style={{ width: 70, height: 100 }}
                  source={{ uri: item.image }}
                />
                <View marginLeft={3}>
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    fontWeight={"bold"}
                    fontSize={16}
                    color={"coolGray.700"}
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      width: 250,
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text>{item.author}</Text>
                  <Text>SL: {item.quantity}</Text>
                  <NumericFormat
                    value={item.price}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" đ"}
                    renderText={(value) => <Text color="red.500">{value}</Text>}
                  />
                </View>
              </View>
            </>
          );
        })}
      </View>
      <Text marginBottom={2}>Đặt hàng ngày {order.createdAt}</Text>
      <Divider />
      <View marginTop={2} flexDirection={"row"} alignItems={"center"}>
        <FontAwesome5 name="people-carry" size={24} color="#f29dc4" />
        <Text fontSize={16} color={"#f29dc4"} marginLeft={5}>
          Cửa hàng đang đóng gói đơn hàng
        </Text>
      </View>
      <View marginTop={2} height={0.5} bg={"#dddd"}></View>
      <View
        marginTop={2}
        justifyContent={"space-between"}
        flexDirection={"row"}
        alignItems={"center"}
      >
        <Text fontSize={18} color={"#1890ff"} fontWeight={"bold"}>
          Tổng tiền:{" "}
        </Text>
        <NumericFormat
          value={order.totalPrice}
          displayType={"text"}
          thousandSeparator={true}
          suffix={" đ"}
          renderText={(value) => (
            <Text fontSize={18} color={"#1890ff"} fontWeight={"bold"}>
              {value}
            </Text>
          )}
        />
      </View>
      <View marginTop={2} height={0.5} bg={"#dddd"}></View>
      <Text>Nhận sản phẩm và thanh toán sau 5 ngày</Text>
    </View>
  );
};

export default ProcessOrder;
