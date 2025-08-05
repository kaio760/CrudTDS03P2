// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getFirestore} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAp0KyGSyXFkUNoo7zcddNawWXtWTzWspw",
  authDomain: "tds03-9773a.firebaseapp.com",
  projectId: "tds03-9773a",
  storageBucket: "tds03-9773a.firebasestorage.app",
  messagingSenderId: "8240347445",
  appId: "1:8240347445:web:369cf4fbc6786913e7747c"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db};