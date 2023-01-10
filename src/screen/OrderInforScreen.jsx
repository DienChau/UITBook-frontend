import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    SafeAreaView,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Image,
    Button,
    Pressable,
    ScrollView,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { RadioButton } from 'react-native-paper';
import { NumericFormat } from "react-number-format";
import CustomButton from '../components/CustomButton'

// import DateTimePicker from '@react-native-community/datetimepicker';


const OrderInforScreen = () => {
    const [checked, setChecked] = React.useState('first');
    const [state, setState] = React.useState('first');
    const [value, setValue] = React.useState('first');

    const InforPersonHandler = () => {

    }

    const orderHandler = () => {

    }

    return (
        <SafeAreaView style={styles.container}>
            {/* <Header /> */}
            <View
                style={{
                    marginTop: 30,
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    marginRight: 30,
                }}
            >
                <FontAwesome name="shopping-basket" size={24} color="#000" />
            </View>
            <ScrollView>
                <View style={{ marginHorizontal: 20 }}>
                    <View style={styles.pickInfor}>
                        <View style={{ marginBottom: 14 }}>
                            <Text>Tên người nhận <Text style={{ color: 'red' }}>*</Text></Text>
                            <TextInput style={styles.input}
                                underlineColorAndroid="transparent"
                                placeholderTextColor="#9a73ef"
                                autoCapitalize="none"
                            />
                        </View>
                        <View style={{ marginBottom: 14 }}>
                            <Text>SĐT người nhận <Text style={{ color: 'red' }}>*</Text></Text>
                            <TextInput style={styles.input}
                                underlineColorAndroid="transparent"
                                placeholderTextColor="#9a73ef"
                                keyboardType='numeric'
                                autoCapitalize="none"
                            />
                        </View>
                        <View style={{ marginBottom: 14 }}>
                            <Text>Địa chỉ <Text style={{ color: 'red' }}>*</Text></Text>
                            <TextInput style={styles.input}
                                underlineColorAndroid="transparent"
                                placeholderTextColor="#9a73ef"
                                autoCapitalize="none"
                            />
                        </View>
                        <View style={{ marginBottom: 14 }}>
                            <Text>Gmail <Text style={{ color: 'red' }}>*</Text></Text>
                            <TextInput style={styles.input}
                                underlineColorAndroid="transparent"
                                placeholderTextColor="#9a73ef"
                                autoCapitalize="none"
                            />
                        </View>
                        <View style={{ alignItems: 'center', marginBottom: 20 }}>
                            <TouchableOpacity
                                style={{
                                    alignItems: "center",
                                    backgroundColor: "#E8ABC3",
                                    padding: 10,
                                    paddingHorizontal: 40
                                }}
                                onPress={InforPersonHandler}
                            >
                                <Text style={{ color: '#fff', fontSize: 15, fontWeight: 'bold' }}>Lưu</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.payment}>
                        <Text style={{ fontSize: 16, marginBottom: 10, fontWeight: 'bold' }}>Phương Thức Thanh Toán</Text>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value="first"
                                color="#00ff00"
                                uncheckedColor="#E8ABC3"

                                status={checked === 'first' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('first')}
                            />
                            <Text onPress={() => setChecked('first')}>Thanh toán khi nhận hàng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value="second"
                                color="#00ff00"
                                uncheckedColor="#E8ABC3"
                                status={checked === 'second' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('second')}
                            />
                            <Text onPress={() => setChecked('second')}>Thanh toán khi nhận hàng</Text>
                        </TouchableOpacity>
                        {/* <View>
                            <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
                                <RadioButton.Item label="Thanh toán khi nhận hàng" value="first" />
                                <RadioButton.Item label="Thanh toán MoMo" value="second" />
                            </RadioButton.Group>
                        </View> */}

                    </View>
                    <View style={{ backgroundColor: '#fff', marginVertical: 10, padding: 10, borderRadius: 10 }}>
                        <Text style={{ fontSize: 16, marginBottom: 5, fontWeight: 'bold' }}>Đơn hàng của bạn</Text>
                        <View
                            style={{
                                borderBottomColor: '#ccc',
                                borderBottomWidth: 0.5,
                            }}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                            <View style={{ flex: 1 }}>

                                <Image source={require('../../assets/book1.png')} />
                            </View>
                            <View style={{ flex: 2, marginHorizontal: 10 }}>
                                <Text>Thiên Tài Bên Trái, Kẻ Điên Bên Phải (Tái Bản)</Text>
                                <Text>SL: 1</Text>
                            </View>
                            <View style={{}}>
                                <NumericFormat
                                    value={109980}
                                    displayType={"text"}
                                    // decimalSeparator={'.'}
                                    thousandSeparator={true}
                                    // thousandSeparator={"."}
                                    suffix={" đ"}
                                    renderText={(value) => (
                                        <Text style={{ color: "black" }}>{value}</Text>
                                    )}
                                />
                            </View>

                        </View>
                        <View
                            style={{
                                borderBottomColor: '#ccc',
                                borderBottomWidth: 0.5,
                            }}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                            <Text>Tổng tiền hàng</Text>
                            <NumericFormat
                                value={109980}
                                displayType={"text"}
                                // decimalSeparator={'.'}
                                thousandSeparator={true}
                                // thousandSeparator={"."}
                                suffix={" đ"}
                                renderText={(value) => (
                                    <Text style={{ color: "black" }}>{value}</Text>
                                )}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                            <Text>Phí vận chuyển</Text>
                            <NumericFormat
                                value={0}
                                displayType={"text"}
                                // decimalSeparator={'.'}
                                thousandSeparator={true}
                                // thousandSeparator={"."}
                                suffix={" đ"}
                                renderText={(value) => (
                                    <Text style={{ color: "black" }}>{value}</Text>
                                )}
                            />
                        </View>
                        <View
                            style={{
                                borderBottomColor: '#ccc',
                                borderBottomWidth: 0.5,
                            }}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                            <Text style={{ fontSize: 16, color: '#F02929', fontWeight: 'bold' }}>Tổng thanh toán</Text>
                            <NumericFormat
                                value={109980}
                                displayType={"text"}
                                // decimalSeparator={'.'}
                                thousandSeparator={true}
                                // thousandSeparator={"."}
                                suffix={" đ"}
                                renderText={(value) => (
                                    <Text style={{ color: "#F02929", fontWeight: 'bold' }}>{value}</Text>
                                )}
                            />
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', marginBottom: 20 }}>
                        <Pressable
                            onPress={orderHandler}
                            hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
                            android_ripple={{ color: "#f0f" }}
                            style={({ pressed }) => [
                                { backgroundColor: pressed ? "#ddd" : '#E72A2A' },
                                styles.button,
                                { alignItems: 'center', borderRadius: 10 },
                            ]}
                        >
                            <Text style={{
                                color: "#fff",
                                fontSize: 20,
                                alignItems: 'center',
                                margin: 10,
                                textAlign: "center",
                            }}>Đặt hàng</Text>
                        </Pressable>
                    </View>


                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#CBF0F8",
    },
    text: {
        fontSize: 25,
        fontWeight: "500",
    },
    input: {
        // margin: 15,
        marginTop: 6,
        height: 40,
        paddingLeft: 20,
        borderColor: '#E8ABC3',
        borderWidth: 1,
        backgroundColor: '#fff'
    },
    pickInfor: {
        marginTop: 10
    },
    payment: {
        backgroundColor: '#fff',
        padding: 10
    },
    button: {
        width: 150,
        height: 50,
        alignItems: "center",
        ...Platform.select({
            web: {
                cursor: "pointer",
            },
        }),
    },
});
export default OrderInforScreen;
