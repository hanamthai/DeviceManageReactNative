import React, {useEffect} from "react";
import {Text, Button, View} from "react-native"
import { AuthContext } from "../components/context";
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
    const [userName, setUserName] = React.useState('');

    useEffect(() => {
        const retrieveData = async () => {
          try {
            // Retrieve the value of 'userName' from AsyncStorage
            const name = await AsyncStorage.getItem("userName");
            // Update the state with the retrieved value
            setUserName(name || "");
          } catch (error) {
            console.error("Error retrieving data from AsyncStorage:", error);
          }
        };
    
        // Call the function to retrieve data when the component mounts
        retrieveData();
      }, []); // Empty dependency array ensures that this effect runs once when the component mounts
    
    
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>
                Welcome {userName} to app manage child !
            </Text>
        </View>
    );
};

export default HomeScreen;