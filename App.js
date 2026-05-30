import {View,Text,Button,ScrollView,TextInput} from "react-native";
import React from "react";
import {useState} from "react";
import {Cards} from "./card.js";

/**
*Componente principale dell'applicazione (Root).
*Gestisce le schermate e gli stati principali del gioco.
*@component
*/
export default function App()
{
    //Stato per capire quale schermata mostrare (Home, Gioco, Risultati)
    const[schermata,setSchermata]=useState("Home del gioco");
    //Array che contiene le carte attualmente nel mazzo del giocatore
    const[carte,setCarte]=useState([]);
    //Contatore degli errori fatti dal giocatore
    const[errori,setErrori]=useState(0);
    //Array per salvare gli id delle carte già usate (evita doppioni)
    const[carteUlitizzate,setCarteUtilizzate]=useState([]);
    /*
    *Funzione che fa partire la partita.
    *Prende 3 carte a caso, controlla che non siano doppioni e le ordina per sfortuna.
    */
    const Partita=()=>{
        const carteIniziali=[];
        const idCarta=[];
        //Gira il ciclo finché non abbiamo preso 3 carte diverse
        while(carteIniziali.length<3)
        {
            const cartaRandom=Cards[Math.floor(Math.random()*Cards.length)];
            if(!idCarta.includes(cartaRandom.id))
            {
                carteIniziali.push(cartaRandom);
                idCarta.push(cartaRandom.id);
            }
        }
        setCarteUtilizzate(idCarta);
        //Ordina le carte in modo crescente (dalla meno sfortunata alla più sfortunata)
        const carteOrdinata=[...carteIniziali].sort(
            (a,b)=>a.indiceSfortuna-b.indiceSfortuna
        );
        setCarte(carteOrdinata);
    };
    /*
    *Funzione per azzerare il gioco quando si vuole fare una nuova partita.
    */
    const resetGioco=()=>
    {
        setCarte([]);
        setErrori(0);
    };
    return(
        <View style={styles.container}>
            <Header/>
            {schermata==="Home del gioco" && <HomeGioco setSchermata={setSchermata} Partita={Partita}/>}
            <ScrollView>
                {schermata==="Gioco" && <Body setSchermata={setSchermata} carte={carte} setCarte={setCarte} errori={errori} setErrori={setErrori} carteUlitizzate={carteUlitizzate}/>}
                {schermata==="RisultatiGioco" && <RisultatiGioco setSchermata={setSchermata} carte={carte} errori={errori} resetGioco={resetGioco}/>}
            </ScrollView>
        </View>
    );
}

/*
*Componente Header semplice che mostra solo il titolo del gioco in alto.
*/
function Header()
{
    return(
        <View style={styles.containerHeader}>
            <Text style={styles.headerText}>Gioco Della Sfortuna</Text>
        </View>
    );
}

/**
 *Componente della schermata iniziale con le regole e il bottone per startare.
 *@param {Object} props-Le proprietà passate dal componente padre
 *@param {Function} props.setSchermata-Funzione per cambiare schermata
 *@param {Function} props.Partita-Funzione per preparare il mazzo iniziale
 */
function HomeGioco({setSchermata,Partita})
{
    return(
        <View style={styles.containerHomeGioco}>
            <Text style={styles.homeGiocoText}>Home del Gioco</Text>
            <Text style={styles.homeGiocoDescrizione}>1. Ad inizio partita ricevi 3 carte casuali con situazioni sfortunate in ambito dell'NBA</Text>
            <Text style={styles.homeGiocoDescrizione}>2. In ogni round ti viene mostrata una nuova carta dove vedi solo il nome e l'immagine, invece l'indice di sfortuna è nascosto</Text>
            <Text style={styles.homeGiocoDescrizione}>3. Devi scegliere dove collocare la carta in ordine crescente di sfortuna</Text>
            <Text style={styles.homeGiocoDescrizione}>4. Se indovini ottieni la carta e viene aggiunta al mazzo</Text>
            <Text style={styles.homeGiocoDescrizione}>5. In caso contrario, la carta viene scartata e avrai un errore</Text>
            <Text style={styles.homeGiocoDescrizione}>6. Vinci se riesci ad avere 6 carte nel mazzo, invece perdi se commetti 3 errori</Text>
            <Button onPress={()=>{Partita();setSchermata("Gioco");}}color="red" title="Inizia Partita"/>
        </View>
    );
}

/**
 *Componente principale del gioco dove si fanno le scelte.
 *@param {Object} props-Le proprietà del componente
 *@param {Function} props.setSchermata-Serve per mandare ai risultati se si vince/perde
 *@param {Array} props.carte-Il mazzo di carte attuale
 *@param {Function} props.setCarte-Serve per aggiornare il mazzo
 *@param {number} props.errori-Il numero di errori attuali
 *@param {Function} props.setErrori-Serve per aumentare gli errori
 *@param {Array} props.carteUlitizzate-Lista dei vecchi id (anche se non usata direttamente qui)
 */

function Body({setSchermata,carte,setCarte,errori,setErrori,carteUlitizzate})
{
    /**
    *Funzione interna che pesca una nuova carta dal file card.js senza prendere un doppione.
    *@param {Array} carte-Il mazzo attuale per fare il controllo anti-doppione
    *@returns {Object} Ritorna l'oggetto della carta pescata a caso
    */
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
    // Stato locale per la posizione scelta (in realtà viene passata direttamente alla funzione)
    const[posizione,setPosizione]=useState("");
    // Stato locale che tiene la carta che l'utente deve indovinare in questo round
    const[cartaAttuale,setCartaAttuale]=useState(()=>generaCarta(carte));
    /**
    *Controlla se la posizione scelta dal giocatore è corretta dal punto di vista dell'ordine.
    *@param {number} posizioneScelta-Il numero del bottone cliccato (da 1 a N)
    */
    const verificaPosizione=(posizioneScelta)=>{
        const indice=posizioneScelta-1;
        //Controllo di sicurezza se l'indice è sballato
        if(indice<0||indice>carte.length)
        {
            const nuoviErrori=errori+1;
            setErrori(nuoviErrori);
            if(nuoviErrori>=3) setSchermata("RisultatiGioco");
            alert("Posizione sbagliata");
            return;
        }
        //Crea una copia del mazzo e inserisce la carta nella posizione scelta
        const nuovoMazzo=[...carte];
        nuovoMazzo.splice(indice,0,cartaAttuale);
        //Controlla se il nuovo mazzo è ancora ordinato bene
        let corretto=true;
        for(let i=0;i<nuovoMazzo.length-1;i++)
        {
            if(nuovoMazzo[i].indiceSfortuna>nuovoMazzo[i+1].indiceSfortuna)
            {
                corretto=false;
                break;
            }
        }
        if(corretto)
        {
            alert("Posizione corretta, carta aggiunta al mazzo");
            setCarte(nuovoMazzo);
            //Se arrivi a 6 carte hai vinto
            if(nuovoMazzo.length>=6) setSchermata("RisultatiGioco");
            //Pesca la prossima carta per il prossimo turno
            setCartaAttuale(generaCarta(nuovoMazzo));
        }
        else
        {
            alert("Posizione sbagliata, 1 errore");
            const nuoviErrori=errori+1;
            setErrori(nuoviErrori);
            //Se fai 3 errori hai perso
            if(nuoviErrori>=3) setSchermata("RisultatiGioco");
        }
    };
    return (
        <View style={styles.containerBody}>
            <Text style={styles.bodyTextErrori}>Errori:{errori}</Text>
            <Text style={styles.bodyTextCarte}>Carte del mazzo:{carte.length}</Text>
            <Text style={styles.bodyTextLeTueCarte}>Le tue carte:</Text>
            <View>
            {
                (()=>{
                    const elementi=[];
                    for(let i=0;i<carte.length;i++)
                    {
                        elementi.push(
                            <Text key={i} style={styles.bodyTextCarteIniziali}>
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
                        const posizione=i;
                        bottoni.push(
                            <Button key={i} style={styles.risultatiGiocoButton} onPress={()=>{setPosizione(posizione);verificaPosizione(i);}} title={"Prima della posizione "+i}/>
                        );
                    }
                    return bottoni;
                })()}
            </View>
            <View>
                <Text style={styles.bodyCartaEmoji}>{cartaAttuale.emoji}</Text>
                <Text style={styles.bodyCartaNome}>{cartaAttuale.name}</Text>
            </View>
        </View>
    );
}

/**
*Schermata finale che compare quando vinci o quando perdi.
*@param {Object} props-Le proprietà del componente
*@param {Function} props.setSchermata-Serve per tornare alla Home
*@param {Array} props.carte-Serve per vedere quante carte hai accumulato
*@param {number} props.errori-Serve per mostrare quanti errori hai fatto
*@param {Function} props.resetGioco-Funzione per pulire il mazzo e gli errori
*/
function RisultatiGioco({setSchermata,carte,errori,resetGioco})
{
    return(
        <View style={styles.containerRisultatiGioco}>
            <Text style={styles.risultatiTextCarte}>Carte raccolte:{carte.length}</Text>
            <Text style={styles.risultatiTextErrori}>Errori:{errori}</Text>
            <Button style={styles.risultatiGiocoButton}
                onPress={()=>{setSchermata("Home del gioco");resetGioco()}} title="Gioca ancora"/>
        </View>
    );
}

/**
*Oggetto con tutti gli stili grafici dei componenti.
*@type {Object}
*/
const styles=
{
    container:{flex:1,height:200,justifyContent:"center",alignItems:"center",backgroundColor:"black"},
    containerHeader:{flex:1,justifyContent:"center",alignItems:"center"},
    headerText:{fontSize:30,fontWeight:"bold",color:"blue",textShadowColor:"red",textShadowOffset:{width:1,height:2}},
    containerHomeGioco:{flex:3,justifyContent:"center",alignItems:"center"},
    homeGiocoText:{fontSize:20,fontWeight:"bold",color:"red"},
    homeGiocoDescrizione:{fontSize:16,textAlign:"center",margin:10,color:"white"},
    containerBody:{flex:2,justifyContent:"center",alignItems:"center"},
    bodyTextCarteIniziali:{fontSize:20,textAlign:"center",color:"white"},
    bodyTextLeTueCarte:{fontSize:20,color: "darkgreen"},
    bodyTextCarte:{fontSize:20,color:"purple",alignItems:"center"},
    bodyTextErrori:{fontSize:22,color:"red",alignItems:"left",fontWeight:"bold"},
    bodyCartaEmoji:{fontSize:50,justifyContent:"center",alignItems:"center"},
    bodyCartaNome:{fontSize:20,fontWeight:"bold",justifyContent:"center",alignItems:"center",color:"white"},
    bodyTextInput:{borderWidth:1,width:50,margin:10},
    containerRisultatiGioco:{flex:3,justifyContent:"center",alignItems:"center"},
    risultatiTextCarte:{fontSize:20,fontWeight:"bold",color:"purple"},
    risultatiTextErrori:{fontSize:20,fontWeight:"bold",color:"red" },
    risultatiGiocoButton:{margin:50,borderRadius:100},
};