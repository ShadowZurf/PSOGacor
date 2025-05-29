// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzNhKZbgT1OOGsc-sFYgno64IbGFkl3v8",
  authDomain: "fp-pso-kel10.firebaseapp.com",
  projectId: "fp-pso-kel10",
  storageBucket: "fp-pso-kel10.firebasestorage.app",
  messagingSenderId: "591053706175",
  appId: "1:591053706175:web:837378cd608d9382a8470a",
  measurementId: "G-DNGD4VTNSY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

import { getFirestore } from "firebase/firestore";
export const db = getFirestore(app);