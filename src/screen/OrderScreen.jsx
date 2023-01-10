import { View } from "native-base";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Order from "../components/Order/Order";

const OrderScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Order />
    </View>
  );
};

export default OrderScreen;
