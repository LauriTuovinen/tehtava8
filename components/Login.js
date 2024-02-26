import { useState } from "react"
import { Button, Text, TextInput, View } from "react-native"
import { getAuth, signInWithEmailAndPassword } from '../firebase/Config'
import { StyleSheet } from "react-native"
import React from "react"
import Constants from 'expo-constants'


//login username: test2@foo.com
//login pass: test123

export default function Login({setLogin}){
    const [user, setUser] = useState('')
    const [password, setPassWord] = useState('')

    const login = () => {
        const auth = getAuth()
      
        signInWithEmailAndPassword(auth, user, password)
        .then((userCredential) => {
          console.log(userCredential.user)
          setLogin(true)
        }).catch((error) => {
          if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found'){
            console.log('invalid credentials')
          } else if ((error.code === 'auth/too-many-requests')) {
            console.log('Too many attempts to login')
          } else {
            console.log(error.code + ' ' + error.message)
          }
        })
      }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}> Login </Text>
            <Text style={styles.field}> Email </Text>
            <TextInput style={styles.field}
                value={user} 
                onChangeText={text => setUser(text)} 
                placeholder="text here" /> 
            <Text style={styles.field}> Password </Text>
            <TextInput style={styles.field}
                value={password} onChangeText={text => setPassWord(text)} placeholder="texthere" />
            <Button title="login" onPress={login}> </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      paddingTop: Constants.StatusBarHeight,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 50,
      paddingBottom: 50,
      marginTop: 35,
    },
    heading: {
      padding: 10,
      marginTop: 10,
      marginBottom: 10,
      backgroundColor: '#f5f5f5',
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      marginLeft: 30,
      marginRight: 30,
    },
    field: {
      fontSize: 12,
      margin: 8,
    }
  });