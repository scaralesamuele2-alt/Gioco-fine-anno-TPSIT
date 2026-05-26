import {View,Text,Button,ScrollView,} from "react-native";
import React from "react";
import {useState}from "react";

export default function App(){
    return(
        <View style={styles.container}>
            <Header/>
            <Regole/>
            <ScrollView>
                <Body/>
                <Footer/>
            </ScrollView>
        </View>
    )
}
function Header(){
    return(
        <View style={styles.containerHeader}>
            <Text style={styles.headerText}>Gioco Della Sfortuna</Text>
        </View>
    )
}
function Regole(){
    return(
        <View style={styles.containerRegole}>
            <Text style={styles.regoleText}>Regole Gioco:</Text>
            <Text style={styles.regoleDescrizione}>
              1. Ad inizio partita ricevi 3 carte casuali con situazioni sfortunate in ambito dell'NBA</Text>
            <Text style={styles.regoleDescrizione}>
                2. In ogni round ti viene mostrata una nuova carta dove vedi solo il nome e l'immagine, invece l'indice di sfortuna è nascosto</Text>
            <Text style={styles.regoleDescrizione}>
                3. Devi scegliere dove collocare la carta in 30 secondi in ordine crescente di sfortuna</Text>
            <Text style={styles.regoleDescrizione}>
                4. Se indovini ottieni la carta e viene aggiunta al mazzo</Text>
            <Text style={styles.regoleDescrizione}>
                5. In caso negativo, la carta viene scartata e avrai un errore</Text>
            <Text style={styles.regoleDescrizione}>
                6. Vinci se riesci ad avere 6 carte nel mazzo, invece perdi se commetti 3 errori</Text>
            <Button style={styles.regoleButton} 
            title="Gioca" onPress={()=>alert("")}/>
        </View>
            )}
function Body(){
    return(
        <View style={styles.containerBody}>
        </View>
    )
}
function Footer(){
    return(
        <View style={styles.containerFooter}>
        </View>
    )
}
const styles={
    container:{flex:1,height:200,justifyContent:"center",alignItems:"center"},

    containerHeader:{flex:1,justifyContent:"center",alignItems:"center"},
        headerText:{fontSize:24,fontWeight:"bold",color:"blue"},

    containerRegole:{flex:3,justifyContent:"center",alignItems:"center"},
        regoleText:{fontSize:20,fontWeight:"bold",color:"red"},
        regoleDescrizione:{fontSize:16,textAlign:"center",margin:10,color:"black"},
        regoleButton:{margin:10},

    containerBody:{flex:2,justifyContent:"center",alignItems:"center"},
        

    containerFooter:{flex:1,justifyContent:"center",alignItems:"center"},
};