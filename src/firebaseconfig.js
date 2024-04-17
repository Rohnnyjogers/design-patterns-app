// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwNCXWD2AXOlomLqndrWRDgD8QvYIKovc",
  authDomain: "design-patterns-9bf51.firebaseapp.com",
  projectId: "design-patterns-9bf51",
  storageBucket: "design-patterns-9bf51.appspot.com",
  messagingSenderId: "708594089013",
  appId: "1:708594089013:web:befcbf2dd989d2c9eec57c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);