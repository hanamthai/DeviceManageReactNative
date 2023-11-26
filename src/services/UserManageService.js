import axios from "axios";
import {BASE_URL} from "../config";
import AsyncStorage from '@react-native-async-storage/async-storage';

const getAccessToken = async() => {
    let token;
    try {
        token = await AsyncStorage.getItem("userToken");
    } catch(error) {
        console.error("Error retrieving data from AsyncStorage:", error);
    }
    return token
}

const UserInfoService = async () => {
    try {
        const access_token = await getAccessToken();
        console.log("accessToken:", access_token);

        return axios.get(`${BASE_URL}/v1/parents/child-info`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        });
    } catch (error) {
        // Handle error here
        console.error("Error in UserInfoService:", error);
        throw error; // Throwing the error to handle it where UserInfoService is called
    }
};

const WebHistoryService = async (childID, deviceID, days) => {
    try {
        const access_token = await getAccessToken();

        return axios.get(`${BASE_URL}/v1/parents/web-history/${childID}/${deviceID}/${days}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        });
    } catch (error) {
        // Handle error here
        console.error("Error in UserInfoService:", error);
        throw error; // Throwing the error to handle it where UserInfoService is called
    }
};

export {UserInfoService, WebHistoryService}
