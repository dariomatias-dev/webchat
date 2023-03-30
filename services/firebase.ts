// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCOFy2rsh51yFefmy6DSOhQn-jG184mfRo",
  authDomain: "chat-db-756ef.firebaseapp.com",
  databaseURL: "https://chat-db-756ef-default-rtdb.firebaseio.com",
  projectId: "chat-db-756ef",
  storageBucket: "chat-db-756ef.appspot.com",
  messagingSenderId: "3109736746",
  appId: "1:3109736746:web:536dafc27df9846bc1ce53",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
