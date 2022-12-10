import firebase from "firebase";

// const firebaseConfig = {
//   apiKey: "AIzaSyDJS6ppGGSjqXbiQenxaTIf07rsrXy_X0I",
//   authDomain: "sshomecare-26068.firebaseapp.com",
//   databaseURL: "https://sshomecare-26068.firebaseio.com",
//   projectId: "sshomecare-26068",
//   storageBucket: "sshomecare-26068.appspot.com",
//   messagingSenderId: "929563061489",
//   appId: "1:929563061489:web:9390a4111f46881684cd50"
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
