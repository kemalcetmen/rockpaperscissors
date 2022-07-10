import { initializeApp } from "firebase/app";
import { getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail} from "firebase/auth";

import { getDatabase, ref, set, get} from "firebase/database";

import config from "./config";

const app = initializeApp(config)
const auth = getAuth();
const db = getDatabase();

const login = (email, password)=> {
    return signInWithEmailAndPassword(auth, email, password)
}
const logout = ()=> {
    return signOut(auth)
}
const signup =  async (email, password)=> {
    await createUserWithEmailAndPassword(auth, email, password)
    return writeUserData()
}
const forgotpass = (email)=> {
    return sendPasswordResetEmail(auth, email)
}
const writeUserData = () => {
    set(ref(db, 'players/' + auth.currentUser.uid), {
      id: auth.currentUser.uid,
      inGame: false,
      player: "",
      points:0,
      roomId: "",
      streak: 0,
    });
}
const playWithComputer = () => {
    changeSmthPlayers("computer", "inGame")
}
const changeSmthPlayers = ( newValue, key) =>{
    set(ref(db, `players/${auth.currentUser.uid}/${key}`),newValue);
}
const playerOut = ()=>{
    changeSmthPlayers(false, "inGame")
    changeSmthPlayers("", "player")
    changeSmthPlayers("", "roomId")
}
const gameEnd = async (conc) => {
    const point =  (await get(ref(db, `players/${auth.currentUser.uid}/points`))).val()
    const streak = (await get(ref(db, `players/${auth.currentUser.uid}/streak`))).val()

    if(conc){
        set(ref(db, `players/${auth.currentUser.uid}/streak`),streak+1)
        set(ref(db, `players/${auth.currentUser.uid}/points`),(streak+2)*100+point)
    }else{
        set(ref(db, `players/${auth.currentUser.uid}/streak`),0)
        set(ref(db, `players/${auth.currentUser.uid}/points`),100+point)
    }
}

const comeBack = () => {
    set(ref(db, 'players/' + auth.currentUser.uid + '/inGame'),false);
    set(ref(db, 'players/' + auth.currentUser.uid + '/player'),"");
    set(ref(db, 'players/' + auth.currentUser.uid + '/roomId'),"");
}
export {auth, db, login, logout, signup, writeUserData, playerOut, gameEnd,
     playWithComputer, forgotpass, comeBack }