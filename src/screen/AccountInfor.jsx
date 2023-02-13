import React, { useRef } from "react";
import { Text, View, ScrollView, SafeAreaView } from "react-native";
import AccountInforDetail from '../components/AccountInforDetail'
import TabBottom from "../components/TabBottom";
const AccoutnInfor = () => {
  const button = useRef();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#CBF0F8" }}>
      <AccountInforDetail />
    </SafeAreaView>
  );
};

export default AccoutnInfor;
