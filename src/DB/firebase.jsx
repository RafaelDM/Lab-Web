// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseApp=firebase.initializeApp({
    apiKey: "AIzaSyANzK4vzKubHRKmxVHP7XrAGdq06dEcb_A",
    authDomain: "petifind-b607c.firebaseapp.com",
    databaseURL: "https://petifind-b607c.firebaseio.com",
    projectId: "petifind-b607c",
    storageBucket: "petifind-b607c.appspot.com",
    messagingSenderId: "30694744054",
    appId: "1:30694744054:web:c58279e504af877eb9b1d7",
    measurementId: "G-91X2C5TCVW"
  });

  const db=firebaseApp.firestore();
  const auth= firebase.auth();
  const storage= firebase.storage();
  export{db,auth,storage};