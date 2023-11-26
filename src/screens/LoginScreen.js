import React, { useState } from "react";
import {
    Text,
    TextInput,
    View,
    Button,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import { AuthContext } from "../components/context";
import { loginService } from "../services/LoginService";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { signIn } = React.useContext(AuthContext);

    handleLogin = async (email, password) => {
        if (email == "" || password == "") {
            alert("Please fill email and password!!");
        } else {
            try {
                setIsLoading(true);
                let data = await loginService(email, password);
                setIsLoading(false);
                if (data?.data) {
                    signIn(
                        data.data.access_token,
                        data.data.full_name,
                        data.data.role_id
                    );
                }
            } catch (error) {
                setIsLoading(false);
                alert("Error: " + error?.response?.data?.message);
            }
        }
    };

    if (isLoading) {
        return (
            <View
                style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
            >
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />

                <Button
                    title="Login"
                    onPress={() => {
                        handleLogin(email, password);
                    }}
                />
                <View style={{ flexDirection: "row", marginTop: 20, justifyContent: "space-between"}}>
                    <Text>Don't have a account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                        <Text style={styles.link}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    wrapper: {
        width: "80%",
    },
    input: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#bbb",
        borderRadius: 5,
        paddingHorizontal: 14,
    },
    link: {
        color: "blue",
    },
});

export default LoginScreen;
