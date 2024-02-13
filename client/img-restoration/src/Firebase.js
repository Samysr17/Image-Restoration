
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBNaCfXXMxgKEmNUIPRU9WPNjpd5RM__HY",
  authDomain: "image-restoration-4ea62.firebaseapp.com",
  projectId: "image-restoration-4ea62",
  storageBucket: "image-restoration-4ea62.appspot.com",
  messagingSenderId: "345391844820",
  appId: "1:345391844820:web:3319edf0bd20b5e7f7da41"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);