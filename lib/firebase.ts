// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2bxrHO7Npy0Xlj2bOH39B1ETDveVipjg",
  authDomain: "nettby-b881b.firebaseapp.com",
  projectId: "nettby-b881b",
  storageBucket: "nettby-b881b.appspot.com",
  messagingSenderId: "135014524554",
  appId: "1:135014524554:web:4d2cca6d6408707dad6f73",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
export default app;
