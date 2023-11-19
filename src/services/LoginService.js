import axios from "axios";

const registerService = (name, email, password) => {
  axios
    .post(`${BASE_URL}/v1/parents/register`, {
      fullname: name,
      email: email,
      password: password,
    })
    .then((res) => {
      Alert.alert(
        "Success",
        "Sign Up Success! Please log in again to continue",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
    })
    .catch((e) => {
      console.log(`register error ${e?.response?.data?.message}`);
      Alert.alert("Error", `${e?.response?.data?.message}`, [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    });
};

export {registerService}
