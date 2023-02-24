import React from "react";
import { Audio } from "expo-av";
import ProgressBarAudio from "./ProgressBarAudio";
import { Button, Slider, Text, View } from "native-base";
import { useState } from "react";

const TestAudio = () => {
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const handlePlaySound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/music.mp3"),
        { shouldPlay: true }
      );
      setSound(sound);

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isPlaying) {
          setIsPlaying(true);
          //   Animated.timing(progress, {
          //     toValue: status.positionMillis / status.durationMillis,
          //     duration: 1000,
          //     useNativeDriver: false,
          //   }).start();
          console.log("position", status?.positionMillis);
        } else {
          setIsPlaying(false);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleStopSound = async () => {
    try {
      await sound.stopAsync();
      setIsPlaying(false);
      setProgress(new Animated.Value(0));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <View marginTop={10} flex={1}>
        <Text>Audio test</Text>
        {isPlaying ? (
          <>
            <Slider minValue={0} maxValue={100} />
          </>
        ) : (
          <View style={{ height: 2, backgroundColor: "#ddd" }} />
        )}
        {isPlaying ? (
          <Button title="Stop" onPress={handleStopSound} />
        ) : (
          <Button title="Play" onPress={handlePlaySound} />
        )}
      </View>
    </>
  );
};

export default TestAudio;
