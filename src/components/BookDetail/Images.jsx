import { Text, View } from "native-base";
import { Dimensions, Image } from "react-native";
import React from "react";
import { Carousel } from "react-native-snap-carousel";

const Images = () => {
  const listImage = [
    "https://th.bing.com/th/id/OIP.zGTaQ-khcMHfsHm4IZqYsgHaHa?pid=ImgDet&w=1000&h=1000&rs=1",
    "https://th.bing.com/th/id/R.67f3c87884436a35cf9991d13adf93fd?rik=tB9ndMh9dfvhAg&pid=ImgRaw&r=0",
    "https://jooinn.com/images/sunset-532.png",
    "https://cdn.audleytravel.com/-/-/80/023049146222199135243151240186242239250085111149.jpg",
  ];

  return (
    <View flex={1} bg="blue">
      <Text>Images</Text>
      <Image
        style={{
          width: 100,
          height: 100,
          resizeMode: "stretch",
        }}
        source={{
          uri: "https://th.bing.com/th/id/OIP.zGTaQ-khcMHfsHm4IZqYsgHaHa?pid=ImgDet&w=1000&h=1000&rs=1",
        }}
      ></Image>
      <Carousel
        layout={"tinder"}
        sliderWidth={Dimensions.get("screen").width}
        sliderHeight={500}
        data={listImage}
        itemWidth={300}
        itemHeight={500}
        renderItem={(item, index) => {
          return (
            <View>
              <Image
                style={{ width: 200, height: 200, resizeMode: "stretch" }}
                source={{
                  uri: item.item,
                }}
              ></Image>
            </View>
          );
        }}
      ></Carousel>
    </View>
  );
};

export default Images;
