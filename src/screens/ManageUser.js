import React, { useEffect, useState } from "react";
import { Text, View, ActivityIndicator, FlatList, StyleSheet, RefreshControl } from "react-native";
import { UserInfoService } from "../services/UserManageService";
import { AuthContext } from "../components/context";

const ManageUserScreen = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { signOut } = React.useContext(AuthContext)

  const getUserInfo = async () => {
    try {
      setIsLoading(true);
      const resp = await UserInfoService();
      setIsLoading(false);
      if (resp.data) {
        setUserInfo(resp.data);
        console.log("resp:", resp.data)
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        if (error.response.data) {
          if (error?.response?.data?.msg === 'Token has expired') {
            alert("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!!")
            signOut()
          } else if (error?.response?.status === 401) {
            alert(error?.response?.data?.message)
          }
        } else {
          alert(error)
        }
      }
    }
  };

  useEffect(() => {
    // Call the function to retrieve data when the component mounts
    getUserInfo();
  }, []); // Empty dependency array ensures that this effect runs once when the component mounts

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await getUserInfo();
    setIsRefreshing(false);
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const renderItem = ({ item }) => {
    return (
      <View style={styles.row}>
        <Text style={styles.email} numberOfLines={1} ellipsizeMode="tail">{item.email}</Text>
        <Text style={styles.fullName} numberOfLines={1} ellipsizeMode="tail">{item.fullName}</Text>
        <Text style={styles.status} numberOfLines={1} ellipsizeMode="tail">{item.status}</Text>
        {/* Add more Text components for other fields */}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Table Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Email</Text>
        <Text style={styles.headerText}>FullName</Text>
        <Text style={styles.headerText}>Status</Text>
        {/* Add more Text components for other fields */}
      </View>

      {/* Table Body */}
      <FlatList
        data={userInfo.data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} // replace with a unique key from your API response
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 8,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Center vertically
    paddingVertical: 10, // Add some padding to improve spacing
    paddingHorizontal: 16, // Add horizontal padding
    backgroundColor: '#fff', // Set background color
    borderRadius: 8, // Add border radius for rounded corners
    elevation: 2, // Add elevation for a subtle shadow
    marginBottom: 8,
  },
  email: {
    flex: 2 / 5,
    maxWidth: '40%', // You can adjust the maxWidth as needed
    marginRight: 10,
    overflow: 'hidden',
  },
  fullName: {
    flex: 2 / 5,
    maxWidth: '40%', // You can adjust the maxWidth as needed
    marginRight: 10,
    overflow: 'hidden',
  },
  status: {
    flex: 1 / 5,
    maxWidth: '20%', // You can adjust the maxWidth as needed
    overflow: 'hidden',
  },
});

export default ManageUserScreen;
