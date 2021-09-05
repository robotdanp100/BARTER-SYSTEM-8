import firebase from 'firebase';
require('@firebase/firestore')
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBmjTyz6gwykaeHkiOaF1A9pyOJl55yQcw",
  authDomain: "chitchat-8a21e.firebaseapp.com",
  projectId: "chitchat-8a21e",
  storageBucket: "chitchat-8a21e.appspot.com",
  messagingSenderId: "396004905663",
  appId: "1:396004905663:web:41a44b6f8e996c9683ac0a"
};
 
   if(!firebase.apps.length) { 
     firebase.initializeApp(firebaseConfig) 
     } 
     
  export default firebase.firestore()
