import { Text, View } from "native-base";
import React, { useState } from "react";
import { Image, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { NumericFormat } from "react-number-format";


const OrderItem = ({ bookItem }) => {
  const [count, setCount] = useState(1);
  const initPric = bookItem.price;
  // const VND = new Intl.NumberFormat("vi-VN", {
  //   style: "currency",
  //   currency: "VND",
  // });

  const handlePlus = () => {
    setCount(count + 1);
  };
  const handleMinus = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  return (
    <View
      bg="#fff"
      rounded={20}
      paddingLeft={5}
      paddingRight={5}
      paddingTop={2}
      paddingBottom={2}
      marginTop={5}
      shadow={2}
      flexDirection={"row"}
      alignItems="center"
      justifyContent={"space-between"}
    >
      <View flexDirection={"row"}>
        <Image
          style={{ height: 100, resizeMode: "stretch", width: 60 }}
          source={{ uri: bookItem.img }}
        />
        <View marginLeft={3}>
          <Text fontSize={17} fontWeight={"600"}>
            {bookItem.name}
          </Text>
          <Text marginBottom={5}>{bookItem.author}</Text>
          <View flexDirection={"row"} marginTop={3} alignItems={'center'}>
            <Pressable onPress={handlePlus}>
              <AntDesign name="plussquareo" size={24} color="#40494b" />
            </Pressable>
            <Text marginLeft={2} marginRight={2} fontSize={20}>
              {count}
            </Text>
            <Pressable onPress={handleMinus}>
              <Feather name="minus-square" size={24} color="#40494b" />
            </Pressable>
          </View>
        </View>
      </View>
      <View>
        <Text fontSize={18} fontWeight={"900"} color={"#DA2424"}>
          <NumericFormat
            value={initPric * count}
            displayType={"text"}
            // decimalSeparator={'.'}
            thousandSeparator={true}
            // thousandSeparator={"."}
            suffix={" đ"}
            renderText={(value) => (
              <Text style={{ color: "#DA2424" }}>{value}</Text>
            )}
          />
          {/* {VND.format(initPric * count)} */}
        </Text>
      </View>
    </View>
  );
};

export default OrderItem;
