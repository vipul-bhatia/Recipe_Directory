import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBs5pmZcQsuRzVHm7ReUET02DjIaw4iFG0",
    authDomain: "cooking-ninja-site-6f3f7.firebaseapp.com",
    projectId: "cooking-ninja-site-6f3f7",
    storageBucket: "cooking-ninja-site-6f3f7.appspot.com",
    messagingSenderId: "706775032334",
    appId: "1:706775032334:web:e695b66c77f03f3be7125f"
  };

//initialize firebase
firebase.initializeApp(firebaseConfig);

//initialize firestore service
const projectFirestore = firebase.firestore();

export {projectFirestore}