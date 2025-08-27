import { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    FlatList,
    ScrollView
} from "react-native";

import { db } from "./firebaseConnection";
import {
    doc,
    onSnapshot,
    collection,
    addDoc,
    updateDoc
} from "firebase/firestore";



import UsersList from "./users";


export default function FromUser() {
    const [nome, setNome] = useState("");
    const [idade, setIdade] = useState("");
    const [cargo, setCargo] = useState("");

    const [isEditing, setEditing] = useState("");

    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function getDados() {
            // const docref = doc(db, "users", "1")
            // await getDoc(docref)
            // .then((snapshot)=>{
            //   console.log(snapshot.data())
            //   setNome(snapshot.data()?.Nome)
            // })

            /*onSnapshot(doc(db, "users", "1"), (doc) => {
              setNome(doc.data()?.Nome);
              setIdade(doc.data()?.Idade);
              setCargo(doc.data()?.Cargo);
            });*/

            /*const usersRef = collection(db, "users");
      
            getDocs(usersRef).then((snapshot) => {
              let lista = [];
              snapshot.forEach((doc) => {
                lista.push({
                  id: doc.id,
                  nome: doc.data().Nome,
                  idade: doc.data().Idade,
                  cargo: doc.data().Cargo,
                });
              });*/

            const usersRef = collection(db, "users");
            onSnapshot(usersRef, (snapshot) => {
                let lista = [];
                snapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        nome: doc.data().Nome,
                        idade: doc.data().Idade,
                        cargo: doc.data().Cargo,
                    });
                });
                setUsers(lista);
                //console.log(lista);
                // setUsers(lista);
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

    function handleToggle() {
        setMostrarFormulario(!mostrarFormulario);
    }

    function editUser(data) {
        // console.log(data);
        setNome(data.nome)
        setIdade(data.idade)
        setCargo(data.cargo)
        setEditing(data.id)
    }

    async function handlerEditUser() {
        const docRef = doc(db, "users", isEditing)
        await updateDoc(docRef, {
            Nome: nome,
            Idade: idade,
            Cargo: cargo,
        })
        setIsEditing("")
        setNome("")
        setIdade("")
        setCargo("")
    }

    return (
        <View style={styles.container}>

            {/* <Text style={styles.text01}>Nome: {nome}</Text>
      <Text style={styles.text01}>Cargo: {cargo}</Text>
      <Text style={styles.text01}>Idade: {idade}</Text> */}

            <Text style={styles.Titulo}>Formulario</Text>

            <TouchableOpacity style={styles.button} onPress={handleToggle}>
                <Text
                    style={{ textAlign: "center", color: "#fff", fontWeight: "bold" }}
                >
                    {mostrarFormulario ? "Esconder Formulário" : "Mostrar Formulário"}
                </Text>
            </TouchableOpacity>

            {mostrarFormulario && (
                <>
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

                    {isEditing != "" ? (
                        <TouchableOpacity style={styles.button} onPress={handlerEditUser}>
                            <Text style={styles.buttonText}>Editar</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.button} onPress={handlerRegister}>
                            <Text style={styles.buttonText}>Adicionar</Text>
                        </TouchableOpacity>
                    )}
                </>
            )
            }

            <FlatList
                style={styles.lista}
                data={users}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => <UsersList data={item} handlerEdit={(item) => editUser(item)}></UsersList>}
            />

        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        justifyContent: "center",
        padding: 15,
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

    lista: {
        width: "100%",
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 8,
        paddingBottom: 20,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
});