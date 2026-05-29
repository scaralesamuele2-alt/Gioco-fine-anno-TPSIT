import {View,Text,Button,ScrollView,TextInput} from "react-native";
import React from "react";
import {useState}from "react";
import {Cards}from"./card.js";

export default function App()
{
    const[schermata,setSchermata]=useState("Home del gioco");
    const[carte,setCarte]=useState([]);
    const[errori,setErrori]=useState(0);
    const[carteUlitizzate,setCarteUtilizzate]=useState([]);
    const Partita=()=>{
        const carteIniziali=[];
        const idCarta=[];
        while (carteIniziali.length<3)
        {
            const cartaRandom=Cards[Math.floor(Math.random()*Cards.length)];
            if(!idCarta.includes(cartaRandom.id))
            {
                carteIniziali.push(cartaRandom);
                idCarta.push(cartaRandom.id);
            }
        }
        setCarteUtilizzate(idCarta);
        const carteOrdinata=[...carteIniziali].sort(
            (a,b)=>a.indiceSfortuna-b.indiceSfortuna
        );
        setCarte(carteOrdinata);
    };
    const resetGioco=()=>{
        setCarte([]);
        setErrori(0);
    };
    return(
        <View style={styles.container}>
            <Header/>
            {schermata==="Home del gioco" && <HomeGioco setSchermata={setSchermata} Partita={Partita}/>}
            <ScrollView>
                {schermata==="Gioco"&&<Body setSchermata={setSchermata} carte={carte} setCarte={setCarte} errori={errori} setErrori={setErrori} carteUlitizzate={carteUlitizzate}/>}
               {schermata==="RisultatiGioco"&&<RisultatiGioco setSchermata={setSchermata} carte={carte} errori={errori} resetGioco={resetGioco}/>}
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
    const generaCarta=(carte)=>{
        let cartaAttuale=Cards[Math.floor(Math.random()*Cards.length)];
        let trovata=true;
        while(trovata)
        {
            trovata=false;
            for(let i=0;i<carte.length;i++)
            {
                if(carte[i].id===cartaAttuale.id)
                    trovata=true;
            }
            if(trovata)
            cartaAttuale=Cards[Math.floor(Math.random()*Cards.length)];
        }
        return cartaAttuale;
    };
    const[posizione,setPosizione]=useState("");
    const[cartaAttuale,setCartaAttuale]=useState(()=>generaCarta(carte));
    const verificaPosizione=(posizioneScelta)=>
    {
        const indice=posizioneScelta-1;
        if(indice<0||indice>carte.length)
        {
            setErrori(errori+1);
            alert("Posizione sbagliata");
            return;
        } 
        const nuovoMazzo=[...carte];
        for(let i=0;i<carte.length;i++)
        {
            if(carte[i].id===cartaAttuale.id)
            {
                alert("Carta già presente");
                return;
            }
        }
        nuovoMazzo.splice(indice,0,cartaAttuale);
        const ordinato=nuovoMazzo.sort(
            (a,b)=>a.indiceSfortuna-b.indiceSfortuna
        );
        alert("Posizione corretta, carta aggiunta al mazzo");
        if(ordinato.length>=6)
            setSchermata("RisultatiGioco");
        setCarte(ordinato);
        setCartaAttuale(generaCarta(ordinato));
    };
    return(
        <View style={styles.containerBody}>
            <Text style={styles.bodyTextErrori}>
                Errori:{errori}
            </Text>
            <Text style={styles.bodyTextCarte}>
                Carte del mazzo:{carte.length}
            </Text>
            <Text>
                Le tue carte:
            </Text>
            <View>
            {
                (()=>{
                const elementi=[];
                for(let i=0;i<carte.length;i++)
                {
                    elementi.push(
                    <Text>
                        {i}{carte[i].emoji}{carte[i].name}-{carte[i].indiceSfortuna}
                    </Text>
                    );
                }
                return elementi;
                })()
            }
            </View>
            <View>
            {(()=>{
                const bottoni=[];
                const numeroBottoni=carte.length+1;
                for(let i=1;i<=numeroBottoni;i++)
                {
                    const posizioneString=String(i);
                    bottoni.push(
                    <Button onPress={()=>{setPosizione(posizioneString);verificaPosizione();}}title={"Prima della posizione "+i}/>
                    );
                }
            return bottoni;
            })()
            }
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
function RisultatiGioco({setSchermata,carte,errori,resetGioco})
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
            onPress={()=>{setSchermata("Home del gioco");resetGioco();}} title="Gioca ancora"/>
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
        bodyTextCarte:{fontSize:18,color:"green",alignItems:"center"},
        bodyTextErrori:{fontSize:18,color:"red",alignItems:"center",topAndBottom:10,fontWeight:"bold"},
        bodyCartaEmoji:{fontSize:50,alignItems:"center"},
        bodyCartaNome:{fontSize:20,fontWeight:"bold",alignItems:"center",color:"black"},
        bodyTextInput:{borderWidth:1,width:50,margin:10},

    containerRisultatiGioco:{flex:3,justifyContent:"center",alignItems:"center"},
        risultatiTextCarte:{fontSize:20,fontWeight:"bold",color:"purple"},
        risultatiTextErrori:{fontSize:20,fontWeight:"bold",color:"orange"},
}