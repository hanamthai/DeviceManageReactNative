import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import Navigation from "./src/components/Navigation";
import { AuthContext } from "./src/components/context";
import RootStackScreen from "./src/components/RootStack";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null);

  const initLoginState = {
    isLoading: true,
    userName: '',
    userToken: '',
    roleID: '',
  };

  const loginReducer = (prevState, action) => {
    switch(action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          roleID: action.roleID, 
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: '',
          userToken: '',
          roleID: '',
          isLoading: false,
        };
      // case 'REGISTER':
      //   return {
      //     ...prevState,
      //     userName: action.id,
      //     userToken: action.token,
      //     isLoading: false,
      //   };
    }
  }

  const [loginState, dispatch] = React.useReducer(loginReducer, initLoginState)

  useEffect(() => {
    setTimeout(async() => {
      let userToken = '';
      try {
        userToken = await AsyncStorage.getItem('userToken');
      }
      catch(err) {
        alert(err)
      }
      dispatch({type: "RETRIEVE_TOKEN", token: userToken});
    }, 3000);
  }, []);

  const authContext = React.useMemo(() => ({
    signIn: async(token, userName, roleID) => {
      console.log(token, userName, roleID)
      let userToken = '';
      try {
        userToken = token;
        await AsyncStorage.setItem('userToken', userToken);
      }
      catch(err) {
        alert(err)
      }
      dispatch({type: "LOGIN", id: userName, token: userToken, roleID: roleID});
    },
    // signUp: (userName, email, password) => {
    //   setUserToken("tokenHere");
    //   setIsLoading(false);
    // },
    signOut: async() => {
      try {
        await AsyncStorage.removeItem('userToken');
      }
      catch(err) {
        alert(err)
      }
      dispatch({type: "LOGOUT"})
    },
  }), []);

  if (loginState.isLoading) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken != '' ? <RootStackScreen /> : <Navigation />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
