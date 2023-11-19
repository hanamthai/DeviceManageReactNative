import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import Navigation from "./src/components/Navigation";
import { AuthContext } from "./src/components/context";
import RootStackScreen from "./src/components/RootStack";
import { NavigationContainer } from "@react-navigation/native";

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const authContext = React.useMemo(() => ({
    signIn: () => {
      setUserToken("tokenHere");
      setIsLoading(false);
    },
    signUp: () => {
      setUserToken("tokenHere");
      setIsLoading(false);
    },
    signOut: () => {
      setUserToken(null);
      setIsLoading(false);
    },
  }), []);

  if (isLoading) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  console.log("useToken:", userToken);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {userToken != null ? <RootStackScreen /> : <Navigation />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
