// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdRTKT9WoKebZJ87AuIO1e1D91Pn_Hz6o",
  authDomain: "vueauth-3706b.firebaseapp.com",
  projectId: "vueauth-3706b",
  storageBucket: "vueauth-3706b.appspot.com",
  messagingSenderId: "561776170153",
  appId: "1:561776170153:web:b5d9170289cddba683c5b8",
  measurementId: "G-EX6BGG2W7Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {
  auth,
  app,
}

