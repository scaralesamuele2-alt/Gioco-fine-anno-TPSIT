import {View,Text,Button,ScrollView,} from 'react-native';
import React from 'react-native';
import {useState}from 'react-native-safe-area-context';

export default function GiocoSfortuna(){
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
    return(<View style={styles.containerHeader}>
            <Text>Gioco Della Sfortuna</Text>
            <Button style={styles.HeaderButton}
                onPress={()=>alert()}title="Inizia partita"/>
        </View>
    )
}
function Body(){
    return()
}
function Footer(){
    return()
}
const styles={
    container:{flex:1,justifyContent:'center',alignItems:'center'},
    containerHeader:{flex:1,justifyContent:'center',alignItems:'center'},
        HeaderButton:{marginTop:20},
    containerBody:{flex:1,justifyContent:'center',alignItems:'center'},
    containerFooter:{flex:1,justifyContent:'center',alignItems:'center'},
};