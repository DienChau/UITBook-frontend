import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView, Text, View, Button } from "native-base";
import React from "react";
import { useEffect } from "react";
import { Image, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProcessOrder from "../components/ProcessOrder";
import { getMyOrders } from "../redux/slice/myOrdersSlice";
import { Audio } from "expo-av";
const ProcessingOrder = () => {
  const navigation = useNavigation();
  const routs = useRoute();
  const { type } = routs.params;

  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.myOrders);
  const listOrder = orders?.filter((item) => {
    return item.orderStatus === type;
  });
  // const order = listOrder[0];
  // console.log("listOrder", listOrder);
  useEffect(() => {
    dispatch(getMyOrders());
  }, []);
  const [sound, setSound] = React.useState();
  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/music.mp3")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  return (
    <>
      <View flex={1} bg={"#d5f3f9"}>
        <View
          alignItems={"center"}
          paddingTop={10}
          flexDirection="row"
          justifyContent="space-between"
          bg={"#d5f3f9"}
          paddingBottom={5}
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
            <Text color={"#777b80"} fontWeight={"900"} fontSize={20}>
              {type === "Processing"
                ? "Đang xử lý"
                : type === "Shipping"
                ? "Đang vận chuyển"
                : "Đã giao"}
            </Text>
          </View>
          <View marginRight={5}>
            {/* <FontAwesome name="shopping-basket" size={24} color="#40494b" /> */}
          </View>
        </View>

        <ScrollView>
          {listOrder?.length === 0 ? (
            <>
              <View justifyContent={"center"} alignItems={"center"}>
                <Image
                  style={{ width: 300, height: 300 }}
                  source={require("../../assets/empty2.gif")}
                />
              </View>
            </>
          ) : (
            <>
              <View flex={1} bg={"#d5f3f9"}>
                {listOrder?.map((item, index) => {
                  return (
                    <View key={index}>
                      <ProcessOrder order={item} />
                    </View>
                  );
                })}
              </View>
            </>
          )}
          {/* {type === "Processing" ? (
            <View flex={1} bg={"#d5f3f9"}>
              {listOrder.map((item, index) => {
                return (
                  <>
                    <View key={index}>
                      <ProcessOrder order={item} />
                    </View>
                  </>
                );
              })}
            </View>
          ) : type === "Shipping" ? (
            <></>
          ) : null} */}
        </ScrollView>
      </View>
    </>
  );
};

export default ProcessingOrder;
