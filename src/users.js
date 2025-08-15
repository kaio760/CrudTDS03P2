import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import {db} from './firebaseConnection';
import { deleteDoc, doc } from "firebase/firestore";

export function UsersList({data, handlerEdit}){

    async function handlerDeleteItem(){
        //console.log(data)
        const docRef = doc( db, "users", data.id)
        await deleteDoc(docRef)
    }

    function handlerEditarItem(){
        //console.log(data)
        handlerEdit(data);
    }

    return(
        <View style={styles.container}>
            <Text style={styles.item}>Nome: {data.nome}</Text>
            <Text style={styles.item}>Idade: {data.idade}</Text>
            <Text style={styles.item}>Cargo: {data.cargo}</Text>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.textbtn} onPress={handlerDeleteItem}>Deletar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonEdit}>
                <Text style={styles.textbtn} onPress={handlerEditarItem}>Editar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "lightblue",
        padding: 10,
        borderRadius: 15,
        marginTop: 10,
    },

    item:{
        color: "#333",
        fontSize: 16,
    },

    button:{
        backgroundColor: 'red',
        marginTop: 10,
        width: 60,
        height: 30,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    textbtn:{
        color: '#fff',
        fontWeight: 'bold'
    },

    buttonEdit:{
        marginTop: 10,
        backgroundColor: 'green',
        width: 60,
        height: 30,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
})