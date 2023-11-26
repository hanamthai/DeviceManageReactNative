import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/HomeScreen';
import SettingScreen from '../screens/SettingScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ManageUserScreen from '../screens/ManageUser';
import WebHistoryScreen from '../screens/WebHistoryScreen';

const Tab = createBottomTabNavigator();

// const RootStack = createNativeStackNavigator();

const RootStackScreen = ({navigation}) => (
    <Tab.Navigator>
        <Tab.Screen 
            name="Home Page" 
            component={HomeScreen} 
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home" color={color} size={size} />
                  ),
            }} 
        />
        <Tab.Screen
            name="Manage Child"
            component={ManageUserScreen}
            options={{
                tabBarLabel: 'Child',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="account-group" color={color} size={size} />
                  ),
            }} 
        />
        <Tab.Screen
            name="Manage Web History"
            component={WebHistoryScreen}
            options={{
                tabBarLabel: 'History',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="history" color={color} size={size} />
                  ),
            }} 
        />
        <Tab.Screen
            name="Manage Keyboard Stroke"
            component={SettingScreen}
            options={{
                tabBarLabel: 'Keyboard',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="keyboard" color={color} size={size} />
                  ),
            }} 
        />
        <Tab.Screen 
            name="Setting Screen" 
            component={SettingScreen} 
            options={{
                tabBarLabel: 'Setting',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="progress-wrench" color={color} size={size} />
                  ),
            }}
        />
    </Tab.Navigator>
);

export default RootStackScreen;