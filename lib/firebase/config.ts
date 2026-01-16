// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB9cWka_PCHkUOug9H2wEKilHwBP5zkICk",
    authDomain: "tab-brother.firebaseapp.com",
    projectId: "tab-brother",
    storageBucket: "tab-brother.firebasestorage.app",
    messagingSenderId: "515800447612",
    appId: "1:515800447612:web:2a7a52dc57f500981e67f9",
};


// Initialize Firebase
// Utilise getApps() pour éviter la réinitialisation multiple
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app };
