import React, {useContext, useState} from "react";
import {Text, TextInput, View, Button, TouchableOpacity, StyleSheet} from "react-native"
import { AuthContext } from "../context/AuthContext";
import { register } from "../context/AuthContext";

const RegisterScreen = ({navigation}) => {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
  
    // const {register} = useState(AuthContext);
  
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <TextInput
            style={styles.input}
            value={name}
            placeholder="Enter full name"
            onChangeText={text => setName(text)}
          />
  
          <TextInput
            style={styles.input}
            value={email}
            placeholder="Enter email"
            onChangeText={text => setEmail(text)}
          />
  
          <TextInput
            style={styles.input}
            value={password}
            placeholder="Enter password"
            onChangeText={text => setPassword(text)}
            secureTextEntry
          />
  
          <Button
            title="Register"
            onPress={() => {
              register(name, email, password);
            }}
          />
  
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <Text>Already have an accoutn? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.link}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    wrapper: {
      width: '80%',
    },
    input: {
      marginBottom: 12,
      borderWidth: 1,
      borderColor: '#bbb',
      borderRadius: 5,
      paddingHorizontal: 14,
    },
    link: {
      color: 'blue',
    },
  });

export default RegisterScreen;