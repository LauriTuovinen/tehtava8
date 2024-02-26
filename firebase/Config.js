import {initializeApp} from 'firebase/app';
import {getFirestore,collection,addDoc,serverTimestamp, query, orderBy, onSnapshot} from 'firebase/firestore';
import {getAuth, signInWithEmailAndPassword } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyARCgHe422dugseCq2oxEVqs6yHEb9aXUY",
    authDomain: "chat-196b9.firebaseapp.com",
    projectId: "chat-196b9",
    storageBucket: "chat-196b9.appspot.com",
    messagingSenderId: "604355469187",
    appId: "1:604355469187:web:8ac2e809b0fdf5e362a0b6"
  };

initializeApp(firebaseConfig);

const firestore = getFirestore();

const MESSAGES = 'messages'

export {
    firestore,
    collection,
    addDoc,
    serverTimestamp,
    query,
    MESSAGES,
    onSnapshot,
    orderBy,
    getAuth,
    signInWithEmailAndPassword
};