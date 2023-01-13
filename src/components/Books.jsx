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
import { Dimensions, TouchableOpacity, Image } from "react-native";

// import products from "../data/Product";
const windowWidth = Dimensions.get("window").width;
import { NumericFormat } from "react-number-format";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";

import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import { RadioButton } from "react-native-paper";
// import { MaterialIcons } from "@expo/vector-icons";
import { Provider as PaperProvider } from "react-native-paper";
import Book from "./Book";
import { DataTable } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../redux/slice/productsSlice";

const numberOfItemsPerPageList = [2, 3, 4];

const items = [
  {
    key: 1,
    name: "Page 1",
  },
  {
    key: 2,
    name: "Page 2",
  },
  {
    key: 3,
    name: "Page 3",
  },
];

const Books = () => {
  const navigation = useNavigation();

  const [isFavorite, setFavoriteIcon] = useState(false);
  const addFavoriteHandler = (id) => {
    const match = products.find((product) => product._id === id);
    console.log(match);
    if (match) {
      setFavoriteIcon(!isFavorite);
    }

    // if (favoriteIcon == 'favorite-outline') {
    //   setFavoriteIcon('favorite')
    // } else {
    //   setFavoriteIcon('favorite-outline')

    // }
  };
  const { isOpen, onOpen, onClose } = useDisclose();
  const [price, setPrice] = useState(100);
  const [page, setPage] = React.useState(1);
  const routs = useRoute();

  let keyword = routs.params;

  // console.log("param", keyword);

  const [checkBoxCategory, setCheckBoxCategory] = useState([
    {
      id: 1,
      title: "Kinh tế",
      checked: false,
    },
    {
      id: 2,
      title: "Kỹ năng sống",
      checked: false,
    },
    {
      id: 3,
      title: "Ngôn tình",
      checked: false,
    },
    {
      id: 4,
      title: "Tâm lý",
      checked: false,
    },
    {
      id: 5,
      title: "Tiếng Anh",
      checked: false,
    },
    {
      id: 6,
      title: "Tiểu thuyết",
      checked: false,
    },
    {
      id: 7,
      title: "Sách chuyên ngành",
      checked: false,
    },
    {
      id: 8,
      title: "Sách ngoại ngữ",
      checked: false,
    },
    {
      id: 9,
      title: "Thường thức đời sống",
      checked: false,
    },
  ]);
  const [checkBoxAuthor, setCheckBoxAuthor] = useState([
    {
      id: 1,
      title: "Nguyễn Nhật Ánh",
      checked: false,
    },
    {
      id: 2,
      title: "Nguyễn Ngọc Thạch",
      checked: false,
    },
    {
      id: 3,
      title: "Nguyễn Ngọc Tư",
      checked: false,
    },
    {
      id: 4,
      title: "Vũ Ngọc Tư",
      checked: false,
    },
    {
      id: 5,
      title: "Hạ Vũ",
      checked: false,
    },
    {
      id: 6,
      title: "Trí",
      checked: false,
    },
  ]);
  const [checkBoxNXB, setCheckBoxNXB] = useState([
    {
      id: 1,
      title: "NXB Trẻ",
      checked: false,
    },
    {
      id: 2,
      title: "Nhã Nam",
      checked: false,
    },
    {
      id: 3,
      title: "Kim Đồng",
      checked: false,
    },
    {
      id: 4,
      title: "NXB Phụ Nữ Việt",
      checked: false,
    },
    {
      id: 5,
      title: "NXB Lao Động",
      checked: false,
    },
    {
      id: 6,
      title: "NXB Hội Nhà Văn",
      checked: false,
    },
  ]);

  const { products, loading, error, productsCount, resultPerPage } =
    useSelector((state) => state.products);

  const dispatch = useDispatch();
  const [author, setAuthor] = useState();
  const [publisher, setPublisher] = useState();
  const [category, setCategory] = React.useState();

  const reserHandler = (e) => {
    setCategory();
    setAuthor();
    setPrice(100);
    setPublisher();
    setPage(1);
    onClose();
    keyword = "";
  };
  useEffect(() => {
    console.log("cate:", category);
    console.log("cate:", author);
    console.log("cate:", publisher);
    const initPrice = price * 10000;
    if (!keyword) keyword = "";
    const infoData = {
      keyword,
      price: [0, initPrice],
      author,
      publisher,
      category,
      currentPage: page,
      ratings: 0,
    };
    dispatch(getProduct(infoData));
  }, [category, author, publisher, price, page, keyword]);
  const handleApply = () => {
    reserHandler();
  };

  const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);
  return (
    <PaperProvider>
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
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            marginVertical: 10,
            paddingHorizontal: 20,
          }}
        >
          {products ? (
            <>
              {products.map((product) => (
                <View
                  key={product._id}
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 10,
                    // marginRight: 12,
                    // marginTop: 3,
                    marginBottom: 10,
                    width: (windowWidth - 50) / 2,
                    padding: 12,
                    justifyContent: "center",
                    position: "relative",
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.23,
                    shadowRadius: 2.62,
                    elevation: 4,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      addFavoriteHandler(product._id);
                    }}
                    style={{
                      position: "absolute",
                      left: 10,
                      top: 10,
                      zIndex: 2,
                    }}
                  >
                    <MaterialIcons
                      name={isFavorite ? "favorite" : "favorite-outline"}
                      size={26}
                      color={"#E8ABC3"}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("DetailBook", product)}
                  >
                    <View
                      style={{ flexDirection: "row", justifyContent: "center" }}
                    >
                      <Image
                        style={{
                          height: 100,
                          height: (windowWidth - 70) / 3,
                          width: (windowWidth - 70) / 3,
                        }}
                        resizeMode="contain"
                        source={{ uri: product.images[0].url }}
                        alt={product.name}
                      />
                    </View>
                    <View>
                      <Text
                        ellipsizeMode="tail"
                        numberOfLines={2}
                        style={{
                          width: "100%",
                          textAlign: "center",
                          fontSize: 14,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          lineHeight: 18,
                          marginTop: 10,
                        }}
                      >
                        {product.name}
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => navigation.navigate("DetailBook", product)}
                    style={{ alignItems: "center", marginTop: 6 }}
                  >
                    <NumericFormat
                      value={product.price}
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
                      Đã bán: <Text>{product.Sold}</Text>
                    </Text>
                    <Text>
                      {product.ratings}
                      <AntDesign name="star" size={16} color="#fedc00" />
                    </Text>
                  </View>
                </View>
              ))}
              {products.length === 0 ? (
                <></>
              ) : (
                <>
                  <DataTable>
                    <DataTable.Pagination
                      page={page}
                      numberOfPages={Math.ceil(
                        productsCount / numberOfItemsPerPage
                      )}
                      onPageChange={(page) => {
                        console.log("page:", page);
                        setPage(page);
                      }}
                      showFastPaginationControls
                      numberOfItemsPerPage={9}
                      selectPageDropdownLabel={"Rows per page"}
                    />
                  </DataTable>
                </>
              )}
            </>
          ) : (
            <></>
          )}
        </View>

        {/* <FlatList renderItem={() => <Text>HHH</Text>}></FlatList> */}

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
                      <RadioButton.Group
                        onValueChange={(newValue) => {
                          reserHandler();
                          setCategory(newValue);
                        }}
                        value={category}
                      >
                        <View flexDirection={"row"} alignItems={"center"}>
                          <RadioButton value={item.title} />
                          <Text>{item.title}</Text>
                        </View>
                      </RadioButton.Group>
                      // <View
                      //   marginBottom={2}
                      //   key={index}
                      //   style={{ flexDirection: "row" }}
                      // >
                      //   <Checkbox
                      //     value={item.checked}
                      //     onValueChange={() =>
                      //       toggleCheckboxCategory(item.id, index)
                      //     }
                      //   />
                      //   <Text marginLeft={3}>{item.title}</Text>
                      // </View>
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
                      <RadioButton.Group
                        onValueChange={(newValue) => {
                          reserHandler();
                          setAuthor(newValue);
                        }}
                        value={author}
                      >
                        <View flexDirection={"row"} alignItems={"center"}>
                          <RadioButton value={item.title} />
                          <Text>{item.title}</Text>
                        </View>
                      </RadioButton.Group>
                      // <View
                      //   marginBottom={2}
                      //   key={index}
                      //   style={{ flexDirection: "row" }}
                      // >
                      //   <Checkbox
                      //     value={item.checked}
                      //     onValueChange={() =>
                      //       toggleCheckboxAuthor(item.id, index)
                      //     }
                      //   />
                      //   <Text marginLeft={3}>{item.title}</Text>
                      // </View>
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
                  {checkBoxNXB.map((item, index) => {
                    return (
                      <RadioButton.Group
                        onValueChange={(newValue) => {
                          reserHandler();
                          setPublisher(newValue);
                        }}
                        value={publisher}
                      >
                        <View flexDirection={"row"} alignItems={"center"}>
                          <RadioButton value={item.title} />
                          <Text>{item.title}</Text>
                        </View>
                      </RadioButton.Group>
                      // <View
                      //   marginBottom={2}
                      //   key={index}
                      //   style={{ flexDirection: "row" }}
                      // >
                      //   <Checkbox
                      //     value={item.checked}
                      //     onValueChange={() => toggleCheckboxNXB(item.id, index)}
                      //   />
                      //   <Text marginLeft={3}>{item.title}</Text>
                      // </View>
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
                    defaultValue={price}
                    size="sm"
                    colorScheme="green"
                    w="100%"
                    step={10}
                    onChange={(v) => {
                      console.log("price", v);
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
                    Khôi phục
                  </Button>
                </View>
              </Box>
            </ScrollView>
          </Actionsheet.Content>
        </Actionsheet>
      </View>
    </PaperProvider>
  );
};

export default Books;
