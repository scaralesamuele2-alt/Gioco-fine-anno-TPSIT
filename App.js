import {View,Text,Button,ScrollView,TextInput} from "react-native";
import React from "react";
import {useState}from "react";
import {Cards}from"./card.js";

export default function App()
{
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
        setCarte(carteIniziali);
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
function Header()
{
    return( 
        <View style={styles.containerHeader}>
            <Text style={styles.headerText}>Gioco Della Sfortuna</Text>
        </View>
    )
}
function HomeGioco({setSchermata,Partita})
{
    return(
        <View style={styles.containerHomeGioco}>
            <Text style={styles.homeGiocoText}>Home del Gioco</Text>
            <Text style={styles.homeGiocoDescrizione}>
            1. Ad inizio partita ricevi 3 carte casuali con situazioni sfortunate in ambito dell'NBA</Text>
            <Text style={styles.homeGiocoDescrizione}>
                2. In ogni round ti viene mostrata una nuova carta dove vedi solo il nome e l'immagine, invece l'indice di sfortuna è nascosto</Text>
            <Text style={styles.homeGiocoDescrizione}>
                3. Devi scegliere dove collocare la carta in ordine crescente di sfortuna</Text>
            <Text style={styles.homeGiocoDescrizione}>
                4. Se indovini ottieni la carta e viene aggiunta al mazzo</Text>
            <Text style={styles.homeGiocoDescrizione}>
                5. In caso contrario, la carta viene scartata e avrai un errore</Text>
            <Text style={styles.homeGiocoDescrizione}>
                6. Vinci se riesci ad avere 6 carte nel mazzo, invece perdi se commetti 3 errori</Text>
            <Button onPress={()=>{Partita();setSchermata("Gioco");}} color="red" title="Inizia Partita"/>
        </View>
    )}
function Body({setSchermata,carte,setCarte,errori,setErrori,carteUlitizzate})
{
    const[posizione,setPosizione]=useState("");
    const[cartaAttuale,setCartaAttuale]=useState(
        Cards[Math.floor(Math.random()*Cards.length)]
    );
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
            if(carte.length+1>=6)
                setSchermata("RisultatiGioco");
                setErrori(0);
        }
        else
        {
            setErrori(errori+1);
            alert("Posizione sbagliata, errore");
            if(errori+1>=3)
                setSchermata("RisultatiGioco");
                setErrori(0);
        }
    };
    const listaCarte=[];
    for(let i=0;i<carte.length;i++)
    {
      listaCarte.push(
        <Text>
            {i} {carte[i].emoji} {carte[i].name} - {carte[i].indiceSfortuna}
        </Text>
    );
    }
    return(
        <View style={styles.containerBody}>
            <Text style={styles.bodyTextCarte}>
                Carte del mazzo:{carte.length}
            </Text>
            <Button onPress={()=>{setPosizione("0");verificaPosizione();}} title="Posizione 0"/>
            <Button onPress={()=>{setPosizione("1");verificaPosizione();}} title="Posizione 1"/>
            <Button onPress={()=>{setPosizione("2");verificaPosizione();}} title="Posizione 2"/>
            <Text style={styles.bodyTextErrori}>
                Errori:{errori}
            </Text>
            <Text>
                Le tue carte:
            </Text>
            <View>
                {listaCarte}
            </View>
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
function RisultatiGioco({setSchermata,carte,errori})
{
    return(
        <View style={styles.containerRisultatiGioco}>
            <Text style={styles.risultatiTextCarte}>
                Carte raccolte:{carte.length}
            </Text>
            <Text style={styles.risultatiTextErrori}>
                Errori:{errori}
            </Text>
            <Button style={styles.risultatiButton} 
            onPress={()=>setSchermata("Home del gioco")} title="Gioca ancora"/>
        </View>
    )
}
const styles={
    container:{flex:1,height:200,justifyContent:"center",alignItems:"center"},

    containerHeader:{flex:1,justifyContent:"center",alignItems:"center"},
        headerText:{fontSize:30,fontWeight:"bold",color:"blue",textShadowColor:"red",textShadowOffset:{width:1,height:2}},

    containerHomeGioco:{flex:3,justifyContent:"center",alignItems:"center"},
        homeGiocoText:{fontSize:20,fontWeight:"bold",color:"red"},
        homeGiocoDescrizione:{fontSize:16,textAlign:"center",margin:10,color:"black"},

    containerBody:{flex:2,justifyContent:"center",alignItems:"center"},
        bodyTextCarte:{fontSize:18,color:"green"},
        bodyTextErrori:{fontSize:18,color:"red"},
        bodyCartaEmoji:{fontSize:50,alignItems:"center"},
        bodyCartaNome:{fontSize:20,fontWeight:"bold",alignItems:"center",color:"black"},
        bodyTextInput:{borderWidth:1,width:50,margin:10},

    containerRisultatiGioco:{flex:3,justifyContent:"center",alignItems:"center"},
        risultatiTextCarte:{fontSize:20,fontWeight:"bold",color:"purple"},
        risultatiTextErrori:{fontSize:20,fontWeight:"bold",color:"orange"},
}