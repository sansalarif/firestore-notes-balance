// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNG8To6_lP7NEYSpqd54KfVyiGNx1CA7w",
  authDomain: "rakamin-firebase-8e024.firebaseapp.com",
  projectId: "rakamin-firebase-8e024",
  storageBucket: "rakamin-firebase-8e024.appspot.com",
  messagingSenderId: "138630948557",
  appId: "1:138630948557:web:157100b66fa86f14adeb84",
  measurementId: "G-HKR589MKHH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
