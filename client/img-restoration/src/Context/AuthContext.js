import { createContext,useContext,useState,useEffect } from "react";
import {auth,db} from "../Firebase";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged,signOut} from "firebase/auth";
import { setDoc,doc } from "firebase/firestore";

const AuthContext=createContext();


export function AuthContextProvider({children}){
    const [user,setuser]=useState({});
    function createUser(email,password){
        createUserWithEmailAndPassword(auth,email,password);
        setDoc(doc(db,'users',email),{
            credits:100
        })
        return;
    }
    function logout(){
       return signOut(auth);
    }
    function login(email,password){
       return signInWithEmailAndPassword(auth,email,password);
    }
    useEffect(()=>{
        const user_state=onAuthStateChanged(auth,(currentUser)=>{
            setuser(currentUser);
        })
        return ()=>{
           user_state();
        }
    })

    return(
        <AuthContext.Provider value={{createUser,logout,login,user}}>
            {children}
        </AuthContext.Provider>
    )

}
export function UserAuth(){
    return useContext(AuthContext)
}
