import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Button, Center, Modal, ScrollView, Text, View } from "native-base";
import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Fontisto } from "@expo/vector-icons";
// import { Divider } from "react-native-paper";
import { Foundation } from "@expo/vector-icons";
import { NumericFormat } from "react-number-format";
import imageSeccuss from "../../assets/success.gif";
import { creatOrder } from "../redux/slice/newOrderSlice";
import Loading from "../components/Loading";

const FinalOrderScreen = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const [order, setOrder] = useState({});

  const navigation = useNavigation();
  const { loading } = useSelector((state) => state.order);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  // const orderItem = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const paymentInfo = {
      method: "COD",
      status: "succeeded",
      id: "",
    };
    setOrder({
      orderItems: cartItems,
      user: user,
      shippingInfo: shippingInfo,
      paymentInfo: paymentInfo,
    });
  }, [cartItems, shippingInfo, user]);
  const orderHandler = () => {
    console.log(order);
    setShowModal(true);
    dispatch(creatOrder(order));
    setTimeout(() => {
      navigation.navigate("Home");
    }, 3000);
    // navigation.navigate("finalOrderScreen");
  };

  let price =
    cartItems.length !== 0
      ? cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
      : 0;
  let shippingCharges = price > 250000 ? 0 : 30000;
  let totalPrice = price + shippingCharges;

  const handleToHome = () => {
    navigation.navigate("Home");
  };
  return (
    <>
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <View flex={1} bg={"#CBF0F8"}>
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 40,
                marginBottom: 5,
              }}
            >
              <Pressable
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <View
                  style={{
                    marginLeft: 20,
                    backgroundColor: "#ccc",
                    padding: 1,
                    borderRadius: 50,
                  }}
                >
                  <Ionicons name="arrow-back" size={24} color="#fff" />
                </View>
              </Pressable>

              {/* <View style={{ marginRight: 25 }}>
          <FontAwesome name="shopping-basket" size={24} color="#888" />
        </View> */}
            </View>
          </View>
          <ScrollView>
            <View margin={4} padding={3} bg={"#fff"} shadow={5} rounded={10}>
              <Text fontSize={20} fontWeight={"900"} color={"blue.300"}>
                Địa chỉ giao hàng
              </Text>
              <View bg={"blue.300"} h={"0.5"}></View>
              <View flexDirection={"row"} alignItems={"center"} marginTop={3}>
                <View w={"30"}>
                  <Fontisto name="email" size={25} color="#777b80" />
                </View>
                <Text marginLeft={3} fontSize={16} color={"#777b80"}>
                  {shippingInfo.email}
                </Text>
              </View>
              <View flexDirection={"row"} alignItems={"center"} marginTop={3}>
                <View w={30}>
                  <Foundation name="telephone" size={27} color="#777b80" />
                </View>
                <Text marginLeft={3} fontSize={16} color={"#777b80"}>
                  {shippingInfo.phone}
                </Text>
              </View>
              <View flexDirection={"row"} alignItems={"center"} marginTop={3}>
                <View w={30}>
                  <Ionicons name="location-outline" size={25} color="#777b80" />
                </View>
                <Text w={"300"} marginLeft={3} fontSize={16} color={"#777b80"}>
                  {`${shippingInfo.address}, ${shippingInfo.ward}, ${shippingInfo.district} ${shippingInfo.city}`}
                </Text>
              </View>
            </View>
            <View margin={4} padding={3} bg={"#fff"} shadow={5} rounded={10}>
              <Text fontSize={18} fontWeight={"700"} color={"blue.300"}>
                Thông tin đơn hàng
              </Text>
              <View bg={"blue.300"} h={"0.5"} marginBottom={3}></View>
              {cartItems?.map((item) => {
                return (
                  <>
                    <View
                      key={item.book}
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 10,
                        marginTop: 5,
                      }}
                    >
                      <View style={{ flex: 1 }}>
                        <Image
                          style={{ width: 80, height: 100 }}
                          source={{ uri: item.image }}
                        />
                      </View>
                      <View style={{ flex: 2, marginHorizontal: 10 }}>
                        <Text>
                          {item.name}
                          {/* Thiên Tài Bên Trái, Kẻ Điên Bên Phải (Tái Bản) */}
                        </Text>
                        <Text>SL: {item.quantity}</Text>
                      </View>
                      <View style={{}}>
                        <NumericFormat
                          value={item.price}
                          displayType={"text"}
                          // decimalSeparator={'.'}
                          thousandSeparator={true}
                          // thousandSeparator={"."}
                          suffix={" đ"}
                          renderText={(value) => (
                            <Text style={{ color: "black" }}>{value}</Text>
                          )}
                        />
                      </View>
                    </View>
                  </>
                );
              })}

              <View
                style={{
                  borderBottomColor: "#ccc",
                  borderBottomWidth: 0.5,
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: 10,
                }}
              >
                <Text>Tổng tiền hàng</Text>
                <NumericFormat
                  value={price}
                  displayType={"text"}
                  // decimalSeparator={'.'}
                  thousandSeparator={true}
                  // thousandSeparator={"."}
                  suffix={" đ"}
                  renderText={(value) => (
                    <Text style={{ color: "black" }}>{value}</Text>
                  )}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: 10,
                }}
              >
                <Text>Phí vận chuyển</Text>
                <NumericFormat
                  value={shippingCharges}
                  displayType={"text"}
                  // decimalSeparator={'.'}
                  thousandSeparator={true}
                  // thousandSeparator={"."}
                  suffix={" đ"}
                  renderText={(value) => (
                    <Text style={{ color: "black" }}>{value}</Text>
                  )}
                />
              </View>
              <View
                style={{
                  borderBottomColor: "#ccc",
                  borderBottomWidth: 0.5,
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: 10,
                }}
              >
                <Text
                  style={{ fontSize: 16, color: "#F02929", fontWeight: "bold" }}
                >
                  Tổng thanh toán
                </Text>
                <NumericFormat
                  value={totalPrice}
                  displayType={"text"}
                  // decimalSeparator={'.'}
                  thousandSeparator={true}
                  // thousandSeparator={"."}
                  suffix={" đ"}
                  renderText={(value) => (
                    <Text style={{ color: "#F02929", fontWeight: "bold" }}>
                      {value}
                    </Text>
                  )}
                />
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              <Button
                onPress={orderHandler}
                marginBottom={10}
                marginTop={5}
                background={"#d70002"}
                paddingLeft={5}
                paddingRight={5}
                shadow={10}
                color="#fff"
                _text={{ fontSize: 18, fontWeight: "800" }}
              >
                Đặt hàng
              </Button>
            </View>
          </ScrollView>
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content background={"#fff"} maxWidth="400px">
              <View justifyContent={"center"} alignItems={"center"}>
                <Image
                  style={{ width: 200, height: 200 }}
                  source={imageSeccuss}
                />
              </View>
              <Text
                color={"#34c759"}
                textAlign={"center"}
                fontSize={18}
                fontWeight={"bold"}
              >
                Bạn đã đặt hàng thành công,
              </Text>
              <Text
                textAlign={"center"}
                marginLeft={3}
                marginRight={3}
                fontSize={16}
              >
                Hãy trở lại trang chủ và tiếp tục mua sấm
              </Text>
              <View
                marginTop={5}
                marginBottom={5}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Pressable onPress={handleToHome}>
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
                      Trang chủ
                    </Text>
                  </View>
                </Pressable>
              </View>
            </Modal.Content>
          </Modal>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 150,
    height: 50,
    alignItems: "center",
    ...Platform.select({
      web: {
        cursor: "pointer",
      },
    }),
  },
});

export default FinalOrderScreen;
