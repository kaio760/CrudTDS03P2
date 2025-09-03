import React from "react";
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from "react-native";
import FromUser from "./src/formUser";
import { auth } from './src/firebaseConnection';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';

export default function App() {

  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")

  const [authUser, setAuthUser] = useState(null)

  async function handleCreateUser() {
    const user = await createUserWithEmailAndPassword(auth, email, password)
    console.log(user)
    setEmail("")
    setPassword("")
    alert("Usuario criado")
  }

  function handleLogin() {
    signInWithEmailAndPassword(auth, email, password)
    .then((user)=>{
      console.log(user)
      setAuthUser({
        email: user.user.email,
        uid:user.user.uid
      })
    })
    .catch((err)=>{
      console.log(err.code)
      if(err.code === 'auth/invalid-email'){
        alert("O e-mail é obrigatório")
      }
      else if(err.code === 'auth/missing-password'){
        alert("A senha é obrigatória")
      }
      else if(err.code === 'auth/invalid-credential'){
        alert("E-mail ou senha incorretos")
      }
    })
  }

  return (
    <View style={styles.container}>
      {/* <FromUser /> */}

    <Text>Usuario Logado: {authUser && authUser.email}</Text>

      <Text style={styles.txtInput}>E-mail:</Text>
      <TextInput style={styles.input} placeholder="Digite seu e-mail" value={email} onChangeText={(text)=>setEmail(text)} />

      <Text style={styles.txtInput}>Senha:</Text>
      <TextInput style={styles.input} placeholder="Digite sua senha" value={password}
        onChangeText={(text)=>setPassword(text)} secureTextEntry={true}></TextInput>

      <TouchableOpacity style={styles.button} onPress={handleCreateUser}>
        <Text style={styles.buttonTxt}>Criar Conta</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonTxt}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:30,
  },

  input: {
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1,
    height: 40,
    borderColor: 'gray',
    borderRadius: 5,
  },

  txtInput: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
    fontSize: 16,

  },

  button: {
    padding: 10,
    margin: 10,
    marginRight: 70,
    marginLeft: 70,
    marginTop: 20,
    backgroundColor: '#e65c00',
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',

  },

  buttonTxt: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});