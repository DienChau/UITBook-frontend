import React, { useState, useEffect } from "react";
import axios from 'axios';
import Book from "./Book";
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, Dimensions, ScrollView, LogBox, TouchableOpacity } from 'react-native';
const baseUrl = "http://192.168.0.108:5000";

function Listbook(props) {
    // const { addFavoriteHandler } = props
    // const [listBook, setListBook] = useState([]);
    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             const request = await axios.get(`${baseUrl}/api/v2/books`);
    //             console.log('trong ham');
    //             setListBook(request.data.books);
    //             // return request.data.books;
    //         } catch (error) {
    //             console.log("error");
    //         }
    //     }
    //     fetchData();
    // }, []);
    // function BookViewed(index) {
    //     // console.log(' SÁCH ĐÃ XEM ' + Book[index].name);
    //     const request = axios.get(
    //         'http://192.168.0.108:5000/api/v2/book/' + listBook[index]._id
    //     );
    //     console.log(request.data);
    //     // navigation.navigate('BookDetail', {
    //     //     tensach: Book[index].tensach,
    //     //     username: username,
    //     // });
    // }
    // console.log('http://192.168.0.108:5000/api/v2/book/' + listBook[1].name);
    // // BookViewed(1)
    // console.log("Heelo");
    React.useEffect(() => {
        async function fetchData() {
            try {
                const request = await axios.get(`${baseUrl}/api/v2/books/popular`);
                console.log(request.data.books);
            } catch (error) {
                console.log("error");
            }
        }
        fetchData();
    }, []);


    return (
        <View style={styles.container}>
            <ScrollView horizontal={true} contentContainerStyle={styles.containerSlider}>
                <Book />
                <Book />
                <Book />
            </ScrollView>
        </View>)
}
const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginBottom: 10
    },
    containerSlider: {
        // flex: 1,
        // margin: 12,
        flexDirection: 'row',
        // flexWrap: 'wrap',
        // height: (windowWidth - 18) / 2,
        height: 250,
        justifyContent: 'space-between',
    },
})
export default Listbook