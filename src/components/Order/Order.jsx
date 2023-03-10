import { FontAwesome, Ionicons } from "@expo/vector-icons";
import {
  AlertDialog,
  Box,
  Button,
  Divider,
  ScrollView,
  Text,
  View,
} from "native-base";
import { Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Pressable } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import OrderItem from "./OrderItem";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { clearCartItem, removeCartItem } from "../../redux/slice/cartSlice";
import { NumericFormat } from "react-number-format";
const Order = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.cart.cartItems);
  useEffect(() => {
    console.log(product);
  }, [product]);
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  const cancelRef = useRef(null);

  const handledelete = (item) => {
    // setIsOpen(!isOpen);
    console.log(item);
    dispatch(removeCartItem(item.book));
  };
  const deleteProductAll = () => {
    dispatch(clearCartItem());
    setIsOpen(!isOpen);
  };
  const handleDeleteAll = () => {
    setIsOpen(!isOpen);
  };
  let price =
    product.length !== 0
      ? product.reduce((acc, item) => acc + item.price * item.quantity, 0)
      : 0;
  let shippingCharges = price > 250000 ? 0 : 30000;
  let totalPrice = price + shippingCharges;

  const handleButtonOrder = () => {
    navigation.navigate("OrderInforScreen");
  };
  return (
    <View flex={1} bg="#d5f3f9">
      <View
        alignItems={"center"}
        marginTop={10}
        flexDirection="row"
        justifyContent="space-between"
      >
        <Pressable
          marginLeft={5}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <View
            marginLeft={2}
            background={"#ccc"}
            borderRadius={50}
            padding={0.5}
          >
            <Ionicons name="arrow-back-outline" size={24} color="#fff" />
          </View>
        </Pressable>
        <View>
          <Text color={"#40494b"} fontWeight={"900"} fontSize={20}>
            Gi??? h??ng
          </Text>
        </View>
        <View marginRight={5}>
          {/* <FontAwesome name="shopping-basket" size={24} color="#40494b" /> */}
        </View>
      </View>
      {product?.length === 0 ? (
        <>
          <View alignItems={"center"}>
            <Image
              style={{ width: 300, height: 300 }}
              source={require("../../../assets/empty.gif")}
            />
            <Text textAlign={"center"} padding={5}>
              Gi??? h??ng hi???n kh??ng c?? s???n ph???m kh??ch h??ng vui l??ng quay l???i trang
              ch??? ????? ti???p t???c mua s???m
            </Text>
            <Pressable onPress={() => navigation.navigate("Home")}>
              <View
                rounded={5}
                padding={2}
                width={"50%"}
                bg={"#55b3d9"}
                alignItems={"center"}
                flexDirection={"row"}
              >
                <Ionicons name="home" size={24} color="#fff" />
                <Text
                  marginLeft={3}
                  fontWeight={"600"}
                  fontSize={18}
                  color={"#fff"}
                >
                  Trang ch???
                </Text>
              </View>
            </Pressable>
          </View>
        </>
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Box paddingBottom={5}>
              <SwipeListView
                data={product}
                renderItem={(item, rowMap) => {
                  return (
                    <View paddingLeft={3} paddingRight={3}>
                      <OrderItem bookItem={item.item} />
                    </View>
                  );
                }}
                renderHiddenItem={(item, rowMap) => {
                  return (
                    <View
                      paddingLeft={5}
                      paddingRight={3}
                      paddingTop={2}
                      paddingBottom={2}
                      marginTop={5}
                      bg={"red.100"}
                      height={122}
                      maxHeight={150}
                      marginLeft={3}
                      marginRight={3}
                      marginBottom={5}
                      rounded={20}
                      alignItems={"flex-end"}
                      justifyContent={"center"}
                    >
                      <Pressable onPress={() => handledelete(item.item)}>
                        <MaterialCommunityIcons
                          name="delete"
                          size={30}
                          color="red"
                        />
                      </Pressable>
                    </View>
                  );
                }}
                rightOpenValue={-50}
                previewOpenDelay={3000}
                previewOpenValue={-40}
              />
              <View
                marginTop={5}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Button
                  onPress={handleDeleteAll}
                  _text={{ fontWeight: "900" }}
                  width={"50%"}
                >
                  X??a t???t c???
                </Button>
              </View>
            </Box>
          </ScrollView>

          <View rounded={20} bg={"#fff"} padding={3}>
            <Text color={"#4d4c4c"} fontSize={18} fontWeight="600">
              ????n h??ng c???a b???n
            </Text>
            <Divider thickness="2"></Divider>
            <View
              marginTop={5}
              marginBottom={2}
              flexDirection={"row"}
              justifyContent={"space-between"}
            >
              <Text fontSize={16}>T???ng ti???n h??ng</Text>

              <NumericFormat
                value={price}
                displayType={"text"}
                // decimalSeparator={'.'}
                thousandSeparator={true}
                // thousandSeparator={"."}
                suffix={" ??"}
                renderText={(value) => (
                  <Text style={{ color: "#DA2424", fontSize: 16 }}>
                    {value}
                  </Text>
                )}
              />
            </View>
            <View
              marginBottom={5}
              flexDirection={"row"}
              justifyContent={"space-between"}
            >
              <Text fontSize={16}>Ph?? v???n chuy???n</Text>
              <NumericFormat
                value={shippingCharges}
                displayType={"text"}
                // decimalSeparator={'.'}
                thousandSeparator={true}
                // thousandSeparator={"."}
                suffix={" ??"}
                renderText={(value) => (
                  <Text style={{ color: "#DA2424", fontSize: 16 }}>
                    {value}
                  </Text>
                )}
              />
            </View>
            <Divider thickness="2"></Divider>
            <View
              marginTop={5}
              marginBottom={5}
              flexDirection={"row"}
              justifyContent={"space-between"}
            >
              <Text fontWeight={"700"} fontSize={18} color={"#EE3E3E"}>
                T???ng thanh to??n
              </Text>
              <NumericFormat
                value={totalPrice}
                displayType={"text"}
                // decimalSeparator={'.'}
                thousandSeparator={true}
                // thousandSeparator={"."}
                suffix={" ??"}
                renderText={(value) => (
                  <Text
                    style={{
                      color: "#EE3E3E",
                      fontSize: 18,
                      fontWeight: "700",
                    }}
                  >
                    {value}
                  </Text>
                )}
              />
            </View>
            <Button
              p={2}
              bg={"#e8abc3"}
              _text={{ fontWeight: "900", fontSize: 20 }}
              color={"#fff"}
              onPress={handleButtonOrder}
            >
              ?????t H??ng
            </Button>
          </View>
          <AlertDialog
            leastDestructiveRef={cancelRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <AlertDialog.Content>
              <AlertDialog.Body>
                <View alignItems={"center"}>
                  <Text fontSize={20}>
                    B???n c?? ch???c mu???n x??a t???t c??? s???n ph???m n??y kh???i gi??? h??ng??
                  </Text>
                  <Image
                    source={{
                      uri: "https://thuthuatnhanh.com/wp-content/uploads/2020/02/icon-ong-bee-phan-van.png",
                    }}
                    alt="hinh"
                    style={{
                      width: 100,
                      height: 100,
                      resizeMode: "stretch",
                    }}
                  />
                </View>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button.Group space={2}>
                  <Button
                    variant="unstyled"
                    bg={"#dddddd"}
                    onPress={onClose}
                    ref={cancelRef}
                    _text={{ fontWeight: "700", fontSize: 16 }}
                  >
                    Cancel
                  </Button>
                  <Button
                    _text={{ fontWeight: "700", fontSize: 16 }}
                    bg={"#f29dc4"}
                    onPress={deleteProductAll}
                  >
                    Delete
                  </Button>
                </Button.Group>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog>
        </>
      )}
    </View>
  );
};

export default Order;
