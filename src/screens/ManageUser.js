import React, { useEffect, useState } from "react";
import { Text, View, ActivityIndicator, FlatList, SafeAreaView, StyleSheet } from "react-native";
import { UserInfoService } from "../services/UserManageService";

const ManageUserScreen = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getUserInfo = async () => {
    try {
      setIsLoading(true);
      const resp = await UserInfoService();
      setIsLoading(false);
      if (resp.data) {
        setUserInfo(JSON.stringify(resp.data));
        console.log("resp:",resp.data)
      }
    } catch (error) {
      setIsLoading(false);
      alert(error)
    //   alert(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    // Call the function to retrieve data when the component mounts
    getUserInfo();
  }, []); // Empty dependency array ensures that this effect runs once when the component mounts

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text>{item.email}</Text>
      <Text>{item.fullName}</Text>
      {/* Add more Text components for other fields */}
    </View>
  );

  return (
    <View style={styles.container}>
        <Text>{userInfo}</Text>
      {/* Table Header */}
      {/* <View style={styles.header}>
        <Text>Email</Text>
        <Text>FullName</Text>
        <Text>Devices</Text>
        <Text>Status</Text>
        <Text>Action</Text> */}
        {/* Add more Text components for other fields */}
      {/* </View> */}

      {/* Table Body */}
      {/* <FlatList
        data={userInfo}
        keyExtractor={(item) => item.id.toString()} // replace with a unique key from your API response
        renderItem={renderItem}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      paddingBottom: 8,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
  });

export default ManageUserScreen;
