import axios from 'axios';
import React, { createContext } from 'react';
import { BASE_URL } from '../config';
import { Alert } from 'react-native';

export const AuthContext = createContext();

const register = (name, email, password) => {
  axios
    .post(`${BASE_URL}/v1/parents/register`, {
      "fullname":name,"email":email,"password":password
    })
    .then((res) => {
      Alert.alert('Success', 'Sign Up Success! Please log in again to continue', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    })
    .catch((e) => {
      console.log(`register error ${e?.response?.data?.message}`);
      Alert.alert('Error', `${e?.response?.data?.message}`, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    });
};

export const AuthProvider = ({ children }) => {
  const register = (name, email, password) => {
    axios
      .post(`${BASE_URL}/v1/parents/register`, {
        "fullname":name,"email":email,"password":password
      })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(`register error ${e}`);
      });
  };

  return (
    <AuthContext.Provider value={ register }>
      {children}
    </AuthContext.Provider>
  );
};

export {register};
