import { Text, View } from "native-base";
import React, { useEffect, useState } from "react";
import { Image, Pressable, ToastAndroid } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { NumericFormat } from "react-number-format";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slice/cartSlice";

const OrderItem = ({ bookItem }) => {
  const [count, setCount] = useState(1);
  const initPric = bookItem.price;
  // const VND = new Intl.NumberFormat("vi-VN", {
  //   style: "currency",
  //   currency: "VND",
  // });
  useEffect(() => {
    dispatch(
      addToCart({
        ...bookItem,
        quantity: count,
      })
    );
  }, [count]);
  const dispatch = useDispatch();
  const handlePlus = () => {
    if (count >= bookItem.stock) {
      ToastAndroid.show("Số lượng sản phẩm không đủ", ToastAndroid.SHORT);
    } else {
      setCount(count + 1);
    }
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
          source={{ uri: bookItem.image }}
        />
        <View marginLeft={3}>
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: 150,
            }}
            fontSize={17}
            fontWeight={"600"}
          >
            {bookItem.name}
          </Text>
          <Text marginBottom={5}>{bookItem.author}</Text>
          <View flexDirection={"row"} marginTop={3} alignItems={"center"}>
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
