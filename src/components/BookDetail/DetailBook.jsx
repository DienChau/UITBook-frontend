import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

// import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrorsDetails,
  getProductDetails,
} from '../../redux/slice/product/productDetailsSlice'
import {
  clearErrorsReview,
  newReview,
  resetStateReview,
} from '../../redux/slice/product/newReviewSlice'

import {
  Avatar,
  Box,
  Button,
  Divider,
  FlatList,
  HStack,
  Icon,
  Input,
  Modal,
  ScrollView,
  Spacer,
  Text,
  Tooltip,
  View,
  VStack,
} from "native-base";
import { Dimensions, Image, Pressable, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Carousel from "react-native-snap-carousel";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { Rating } from "react-native-ratings";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { NumericFormat } from "react-number-format";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
const windowWidth = Dimensions.get("window").width;

const DetailBook = ({ route }) => {
  //Scroll to TOp
  const scrollRef = useRef();
  //navigation
  const navigation = useNavigation()
  // const { id, product: productBook } = route.params;
  const { id } = route.params;

  //State
  const [heart, setHeart] = useState(false);
  const [count, setcount] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const height1 = Dimensions.get("screen").height - 120;
  const button = useRef();
  // useEffect(() => {
  //   console.log(button.current.height);
  // }, []);

  //Call API
  const [newBooks, setNewBooks] = React.useState([]);
  const [popularBooks, setPopularBooks] = React.useState([]);

  React.useEffect(() => {
    // console.log('hello')
    async function fetchDataPopularBooks() {
      try {
        const request = await axios.get('/api/v2/books/popular');
        setPopularBooks(request.data.books);
        return request.data.books;
      } catch (error) {
        console.log(error);
      }
    }
    fetchDataPopularBooks();
  }, []);

  React.useEffect(() => {
    // console.log('hello')
    async function fetchDataNewBooks() {
      try {
        const request = await axios.get('/api/v2/books/new');
        setNewBooks(request.data.books);
        return request.data.books;
      } catch (error) {
        console.log(error);
      }
    }
    fetchDataNewBooks();
  }, []);

  //Handle review
  // const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, error, product: productBook } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const ratingCompleted = (rating) => {
    setRating(rating)
  }

  const { user } = useSelector((state) => state.user);

  const reviewSubmitHandler = () => {
    setShowModal(false);
    const myForm = new FormData();
    myForm.append("rating", rating);
    myForm.append("comment", comment);
    myForm.append("bookId", id);
    // console.log("comment", comment, "rating", rating);
    console.log("myForm", myForm);
    dispatch(newReview(myForm));
    setComment("");
  };


  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrorsDetails());
    }
    if (!success && reviewError) {
      // toast.error(`${reviewError}`, {
      //   position: "top-center",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // });
      console.log(reviewError);
      dispatch(clearErrorsReview());
      dispatch(getProductDetails(id));
    } else if (success) {
      // toast.success("Thêm review sách thành công! 🎊", {
      //   position: "bottom-center",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // });
      console.log(success);
      dispatch(resetStateReview());
      dispatch(getProductDetails(id));
    }
  }, [dispatch, error, alert, reviewError, success]);

  const listImage = [
    "https://th.bing.com/th/id/OIP.zGTaQ-khcMHfsHm4IZqYsgHaHa?pid=ImgDet&w=1000&h=1000&rs=1",
    "https://th.bing.com/th/id/R.67f3c87884436a35cf9991d13adf93fd?rik=tB9ndMh9dfvhAg&pid=ImgRaw&r=0",
    "https://jooinn.com/images/sunset-532.png",
    "https://cdn.audleytravel.com/-/-/80/023049146222199135243151240186242239250085111149.jpg",
  ];
  return (

    productBook ? (
      <View flex={1} >
        <SafeAreaView>
          <ScrollView ref={scrollRef} height={height1}>
            <View bg={"#CBF0F8"}>
              <View bg={"#fff"}>
                <View
                  style={{
                    borderBottomLeftRadius: 80,
                    borderBottomRightRadius: 80,
                    paddingBottom: 25,
                  }}
                  bg="#ecd8f3"
                  flex={1}
                >
                  <View
                    marginTop={4}
                    flexDirection="row"
                    justifyContent="space-between"
                  >
                    <Pressable
                      style={{ marginLeft: 10, backgroundColor: '#ccc', padding: 1, borderRadius: 100 }}
                      // padding={1} rounded={50}
                      onPress={() => { navigation.goBack(); }}
                    >
                      <Ionicons
                        name="arrow-back-outline"
                        size={24}
                        color="#fff"
                      />
                    </Pressable>
                    <View marginRight={5}>
                      <Pressable
                        onPress={() => { navigation.navigate("OrderScreen"); }}
                        flex={1} justifyContent="center" alignItems="center" >
                        <FontAwesome name="shopping-basket" size={24} color="#888" />
                        <Box
                          px={1}
                          rounded='full'
                          position='absolute'
                          top={-5}
                          left={3}
                          bg={'#E72A2A'}
                          _text={{
                            color: '#fff',
                            fontSize: '11px'
                          }}
                        >5</Box>
                      </Pressable>
                      {/* <FontAwesome
                      name="shopping-basket"
                      size={24}
                      color="#fff"
                    /> */}
                    </View>
                  </View>
                  <Carousel
                    sliderWidth={Dimensions.get("screen").width}
                    sliderHeight={500}
                    layout={"tinder"}
                    // data={products}
                    data={productBook.images}
                    itemWidth={Dimensions.get("screen").width}
                    itemHeight={500}
                    renderItem={(item, index) => {
                      // console.log(item.item)
                      return (

                        <View alignItems="center">
                          <Image
                            style={{
                              width: 200,
                              height: 200,
                              resizeMode: "contain",
                            }}
                            source={{
                              // uri: product.image
                              uri: item.item.url,
                            }}
                            alt={productBook.name}
                          ></Image>
                        </View>
                      );
                    }}
                  ></Carousel>
                  <View alignItems="center" marginTop={3}>
                    {/* <View flexDirection="row">
              {listImage.map((item, index) => {
                return (
                  <Image
                    style={{
                      width: 50,
                      height: 50,
                      resizeMode: "stretch",
                    }}
                    source={{ uri: item }}
                  ></Image>
                );
              })}
            </View> */}
                    <View position="absolute" bottom={5} right={5}>
                      <Pressable onPress={() => setHeart(!heart)}>
                        {heart ? (
                          <AntDesign name="heart" size={24} color="#E8ABC3" />
                        ) : (
                          <AntDesign name="hearto" size={24} color="#E8ABC3" />
                        )}
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>

              <View
                bg="#fff"
                paddingLeft={5}
                paddingRight={5}
                paddingTop={2}
                paddingBottom={2}
                flexDirection={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <NumericFormat
                  value={productBook.price}
                  displayType={"text"}
                  // decimalSeparator={'.'}
                  thousandSeparator={true}
                  // thousandSeparator={"."}
                  suffix={" đ"}
                  renderText={(value) => (
                    <Text color="red.700" fontWeight={"900"} fontSize={18}>
                      {value}
                    </Text>
                  )}
                />
                {/* <Text color="red.700" fontWeight={"900"} fontSize={18}>
                {product.price}
              </Text> */}
                <View flexDirection={"row"}>
                  <Rating
                    imageSize={20}
                    ratingCount={productBook.ratings}
                    readonly={true}
                    startingValue={productBook.ratings}
                  />
                  <Text marginLeft={4}>Đã bán <Text>{productBook.Sold}</Text></Text>
                </View>
              </View>
              <View
                bg={"#CBF0F8"}
                paddingLeft={5}
                paddingRight={5}
                paddingTop={2}
                paddingBottom={2}
              >
                <Text color={"#208AED"} fontSize={18} fontWeight={"700"}>
                  {productBook.name}
                  {/* Không Ai Có Thể Làm Bạn Tổn Thương Trừ Khi Bạn Cho Phép */}
                </Text>
                <View flexDirection={"row"} marginTop={2}>
                  <FontAwesome5 name="user-edit" size={18} color="#208AED" />
                  <Text>Tác giả: <Text style={{ color: 'red' }}>{productBook.author}</Text></Text>
                </View>
              </View>
              <View
                paddingLeft={5}
                paddingRight={5}
                paddingTop={2}
                paddingBottom={2}
                bg={"#fff"}
              >
                <Text color={"gray.500"} fontWeight={"800"} fontSize={18}>
                  Sản Phẩm Tương Tự
                </Text>
                <Divider my="2" bg={"gray.500"} />
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  paddingBottom={3}
                  paddingTop={3}
                  horizontal={true}
                >
                  {
                    popularBooks.map((item) => (
                      <View
                        key={item._id}
                        style={{
                          backgroundColor: "#fff",
                          borderRadius: 10,
                          marginRight: 12,
                          marginTop: 3,
                          marginBottom: 3,
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

                          style={{ position: "absolute", left: 10, top: 10, zIndex: 2 }}
                        >
                          <MaterialIcons name={'favorite-outline'} size={26} color={"#E8ABC3"} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate('DetailBook', { id: item._id });
                            scrollRef.current?.scrollTo({
                              y: 0,
                              animated: true,
                            });
                          }}
                        >
                          <View style={{ flexDirection: "row", justifyContent: "center" }}>
                            <Image
                              style={{
                                height: 100,
                                height: (windowWidth - 70) / 3,
                                width: (windowWidth - 70) / 3,
                              }}
                              resizeMode="contain"
                              source={{ uri: item.images[0].url }}
                              alt={item.name}
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
                              {item.name}
                            </Text>
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate('DetailBook', { id: item._id });
                            scrollRef.current?.scrollTo({
                              y: 0,
                              animated: true,
                            });
                          }}
                          style={{ alignItems: "center", marginTop: 6 }}
                        >
                          <NumericFormat
                            value={item.price}
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
                            Đã bán: <Text>{item.Sold}</Text>
                          </Text>
                          <Text>
                            {/* {item.ratings} */}
                            {Math.floor(item.ratings * 10) / 10}
                            <AntDesign name="star" size={16} color="#fedc00" />
                          </Text>
                        </View>
                      </View>
                    ))
                  }
                </ScrollView>
              </View>
              <View marginTop={5} bg={"#fff"} paddingTop={2} paddingBottom={2}>
                <View paddingLeft={5} paddingRight={5}>
                  <Text color={"gray.500"} fontWeight={"800"} fontSize={18}>
                    Thông Tin Chi Tiết
                  </Text>
                  <Divider my="2" bg={"gray.500"} />
                </View>

                <View>
                  <View
                    paddingLeft={5}
                    paddingRight={5}
                    paddingTop={2}
                    paddingBottom={2}
                    flexDirection={"row"}
                    bg={"#E8ABC3"}
                  >
                    <Text fontSize={15} w={200}>
                      Công ty phát hành
                    </Text>
                    <Text fontSize={15}>Mood to Read</Text>
                  </View>
                  <View
                    paddingLeft={5}
                    paddingRight={5}
                    paddingTop={2}
                    paddingBottom={2}
                    flexDirection={"row"}
                    bg={"#fff"}
                  >
                    <Text fontSize={15} w={200}>
                      Kích thước
                    </Text>
                    <Text fontSize={15}>14.5 x 20.5 cm</Text>
                  </View>
                  <View
                    paddingLeft={5}
                    paddingRight={5}
                    paddingTop={2}
                    paddingBottom={2}
                    flexDirection={"row"}
                    bg={"#E8ABC3"}
                  >
                    <Text fontSize={15} w={200}>
                      Dịch Giả
                    </Text>
                    <Text fontSize={15}>Sun Tzô</Text>
                  </View>
                  <View
                    paddingLeft={5}
                    paddingRight={5}
                    paddingTop={2}
                    paddingBottom={2}
                    flexDirection={"row"}
                    bg={"#fff"}
                  >
                    <Text fontSize={15} w={200}>
                      Loại bìa
                    </Text>
                    <Text fontSize={15}>Bìa mềm</Text>
                  </View>
                  <View
                    paddingLeft={5}
                    paddingRight={5}
                    paddingTop={2}
                    paddingBottom={2}
                    flexDirection={"row"}
                    bg={"#E8ABC3"}
                  >
                    <Text fontSize={15} w={200}>
                      Số trang
                    </Text>
                    <Text fontSize={15}>{productBook.pageNumber}</Text>
                  </View>
                  <View
                    paddingLeft={5}
                    paddingRight={5}
                    paddingTop={2}
                    paddingBottom={2}
                    flexDirection={"row"}
                    bg={"#fff"}
                  >
                    <Text fontSize={15} w={200}>
                      Nhà xuất bản
                    </Text>
                    <Text fontSize={15}>{productBook.publisher}</Text>
                  </View>
                </View>
              </View>
              <View marginTop={5} bg={"#fff"} paddingTop={2} paddingBottom={2}>
                <View paddingLeft={5} paddingRight={5}>
                  <Text color={"gray.500"} fontWeight={"800"} fontSize={18}>
                    Mô tả sản phẩm
                  </Text>
                  <Divider my="2" bg={"gray.500"} />
                </View>

                <Text paddingLeft={5} paddingRight={5}>
                  {productBook.description}
                </Text>
              </View>
              <View marginTop={5} bg={"#fff"} paddingTop={2} paddingBottom={2}>
                <View
                  flexDirection={"row"}
                  paddingLeft={5}
                  paddingRight={5}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Text color={"gray.500"} fontWeight={"800"} fontSize={18}>
                    Bình Luận Và Đánh Giá
                  </Text>
                  <Tooltip label="Click here to read more" openDelay={500}>
                    <Button shadow={2} onPress={() => setShowModal(true)}>
                      <Ionicons name="add-circle-sharp" size={24} color="#fff" />
                    </Button>
                  </Tooltip>
                </View>
                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                  <Modal.Content maxWidth="400px">
                    <Modal.Header>
                      <Text color={"blue.500"} fontWeight={"900"} fontSize={20}>
                        Thêm bình luận
                      </Text>
                    </Modal.Header>
                    <View marginTop={3}>
                      <Text
                        paddingLeft={5}
                        fontSize={18}
                        fontWeight={600}
                        color={"gray.500"}
                      >
                        Đánh giá sản phẩm
                      </Text>
                      <Rating
                        imageSize={25}
                        ratingCount={5}
                        startingValue={rating}
                        onFinishRating={ratingCompleted}
                      />
                    </View>
                    <View
                      paddingLeft={5}
                      paddingRight={5}
                      marginBottom={5}
                      marginTop={3}
                    >
                      <Text fontSize={18} fontWeight={600} color={"gray.500"}>
                        Bình luận
                      </Text>
                      <Input
                        value={comment}
                        onChangeText={(comment) => {
                          setComment(comment);
                        }}
                        variant="outline"
                        placeholder="Underlined"
                        InputLeftElement={
                          <Icon
                            as={
                              <FontAwesome5
                                name="pen-nib"
                                size={24}
                                color="black"
                              />
                            }
                            size={5}
                            ml="2"
                            color="muted.400"
                          />
                        }
                      />
                    </View>
                    <Modal.Footer>
                      <Button.Group space={2}>
                        <Button
                          bg={"#E8ABC3"}
                          color="#fff"
                          _text={{
                            fontWeight: "900",
                          }}
                          onPress={() => {
                            setShowModal(false);
                          }}
                        >
                          Hủy
                        </Button>
                        <Button
                          onPress={reviewSubmitHandler}
                        // onPress={() => {
                        //   setShowModal(false);
                        // }}
                        >
                          Thêm
                        </Button>
                      </Button.Group>
                    </Modal.Footer>
                  </Modal.Content>
                </Modal>
                <Divider my="2" bg={"gray.500"} />
                {productBook.reviews &&
                  productBook.reviews.map(review => (
                    <>
                      <View
                        key={review._id}
                        paddingLeft={5}
                        paddingRight={5}
                        flexDirection={"row"}
                        justifyContent='space-between'
                        marginBottom={3}
                        marginTop={3}
                      >
                        <View flexDirection={"row"} style={{}}>
                          <Image
                            style={{
                              width: 50,
                              height: 50,
                              resizeMode: "stretch",
                              marginRight: 10,
                              marginTop: 5,
                              borderRadius: 50,
                            }}
                            source={{
                              uri: "https://th.bing.com/th/id/OIP.zGTaQ-khcMHfsHm4IZqYsgHaHa?pid=ImgDet&w=1000&h=1000&rs=1",
                            }}
                            alt='avater'
                          ></Image>
                          <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                            <Text fontSize={18} fontWeight={700} marginBottom={1}>
                              {review.name}
                              {/* Diễn Châu */}
                            </Text>
                            <Rating
                              imageSize={15}
                              ratingCount={5}
                              readonly={true}
                              startingValue={review.rating}
                            />
                            <Text style={{ flexWrap: 'wrap', width: 200, marginTop: 2 }}>{review.comment}</Text>
                          </View>
                        </View>
                        <View>
                          <Text>
                            {/* {review.time} */}
                            {moment(review.time).format("DD/MM/YYYY")}
                            {/* 8/1/2023 | 11:30 */}
                          </Text>
                        </View>


                      </View>
                      <Divider my="1" style={{ backgroundColor: '#eee' }} />
                    </>
                  ))
                }

              </View>
            </View>
            <View
              paddingLeft={5}
              paddingRight={5}
              paddingTop={2}
              paddingBottom={2}
              bg={"#fff"}
            >
              <Text color={"gray.500"} fontWeight={"800"} fontSize={18}>
                Khám Phá Thêm
              </Text>
              <Divider my="2" bg={"gray.500"} />
              <ScrollView
                showsHorizontalScrollIndicator={false}
                paddingBottom={3}
                paddingTop={3}
                horizontal={true}
              >
                {
                  newBooks.map((item) => (
                    <View
                      key={item._id}
                      style={{
                        backgroundColor: "#fff",
                        borderRadius: 10,
                        marginRight: 12,
                        marginTop: 3,
                        marginBottom: 3,
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

                        style={{ position: "absolute", left: 10, top: 10, zIndex: 2 }}
                      >
                        <MaterialIcons name={'favorite-outline'} size={26} color={"#E8ABC3"} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        // onPress={onPressTouch}
                        onPress={() => {
                          navigation.navigate('DetailBook', { id: item._id });
                          scrollRef.current?.scrollTo({
                            y: 0,
                            animated: true,
                          });
                          // onPress={() => {
                          //   navigation.navigate('DetailBook', { id: item._id });
                          // }}
                          // navigation.navigate("DetailBook", item);
                          // navigation.navigate("DetailBook", item);
                        }}
                      >
                        <View style={{ flexDirection: "row", justifyContent: "center" }}>
                          <Image
                            style={{
                              height: 100,
                              height: (windowWidth - 70) / 3,
                              width: (windowWidth - 70) / 3,
                            }}
                            resizeMode="contain"
                            source={{ uri: item.images[0].url }}
                            alt={item.name}
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
                            {item.name}
                          </Text>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity
                        // onPress={() => navigation.navigate('DetailBook', { id: item._id })}
                        onPress={() => {
                          navigation.navigate('DetailBook', { id: item._id });
                          scrollRef.current?.scrollTo({
                            y: 0,
                            animated: true,
                          });
                        }}
                        style={{ alignItems: "center", marginTop: 6 }}>
                        <NumericFormat
                          value={item.price}
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
                          Đã bán: <Text>{item.Sold}</Text>
                        </Text>
                        <Text>
                          {/* {item.ratings} */}
                          {Math.floor(item.ratings * 10) / 10}
                          <AntDesign name="star" size={16} color="#fedc00" />
                        </Text>
                      </View>
                    </View>
                  ))
                }
              </ScrollView>
            </View>
          </ScrollView>
        </SafeAreaView>
        <View ref={button} h={50} position={"absolute"} bottom={0}>
          <Button
            bg={"#36ABED"}
            _text={{ fontWeight: "900", fontSize: 20 }}
            w={Dimensions.get("screen").width}
          >
            Thêm vào giỏ
          </Button>
        </View>
      </View >
    ) : (<></>)

  );
};

export default DetailBook;