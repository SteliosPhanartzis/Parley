import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB05OmarqivGc5YTKUATgzXJ8Nz_IOuv9M",
    authDomain: "discord-clone-75157.firebaseapp.com",
    projectId: "discord-clone-75157",
    storageBucket: "discord-clone-75157.appspot.com",
    messagingSenderId: "538671599107",
    appId: "1:538671599107:web:1fe145eaebf8df167f8836",
    measurementId: "G-XDTQKXKTD7"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db;