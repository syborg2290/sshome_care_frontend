import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDJS6ppGGSjqXbiQenxaTIf07rsrXy_X0I",
  authDomain: "sshomecare-26068.firebaseapp.com",
  databaseURL: "https://sshomecare-26068.firebaseio.com",
  projectId: "sshomecare-26068",
  storageBucket: "sshomecare-26068.appspot.com",
  messagingSenderId: "929563061489",
  appId: "1:929563061489:web:9390a4111f46881684cd50"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db ;
