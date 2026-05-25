import {View,Text,Button,ScrollView,} from "react-native";
import React from "react";
import {useState}from "react";

export default function App(){
    return(
        <View style={styles.container}>
            <Header/>
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
function Body(){
    return(
        <View style={styles.containerBody}>
            <Button style={styles.bodyButtonRegole}
            title="Regole" onPress={()=>alert("")}/>
            <Button style={styles.bodyButtonGioca} 
            title="Gioca" onPress={()=>alert("")}/>
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
    container:{flex:1,height:"100%",justifyContent:"center",alignItems:"center"},
    containerHeader:{flex:1,justifyContent:"center",alignItems:"center"},
        headerText:{fontSize:24,fontWeight:"bold",color:"blue"},
    containerBody:{flex:1,justifyContent:"center",alignItems:"center"},
        bodyButtonRegole:{margin:10},
        bodyButtonGioca:{margin:10},
    containerFooter:{flex:1,justifyContent:"center",alignItems:"center"},
};