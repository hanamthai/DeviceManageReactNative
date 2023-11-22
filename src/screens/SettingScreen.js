import React from "react";
import {Text, Button, View} from "react-native"
import { AuthContext } from "../components/context";

const SettingScreen = () => {
    const {signOut} = React.useContext(AuthContext)
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>
                SettingScreen
            </Text>
        <Button title="Logout" onPress={() => {signOut()}}/>
        </View>
    );
};

export default SettingScreen;