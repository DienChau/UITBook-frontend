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
  // ScrollView,
} from "native-base";
import { Dimensions, ScrollView, ToastAndroid } from "react-native";

// import products from "../data/Product";
const windowWidth = Dimensions.get("window").width;
import { NumericFormat } from "react-number-format";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";

import React, { useEffect, useState, useRef } from "react";
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
import { addItemsToFavourite } from "../redux/slice/favorites/favouriteSlice";

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
    // console.log(match);
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
  const [search, setSearch] = useState(routs.params);

  console.log("param", keyword);

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
  useEffect(() => {
    setCategory();
    setAuthor();
    setPrice(100);
    setPublisher();
    setPage(1);
    setSearch(keyword);
  }, [keyword]);
  const reserHandler = () => {
    setCategory();
    setAuthor();
    setPrice(100);
    setPublisher();
    setPage(1);
    onClose();
    setSearch("");
  };
  useEffect(() => {
    // console.log("cate:", category);
    // console.log("cate:", author);
    // console.log("cate:", publisher);
    console.log("search", keyword);
    const initPrice = price * 10000;
    if (!search) setSearch("");
    const infoData = {
      keyword: search,
      price: [0, initPrice],
      author,
      publisher,
      category,
      currentPage: page,
      ratings: 0,
    };
    dispatch(getProduct(infoData));
  }, [category, author, publisher, price, page, search]);
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

  const button = useRef();

  function handleAddFavorite(productItem) {
    dispatch(addItemsToFavourite(productItem));
    ToastAndroid.show("Thêm vào yêu thích thành công", ToastAndroid.SHORT);
    // favorite = true
    // console.log('Thêm vào yêu thích thành công')
    // setFavorite(true)
    // console.log('heart: ', heart)
    console.log("productItem: ", productItem);
  }
  return (
    <PaperProvider>
      <ScrollView
        ref={button}
        onContentSizeChange={() => {
          button.current.scrollTo({
            x: 0, // Required
            y: 0, // Required
            animated: true,
          });
        }}
        style={{ flex: 1, backgroundColor: "#CBF0F8" }}
      >
        <View flex={1} bg="#CBF0F8">
          {/* <Header /> */}

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
                {products.map((product, index) => (
                  // <>
                  <Book
                    handleAddFavorite={handleAddFavorite}
                    key={index}
                    product={product}
                  />
                  // </>
                ))}
                {products.length === 0 ? (
                  <></>
                ) : (
                  // <>
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      paddingLeft: 40,
                    }}
                  >
                    <DataTable>
                      <DataTable.Pagination
                        page={page}
                        numberOfPages={Math.ceil(
                          productsCount / numberOfItemsPerPage
                        )}
                        onPageChange={(page) => {
                          // console.log("page:", page);
                          setPage(page);
                        }}
                        showFastPaginationControls
                        numberOfItemsPerPage={9}
                        selectPageDropdownLabel={"Rows per page"}
                      />
                    </DataTable>
                  </View>

                  // </>
                )}
              </>
            ) : (
              <></>
            )}
          </View>

          {/* <FlatList renderItem={() => <Text>HHH</Text>}></FlatList> */}

          <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content>
              <ScrollView
                h={700}
                w="100%"
                style={{ height: 700, width: "100%" }}
              >
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
                          key={index}
                          onValueChange={(newValue) => {
                            reserHandler();
                            setCategory(newValue);
                            setSearch("");
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
                          key={index}
                          onValueChange={(newValue) => {
                            reserHandler();
                            setAuthor(newValue);
                            setSearch("");
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
                          key={index}
                          onValueChange={(newValue) => {
                            reserHandler();
                            setPublisher(newValue);
                            setSearch("");
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
                        // console.log("price", v);
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
      </ScrollView>
    </PaperProvider>
  );
};

export default Books;
