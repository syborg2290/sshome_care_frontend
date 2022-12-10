import firebase from "firebase";

// var firebaseConfig = {
//   apiKey: "AIzaSyB167WKe8q0Rxs5reM0bdsAhz65X5OOkfw",
//   authDomain: "sshomecaretest.firebaseapp.com",
//   projectId: "sshomecaretest",
//   storageBucket: "sshomecaretest.appspot.com",
//   messagingSenderId: "5857302130",
//   appId: "1:5857302130:web:658668ac15c7f88a4dd4eb",
// };

const firebaseConfig = {
  apiKey: "AIzaSyDR9qJucc5DXAph9w3wiK29n37Z4n9Tl8I",
  authDomain: "homecarecity.firebaseapp.com",
  projectId: "homecarecity",
  storageBucket: "homecarecity.appspot.com",
  messagingSenderId: "552733747355",
  appId: "1:552733747355:web:75952b13cf4fe0f7cb3e3e",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const storage = firebase.storage();

export { storage };
export default db;
