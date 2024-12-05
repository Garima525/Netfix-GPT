// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgk2gacwG6C3VXwTaKO5bzNip_hv92SRc",
  authDomain: "netflixgpt-48451.firebaseapp.com",
  projectId: "netflixgpt-48451",
  storageBucket: "netflixgpt-48451.firebasestorage.app",
  messagingSenderId: "436504495835",
  appId: "1:436504495835:web:3725f952a7677edb16eefe",
  measurementId: "G-GGGYVK2CY0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
