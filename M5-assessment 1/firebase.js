// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// import {getFirestore, setDoc, doc } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgJSepuct4tgw-iv-Xf4l_oEEnHtB0yrI",
  authDomain: "reactnative-mtn.firebaseapp.com",
  projectId: "reactnative-mtn",
  storageBucket: "reactnative-mtn.appspot.com",
  messagingSenderId: "248025614053",
  appId: "1:248025614053:web:6f3b13c4efbea1f7daf60c"
};

// Initialize Firebase

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth();
const db = firebase.firestore();
// const db = getFirestore; // firebase.firestore(); // getFirestore; 
// export default db;



export { db, auth };