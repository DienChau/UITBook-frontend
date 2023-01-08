import {
  Actionsheet,
  Box,
  Button,
  Divider,
  Text,
  useDisclose,
  View,
  FlatList,
  Slide,
  Slider,
  Icon,
  ScrollView,
} from "native-base";

import React, { useState } from "react";
import Header from "./Header";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { MaterialIcons } from "@expo/vector-icons";

const Books = () => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [price, setPrice] = useState(500000);

  const [checkBoxCategory, setCheckBoxCategory] = useState([
    {
      id: 1,
      title: "Tiểu thuyết",
      checked: true,
    },
    {
      id: 2,
      title: "Văn học trong nước",
      checked: false,
    },
    {
      id: 3,
      title: "Văn học nước ngoài",
      checked: false,
    },
    {
      id: 4,
      title: "Truyện ngắn",
      checked: false,
    },
  ]);
  const [checkBoxAuthor, setCheckBoxAuthor] = useState([
    {
      id: 1,
      title: "Nguyễn Nhật Ánh",
      checked: true,
    },
    {
      id: 2,
      title: "Nguyễn Ngọc Tư",
      checked: false,
    },
    {
      id: 3,
      title: "Vũ",
      checked: false,
    },
    {
      id: 4,
      title: "Yoo Eun Jung",
      checked: false,
    },
  ]);
  const [checkBoxNXB, setCheckBoxNXB] = useState([
    {
      id: 1,
      title: "NXB Kim Đồng",
      checked: true,
    },
    {
      id: 2,
      title: "NXB Hà Nội",
      checked: false,
    },
    {
      id: 3,
      title: "NXB Lao Động Việt Nam",
      checked: false,
    },
    {
      id: 4,
      title: "NXB Tuổi Trẻ",
      checked: false,
    },
  ]);

  const handleApply = () => {
    const category = checkBoxCategory.filter((item) => {
      return item.checked;
    });
    console.log("ca: ", category);
  };

  const toggleCheckboxCategory = (id, index) => {
    const checkboxData = [...checkBoxCategory];
    checkboxData[index].checked = !checkboxData[index].checked;
    setCheckBoxCategory(checkboxData);
  };
  const toggleCheckboxAuthor = (id, index) => {
    const checkboxData = [...checkBoxAuthor];
    checkboxData[index].checked = !checkboxData[index].checked;
    setCheckBoxAuthor(checkboxData);
  };
  const toggleCheckboxNXB = (id, index) => {
    const checkboxData = [...checkBoxNXB];
    checkboxData[index].checked = !checkboxData[index].checked;
    setCheckBoxNXB(checkboxData);
  };
  return (
    <View flex={1} bg="#CBF0F8">
      <Header />

      <Button
        onPress={onOpen}
        w={150}
        bg="#E8ABC3"
        marginTop={5}
        marginLeft={5}
        padding={2}
        _text={{
          fontWeight: "700",
        }}
        leftIcon={<Ionicons name="filter" size={24} color="#fff" />}
      >
        Lọc sản phẩm
      </Button>
      <Divider
        my="3"
        _light={{
          bg: "#fff",
        }}
      />

      <FlatList renderItem={() => <Text>HHH</Text>}></FlatList>

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <ScrollView h={700} w="100%">
            <Box w="100%" px={4} justifyContent="center">
              <Text
                fontSize="20"
                color="gray.500"
                fontWeight={900}
                _dark={{
                  color: "gray.300",
                }}
              >
                Bộ lọc tìm kiếm
              </Text>
              <Box marginTop={3} bg="#CBF0F8" rounded={10} padding={5}>
                <Text
                  marginBottom={2}
                  color="gray.700"
                  fontSize={18}
                  fontWeight={700}
                >
                  Thể loại
                </Text>
                {checkBoxCategory.map((item, index) => {
                  return (
                    <View
                      marginBottom={2}
                      key={index}
                      style={{ flexDirection: "row" }}
                    >
                      <Checkbox
                        value={item.checked}
                        onValueChange={() =>
                          toggleCheckboxCategory(item.id, index)
                        }
                      />
                      <Text marginLeft={3}>{item.title}</Text>
                    </View>
                  );
                })}
              </Box>
              <Box marginTop={3} bg="#CBF0F8" rounded={10} padding={5}>
                <Text
                  marginBottom={2}
                  color="gray.700"
                  fontSize={18}
                  fontWeight={700}
                >
                  Tác giả
                </Text>
                {checkBoxAuthor.map((item, index) => {
                  return (
                    <View
                      marginBottom={2}
                      key={index}
                      style={{ flexDirection: "row" }}
                    >
                      <Checkbox
                        value={item.checked}
                        onValueChange={() =>
                          toggleCheckboxAuthor(item.id, index)
                        }
                      />
                      <Text marginLeft={3}>{item.title}</Text>
                    </View>
                  );
                })}
              </Box>
              <Box marginTop={3} bg="#CBF0F8" rounded={10} padding={5}>
                <Text
                  marginBottom={2}
                  color="gray.700"
                  fontSize={18}
                  fontWeight={700}
                >
                  Nhà xuất bản
                </Text>
                {checkBoxAuthor.map((item, index) => {
                  return (
                    <View
                      marginBottom={2}
                      key={index}
                      style={{ flexDirection: "row" }}
                    >
                      <Checkbox
                        value={item.checked}
                        onValueChange={() => toggleCheckboxNXB(item.id, index)}
                      />
                      <Text marginLeft={3}>{item.title}</Text>
                    </View>
                  );
                })}
              </Box>

              <Box marginTop={3} bg="#CBF0F8" rounded={10} padding={5}>
                <Text
                  marginBottom={2}
                  color="gray.700"
                  fontSize={18}
                  fontWeight={700}
                >
                  Giá Sản phẩm
                </Text>
                <View flexDirection="row" justifyContent="space-between">
                  <View>
                    <Text>0</Text>
                  </View>
                  <View>
                    <Text>{price}0. 000</Text>
                  </View>
                </View>
                <Slider
                  defaultValue={500000}
                  size="sm"
                  colorScheme="green"
                  w="100%"
                  step={10}
                  onChange={(v) => {
                    setPrice(v);
                  }}
                >
                  <Slider.Track bg="green.100">
                    <Slider.FilledTrack bg="green.600" />
                  </Slider.Track>
                  <Slider.Thumb borderWidth="0" bg="transparent">
                    <Icon
                      as={MaterialIcons}
                      name="park"
                      color="green.600"
                      size="sm"
                    />
                  </Slider.Thumb>
                </Slider>
              </Box>
              <View alignItems="flex-end">
                <Button
                  w="100"
                  color="#fff"
                  marginTop={5}
                  marginBottom={3}
                  fontWeight={900}
                  _text={{
                    fontWeight: "900",
                  }}
                  bg="#E8ABC3"
                  onPress={handleApply}
                >
                  ÁP DỤNG
                </Button>
              </View>
            </Box>
          </ScrollView>
        </Actionsheet.Content>
      </Actionsheet>
    </View>
  );
};

export default Books;
