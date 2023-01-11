import { View } from "native-base";
import { Image } from "react-native";
import React from "react";
import loading from "../../assets/loading.gif";

const Loading = () => {
  return (
    <View flex={1} bg="#fff" justifyContent={"center"} alignItems={"center"}>
      <Image
        source={loading}
        style={{ width: 200, height: 200, resizeMode: "stretch" }}
      />
    </View>
  );
};

export default Loading;
