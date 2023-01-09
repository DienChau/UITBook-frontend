import React from "react";
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import Header from '../components/Header'

const Account = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <View style={{ flex: 3 }}>
                <View style={{ backgroundColor: '#fff', borderRadius: 10, margin: 20, height: 120 }}>
                    {/* <Text>This is Acoount</Text> */}
                    <TouchableOpacity>
                        <Text>Edit</Text>
                    </TouchableOpacity>

                </View>
                <View style={{ flex: 1 }}>
                    <Text>This is Acoount</Text>

                </View>
                <View style={{ flex: 2 }}>
                    <Text>This is Acoount</Text>

                </View>
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#CBF0F8'
    },
    text: {
        fontSize: 25,
        fontWeight: '500',
    }
});
export default Account;


