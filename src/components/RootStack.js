import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/HomeScreen';
import SettingScreen from '../screens/SettingScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

// const RootStack = createNativeStackNavigator();

const RootStackScreen = ({navigation}) => (
    <Tab.Navigator>
        <Tab.Screen 
            name="HomeScreen" 
            component={HomeScreen} 
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home" color={color} size={size} />
                  ),
            }} 
        />
        <Tab.Screen 
            name="SettingScreen" 
            component={SettingScreen} 
            options={{
                tabBarLabel: 'Setting',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="account" color={color} size={size} />
                  ),
            }}
        />
    </Tab.Navigator>
);

export default RootStackScreen;