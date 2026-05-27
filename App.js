import {View,Text,Button,ScrollView,TextInput} from "react-native";
import React from "react";
import {useState}from "react";
import {Cards}from"./cards.js";

export default function App(){
    const[schermata,setSchermata]=useState("Home del gioco");
    const[carte,setCarte]=useState([]);
    const[errori,setErrori]=useState(0);
    const[carteAttuali,setCarteAttuali]=useState([]);
    const[carteUlitizzate,setCarteUtilizzate]=useState([]);
    const Partita=()=>{
        const carteIniziali=[];
        while(carteIniziali.length<3)
        {
            const cartaRandom=Cards[Math.floor(Math.random()*Cards.length)];
            carteIniziali.push(cartaRandom);
            const idCarta=[];
            for(let i=0;i<carteIniziali.length;i++)
                idCarta.push(carteIniziali[i].id);
            setCarteUtilizzate(idCarta);
        }
        setCarteAttuali(carteIniziali);
    };
    return(
        <View style={styles.container}>
            <Header/>
            {schermata==="Home del gioco" && <HomeGioco setSchermata={setSchermata} Partita={Partita}/>}
            <ScrollView>
                {schermata==="Gioco"&&<Body setSchermata={setSchermata} carte={carte} setCarte={setCarte} errori={errori} setErrori={setErrori} carteUlitizzate={carteUlitizzate}/>}
               {schermata==="RisultatiGioco"&&<RisultatiGioco setSchermata={setSchermata} carte={carte} errori={errori}/>}
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
function HomeGioco({setSchermata,Partita}){
    return(
        <View style={styles.containerHomeGioco}>
            <Text style={styles.homeGiocoText}>Home del Gioco</Text>
            <Text style={styles.homeGiocoDescrizione}>
            1. Ad inizio partita ricevi 3 carte casuali con situazioni sfortunate in ambito dell'NBA</Text>
            <Text style={styles.homeGiocoDescrizione}>
                2. In ogni round ti viene mostrata una nuova carta dove vedi solo il nome e l'immagine, invece l'indice di sfortuna è nascosto</Text>
            <Text style={styles.homeGiocoDescrizione}>
                3. Devi scegliere dove collocare la carta in 30 secondi in ordine crescente di sfortuna</Text>
            <Text style={styles.homeGiocoDescrizione}>
                4. Se indovini ottieni la carta e viene aggiunta al mazzo</Text>
            <Text style={styles.homeGiocoDescrizione}>
                5. In caso contrario, la carta viene scartata e avrai un errore</Text>
            <Text style={styles.homeGiocoDescrizione}>
                6. Vinci se riesci ad avere 6 carte nel mazzo, invece perdi se commetti 3 errori</Text>
            <Button onPress={()=>{Partita();setSchermata("Gioco");}} title="Inizia Partita"/>
        </View>
    )}
function Body({setSchermata,carte,setCarte,errori,setErrori,carteUlitizzate}){
    const[posizione,setPosizione]=useState("");
    const[cartaAttuale,setCartaAttuale]=useState(null);
    const verificaPosizione=()=>{
        const indice=parseInt(posizione);
        const cartaInserita=[];
        for(let i=0;i<carte.length;i++)
            cartaInserita.push(carte[i]);
        const precedente=cartaInserita[indice-1];
        const successiva=cartaInserita[indice];
            if(cartaAttuale.indiceSfortuna>precedente.indiceSfortuna && cartaAttuale.indiceSfortuna<successiva.indiceSfortuna)
            {
                setCarte([...carte,cartaAttuale]);
                alert("Posizione corretta, la carta è stata aggiunta al mazzo");
            }
            else
            {
                setErrori(errori+1);
                alert("Posizione sbagliata, errore");
            }
        setPosizione("");
    };
    return(
        <View style={styles.containerBody}>
            <Text style={styles.bodyTextCarte}>
                Carte del mazzo:{carte.length}
            </Text>
            <TextInput onChangeText={(valore)=>{setPosizione(valore)}}
            value={posizione}style={{borderWidth:1,width:50}}/>
            <Button onPress={()=>{verificaPosizione()}}
            title="Aggiungi carta"style={styles.bodyButton}/>
            <Text style={styles.bodyTextErrori}>
                Errori:{errori}
            </Text>
            <View>
                <Text style={styles.bodyCartaEmoji}>
                    {cartaAttuale.emoji}
                </Text>
                <Text style={styles.bodyCartaNome}>
                    {cartaAttuale.name}
                </Text>
            </View>
        </View>
    )
}
function RisultatiGioco({setSchermata,carte,errori}){
    return(
        <View style={styles.containerRisultatiGioco}>
            <Text style={styles.RisultatiTextCarte}>
                Carte raccolte:{carte.length}
            </Text>
            <Text style={styles.RisultatiTextErrori}>
                Errori:{errori}
            </Text>
            <Button style={styles.RisultatiButton} 
            onPress={()=>setSchermata("Home del gioco")} title="Gioca ancora"/>
        </View>
    )
}
const styles={
    container:{flex:1,height:200,justifyContent:"center",alignItems:"center"},

    containerHeader:{flex:1,justifyContent:"center",alignItems:"center"},
        headerText:{fontSize:24,fontWeight:"bold",color:"blue"},

    containerHomeGioco:{flex:3,justifyContent:"center",alignItems:"center"},
        homeGiocoText:{fontSize:20,fontWeight:"bold",color:"red"},
        homeGiocoDescrizione:{fontSize:16,textAlign:"center",margin:10,color:"black"},
        homeGiocoButton:{margin:10},

    containerBody:{flex:2,justifyContent:"center",alignItems:"center"},
        bodyTextCarte:{fontSize:18,color:"green"},
        bodyTextErrori:{fontSize:18,color:"red"},
        bodyCartaEmoji:{fontSize:50,alignItems:"center"},
        bodyCartaNome:{fontSize:20,fontWeight:"bold",alignItems:"center",color:"black"},
        bodyTextInput:{borderWidth:1,width:50,margin:10},
        bodyButton:{margin:10},

    containerRisultatiGioco:{flex:3,justifyContent:"center",alignItems:"center"},
        RisultatiTextCarte:{fontSize:20,fontWeight:"bold",color:"purple"},
        RisultatiTextErrori:{fontSize:20,fontWeight:"bold",color:"orange"},
        RisultatiButton:{margin:10},
};