import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';

const RootStack = createNativeStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="HomeScreen" component={HomeScreen} />
    </RootStack.Navigator>
);

export default RootStackScreen;