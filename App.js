import React from "react";
import { View, ScrollView, StyleSheet, TextInput, Text, TouchableOpacity } from "react-native";
import FromUser from "./src/formUser";
import { auth } from './src/firebaseConnection';
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function App() {

  async function handleCreateUser() {
    const user = await createUserWithEmailAndPassword(auth, "teste@teste.com", "123456")
    console.log(user)
  }

  return (
    <View>
      {/* <FromUser /> */}
      <Text style={styles.txtInput}>E-mail:</Text>
      <TextInput style={styles.input} placeholder="Digite seu e-mail"></TextInput>

      <Text style={styles.txtInput}>Senha:</Text>
      <TextInput style={styles.input} placeholder="Digite sua senha"></TextInput>

      <TouchableOpacity style={styles.button} onPress={handleCreateUser}>
        <Text style={styles.buttonTxt}>Criar Conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    margin: 80,
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