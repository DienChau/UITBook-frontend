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
import React, { useRef, useState } from "react";
import { Pressable } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import OrderItem from "./OrderItem";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import question from "../../../assets/question.gif";
import { useNavigation } from "@react-navigation/native";

const Order = () => {
  const navigation = useNavigation();

  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  const cancelRef = useRef(null);
  const books = [
    {
      name: "Cô gái đến từ hôm qua",
      price: 109980,
      sl: 1,
      author: "Nguyễn Nhật Ánh",
      img: "https://th.bing.com/th/id/R.b318a8e8241c6c756e7bf03b819b574d?rik=judtiZEwnL85oQ&pid=ImgRaw&r=0",
    },
    {
      name: "Đắc nhân tâm",
      price: 10998,
      sl: 1,
      author: "Nguyễn Nhật Ánh",
      img: "https://th.bing.com/th/id/R.b318a8e8241c6c756e7bf03b819b574d?rik=judtiZEwnL85oQ&pid=ImgRaw&r=0",
    },
    {
      name: "Đắc nhân tâm",
      price: 10998,
      sl: 1,
      author: "Nguyễn Nhật Ánh",
      img: "https://th.bing.com/th/id/R.b318a8e8241c6c756e7bf03b819b574d?rik=judtiZEwnL85oQ&pid=ImgRaw&r=0",
    },
    {
      name: "Đắc nhân tâm",
      price: 10998,
      sl: 1,
      author: "Nguyễn Nhật Ánh",
      img: "https://th.bing.com/th/id/R.b318a8e8241c6c756e7bf03b819b574d?rik=judtiZEwnL85oQ&pid=ImgRaw&r=0",
    },
  ];
  const handledelete = (item) => {
    console.log(item);
    setIsOpen(!isOpen);
  };
  return (
    <View flex={1} bg="#d5f3f9">
      <View
        alignItems={"center"}
        marginTop={10}
        flexDirection="row"
        justifyContent="space-between"
      >
        <Pressable marginLeft={5} onPress={() => { navigation.goBack(); }}>
          <Ionicons name="arrow-back-outline" size={24} color="#40494b" />
        </Pressable>
        <View>
          <Text color={"#40494b"} fontWeight={"900"} fontSize={20}>
            Giỏ hàng
          </Text>
        </View>
        <View marginRight={5}>
          {/* <FontAwesome name="shopping-basket" size={24} color="#40494b" /> */}
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box paddingBottom={5}>
          <SwipeListView
            data={books}
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
                  height={115}
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
        </Box>
      </ScrollView>

      <View rounded={20} bg={"#fff"} padding={3}>
        <Text color={"#4d4c4c"} fontSize={18} fontWeight="600">
          Đơn hàng của bạn
        </Text>
        <Divider thickness="2"></Divider>
        <View
          marginTop={5}
          marginBottom={2}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <Text fontSize={16}>Tổng tiền hàng</Text>
          <Text fontSize={16}>200.000đ</Text>
        </View>
        <View
          marginBottom={5}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <Text fontSize={16}>Phí vận chuyển</Text>
          <Text fontSize={16}>0đ</Text>
        </View>
        <Divider thickness="2"></Divider>
        <View
          marginTop={5}
          marginBottom={5}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <Text fontWeight={"700"} fontSize={18} color={"#EE3E3E"}>
            Tổng thanh toán
          </Text>
          <Text
            textDecoration={""}
            fontWeight={"700"}
            fontSize={18}
            color="#EE3E3E"
          >
            200.000đ
          </Text>
        </View>
        <Button
          p={2}
          bg={"#e8abc3"}
          _text={{ fontWeight: "900", fontSize: 20 }}
          color={"#fff"}
        >
          Đặt Hàng
        </Button>
      </View>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialog.Content>
          {/* <View>
            <Text>Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng??</Text>
          </View> */}
          <AlertDialog.Body>
            <View alignItems={"center"}>
              <Text fontSize={20}>
                Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng??
              </Text>
              <Image
                source={{
                  uri: "https://thuthuatnhanh.com/wp-content/uploads/2020/02/icon-ong-bee-phan-van.png",
                }}
                alt='hinh'
                style={{ width: 100, height: 100, resizeMode: "stretch" }}
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
                onPress={onClose}
              >
                Delete
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>

        {/* <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Delete Customer</AlertDialog.Header>
          <AlertDialog.Body>
            This will remove all data relating to Alex. This action cannot be
            reversed. Deleted data can not be recovered.
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onClose}
                ref={cancelRef}
              >
                Cancel
              </Button>
              <Button colorScheme="danger" onPress={onClose}>
                Delete
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content> */}
      </AlertDialog>
    </View>
  );
};

export default Order;
