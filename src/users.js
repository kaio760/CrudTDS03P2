import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

export function UsersList({data}){
    return(
        <View style={styles.container}>
            <Text>Nome: {data.nome}</Text>
            <Text>Idade: {data.idade}</Text>
            <Text>Cargo: {data.cargo}</Text>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.textbtn}>Deletar</Text>
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
    }
})