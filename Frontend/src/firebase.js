// Frontend/src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration from the screenshot
const firebaseConfig = {
  apiKey: "AIzaSyC39bG4zI9SwjDJf0rmOlBly9Il0QXAXLg",
  authDomain: "delibird-mart.firebaseapp.com",
  projectId: "delibird-mart",
  storageBucket: "delibird-mart.firebasestorage.app",
  messagingSenderId: "710163496656",
  appId: "1:710163496656:web:a022ba0435b5e4ebc5e8d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth and Google Provider for use in your login components
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();