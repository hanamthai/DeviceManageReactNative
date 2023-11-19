import React from "react";
import { Text, View, Button } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const Stack = createNativeStackNavigator();

const Navigation = ({navigation}) => (
  <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
            headerStyle: {
              backgroundColor: '#0099ff',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          // options={{headerShow: false}}
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          // options={{headerShow: false}}
        />
      </Stack.Navigator>
);

export default Navigation;
