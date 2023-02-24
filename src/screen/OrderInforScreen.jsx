import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Pressable,
  ScrollView,
  ToastAndroid,
} from "react-native";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
import { NumericFormat } from "react-number-format";
import CustomButton from "../components/CustomButton";
import SelectAddress from "../components/SelectAddress";
import { Ionicons } from "@expo/vector-icons";
import {
  apiGetPublicDistrict,
  apiGetPublicProvinces,
  apiGetPublicVillage,
} from "../redux/services/locationApi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { saveShippingInfo } from "../redux/slice/cartSlice";
import { creatOrder } from "../redux/slice/newOrderSlice";
import * as Location from "expo-location";
import { Button } from "native-base";

// import DateTimePicker from '@react-native-community/datetimepicker';

const OrderInforScreen = () => {
  const dispatch = useDispatch();
  const [checked, setChecked] = React.useState("first");
  //   const [state, setState] = React.useState("first");
  //   const [value, setValue] = React.useState("first");
  const navigation = useNavigation();
  const [provinces, setProvinces] = useState([]);
  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);
  const [village, setVillage] = useState();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState();
  // const [order, setOrder] = useState({});

  const orderItem = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.user.user);

  const shippingInfo = useSelector((state) => state.cart.shippingInfo);
  useEffect(() => {
    console.log("locationy");
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        // setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log("location", location);
      setLocation(location);
    })();
  }, []);

  const handleLocation = async () => {
    // console.log("curentLocation2", location);
    const curentLocation = await Location.reverseGeocodeAsync({
      longitude: location?.coords.longitude,
      latitude: location?.coords.latitude,
    });
    // console.log("curentLoctio", curentLocation);
  };
  useEffect(() => {
    const fetchPublicProviecs = async () => {
      const response = await apiGetPublicProvinces();

      if (response.status === 200) {
        setProvinces(response.data.results);
      }
    };
    fetchPublicProviecs();
  }, []);
  useEffect(() => {
    setDistrict(null);
    setVillages(null);
    const fetchPublicDistrict = async () => {
      const response = await apiGetPublicDistrict(province.id);

      if (response.status === 200) {
        setDistricts(response.data?.results);
      }
    };
    province && fetchPublicDistrict();
  }, [province]);
  useEffect(() => {
    setVillage(null);
    // setDistrict(null);
    const fetchPublicDistrict = async () => {
      const response = await apiGetPublicVillage(district.id);

      if (response.status === 200) {
        setVillages(response.data?.results);
      }
    };
    province && fetchPublicDistrict();
  }, [district]);

  const InforPersonHandler = () => {
    if ((phone === "" || email === "", address === "")) {
      ToastAndroid.show("Vui lòng điền đầy đủ thông tin", ToastAndroid.SHORT);
      return;
    }
    if (phone.length < 10) {
      ToastAndroid.show("Số điện thoại không hợp lệ", ToastAndroid.SHORT);
      return;
    }
    if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      ToastAndroid.show("Email không hợp lệ", ToastAndroid.SHORT);
      return;
    }
    dispatch(
      saveShippingInfo({
        address: address,
        phone: phone,
        email: email,
        city: province.name,
        district: district.name,
        ward: village.name,
      })
    );
    navigation.navigate("finalOrderScreen");
  };
  // useEffect(() => {
  //   const paymentInfo = {
  //     method: "COD",
  //     status: "succeeded",
  //     id: "",
  //   };
  //   setOrder({
  //     orderItems: orderItem,
  //     user: user,
  //     shippingInfo: shippingInfo,
  //     paymentInfo: paymentInfo,
  //   });
  // }, [orderItem, shippingInfo, user]);

  return (
    <SafeAreaView style={styles.container}>
      {/* <Header /> */}
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

      <ScrollView>
        <View style={{ marginHorizontal: 20 }}>
          <View style={styles.pickInfor}>
            <View style={{ marginBottom: 14 }}>
              <Text>
                Tên người nhận <Text style={{ color: "red" }}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholderTextColor="#9a73ef"
                autoCapitalize="none"
              />
            </View>
            <View style={{ marginBottom: 14 }}>
              <Text>
                SĐT người nhận <Text style={{ color: "red" }}>*</Text>
              </Text>
              <TextInput
                value={phone}
                onChangeText={setPhone}
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholderTextColor="#9a73ef"
                keyboardType="numeric"
                autoCapitalize="none"
              />
            </View>
            <View style={{ marginBottom: 14 }}>
              <Text>
                Vị trí hiện tại <Text style={{ color: "red" }}>*</Text>
              </Text>
              <Pressable onPress={handleLocation}>
                <View
                  style={{
                    borderRadius: 30,
                    backgroundColor: "#ff5c93",
                    alignItems: "center",
                    width: "30%",
                    flexDirection: "row",
                    justifyContent: "center",
                    paddingVertical: 5,
                    marginTop: 3,
                  }}
                >
                  <Entypo name="location" size={20} color="#fff" />
                  <Text
                    style={{
                      color: "#fff",
                      fontWeight: "700",
                      marginLeft: 5,
                      fontSize: 16,
                    }}
                  >
                    Chọn
                  </Text>
                </View>
              </Pressable>
              {/* <Button rounded={20} h={15} onPress={handleLocation}>
                Chọn
              </Button> */}
            </View>
            <View style={{ marginBottom: 14 }}>
              <Text>
                Tỉnh, Thành phố <Text style={{ color: "red" }}>*</Text>
              </Text>
              <SelectAddress
                type="provinces"
                value={province}
                setValue={setProvince}
                options={provinces}
              />
            </View>
            <View style={{ marginBottom: 14 }}>
              <Text>
                Quận, Huyện <Text style={{ color: "red" }}>*</Text>
              </Text>
              <SelectAddress
                type="districts"
                value={district}
                setValue={setDistrict}
                options={districts}
              />
            </View>
            <View style={{ marginBottom: 14 }}>
              <Text>
                Xã, Thị trấn <Text style={{ color: "red" }}>*</Text>
              </Text>
              <SelectAddress
                type="villages"
                value={village}
                setValue={setVillage}
                options={villages}
              />
            </View>
            <View style={{ marginBottom: 14 }}>
              <Text>
                Địa chỉ <Text style={{ color: "red" }}>*</Text>
              </Text>
              <TextInput
                onChangeText={setAddress}
                value={address}
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholderTextColor="#9a73ef"
                autoCapitalize="none"
              />
            </View>
            <View style={{ marginBottom: 14 }}>
              <Text>
                Gmail <Text style={{ color: "red" }}>*</Text>
              </Text>
              <TextInput
                onChangeText={setEmail}
                value={email}
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholderTextColor="#9a73ef"
                autoCapitalize="none"
              />
            </View>
            {/* <View style={{ alignItems: "center", marginBottom: 20 }}>
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  backgroundColor: "#E8ABC3",
                  padding: 10,
                  paddingHorizontal: 40,
                }}
                onPress={InforPersonHandler}
              >
                <Text
                  style={{ color: "#fff", fontSize: 15, fontWeight: "bold" }}
                >
                  Lưu
                </Text>
              </TouchableOpacity>
            </View> */}
          </View>
          <View style={styles.payment}>
            <Text
              style={{ fontSize: 16, marginBottom: 10, fontWeight: "bold" }}
            >
              Phương Thức Thanh Toán
            </Text>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <RadioButton
                value="first"
                color="#00ff00"
                uncheckedColor="#E8ABC3"
                status={checked === "first" ? "checked" : "unchecked"}
                onPress={() => setChecked("first")}
              />
              <Text onPress={() => setChecked("first")}>
                Thanh toán khi nhận hàng
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <RadioButton
                value="second"
                color="#00ff00"
                uncheckedColor="#E8ABC3"
                status={checked === "second" ? "checked" : "unchecked"}
                onPress={() => setChecked("second")}
              />
              <Text onPress={() => setChecked("second")}>
                Thanh toán qua thẻ ngân hàng
              </Text>
            </TouchableOpacity>
            {/* <View>
                            <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
                                <RadioButton.Item label="Thanh toán khi nhận hàng" value="first" />
                                <RadioButton.Item label="Thanh toán MoMo" value="second" />
                            </RadioButton.Group>
                        </View> */}
          </View>

          <View
            style={{ marginTop: 20, alignItems: "center", marginBottom: 20 }}
          >
            <Pressable
              onPress={InforPersonHandler}
              hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
              android_ripple={{ color: "#f0f" }}
              style={({ pressed }) => [
                { backgroundColor: pressed ? "#b1e6cc" : "#E72A2A" },
                styles.button,
                { alignItems: "center", borderRadius: 10 },
              ]}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                  alignItems: "center",
                  margin: 10,
                  textAlign: "center",
                }}
              >
                Tiếp tục
              </Text>
            </Pressable>
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
  input: {
    // margin: 15,
    marginTop: 6,
    height: 40,
    paddingLeft: 20,
    borderColor: "#E8ABC3",
    borderWidth: 1,
    backgroundColor: "#fff",
  },
  pickInfor: {
    marginTop: 10,
  },
  payment: {
    backgroundColor: "#fff",
    padding: 10,
  },
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
export default OrderInforScreen;
