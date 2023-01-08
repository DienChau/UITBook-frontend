import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
// import { Icon } from '@iconify/react';

import Home from '../screen/Home';
import Category from '../screen/Category'
import Favorites from '../screen/Favorites'
import Account from '../screen/Account'

import { useNavigation, useRoute } from '@react-navigation/native';

const Tab = createMaterialBottomTabNavigator();

function TabBottom() {
    const route = useRoute();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, size, color }) => {
                    let iconName;
                    switch (route.name) {
                        case "Home":
                            iconName = focused ? 'ios-home' : 'ios-home-outline'
                            size = focused ? 25 : 24
                            return (
                                <Ionicons
                                    name={iconName}
                                    size={size}
                                    color={focused ? '#04aa6d' : 'black'}
                                />
                            )
                            break;
                        case "Category":
                            iconName = focused ? 'ios-grid' : 'ios-grid-outline'
                            size = focused ? 25 : 24
                            return (
                                <Ionicons
                                    name={iconName}
                                    size={size}
                                    color={focused ? '#04aa6d' : 'black'}
                                />
                            )
                            break;
                        case "Favorites":
                            iconName = focused ? 'favorite' : 'favorite-outline'
                            size = focused ? 27 : 25
                            return (
                                <MaterialIcons
                                    name={iconName}
                                    size={size}
                                    color={focused ? '#04aa6d' : 'black'}
                                />
                            )
                            break;

                        case "Account":
                            iconName = focused ? 'ios-person' : 'ios-person-outline'
                            size = focused ? 25 : 24
                            return (
                                <Ionicons
                                    name={iconName}
                                    size={size}
                                    color={focused ? '#04aa6d' : 'black'}
                                />
                            )
                            break;

                    }
                },
                // labeled={ false},
                tabBarStyle:
                {
                    backgroundColor: 'black',
                    paddingTop: 5,
                    // labeled: false

                },
                headerShown: false,
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'black',
            })
            }
            activeColor="#fff"
            inactiveColor="#fff"
            barStyle={{ backgroundColor: '#E8ABC3', padding: 0 }}
            labeled={false}

        >
            <Tab.Screen
                name="Home"
                component={Home}
            />
            <Tab.Screen
                name="Category"
                component={Category}
            />
            <Tab.Screen
                name="Favorites"
                component={Favorites}
            />
            <Tab.Screen
                name="Account"
                component={Account}
            />
        </Tab.Navigator>

    )
}
const styles = StyleSheet.create({
    acitve: {
        padding: 20,
    }
})
export default TabBottom