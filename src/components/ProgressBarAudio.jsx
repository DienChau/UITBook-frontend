import React from "react";
import { Animated, View } from "react-native";
import { AnimatedFAB, ProgressBar } from "react-native-paper";

const ProgressBarAudio = ({ progress }) => {
  const width = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });
  console.log("width", width);
  return (
    <View style={{ height: 2, backgroundColor: "#ddd" }}>
      {/* <ProgressBar animatedValue={width} /> */}
      {/* <AnimatedFAB.View
        style={{
          height: "100%",
          backgroundColor: "#f00",
          width,
        }}
      /> */}
    </View>
  );
};

export default ProgressBarAudio;
