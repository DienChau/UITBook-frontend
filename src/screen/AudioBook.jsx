import { Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Pressable, ScrollView, Slide, Slider, Text, View } from "native-base";
import React from "react";
import { Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { Audio } from "expo-av";
import { useEffect } from "react";
import { Rating } from "react-native-ratings";
import { StyleSheet } from "react-native";

const AudioBook = () => {
  const routes = useRoute();
  const navigation = useNavigation();
  const [play, setPlay] = useState(false);
  const { productBook } = routes.params;
  const [sound, setSound] = React.useState();
  const [statusSound, setStatusSound] = useState();
  const [timeSlider, setTimeSlider] = useState();
  const [valueSlider, setValueSlider] = useState(0);
  // let statusSound;

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  useEffect(() => {
    async function startSound() {
      console.log("Loading Sound");
      // {
      //   uri: "https://drive.google.com/uc?id=1ZnxkIi4v9yC71EzP3YHCS3MipU65jo11",
      // }
      const { sound, status } = await Audio.Sound.createAsync(
        require("../../assets/music.mp3")
      );
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isPlaying) {
          console.log("position", status?.positionMillis);
          setValueSlider(status?.positionMillis);
        }
      });
      // require("../../assets/music.mp3");
      // const a = await sound.getStatusAsync();
      setStatusSound(status);
      console.log("Sound 2", status);
      console.log("Sound 3", sound);
      setSound(sound);
    }
    startSound();
    sound?.setProgressUpdateIntervalAsync(() => {});
  }, []);
  useEffect(() => {
    setValueSlider(statusSound?.positionMillis);
  }, [statusSound?.positionMillis]);
  const handlePlay = async () => {
    console.log("Playing Sound");
    await sound.playAsync();
    setPlay(!play);
  };

  const handleStop = async () => {
    console.log("pause", statusSound);

    await sound.pauseAsync();
    setPlay(!play);
  };
  const handleNext10s = async () => {
    let statusAsync = await sound?.getStatusAsync();
    sound?.setPositionAsync(statusAsync.positionMillis + 10000);
    setValueSlider(statusAsync.positionMillis + 10000);
    setTimeSlider(
      millisToMinutesAndSeconds(statusAsync.positionMillis + 10000)
    );
    // console.log("statusAsync", statusAsync);
  };
  const handleBack10s = async () => {
    let statusAsync = await sound?.getStatusAsync();
    sound?.setPositionAsync(statusAsync.positionMillis - 10000);
    setValueSlider(statusAsync.positionMillis - 10000);
    setTimeSlider(
      millisToMinutesAndSeconds(statusAsync.positionMillis - 10000)
    );
    // console.log("statusAsync", statusAsync);
  };

  return (
    <View bg={"#d5f3f9"} flex={1}>
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
            Audio Book
          </Text>
        </View>
        <View marginRight={5}>
          {/* <FontAwesome name="shopping-basket" size={24} color="#40494b" /> */}
        </View>
      </View>
      <View
        bg={"#d5f3f9"}
        paddingTop={5}
        paddingBottom={5}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Image
          style={{ width: 200, height: 300 }}
          source={{ uri: productBook.images[0].url }}
        />
      </View>
      <ScrollView>
        <View
          borderTopLeftRadius={50}
          borderTopRightRadius={50}
          bg={"#fff"}
          padding={5}
        >
          <Text color={"#1890ff"} fontWeight={"700"} fontSize={16}>
            {productBook.name}
          </Text>
          <View
            width={"100%"}
            alignItems={"flex-start"}
            justifyContent={"flex-start"}
          >
            <Rating
              imageSize={15}
              ratingCount={5}
              readonly
              startingValue={productBook.ratings}
            />
          </View>
          <Text>{productBook?.author}</Text>
          <Text>{productBook.publisher}</Text>
          <Text>{productBook.description}</Text>
        </View>
      </ScrollView>
      <View bg={"#fff"}>
        <View
          paddingTop={3}
          paddingBottom={5}
          justifyContent={"center"}
          alignItems={"center"}
          bg={"#2d1a43"}
          borderTopLeftRadius={30}
          borderTopRightRadius={30}
        >
          <Slider
            defaultValue={valueSlider}
            value={valueSlider}
            size="sm"
            minValue={0}
            maxValue={statusSound?.durationMillis}
            w="70%"
            step={1}
            onChange={async (v) => {
              console.log("valueSlider", valueSlider);
              sound?.setPositionAsync(v);
              let statusAsync = await sound?.getStatusAsync();
              setValueSlider(statusAsync.positionMillis);
              // console.log("statusAsync", statusAsync);
              setTimeSlider(millisToMinutesAndSeconds(v));
            }}
          >
            <Slider.Track bg="green.100">
              <Slider.FilledTrack bg="green.600" />
            </Slider.Track>
            <Slider.Thumb />
            {/* <Slider.Thumb borderWidth="0" bg="transparent">
            <Icon as={MaterialIcons} name="park" color="green.600" size="sm" />
          </Slider.Thumb> */}
          </Slider>
          <View
            width={"70%"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <View>
              <Text color={"#fff"}>
                {valueSlider
                  ? millisToMinutesAndSeconds(valueSlider)
                  : millisToMinutesAndSeconds(0)}
              </Text>
            </View>
            <View>
              <Text color={"#fff"}>
                {statusSound
                  ? millisToMinutesAndSeconds(statusSound?.durationMillis)
                  : null}
              </Text>
            </View>
          </View>
          <View
            width={"70%"}
            marginTop={2}
            flexDirection={"row"}
            justifyContent={"space-around"}
          >
            <AntDesign name="banckward" size={24} color="#e4a0b7" />
            <Pressable onPress={handleBack10s}>
              <Entypo name="back-in-time" size={24} color="#e4a0b7" />
            </Pressable>
            {play ? (
              <>
                <Pressable onPress={play !== true ? handlePlay : handleStop}>
                  <AntDesign name="pausecircleo" size={24} color="#e4a0b7" />
                </Pressable>
              </>
            ) : (
              <>
                <Pressable onPress={play !== true ? handlePlay : handleStop}>
                  <AntDesign name="playcircleo" size={24} color="#e4a0b7" />
                </Pressable>
              </>
            )}
            <Pressable style={styles.image} onPress={handleNext10s}>
              <Entypo name="back-in-time" size={24} color="#e4a0b7" />
            </Pressable>
            <AntDesign name="forward" size={24} color="#e4a0b7" />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    transform: [{ rotateY: "180deg" }],
  },
});

export default AudioBook;
