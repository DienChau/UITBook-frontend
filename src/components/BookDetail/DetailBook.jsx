import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

// import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrorsDetails,
  getProductDetails,
} from "../../redux/slice/product/productDetailsSlice";
import {
  clearErrorsReview,
  newReview,
  resetStateReview,
} from "../../redux/slice/product/newReviewSlice";
// import { FontAwesome } from '@expo/vector-icons';
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
import {
  Dimensions,
  Image,
  Pressable,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
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
import Book from "../Book";
import { addToCart } from "../../redux/slice/cartSlice";
// import { addItemsToFavourite } from "../../redux/features/favourite/favouriteSlice";
import { addItemsToFavourite } from "../../redux/slice/favorites/favouriteSlice";
const windowWidth = Dimensions.get("window").width;

const DetailBook = ({ route }) => {
  //Scroll to TOp
  const dispatch = useDispatch();
  const scrollRef = useRef();
  //navigation
  const navigation = useNavigation();
  // const { id, product: productBook } = route.params;
  const { id } = route.params;

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);
  //State
  const [heart, setHeart] = useState(false);
  const [count, setcount] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const height1 = Dimensions.get("screen").height - 120;
  const button = useRef();

  //Call API
  const [newBooks, setNewBooks] = React.useState([]);
  const [popularBooks, setPopularBooks] = React.useState([]);

  React.useEffect(() => {
    // console.log('hello')
    async function fetchDataPopularBooks() {
      try {
        const request = await axios.get("/api/v2/books/popular");
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
        const request = await axios.get("/api/v2/books/new");
        setNewBooks(request.data.books);
        return request.data.books;
      } catch (error) {
        console.log(error);
      }
    }
    fetchDataNewBooks();
  }, []);

  //Handle scrollView
  // const scrollRef = useRef()

  const {
    loading,
    error,
    product: productBook,
  } = useSelector((state) => state.productDetails);
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const ratingCompleted = (rating) => {
    setRating(rating);
  };

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
      // toast.success("Th??m review s??ch th??nh c??ng! ????", {
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

  //Handle add to cart
  const handleAddToCart = (product) => {
    if (product.Stock < 1) {
      ToastAndroid.show(
        "S??? l?????ng s???n ph???m trong kho kh??ng ?????",
        ToastAndroid.SHORT
      );
      return;
    }
    dispatch(
      addToCart({
        book: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0].url,
        stock: product.Stock,
        author: product.author,
        quantity: 1,
      })
    );
  };
  const productCart = useSelector((state) => state.cart.cartItems);
  let quantity = productCart.length !== 0 ? productCart.length : 0;

  const listImage = [
    "https://th.bing.com/th/id/OIP.zGTaQ-khcMHfsHm4IZqYsgHaHa?pid=ImgDet&w=1000&h=1000&rs=1",
    "https://th.bing.com/th/id/R.67f3c87884436a35cf9991d13adf93fd?rik=tB9ndMh9dfvhAg&pid=ImgRaw&r=0",
    "https://jooinn.com/images/sunset-532.png",
    "https://cdn.audleytravel.com/-/-/80/023049146222199135243151240186242239250085111149.jpg",
  ];

  //Handle add to favorites
  function handleAddFavorite(product) {
    dispatch(addItemsToFavourite(product._id));
    ToastAndroid.show("Th??m v??o y??u th??ch th??nh c??ng", ToastAndroid.SHORT);
    setHeart(true);
  }

  function handleAddFavoriteRelated(product) {
    dispatch(addItemsToFavourite(product));
    ToastAndroid.show("Th??m v??o y??u th??ch th??nh c??ng", ToastAndroid.SHORT);
    // setHeart(true)
  }

  const onPressTouch = () => {
    button.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  return (
    <>
      {productBook ? (
        <View flex={1}>
          <ScrollView
            height={height1}
            ref={button}
            // onContentSizeChange={() => {
            //   button.current.scrollTo({
            //     x: 0,
            //     y: 0,
            //     animated: true
            //   })
            // }}
          >
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
                    marginTop={10}
                    flexDirection="row"
                    justifyContent="space-between"
                  >
                    <Pressable
                      style={{
                        marginLeft: 20,
                        backgroundColor: "#ccc",
                        padding: 1,
                        borderRadius: 100,
                      }}
                      // padding={1} rounded={50}
                      onPress={() => {
                        navigation.goBack();
                      }}
                    >
                      <Ionicons
                        name="arrow-back-outline"
                        size={24}
                        color="#fff"
                      />
                    </Pressable>
                    <View marginRight={5}>
                      <Pressable
                        onPress={() => {
                          navigation.navigate("OrderScreen");
                        }}
                        flex={1}
                        justifyContent="center"
                        alignItems="center"
                      >
                        <FontAwesome
                          name="shopping-basket"
                          size={24}
                          color="#888"
                        />
                        {quantity == 0 ? (
                          <></>
                        ) : (
                          <Box
                            px={1}
                            rounded="full"
                            position="absolute"
                            top={-3}
                            left={5}
                            bg={"#E72A2A"}
                            _text={{
                              color: "#fff",
                              fontSize: "11px",
                            }}
                          >
                            {quantity}
                          </Box>
                        )}
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
                    // data={products}
                    data={productBook.images}
                    itemWidth={200}
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
                    <View position="absolute" bottom={-10} right={20}>
                      <Pressable
                        // onPress={() => setHeart(!heart)}
                        onPress={() => handleAddFavorite(productBook)}
                      >
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
                  suffix={" ??"}
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
                    ratingCount={5}
                    readonly={true}
                    startingValue={productBook.ratings}
                  />
                  <Text marginLeft={4}>
                    ???? b??n <Text>{productBook.Sold}</Text>
                  </Text>
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
                  {/* Kh??ng Ai C?? Th??? L??m B???n T???n Th????ng Tr??? Khi B???n Cho Ph??p */}
                </Text>
                <View flexDirection={"row"} marginTop={2}>
                  <FontAwesome5 name="user-edit" size={18} color="#208AED" />
                  <Text>
                    T??c gi???:{" "}
                    <Text style={{ color: "red" }}>{productBook.author}</Text>
                  </Text>
                </View>
                <View marginTop={3}>
                  <Pressable
                    onPress={() =>
                      navigation.navigate("AudioBook", { productBook })
                    }
                    w={"50%"}
                    padding={2}
                    flexDirection={"row"}
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#ff5c93",
                      padding: 3,
                      width: "40%",
                      borderRadius: 30,
                    }}
                  >
                    <Ionicons name="md-headset" size={24} color="#fff" />
                    <Text marginLeft={3} color={"#fff"} fontWeight={"700"}>
                      Gi???i thi???u
                    </Text>
                  </Pressable>
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
                  S???n Ph???m T????ng T???
                </Text>
                <Divider my="2" bg={"gray.500"} />
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  paddingBottom={3}
                  paddingTop={3}
                  horizontal={true}
                >
                  {popularBooks &&
                    popularBooks.map((item, index) => (
                      // <>
                      <Book
                        handleAddFavorite={handleAddFavoriteRelated}
                        key={index}
                        product={item}
                      />
                      // </>
                    ))}
                </ScrollView>
              </View>
              <View marginTop={5} bg={"#fff"} paddingTop={2} paddingBottom={2}>
                <View paddingLeft={5} paddingRight={5}>
                  <Text color={"gray.500"} fontWeight={"800"} fontSize={18}>
                    Th??ng Tin Chi Ti???t
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
                      C??ng ty ph??t h??nh
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
                      K??ch th?????c
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
                      D???ch Gi???
                    </Text>
                    <Text fontSize={15}>Sun Tz??</Text>
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
                      Lo???i b??a
                    </Text>
                    <Text fontSize={15}>B??a m???m</Text>
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
                      S??? trang
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
                      Nh?? xu???t b???n
                    </Text>
                    <Text fontSize={15}>{productBook.publisher}</Text>
                  </View>
                </View>
              </View>
              <View marginTop={5} bg={"#fff"} paddingTop={2} paddingBottom={2}>
                <View paddingLeft={5} paddingRight={5}>
                  <Text color={"gray.500"} fontWeight={"800"} fontSize={18}>
                    M?? t??? s???n ph???m
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
                    B??nh Lu???n V?? ????nh Gi??
                  </Text>
                  <Tooltip label="Click here to read more" openDelay={500}>
                    <Button shadow={2} onPress={() => setShowModal(true)}>
                      <Ionicons
                        name="add-circle-sharp"
                        size={24}
                        color="#fff"
                      />
                    </Button>
                  </Tooltip>
                </View>
                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                  <Modal.Content maxWidth="400px">
                    <Modal.Header>
                      <Text color={"blue.500"} fontWeight={"900"} fontSize={20}>
                        Th??m b??nh lu???n
                      </Text>
                    </Modal.Header>
                    <View marginTop={3}>
                      <Text
                        paddingLeft={5}
                        fontSize={18}
                        fontWeight={600}
                        color={"gray.500"}
                      >
                        ????nh gi?? s???n ph???m
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
                        B??nh lu???n
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
                          H???y
                        </Button>
                        <Button
                          onPress={reviewSubmitHandler}
                          // onPress={() => {
                          //   setShowModal(false);
                          // }}
                        >
                          Th??m
                        </Button>
                      </Button.Group>
                    </Modal.Footer>
                  </Modal.Content>
                </Modal>
                <Divider my="2" bg={"gray.500"} />

                {productBook.reviews &&
                  productBook.reviews.map((review, index) => (
                    <View key={index}>
                      <View
                        key={review._id}
                        paddingLeft={5}
                        paddingRight={5}
                        flexDirection={"row"}
                        justifyContent="space-between"
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
                            alt="avater"
                          ></Image>
                          <View
                            style={{
                              justifyContent: "flex-start",
                              alignItems: "flex-start",
                            }}
                          >
                            <Text
                              fontSize={18}
                              fontWeight={700}
                              marginBottom={1}
                            >
                              {review.name}
                              {/* Di???n Ch??u */}
                            </Text>
                            <Rating
                              imageSize={15}
                              ratingCount={5}
                              readonly={true}
                              startingValue={review.rating}
                            />
                            <Text
                              style={{
                                flexWrap: "wrap",
                                width: 200,
                                marginTop: 2,
                              }}
                            >
                              {review.comment}
                            </Text>
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
                      <Divider my="1" style={{ backgroundColor: "#eee" }} />
                    </View>
                  ))}
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
                Kh??m Ph?? Th??m
              </Text>
              <Divider my="2" bg={"gray.500"} />
              <ScrollView
                showsHorizontalScrollIndicator={false}
                paddingBottom={3}
                paddingTop={3}
                horizontal={true}
                ref={button}
                // onContentSizeChange={() => {
                //   button.current.scrollTo({
                //     x: 0,
                //     y: 0,
                //     animated: true
                //   })
                // }}
              >
                {newBooks &&
                  newBooks.map((item, index) => (
                    // <>
                    <Book
                      key={index}
                      handleAddFavorite={handleAddFavoriteRelated}
                      product={item}
                    />
                    // </>
                  ))}
              </ScrollView>
              <TouchableOpacity
                style={{ flex: 1, alignItems: "flex-end" }}
                ref={button}
                // onPress={onPressTouch}
              >
                <FontAwesome name="arrow-circle-up" size={30} color="#10d187" />
              </TouchableOpacity>
            </View>
          </ScrollView>

          <View ref={button} h={50} position={"absolute"} bottom={0}>
            <Button
              bg={"#36ABED"}
              _text={{ fontWeight: "900", fontSize: 20 }}
              w={Dimensions.get("screen").width}
              onPress={() => handleAddToCart(productBook)}
            >
              Th??m v??o gi???
            </Button>
          </View>
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

export default DetailBook;
