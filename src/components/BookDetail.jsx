import React from "react";
import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
    Image,
    Dimensions,
    ScrollView,
    LogBox,
    TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
// import NumberFormat from 'react-number-format';
// import NumberFormat from 'react-number-format';
import { NumericFormat } from "react-number-format";
import { AntDesign } from "@expo/vector-icons";
const windowWidth = Dimensions.get("window").width;

const BookDetail = (props) => {
    return (
        <View style={{ margin: 100 }}><Text>BookDetail</Text></View>
    );
};

export default BookDetail;
