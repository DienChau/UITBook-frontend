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
// import Gallery from 'react-native-image-gallery';
const windowWidth = Dimensions.get("window").width;

const BookDetail = (props) => {
    return (
        <View style={{ margin: 100 }}>
            <Text>BookDetail</Text>
            {/* <Gallery
                style={{ flex: 1, backgroundColor: 'black' }}
                images={[
                    { source: require('../../assets/icon.png'), dimensions: { width: 150, height: 150 } },
                    { source: { uri: 'http://i.imgur.com/XP2BE7q.jpg' } },
                    { source: { uri: 'http://i.imgur.com/5nltiUd.jpg' } },
                    { source: { uri: 'http://i.imgur.com/6vOahbP.jpg' } },
                    { source: { uri: 'http://i.imgur.com/kj5VXtG.jpg' } }
                ]}
            /> */}
        </View>
    );
};

export default BookDetail;
