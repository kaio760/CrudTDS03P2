import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { db } from "./src/firebaseConnection";
import {
  doc,
  getDoc,
  onSnapshot,
  collection,
  setDoc,
  addDoc,
} from "firebase/firestore";

export default function App() {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [cargo, setCargo] = useState("");

  const[mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    async function getDados() {
      // const docref = doc(db, "users", "1")
      // await getDoc(docref)
      // .then((snapshot)=>{
      //   console.log(snapshot.data())
      //   setNome(snapshot.data()?.Nome)
      // })

      onSnapshot(doc(db, "users", "1"), (doc) => {
        setNome(doc.data()?.Nome);
        setIdade(doc.data()?.Idade);
        setCargo(doc.data()?.Cargo);
      });
    }
    getDados();
  }, []);

  async function handlerRegister() {
    // await setDoc(doc(db, 'users', '3'),{
    //   Nome: 'Bia',
    //   Idade: '20',
    //   Cargo: 'Aluna'
    // })

    // .then(()=>{
    //   console.log('Cadatrado com sucesso!')
    // })
    // .catch((err)=>{
    //   console.log('Erro!')
    // });

    console.log(nome);
    console.log(cargo);
    console.log(idade);

    if (nome === "" || idade === "" || cargo === "") {
      alert("Por favor, insira todos os dados.");
      return;
    }

    try {
      await addDoc(collection(db, "users"), {
        Nome: nome,
        Idade: idade,
        Cargo: cargo,
      });

      alert("Cadastro realizado com sucesso!");

      setNome("");
      setIdade("");
      setCargo("");
    } catch (error) {
      console.log(error);
      Alert.alert("Houve um erro ao cadastrar.");
    }
  }

  return (
    
    <View style={styles.container}>
      {/* <Text style={styles.text01}>Nome: {nome}</Text>
      <Text style={styles.text01}>Cargo: {cargo}</Text>
      <Text style={styles.text01}>Idade: {idade}</Text> */}

      
      <Text style={styles.Titulo}>Formulario</Text>

      <Text style={styles.label}>Nome: </Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome..."
        value={nome}
        onChangeText={(text) => setNome(text)}
      />

      <Text style={styles.label}>Idade: </Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua idade..."
        value={idade}
        onChangeText={(text) => setIdade(text)}
      />

      <Text style={styles.label}>Cargo: </Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu cargo..."
        value={cargo}
        onChangeText={(text) => setCargo(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handlerRegister}>
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdf6e3",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  Titulo: {
    fontWeight: "bold",
    fontSize: 20,
    color: "darkred",
  },

  button: {
    backgroundColor: "#ff8c00",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderRadius: 8,
    width: 120,
    height: 45,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },

  buttonText: {
    padding: 10,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  label: {
    color: "#333",
    fontSize: 16,
    marginBottom: 5,
    marginTop: 10,
    alignSelf: "flex-start",
    fontWeight: "600",
  },

  input: {
    width: "100%",
    height: 45,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});
