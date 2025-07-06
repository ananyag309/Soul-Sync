// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5uTkmFk5HYxoZ39VXtf2KIIxEGyjqtq0",
  authDomain: "soulsync-8f25e.firebaseapp.com",
  projectId: "soulsync-8f25e",
  storageBucket: "soulsync-8f25e.firebasestorage.app",
  messagingSenderId: "952173831753",
  appId: "1:952173831753:web:95ab846a784a7b95638198",
  measurementId: "G-BDJ7QDMLXM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);