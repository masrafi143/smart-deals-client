// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7t8qEoSabOr_lQ8TYhXJ3awhvfMPQyuQ",
  authDomain: "smart-deals-e7592.firebaseapp.com",
  projectId: "smart-deals-e7592",
  storageBucket: "smart-deals-e7592.firebasestorage.app",
  messagingSenderId: "503722247552",
  appId: "1:503722247552:web:78e3ed622f1350dcbced65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);