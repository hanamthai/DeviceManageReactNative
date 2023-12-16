import React, { useEffect } from "react";
import { Text, Button, View, StyleSheet, FlatList, Modal, TouchableOpacity, ActivityIndicator } from "react-native"
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

import { KeyboardStrokeService, UserInfoService } from "../services/UserManageService";

const data = [
    { label: '3 days', value: 3 },
    { label: '7 days', value: 7 },
    { label: '14 days', value: 14 },
    { label: '21 days', value: 21 },
    { label: '30 days', value: 30 },
];

const KeyboardStrokeScreen = () => {
    const [userAndDevices, setUserAndDevices] = React.useState([]);
    const [userData, setUserData] = React.useState([]);
    const [deviceData, setDeviceData] = React.useState([]);
    const [userInfoChoose, setUserInfoChoose] = React.useState(null);
    const [selectedUser, setSelectedUser] = React.useState(null);
    const [selectedDevice, setSelectedDevice] = React.useState(null);
    const [selectedDays, setSelectedDays] = React.useState(null);
    const [keyboardStrokeInfo, setKeyboardStrokeInfo] = React.useState([]);

    const [isLoading, setIsLoading] = React.useState(false);
    const [isModalVisible, setModalVisible] = React.useState(false);
    const [selectedRowData, setSelectedRowData] = React.useState(null);

    // const [value, setValue] = React.useState(null);
    const [isFocus, setIsFocus] = React.useState(false);

    const getUserInfo = async () => {
        console.log("CallAPI")
        try {
            setIsLoading(true);
            const resp = await UserInfoService();
            setIsLoading(false);
            if (resp.data) {
                setUserAndDevices(resp.data.data);
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

    const handleKeyboardStroke = async (childID, deviceID, days) => {
        if (childID == null || deviceID == null || days == null) {
            alert("Please select all data!!")
        }
        try {
            setIsLoading(true);
            const resp = await KeyboardStrokeService(childID, deviceID, days);
            setIsLoading(false);
            if (resp.data) {
                setKeyboardStrokeInfo(resp.data);
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

    useEffect(() => {
        // Set user data for the first dropdown when userAndDevices changes
        setUserData(userAndDevices.map(user => ({ label: user.fullName, value: user.id })));
    }, [userAndDevices]);

    useEffect(() => {
        // Set device data when userInfoChoose changes
        if (userInfoChoose) {
            const selectedUserDevices = userInfoChoose.devices.map(device => ({ label: device.deviceName, value: device.id }));
            setDeviceData(selectedUserDevices);
        }
    }, [userInfoChoose]);

    console.log("selectedUser:", selectedUser, ", selectedDevice:", selectedDevice, ", selectedDays:", selectedDays)
    console.log("webHistories:", keyboardStrokeInfo)

    const renderLabel = () => {
        if (isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                </Text>
            );
        }
        return null;
    };

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => handleRowPress(item)}>
                <View style={styles.row}>
                    <Text style={styles.key_stroke} numberOfLines={1} ellipsizeMode="tail">{item.key_stroke}</Text>
                    <Text style={styles.accessTime} numberOfLines={1} ellipsizeMode="tail">{item.created_at}</Text>
                    {/* Add more Text components for other fields */}
                </View>
            </TouchableOpacity>
        );
    };

    const handleRowPress = (rowData) => {
        setSelectedRowData(rowData);
        setModalVisible(true);
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
            {renderLabel()}
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={userData}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select your child' : '...'}
                searchPlaceholder="Search..."
                // value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    // setValue(item.value);
                    setSelectedUser(item.value);
                    setUserInfoChoose(userAndDevices.find(user => user.id === item.value));
                    setSelectedDevice(null);
                    setIsFocus(false);
                }}
                renderLeftIcon={() => (
                    <AntDesign
                        style={styles.icon}
                        color={isFocus ? 'blue' : 'black'}
                        name="user"
                        size={20}
                    />
                )}
            />

            <View style={{ height: 10 }} />

            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={deviceData}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select the device' : '...'}
                searchPlaceholder="Search..."
                // value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    // setValue(item.value);
                    setSelectedDevice(item.value);
                    setIsFocus(false);
                }}
                renderLeftIcon={() => (
                    <AntDesign
                        style={styles.icon}
                        color={isFocus ? 'blue' : 'black'}
                        name="laptop"
                        size={20}
                    />
                )}
            />

            <View style={{ height: 10 }} />

            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select days to find' : '...'}
                searchPlaceholder="Search..."
                // value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    // setValue(item.value);
                    setSelectedDays(item.value);
                    setIsFocus(false);
                }}
                renderLeftIcon={() => (
                    <AntDesign
                        style={styles.icon}
                        color={isFocus ? 'blue' : 'black'}
                        name="calendar"
                        size={20}
                    />
                )}
            />

            <View style={{ height: 10 }} />

            <Button
                title="Search"
                onPress={() => {
                    handleKeyboardStroke(selectedUser, selectedDevice, selectedDays)
                }}
            />


            {/* <View style={styles.containerTable}> */}
            {/* Table Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Keyboard Stroke</Text>
                <Text style={styles.headerText}>Access Time</Text>
                {/* Add more Text components for other fields */}
            </View>

            {/* Table Body */}
            <FlatList
                data={keyboardStrokeInfo.data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()} // replace with a unique key from your API response
            />

            <Modal
                animationType="slide"
                transparent={false}
                visible={isModalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Keyboard Stroke Detail</Text>

                        <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>Keyboard Stroke:</Text>
                            <Text style={styles.detailText}>{selectedRowData?.key_stroke}</Text>
                        </View>

                        <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>Access Time:</Text>
                            <Text style={styles.detailText}>{selectedRowData?.created_at}</Text>
                        </View>

                        {/* Add more details as needed */}

                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <AntDesign name="close" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/* </View> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    containerTable: {
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
    key_stroke: {
        flex: 1 / 2,
        maxWidth: '60%', // You can adjust the maxWidth as needed
        marginRight: 10,
        overflow: 'hidden',
    },
    accessTime: {
        flex: 1 / 2,
        maxWidth: '50%', // You can adjust the maxWidth as needed
        marginRight: 10,
        overflow: 'hidden',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    detailLabel: {
        fontWeight: 'bold',
        marginRight: 10,
    },
    detailText: {
        flex: 1,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'blue',
    },
});

export default KeyboardStrokeScreen;