import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyApuqJmO3ymcEG5r9CCTYIWctG88WmhXlQ",
  authDomain: "medhelp-app-d08c2.firebaseapp.com",
  projectId: "medhelp-app-d08c2",
  storageBucket: "medhelp-app-d08c2.firebasestorage.app",
  messagingSenderId: "318381568469",
  appId: "1:318381568469:web:aa8f0990e1cf29993d8d5c",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE = getFirestore(FIREBASE_APP);
