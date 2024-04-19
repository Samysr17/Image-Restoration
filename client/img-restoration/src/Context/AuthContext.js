import { createContext,useContext,useState,useEffect } from "react";
import {auth,db} from "../Firebase";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged,signOut,RecaptchaVerifier,signInWithPhoneNumber,sendEmailVerification} from "firebase/auth";
import { setDoc,doc } from "firebase/firestore";

const AuthContext=createContext();


export function AuthContextProvider({children}){
    const [user,setuser]=useState({});
    function createUser(email,password){
        createUserWithEmailAndPassword(auth,email,password).then(()=>{
            sendEmailVerification(auth.currentUser);
            signOut(auth);
            alert("Email sent");
        })
        .catch(alert);
        setDoc(doc(db,'users',email),{
            saved_r_images:[],
            saved_d_images:[],
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
    function recaptcha(phone){
      const recap=new RecaptchaVerifier('recaptcha-container', {},auth);
      recap.render();
      return signInWithPhoneNumber(auth,phone,recap);
    }

    return(
        <AuthContext.Provider value={{createUser,logout,login,user,recaptcha}}>
            {children}
        </AuthContext.Provider>
    )

}
export function UserAuth(){
    return useContext(AuthContext)
}
